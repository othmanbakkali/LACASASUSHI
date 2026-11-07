// ===================================================
// CASA SUSHI - PANEL ADMIN (ARCHITECTURE MVC & RBAC)
// Gestion des Plats, Catégories, Promos, Commandes & Utilisateurs
// Sécurisation par Tokens Signés HMAC & Bearer Authentication
// ===================================================

let allOrders = [];
let allAdminProducts = [];
let allAdminPromos = [];
let allAdminCategories = [];
let allAdminUsers = [];
let currentAdminUser = null;
let ordersPollingInterval = null;

// Helper Fetch Sécurisé avec Envoi Automatique du Bearer Token
async function fetchWithAuth(url, options = {}) {
    const token = sessionStorage.getItem('casa_sushi_token');
    const headers = {
        ...(options.headers || {})
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        showToast('Session expirée. Veuillez vous reconnecter.');
        setTimeout(logoutAdmin, 1500);
    } else if (response.status === 403) {
        showToast('Action refusée : Droits insuffisants pour ce rôle.');
    }

    return response;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initAuthSystem();
    initAdminNavigation();
    initProductTableEvents();
    initPromoPackEvents();
    initCategoryEvents();
    initUserEvents();
    initSettingsEvents();
});

// ==========================================
// 1. AUTHENTIFICATION ADMIN & GESTION DES RÔLES (RBAC)
// ==========================================
function initAuthSystem() {
    const loginForm = document.getElementById('admin-login-form');

    const savedUserJson = sessionStorage.getItem('casa_sushi_user');
    const savedToken = sessionStorage.getItem('casa_sushi_token');
    if (savedUserJson && savedToken) {
        try {
            currentAdminUser = JSON.parse(savedUserJson);
            showDashboard();
        } catch (e) {
            sessionStorage.removeItem('casa_sushi_user');
            sessionStorage.removeItem('casa_sushi_token');
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('admin-username-input').value.trim();
            const passwordInput = document.getElementById('admin-password-input').value.trim();

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameInput, password: passwordInput })
                });
                const data = await res.json();
                if (data.success && data.token) {
                    currentAdminUser = data.user;
                    sessionStorage.setItem('casa_sushi_user', JSON.stringify(currentAdminUser));
                    sessionStorage.setItem('casa_sushi_token', data.token);
                    showDashboard();
                    showToast(`Bienvenue, ${currentAdminUser.fullName} !`);
                } else {
                    alert(data.message || 'Identifiant ou mot de passe incorrect.');
                }
            } catch (err) {
                alert('Erreur de communication avec le serveur sécurisé.');
            }
        });
    }
}

function showDashboard() {
    const authScreen = document.getElementById('admin-auth-screen');
    const dashboardLayout = document.getElementById('admin-dashboard-layout');
    if (authScreen && dashboardLayout) {
        authScreen.style.display = 'none';
        dashboardLayout.style.display = 'flex';

        // Mise à jour du profil utilisateur et des permissions
        applyUserRolePermissions();

        // Chargement des données
        loadAdminData();
        loadOrdersData();
        loadCategoriesData();
        if (currentAdminUser?.role === 'admin') {
            loadUsersData();
        }

        // Polling auto des commandes toutes les 10 secondes
        if (!ordersPollingInterval) {
            ordersPollingInterval = setInterval(loadOrdersData, 10000);
        }
    }
}

function applyUserRolePermissions() {
    if (!currentAdminUser) return;

    // Nom et rôle dans la sidebar
    const nameEl = document.getElementById('admin-current-user-name');
    const roleEl = document.getElementById('admin-current-user-role');
    const avatarEl = document.getElementById('admin-avatar-letter');

    if (nameEl) nameEl.textContent = currentAdminUser.fullName || currentAdminUser.username;
    if (avatarEl) avatarEl.textContent = (currentAdminUser.fullName || currentAdminUser.username).charAt(0).toUpperCase();

    const roleLabels = {
        'admin': '👑 Super Admin',
        'manager': '👔 Gérant Restaurant',
        'cuisinier': '👨‍🍳 Cuisine & Commandes'
    };
    if (roleEl) roleEl.textContent = roleLabels[currentAdminUser.role] || currentAdminUser.role;

    // Masquage / affichage des onglets selon les droits
    const navItems = document.querySelectorAll('.admin-nav-item[data-roles]');
    navItems.forEach(item => {
        const allowedRoles = (item.dataset.roles || '').split(',');
        if (allowedRoles.includes(currentAdminUser.role)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Si cuisinier, forcer l'onglet des commandes
    if (currentAdminUser.role === 'cuisinier') {
        const ordersTabBtn = document.querySelector('.admin-nav-item[data-tab="orders-tab"]');
        if (ordersTabBtn) ordersTabBtn.click();
    }
}

function logoutAdmin() {
    if (confirm('Voulez-vous vous déconnecter du panneau administrateur ?')) {
        sessionStorage.removeItem('casa_sushi_user');
        sessionStorage.removeItem('casa_sushi_token');
        if (ordersPollingInterval) clearInterval(ordersPollingInterval);
        window.location.reload();
    }
}

// ==========================================
// 2. NAVIGATION PAR ONGLETS
// ==========================================
function initAdminNavigation() {
    const navItems = document.querySelectorAll('.admin-nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.admin-tab-content');
    const sectionTitle = document.getElementById('admin-current-section-title');
    const sectionSubtitle = document.getElementById('admin-current-section-subtitle');

    const titles = {
        'orders-tab': { title: '📦 Gestion des Commandes', sub: 'Suivi en direct des commandes enregistrées dans la BDD SQLite' },
        'dashboard-tab': { title: 'Tableau de Bord', sub: 'Aperçu global et statistiques de la carte Casa Sushi' },
        'categories-tab': { title: '📂 Gestion des Catégories', sub: 'Ajoutez, personnalisez ou réordonnez les catégories du menu' },
        'products-tab': { title: 'Gestion des Plats', sub: 'Ajoutez, modifiez ou supprimez des créations de la carte' },
        'promos-tab': { title: 'Packs Promo Périodiques', sub: 'Gérez vos offres spéciales, menus duo, packs weekend et réductions' },
        'users-tab': { title: '👥 Gestion des Utilisateurs', sub: 'Gestion des comptes et droits d\'accès (Super Admin, Gérant, Cuisine)' },
        'settings-tab': { title: 'Paramètres & BDD SQLite', sub: 'Sécurité, code d\'accès et sauvegarde de la base de données' }
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.dataset.tab;
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            tabContents.forEach(tab => {
                tab.style.display = tab.id === targetTab ? 'block' : 'none';
            });

            if (titles[targetTab] && sectionTitle && sectionSubtitle) {
                sectionTitle.textContent = titles[targetTab].title;
                sectionSubtitle.textContent = titles[targetTab].sub;
            }

            if (targetTab === 'orders-tab') loadOrdersData();
            if (targetTab === 'categories-tab') loadCategoriesData();
            if (targetTab === 'users-tab') loadUsersData();
        });
    });
}

// ==========================================
// 3. GESTION DES COMMANDES CLIENTS (SQLITE LIVE)
// ==========================================
async function loadOrdersData() {
    try {
        const res = await fetchWithAuth('/api/orders');
        if (res.ok) {
            allOrders = await res.json();
            renderOrdersList();
            updateOrderBadge();
        }
    } catch (e) {
        console.error('Erreur chargement commandes:', e);
    }
}

function updateOrderBadge() {
    const badge = document.getElementById('nav-orders-count-badge');
    const newCount = allOrders.filter(o => o.status === 'Nouvelle').length;
    if (badge) {
        if (newCount > 0) {
            badge.textContent = `${newCount} NOUV`;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

function renderOrdersList() {
    const container = document.getElementById('orders-grid-container');
    const filter = document.getElementById('admin-orders-filter')?.value || 'all';
    if (!container) return;

    const filtered = allOrders.filter(o => filter === 'all' || o.status === filter);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3.5rem;">
                <i class="fa-solid fa-receipt" style="font-size: 2.5rem; margin-bottom: 0.8rem; display: block; opacity: 0.5;"></i>
                <h3>Aucune commande pour le moment</h3>
                <p>Les nouvelles commandes passées sur le site client apparaîtront ici automatiquement.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(order => {
        const statusClass = (order.status || 'Nouvelle').toLowerCase().replace(/\s+/g, '-').replace(/é/g, 'e').replace(/è/g, 'e');
        const badgeClass = (order.status || 'Nouvelle').replace(/\s+/g, '-').replace(/é/g, 'e').replace(/è/g, 'e');
        const items = Array.isArray(order.items) ? order.items : [];
        const dateStr = order.created_at ? new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : 'Récent';

        const clientPhoneClean = (order.client_phone || '').replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${clientPhoneClean.startsWith('0') ? '212' + clientPhoneClean.slice(1) : clientPhoneClean}?text=Bonjour%20${encodeURIComponent(order.client_name)}%2C%20nous%20avons%20bien%20re%C3%A7u%20votre%20commande%20${order.order_number}%20chez%20Casa%20Sushi%20!`;

        return `
            <div class="order-card status-${statusClass}" id="order-card-${order.id}">
                <div class="order-card-header">
                    <div>
                        <span class="order-number">${order.order_number}</span>
                        <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 0.5rem;"><i class="fa-solid fa-clock"></i> ${dateStr}</span>
                    </div>
                    <span class="order-status-badge ${badgeClass}">${order.status}</span>
                </div>

                <div class="order-client-info">
                    <div class="order-client-name">
                        <i class="fa-solid fa-user" style="color: var(--gold-accent);"></i> ${order.client_name}
                    </div>
                    <div>
                        <i class="fa-solid fa-phone" style="color: #2ec4b6;"></i> 
                        <a href="tel:${order.client_phone}" style="color: inherit; text-decoration: none; font-weight: 700;">${order.client_phone}</a>
                        <a href="${waUrl}" target="_blank" title="Contacter sur WhatsApp" style="margin-left: 0.5rem; color: #25d366; font-size: 1.1rem; text-decoration: none;">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                    <div>
                        <i class="fa-solid fa-location-dot" style="color: var(--crimson-primary);"></i> 
                        <span>${order.client_address || 'À emporter'} (${order.order_type || 'Livraison'})</span>
                    </div>
                    ${order.order_notes ? `
                        <div style="background: rgba(244, 162, 97, 0.1); padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.8rem; color: var(--gold-accent);">
                            <i class="fa-solid fa-message"></i> ${order.order_notes}
                        </div>
                    ` : ''}
                </div>

                <div class="order-items-list">
                    ${items.map(it => `
                        <div class="order-item-row">
                            <span><strong>${it.quantity}x</strong> ${it.name} ${it.selectedOptionName ? `(${it.selectedOptionName})` : ''}</span>
                            <span style="color: var(--gold-accent); font-weight: 700;">${it.price * it.quantity} DH</span>
                        </div>
                    `).join('')}
                </div>

                <div class="order-card-footer">
                    <div>
                        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">TOTAL</span>
                        <span class="order-total-amount">${order.total_price} <small style="font-size: 0.8rem;">DH</small></span>
                    </div>

                    <div class="order-action-btns">
                        <button class="btn-order-action" onclick="printKitchenTicket(${order.id})" title="Imprimer Bon de Cuisine" style="background: rgba(255,255,255,0.1); color: #fff;">
                            <i class="fa-solid fa-print"></i>
                        </button>
                        ${order.status === 'Nouvelle' ? `
                            <button class="btn-order-action" onclick="updateOrderStatus(${order.id}, 'En préparation')" style="background: #3a86ff; color: #fff;">
                                <i class="fa-solid fa-kitchen-set"></i> Cuisine
                            </button>
                        ` : ''}
                        ${order.status === 'En préparation' ? `
                            <button class="btn-order-action" onclick="updateOrderStatus(${order.id}, 'En livraison')" style="background: #9d4edd; color: #fff;">
                                <i class="fa-solid fa-motorcycle"></i> Expédier
                            </button>
                        ` : ''}
                        ${order.status === 'En livraison' ? `
                            <button class="btn-order-action" onclick="updateOrderStatus(${order.id}, 'Livrée')" style="background: #2ec4b6; color: #fff;">
                                <i class="fa-solid fa-check"></i> Livrée
                            </button>
                        ` : ''}
                        ${order.status !== 'Livrée' && order.status !== 'Annulée' ? `
                            <button class="btn-order-action" onclick="updateOrderStatus(${order.id}, 'Annulée')" title="Annuler la commande" style="background: rgba(255, 77, 77, 0.2); color: #ff6b6b;">
                                <i class="fa-solid fa-ban"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        const res = await fetchWithAuth(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) {
            showToast(`Commande mise à jour : ${newStatus}`);
            loadOrdersData();
        }
    } catch (e) {
        console.error('Erreur mise à jour commande:', e);
    }
}

// ==========================================
// 4. IMPRESSION BON DE CUISINE / TICKET
// ==========================================
function printKitchenTicket(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('ticket-modal');
    const overlay = document.getElementById('ticket-modal-overlay');
    const container = document.getElementById('kitchen-ticket-printable');

    const items = Array.isArray(order.items) ? order.items : [];

    if (container) {
        container.innerHTML = `
            <div style="text-align: center; border-bottom: 2px dashed #000; padding-bottom: 1rem; margin-bottom: 1rem;">
                <h2 style="font-size: 1.4rem; margin-bottom: 0.2rem; font-weight: 900;">CASA SUSHI</h2>
                <p style="font-size: 0.85rem; margin: 0;">Tanger, Maroc • +212 630-553822</p>
                <p style="font-size: 1.1rem; font-weight: 900; margin-top: 0.5rem;">COMMANDE : ${order.order_number}</p>
                <p style="font-size: 0.8rem; margin: 0;">Date : ${new Date(order.created_at || Date.now()).toLocaleString('fr-FR')}</p>
            </div>

            <div style="border-bottom: 1px dashed #000; padding-bottom: 0.8rem; margin-bottom: 0.8rem; font-size: 0.9rem;">
                <div><strong>CLIENT :</strong> ${order.client_name}</div>
                <div><strong>TÉL :</strong> ${order.client_phone}</div>
                <div><strong>TYPE :</strong> ${order.order_type}</div>
                <div><strong>ADRESSE :</strong> ${order.client_address || 'Sur place'}</div>
                ${order.order_notes ? `<div style="margin-top: 0.3rem;"><strong>NOTE :</strong> ${order.order_notes}</div>` : ''}
            </div>

            <div style="border-bottom: 2px dashed #000; padding-bottom: 1rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 0.85rem; margin-bottom: 0.5rem;">
                    <span>ARTICLE</span>
                    <span>PRIX</span>
                </div>
                ${items.map(it => `
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.3rem;">
                        <span><strong>${it.quantity}x</strong> ${it.name}</span>
                        <span>${it.price * it.quantity} DH</span>
                    </div>
                `).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 900;">
                <span>TOTAL À PAYER :</span>
                <span>${order.total_price} DH</span>
            </div>

            <div style="text-align: center; margin-top: 1.5rem; font-size: 0.8rem;">
                <p>Merci pour votre commande et bon appétit !</p>
            </div>
        `;
    }

    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function closeTicketModal() {
    const modal = document.getElementById('ticket-modal');
    const overlay = document.getElementById('ticket-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    }
}

// ==========================================
// 5. CHARGEMENT ET SYNCHRONISATION DES DONNÉES
// ==========================================
async function loadAdminData() {
    // Stats
    try {
        const statsRes = await fetchWithAuth('/api/stats');
        if (statsRes.ok) {
            const stats = await statsRes.json();
            const totalProdEl = document.getElementById('stat-total-products');
            const activePromosEl = document.getElementById('stat-active-promos');
            const catCountEl = document.getElementById('stat-categories-count');
            if (totalProdEl) totalProdEl.textContent = stats.totalProducts;
            if (activePromosEl) activePromosEl.textContent = stats.activePromos;
            if (catCountEl && stats.categoriesCount) catCountEl.textContent = stats.categoriesCount;
        }
    } catch(e) {}

    // Plats
    try {
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
            allAdminProducts = await prodRes.json();
            renderProductsTable();
        }
    } catch(e) {}

    // Promos
    try {
        const promoRes = await fetch('/api/promos');
        if (promoRes.ok) {
            allAdminPromos = await promoRes.json();
            renderPromoPacks();
        }
    } catch(e) {}
}

// ==========================================
// 6. GESTION DES CATÉGORIES (CRUD)
// ==========================================
function initCategoryEvents() {
    const form = document.getElementById('category-crud-form');
    if (form) {
        form.addEventListener('submit', handleCategorySave);
    }
}

async function loadCategoriesData() {
    try {
        const res = await fetch('/api/categories?all=1');
        if (res.ok) {
            allAdminCategories = await res.json();
            renderCategoriesTable();
            populateCategorySelects();
        }
    } catch (e) {
        console.error('Erreur chargement catégories:', e);
    }
}

function renderCategoriesTable() {
    const tableBody = document.getElementById('admin-categories-table-body');
    if (!tableBody) return;

    if (allAdminCategories.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    Aucune catégorie enregistrée.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = allAdminCategories.map(cat => {
        const count = allAdminProducts.filter(p => p.category === cat.id).length;
        const iconClass = cat.icon.startsWith('fa-') ? cat.icon : `fa-${cat.icon}`;

        return `
            <tr>
                <td><strong>#${cat.orderIndex || 0}</strong></td>
                <td>
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(244,162,97,0.15); color: var(--gold-accent); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                        <i class="fa-solid ${iconClass}"></i>
                    </div>
                </td>
                <td><strong>${cat.name}</strong></td>
                <td><code>${cat.id}</code></td>
                <td><span class="dish-badge">${count} plats</span></td>
                <td>
                    <span class="dish-badge ${cat.isActive ? 'badge-signature' : 'badge-default'}" style="font-size: 0.72rem;">
                        ${cat.isActive ? 'Active' : 'Masquée'}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn-table-action edit" onclick="editCategory('${cat.id}')" title="Modifier la catégorie">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-table-action delete" onclick="deleteCategory('${cat.id}')" title="Supprimer la catégorie">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function populateCategorySelects() {
    const filterSelect = document.getElementById('admin-category-filter');
    const formSelect = document.getElementById('crud-product-category');

    if (filterSelect) {
        filterSelect.innerHTML = '<option value="all">Toutes les catégories</option>' +
            allAdminCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    if (formSelect) {
        formSelect.innerHTML = allAdminCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

function openCategoryModal() {
    const modal = document.getElementById('category-form-modal');
    const overlay = document.getElementById('category-modal-overlay');
    const form = document.getElementById('category-crud-form');
    if (form) form.reset();

    document.getElementById('category-modal-heading').textContent = 'Ajouter une Catégorie';
    document.getElementById('crud-category-is-edit').value = '0';
    document.getElementById('crud-category-id').readOnly = false;
    document.getElementById('crud-category-active').checked = true;
    updateCatIconPreview('fa-utensils');

    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function editCategory(catId) {
    const cat = allAdminCategories.find(c => c.id === catId);
    if (!cat) return;

    document.getElementById('category-modal-heading').textContent = 'Modifier la Catégorie';
    document.getElementById('crud-category-is-edit').value = '1';
    document.getElementById('crud-category-id').value = cat.id;
    document.getElementById('crud-category-id').readOnly = true;
    document.getElementById('crud-category-name').value = cat.name;
    document.getElementById('crud-category-order').value = cat.orderIndex || 0;
    document.getElementById('crud-category-icon').value = cat.icon || 'fa-utensils';
    document.getElementById('crud-category-active').checked = cat.isActive !== false;
    updateCatIconPreview(cat.icon || 'fa-utensils');

    const modal = document.getElementById('category-form-modal');
    const overlay = document.getElementById('category-modal-overlay');
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function closeCategoryModal() {
    const modal = document.getElementById('category-form-modal');
    const overlay = document.getElementById('category-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function updateCatIconPreview(iconClass) {
    const preview = document.getElementById('crud-category-icon-preview');
    if (preview) {
        const clean = iconClass.startsWith('fa-') ? iconClass : `fa-${iconClass}`;
        preview.innerHTML = `<i class="fa-solid ${clean}"></i>`;
    }
}

async function handleCategorySave(e) {
    e.preventDefault();
    const isEdit = document.getElementById('crud-category-is-edit').value === '1';
    const id = document.getElementById('crud-category-id').value.trim().toLowerCase().replace(/\s+/g, '_');
    const name = document.getElementById('crud-category-name').value.trim();
    const orderIndex = parseInt(document.getElementById('crud-category-order').value) || 0;
    const icon = document.getElementById('crud-category-icon').value.trim() || 'fa-utensils';
    const isActive = document.getElementById('crud-category-active').checked;

    const payload = { id, name, orderIndex, icon, isActive };

    try {
        if (isEdit) {
            await fetchWithAuth(`/api/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Catégorie mise à jour : ${name}`);
        } else {
            await fetchWithAuth('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Nouvelle catégorie ajoutée : ${name}`);
        }
        loadCategoriesData();
        closeCategoryModal();
    } catch(err) {
        alert('Erreur lors de l\'enregistrement de la catégorie.');
    }
}

async function deleteCategory(catId) {
    const cat = allAdminCategories.find(c => c.id === catId);
    if (!cat) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${cat.name}" ?`)) {
        try {
            await fetchWithAuth(`/api/categories/${catId}`, { method: 'DELETE' });
            showToast(`Catégorie supprimée : ${cat.name}`);
            loadCategoriesData();
        } catch(e) {}
    }
}

// ==========================================
// 7. GESTION DES UTILISATEURS & DROITS (RBAC)
// ==========================================
function initUserEvents() {
    const form = document.getElementById('user-crud-form');
    if (form) {
        form.addEventListener('submit', handleUserSave);
    }
}

async function loadUsersData() {
    try {
        const res = await fetchWithAuth('/api/users');
        if (res.ok) {
            allAdminUsers = await res.json();
            renderUsersTable();
        }
    } catch (e) {
        console.error('Erreur chargement utilisateurs:', e);
    }
}

function renderUsersTable() {
    const tableBody = document.getElementById('admin-users-table-body');
    if (!tableBody) return;

    const roleBadges = {
        'admin': '<span class="dish-badge badge-signature"><i class="fa-solid fa-crown"></i> Super Admin</span>',
        'manager': '<span class="dish-badge" style="background: #3a86ff; color: #fff;"><i class="fa-solid fa-user-tie"></i> Gérant</span>',
        'cuisinier': '<span class="dish-badge" style="background: #2ec4b6; color: #fff;"><i class="fa-solid fa-kitchen-set"></i> Cuisine & Commandes</span>'
    };

    tableBody.innerHTML = allAdminUsers.map(user => {
        const dateStr = user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : '-';

        return `
            <tr>
                <td><strong>${user.fullName}</strong></td>
                <td><code>${user.username}</code></td>
                <td>${roleBadges[user.role] || user.role}</td>
                <td>${dateStr}</td>
                <td>
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn-table-action edit" onclick="editUser(${user.id})" title="Modifier l'utilisateur">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        ${user.username !== 'admin' ? `
                            <button class="btn-table-action delete" onclick="deleteUser(${user.id})" title="Supprimer l'utilisateur">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openUserModal() {
    const modal = document.getElementById('user-form-modal');
    const overlay = document.getElementById('user-modal-overlay');
    const form = document.getElementById('user-crud-form');
    if (form) form.reset();

    document.getElementById('user-modal-heading').textContent = 'Ajouter un Utilisateur';
    document.getElementById('crud-user-id').value = '';
    document.getElementById('crud-user-username').readOnly = false;
    document.getElementById('crud-user-password').required = true;

    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function editUser(userId) {
    const user = allAdminUsers.find(u => u.id === userId);
    if (!user) return;

    document.getElementById('user-modal-heading').textContent = 'Modifier l\'Utilisateur';
    document.getElementById('crud-user-id').value = user.id;
    document.getElementById('crud-user-fullname').value = user.fullName;
    document.getElementById('crud-user-username').value = user.username;
    document.getElementById('crud-user-username').readOnly = (user.username === 'admin');
    document.getElementById('crud-user-role').value = user.role;
    document.getElementById('crud-user-password').value = '';
    document.getElementById('crud-user-password').required = false;

    const modal = document.getElementById('user-form-modal');
    const overlay = document.getElementById('user-modal-overlay');
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function closeUserModal() {
    const modal = document.getElementById('user-form-modal');
    const overlay = document.getElementById('user-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    }
}

async function handleUserSave(e) {
    e.preventDefault();
    const id = document.getElementById('crud-user-id').value.trim();
    const fullName = document.getElementById('crud-user-fullname').value.trim();
    const username = document.getElementById('crud-user-username').value.trim();
    const role = document.getElementById('crud-user-role').value;
    const password = document.getElementById('crud-user-password').value.trim();

    const payload = { fullName, username, role };
    if (password) payload.password = password;

    try {
        if (id) {
            await fetchWithAuth(`/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Utilisateur mis à jour : ${fullName}`);
        } else {
            await fetchWithAuth('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Nouvel utilisateur ajouté : ${fullName}`);
        }
        loadUsersData();
        closeUserModal();
    } catch(err) {
        alert('Erreur lors de l\'enregistrement de l\'utilisateur.');
    }
}

async function deleteUser(userId) {
    const user = allAdminUsers.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.fullName}" ?`)) {
        try {
            await fetchWithAuth(`/api/users/${userId}`, { method: 'DELETE' });
            showToast(`Utilisateur supprimé : ${user.fullName}`);
            loadUsersData();
        } catch(e) {}
    }
}

// ==========================================
// 8. GESTION DES PRODUITS (CRUD)
// ==========================================
function initProductTableEvents() {
    const searchInput = document.getElementById('admin-products-search');
    const categorySelect = document.getElementById('admin-category-filter');
    const crudForm = document.getElementById('product-crud-form');

    if (searchInput) searchInput.addEventListener('input', renderProductsTable);
    if (categorySelect) categorySelect.addEventListener('change', renderProductsTable);
    if (crudForm) crudForm.addEventListener('submit', handleProductSave);
}

function renderProductsTable() {
    const tableBody = document.getElementById('admin-products-table-body');
    if (!tableBody) return;

    const searchTerm = (document.getElementById('admin-products-search')?.value || '').toLowerCase().trim();
    const categoryFilter = document.getElementById('admin-category-filter')?.value || 'all';

    const filtered = allAdminProducts.filter(p => {
        const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
        const matchSearch = !searchTerm || 
            p.name.toLowerCase().includes(searchTerm) || 
            p.subcategory?.toLowerCase().includes(searchTerm) ||
            p.ingredients?.some(i => i.toLowerCase().includes(searchTerm));
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    Aucun plat ne correspond à vos critères.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filtered.map(p => {
        const inStock = p.inStock !== false;
        return `
            <tr>
                <td>
                    <div class="product-thumb-cell">
                        <img src="${p.image || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80'}" class="product-thumb-img" alt="${p.name}">
                        <div class="product-name-info">
                            <h4>${p.name}</h4>
                            <span>${p.subcategory || 'Plat'}</span>
                        </div>
                    </div>
                </td>
                <td><span class="dish-badge">${getCategoryName(p.category)}</span></td>
                <td><strong>${p.pieces || '-'}</strong></td>
                <td><strong style="color: var(--gold-accent); font-size: 1rem;">${p.price} DH</strong></td>
                <td>
                    <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                        ${(p.tags || []).slice(0, 2).map(t => `<span class="dish-badge badge-default" style="font-size: 0.65rem;">${t}</span>`).join('')}
                    </div>
                </td>
                <td>
                    <label class="stock-toggle-switch">
                        <input type="checkbox" ${inStock ? 'checked' : ''} onchange="toggleProductStock('${p.id}', this.checked)">
                        <span class="stock-toggle-slider"></span>
                    </label>
                    <span style="font-size: 0.75rem; color: ${inStock ? '#2ec4b6' : '#ff6b6b'}; display: block; margin-top: 0.2rem; font-weight: 700;">
                        ${inStock ? 'En stock' : 'Épuisé'}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn-table-action edit" onclick="editProduct('${p.id}')" title="Modifier le plat">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-table-action delete" onclick="deleteProduct('${p.id}')" title="Supprimer le plat">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getCategoryName(catId) {
    const found = allAdminCategories.find(c => c.id === catId);
    return found ? found.name : catId;
}

async function toggleProductStock(id, inStock) {
    try {
        await fetchWithAuth(`/api/products/${id}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inStock })
        });
        showToast(inStock ? 'Plat marqué en stock' : 'Plat marqué comme épuisé');
        loadAdminData();
    } catch(e) {}
}

function openProductModal() {
    const modal = document.getElementById('product-form-modal');
    const overlay = document.getElementById('product-modal-overlay');
    const form = document.getElementById('product-crud-form');
    if (form) form.reset();

    document.getElementById('product-modal-heading').textContent = 'Ajouter un Nouveau Plat';
    document.getElementById('crud-product-id').value = '';
    document.getElementById('crud-product-preview-img').src = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80';

    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function editProduct(id) {
    const p = allAdminProducts.find(item => item.id === id);
    if (!p) return;

    document.getElementById('product-modal-heading').textContent = 'Modifier le Plat';
    document.getElementById('crud-product-id').value = p.id;
    document.getElementById('crud-product-name').value = p.name;
    document.getElementById('crud-product-price').value = p.price;
    document.getElementById('crud-product-category').value = p.category;
    document.getElementById('crud-product-subcategory').value = p.subcategory || '';
    document.getElementById('crud-product-pieces').value = p.pieces || '';
    document.getElementById('crud-product-tags').value = (p.tags || []).join(', ');
    document.getElementById('crud-product-desc').value = p.description || '';
    document.getElementById('crud-product-ingredients').value = (p.ingredients || []).join(', ');
    document.getElementById('crud-product-image').value = p.image || '';
    document.getElementById('crud-product-preview-img').src = p.image || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80';

    const modal = document.getElementById('product-form-modal');
    const overlay = document.getElementById('product-modal-overlay');
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function closeProductModal() {
    const modal = document.getElementById('product-form-modal');
    const overlay = document.getElementById('product-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    }
}

async function handleProductSave(e) {
    e.preventDefault();
    const id = document.getElementById('crud-product-id').value.trim();
    const name = document.getElementById('crud-product-name').value.trim();
    const price = parseFloat(document.getElementById('crud-product-price').value) || 0;
    const category = document.getElementById('crud-product-category').value;
    const subcategory = document.getElementById('crud-product-subcategory').value.trim() || 'Spécialités';
    const pieces = document.getElementById('crud-product-pieces').value.trim();
    const tags = document.getElementById('crud-product-tags').value.split(',').map(t => t.trim()).filter(Boolean);
    const desc = document.getElementById('crud-product-desc').value.trim();
    const ingredients = document.getElementById('crud-product-ingredients').value.split(',').map(i => i.trim()).filter(Boolean);
    const image = document.getElementById('crud-product-image').value.trim() || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80';

    const payload = { id, name, price, category, subcategory, pieces, tags, description: desc, ingredients, image, inStock: true };

    try {
        if (id) {
            await fetchWithAuth(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Plat modifié : ${name}`);
        } else {
            await fetchWithAuth('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Nouveau plat ajouté : ${name}`);
        }
        loadAdminData();
        closeProductModal();
    } catch(e) {
        alert('Erreur lors de l\'enregistrement dans la base SQLite');
    }
}

async function deleteProduct(id) {
    const p = allAdminProducts.find(item => item.id === id);
    if (!p) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer "${p.name}" de la base SQLite ?`)) {
        try {
            await fetchWithAuth(`/api/products/${id}`, { method: 'DELETE' });
            showToast(`Plat supprimé : ${p.name}`);
            loadAdminData();
        } catch(e) {}
    }
}

// ==========================================
// 9. GESTION DES PACKS PROMO PÉRIODIQUES
// ==========================================
function initPromoPackEvents() {
    const promoForm = document.getElementById('promo-crud-form');
    if (promoForm) promoForm.addEventListener('submit', handlePromoSave);
}

function renderPromoPacks() {
    const fullContainer = document.getElementById('admin-promos-full-list');
    const previewContainer = document.getElementById('dashboard-promos-preview');

    const generateCardsHtml = (items) => {
        if (items.length === 0) {
            return `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Aucun pack promotionnel actuellement.</div>`;
        }

        return items.map(p => `
            <div class="promo-pack-card">
                <span class="promo-pack-badge">${p.badge || 'PROMO'}</span>
                <img src="${p.image || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'}" class="promo-pack-img" alt="${p.title}">
                <div class="promo-pack-content">
                    <div class="promo-pack-dates">
                        <i class="fa-solid fa-calendar-days"></i>
                        <span>${p.startDate ? `Du ${p.startDate}` : 'Offre'} ${p.endDate ? `au ${p.endDate}` : ''}</span>
                    </div>
                    <h3 class="promo-pack-title">${p.title}</h3>
                    <p class="promo-pack-desc">${p.description}</p>
                    <div class="promo-pack-pricing">
                        ${p.oldPrice ? `<span class="promo-old-price">${p.oldPrice} DH</span>` : ''}
                        <span class="promo-new-price">${p.newPrice} DH</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.8rem;">
                        <span style="font-size: 0.8rem; color: #2ec4b6; font-weight: 700;">Actif</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn-table-action edit" onclick="editPromoPack('${p.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-table-action delete" onclick="deletePromoPack('${p.id}')"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    };

    if (fullContainer) fullContainer.innerHTML = generateCardsHtml(allAdminPromos);
    if (previewContainer) previewContainer.innerHTML = generateCardsHtml(allAdminPromos.slice(0, 3));
}

function openPromoModal() {
    const modal = document.getElementById('promo-form-modal');
    const overlay = document.getElementById('promo-modal-overlay');
    const form = document.getElementById('promo-crud-form');
    if (form) form.reset();
    document.getElementById('crud-promo-id').value = '';
    document.getElementById('crud-promo-preview-img').src = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80';
    
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function editPromoPack(id) {
    const p = allAdminPromos.find(item => item.id === id);
    if (!p) return;

    document.getElementById('crud-promo-id').value = p.id;
    document.getElementById('crud-promo-title').value = p.title;
    document.getElementById('crud-promo-old-price').value = p.oldPrice || '';
    document.getElementById('crud-promo-new-price').value = p.newPrice;
    document.getElementById('crud-promo-badge').value = p.badge || '';
    document.getElementById('crud-promo-start-date').value = p.startDate || '';
    document.getElementById('crud-promo-end-date').value = p.endDate || '';
    document.getElementById('crud-promo-desc').value = p.description;
    document.getElementById('crud-promo-image').value = p.image || '';
    document.getElementById('crud-promo-preview-img').src = p.image || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80';

    const modal = document.getElementById('promo-form-modal');
    const overlay = document.getElementById('promo-modal-overlay');
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function closePromoModal() {
    const modal = document.getElementById('promo-form-modal');
    const overlay = document.getElementById('promo-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    }
}

async function handlePromoSave(e) {
    e.preventDefault();
    const id = document.getElementById('crud-promo-id').value.trim();
    const title = document.getElementById('crud-promo-title').value.trim();
    const oldPrice = parseFloat(document.getElementById('crud-promo-old-price').value) || null;
    const newPrice = parseFloat(document.getElementById('crud-promo-new-price').value) || 0;
    const badge = document.getElementById('crud-promo-badge').value.trim() || 'PROMO';
    const startDate = document.getElementById('crud-promo-start-date').value;
    const endDate = document.getElementById('crud-promo-end-date').value;
    const description = document.getElementById('crud-promo-desc').value.trim();
    const image = document.getElementById('crud-promo-image').value.trim() || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80';

    const payload = { id, title, oldPrice, newPrice, badge, startDate, endDate, description, image, active: true };

    try {
        if (id) {
            await fetchWithAuth(`/api/promos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Pack Promo mis à jour : ${title}`);
        } else {
            await fetchWithAuth('/api/promos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            showToast(`Nouveau Pack Promo publié : ${title}`);
        }
        loadAdminData();
        closePromoModal();
    } catch(e) {}
}

async function deletePromoPack(id) {
    if (confirm('Voulez-vous supprimer cette offre promotionnelle de la base SQLite ?')) {
        try {
            await fetchWithAuth(`/api/promos/${id}`, { method: 'DELETE' });
            showToast('Pack promo supprimé');
            loadAdminData();
        } catch(e) {}
    }
}

// ==========================================
// 10. TÉLÉVERSEMENT SÉCURISÉ & CHIFFREMENT DES FICHIERS
// ==========================================
async function handleImageFileUpload(event, targetInputId, previewImgId) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64Data = e.target.result;
        const previewEl = document.getElementById(previewImgId);
        if (previewEl) previewEl.src = base64Data;

        try {
            showToast('Téléversement sécurisé de la photo...');
            const res = await fetchWithAuth('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: base64Data, filename: file.name })
            });

            if (res.ok) {
                const data = await res.json();
                const inputEl = document.getElementById(targetInputId);
                if (inputEl) {
                    inputEl.value = data.url;
                }
                showToast('Photo sécurisée et enregistrée !');
            } else {
                const inputEl = document.getElementById(targetInputId);
                if (inputEl) inputEl.value = base64Data;
                showToast('Photo prête');
            }
        } catch(err) {
            const inputEl = document.getElementById(targetInputId);
            if (inputEl) inputEl.value = base64Data;
            showToast('Photo prête en local');
        }
    };
    reader.readAsDataURL(file);
}

function downloadCurrentImage(inputId) {
    const input = document.getElementById(inputId);
    const imageUrl = input ? input.value : '';
    if (!imageUrl) {
        alert('Aucune photo disponible pour le téléchargement.');
        return;
    }

    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `Casa_Sushi_Photo_${Date.now()}.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Téléchargement de la photo lancé !');
}

// ==========================================
// 11. PARAMÈTRES & BACKUP
// ==========================================
function initSettingsEvents() {
    const pinForm = document.getElementById('change-pin-form');
    if (pinForm) {
        pinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newPin = document.getElementById('new-admin-pin').value.trim();
            if (newPin.length < 4) {
                alert('Le mot de passe doit comporter au moins 4 caractères.');
                return;
            }
            try {
                const res = await fetchWithAuth('/api/auth/change-pin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newPin })
                });
                if (res.ok) {
                    showToast('Mot de passe administrateur mis à jour avec succès !');
                    pinForm.reset();
                }
            } catch(e) {}
        });
    }
}

function exportDataBackup() {
    const data = {
        products: allAdminProducts,
        categories: allAdminCategories,
        promos: allAdminPromos,
        orders: allOrders,
        users: allAdminUsers,
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Casa_Sushi_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Sauvegarde complète téléchargée !');
}

function resetToDefaultMenu() {
    if (confirm('Attention : cela va recharger la carte d\'origine. Continuer ?')) {
        localStorage.removeItem('casa_sushi_menu_items');
        window.location.reload();
    }
}

function showToast(message) {
    let toast = document.getElementById('admin-toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'admin-toast-notification';
        toast.style.position = 'fixed';
        toast.style.bottom = '25px';
        toast.style.right = '25px';
        toast.style.background = 'linear-gradient(135deg, #1d212d, #141721)';
        toast.style.color = '#fff';
        toast.style.border = '1px solid var(--border-gold)';
        toast.style.padding = '0.9rem 1.4rem';
        toast.style.borderRadius = '10px';
        toast.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5)';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '0.9rem';
        toast.style.fontWeight = '600';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '0.6rem';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #2ec4b6;"></i> ${message}`;
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3500);
}
