// ===================================================
// CASA SUSHI - SERVEUR BACKEND & BASE SQLITE
// Node.js 22+ avec module natif node:sqlite
// ===================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 8080;
const DB_FILE = path.join(__dirname, 'casa_sushi.db');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Créer le dossier uploads si inexistant
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// 1. INITIALISATION DE LA BASE SQLITE
const db = new DatabaseSync(DB_FILE);

// Création des tables
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        subcategory TEXT,
        price REAL NOT NULL,
        pieces TEXT,
        description TEXT,
        ingredients TEXT,
        tags TEXT,
        image TEXT,
        in_stock INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS promo_packs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        old_price REAL,
        new_price REAL NOT NULL,
        badge TEXT,
        start_date TEXT,
        end_date TEXT,
        description TEXT,
        image TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_number TEXT UNIQUE NOT NULL,
        client_name TEXT NOT NULL,
        client_phone TEXT NOT NULL,
        client_address TEXT,
        order_type TEXT DEFAULT 'Livraison',
        items TEXT NOT NULL,
        total_price REAL NOT NULL,
        order_notes TEXT,
        status TEXT DEFAULT 'Nouvelle',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );
`);

// Code PIN par défaut si non défini
const pinStmt = db.prepare('SELECT value FROM settings WHERE key = ?');
const existingPin = pinStmt.get('admin_pin');
if (!existingPin) {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('admin_pin', 'admin123');
}

// 2. SEED INITIAL DES PRODUITS SI LA TABLE EST VIDE
const countProd = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (countProd.count === 0) {
    console.log('📦 Initialisation des 150+ plats officiels dans la base SQLite...');
    try {
        const appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
        const match = appJsContent.match(/const MENU_ITEMS = (\[[\s\S]*?\]);\r?\n\r?\n\/\/ ====/);
        if (match && match[1]) {
            const initialItems = eval(match[1]);
            const insertStmt = db.prepare(`
                INSERT INTO products (id, name, category, subcategory, price, pieces, description, ingredients, tags, image, in_stock)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            `);
            for (const item of initialItems) {
                insertStmt.run(
                    item.id,
                    item.name,
                    item.category,
                    item.subcategory || '',
                    item.price,
                    item.pieces || '',
                    item.description || '',
                    JSON.stringify(item.ingredients || []),
                    JSON.stringify(item.tags || []),
                    item.image || ''
                );
            }
            console.log(`✅ ${initialItems.length} plats importés dans SQLite avec succès !`);
        }
    } catch (err) {
        console.error('Erreur lors du seed initial des produits:', err);
    }
}

// Seed initial des packs promo si vide
const countPromos = db.prepare('SELECT COUNT(*) as count FROM promo_packs').get();
if (countPromos.count === 0) {
    const insertPromo = db.prepare(`
        INSERT INTO promo_packs (id, title, old_price, new_price, badge, start_date, end_date, description, image, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);
    insertPromo.run(
        'promo-pack-1',
        'Pack Duo Évasion (32 Pièces)',
        260,
        199,
        '-25% PROMO DUO',
        '2026-08-01',
        '2026-09-30',
        '8pcs California Saumon Cheese + 8pcs Dragon Eye + 8pcs Crunchy Crevette + 8pcs Maki Avocat + 2 Boissons offertes',
        'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
    );
    insertPromo.run(
        'promo-pack-2',
        'Mega Box Weekend Festin (50 Pièces)',
        380,
        299,
        'OFFRE LIMITÉE',
        '2026-08-01',
        '2026-10-31',
        'Plateau familial complet : Assortiment Crunchy, Roll Norvégien, Ebi Fry, Tataki Saumon, Nems dorés et sauces.',
        'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
    );
}

// 3. MIME TYPES POUR LES FICHIERS STATIQUES
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Helper pour lire le corps JSON d'une requête
function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(e);
            }
        });
    });
}

function sendJson(res, data, statusCode = 200) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(data));
}

// 4. SERVEUR HTTP AVEC ROUTAGE API REST
const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // CORS Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        return res.end();
    }

    // ==========================================
    // API REST - PRODUITS
    // ==========================================
    if (pathname === '/api/products' && req.method === 'GET') {
        const rows = db.prepare('SELECT * FROM products ORDER BY rowid ASC').all();
        const products = rows.map(r => ({
            ...r,
            ingredients: JSON.parse(r.ingredients || '[]'),
            tags: JSON.parse(r.tags || '[]'),
            inStock: Boolean(r.in_stock)
        }));
        return sendJson(res, products);
    }

    if (pathname === '/api/products' && req.method === 'POST') {
        try {
            const body = await parseRequestBody(req);
            const id = body.id || 'custom-' + Date.now();
            const insertStmt = db.prepare(`
                INSERT INTO products (id, name, category, subcategory, price, pieces, description, ingredients, tags, image, in_stock)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
            insertStmt.run(
                id,
                body.name,
                body.category,
                body.subcategory || '',
                body.price,
                body.pieces || '',
                body.description || '',
                JSON.stringify(body.ingredients || []),
                JSON.stringify(body.tags || []),
                body.image || '',
                body.inStock !== false ? 1 : 0
            );
            return sendJson(res, { success: true, id }, 201);
        } catch (e) {
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/products/') && req.method === 'PUT') {
        try {
            const id = pathname.split('/')[3];
            const body = await parseRequestBody(req);
            const updateStmt = db.prepare(`
                UPDATE products SET name = ?, category = ?, subcategory = ?, price = ?, pieces = ?, description = ?, ingredients = ?, tags = ?, image = ?, in_stock = ?
                WHERE id = ?
            `);
            updateStmt.run(
                body.name,
                body.category,
                body.subcategory || '',
                body.price,
                body.pieces || '',
                body.description || '',
                JSON.stringify(body.ingredients || []),
                JSON.stringify(body.tags || []),
                body.image || '',
                body.inStock !== false ? 1 : 0,
                id
            );
            return sendJson(res, { success: true });
        } catch (e) {
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/products/') && pathname.endsWith('/stock') && req.method === 'PATCH') {
        try {
            const id = pathname.split('/')[3];
            const body = await parseRequestBody(req);
            db.prepare('UPDATE products SET in_stock = ? WHERE id = ?').run(body.inStock ? 1 : 0, id);
            return sendJson(res, { success: true });
        } catch (e) {
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/products/') && req.method === 'DELETE') {
        const id = pathname.split('/')[3];
        db.prepare('DELETE FROM products WHERE id = ?').run(id);
        return sendJson(res, { success: true });
    }

    // ==========================================
    // API REST - UPLOAD D'IMAGES
    // ==========================================
    if (pathname === '/api/upload' && req.method === 'POST') {
        try {
            const body = await parseRequestBody(req);
            if (!body.data) {
                return sendJson(res, { error: 'Aucune donnée d\'image' }, 400);
            }

            // Extraction format et base64
            const matches = body.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                return sendJson(res, { error: 'Format base64 invalide' }, 400);
            }

            const mimeType = matches[1];
            const buffer = Buffer.from(matches[2], 'base64');
            let ext = '.jpg';
            if (mimeType.includes('png')) ext = '.png';
            else if (mimeType.includes('webp')) ext = '.webp';
            else if (mimeType.includes('gif')) ext = '.gif';

            const filename = `sushi_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
            const targetPath = path.join(UPLOADS_DIR, filename);

            fs.writeFileSync(targetPath, buffer);

            const fileUrl = `/uploads/${filename}`;
            return sendJson(res, { success: true, url: fileUrl, filename });
        } catch (e) {
            console.error('Erreur upload:', e);
            return sendJson(res, { error: e.message }, 500);
        }
    }

    // ==========================================
    // API REST - PACKS PROMO PÉRIODIQUES
    // ==========================================
    if (pathname === '/api/promos' && req.method === 'GET') {
        const rows = db.prepare('SELECT * FROM promo_packs ORDER BY created_at DESC').all();
        const promos = rows.map(r => ({
            id: r.id,
            title: r.title,
            oldPrice: r.old_price,
            newPrice: r.new_price,
            badge: r.badge,
            startDate: r.start_date,
            endDate: r.end_date,
            description: r.description,
            image: r.image,
            active: Boolean(r.is_active)
        }));
        return sendJson(res, promos);
    }

    if (pathname === '/api/promos' && req.method === 'POST') {
        try {
            const body = await parseRequestBody(req);
            const id = body.id || 'promo-' + Date.now();
            const insertStmt = db.prepare(`
                INSERT INTO promo_packs (id, title, old_price, new_price, badge, start_date, end_date, description, image, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
            insertStmt.run(
                id,
                body.title,
                body.oldPrice || null,
                body.newPrice,
                body.badge || 'PROMO',
                body.startDate || null,
                body.endDate || null,
                body.description || '',
                body.image || '',
                body.active !== false ? 1 : 0
            );
            return sendJson(res, { success: true, id }, 201);
        } catch (e) {
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/promos/') && req.method === 'PUT') {
        try {
            const id = pathname.split('/')[3];
            const body = await parseRequestBody(req);
            const updateStmt = db.prepare(`
                UPDATE promo_packs SET title = ?, old_price = ?, new_price = ?, badge = ?, start_date = ?, end_date = ?, description = ?, image = ?, is_active = ?
                WHERE id = ?
            `);
            updateStmt.run(
                body.title,
                body.oldPrice || null,
                body.newPrice,
                body.badge || 'PROMO',
                body.startDate || null,
                body.endDate || null,
                body.description || '',
                body.image || '',
                body.active !== false ? 1 : 0,
                id
            );
            return sendJson(res, { success: true });
        } catch (e) {
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/promos/') && req.method === 'DELETE') {
        const id = pathname.split('/')[3];
        db.prepare('DELETE FROM promo_packs WHERE id = ?').run(id);
        return sendJson(res, { success: true });
    }

    // ==========================================
    // API REST - GESTION DES COMMANDES CLIENTS
    // ==========================================
    if (pathname === '/api/orders' && req.method === 'GET') {
        const statusFilter = parsedUrl.searchParams.get('status');
        let query = 'SELECT * FROM orders ORDER BY id DESC';
        let params = [];
        if (statusFilter && statusFilter !== 'all') {
            query = 'SELECT * FROM orders WHERE status = ? ORDER BY id DESC';
            params = [statusFilter];
        }
        const rows = db.prepare(query).all(...params);
        const orders = rows.map(r => ({
            ...r,
            items: JSON.parse(r.items || '[]')
        }));
        return sendJson(res, orders);
    }

    if (pathname === '/api/orders' && req.method === 'POST') {
        try {
            const body = await parseRequestBody(req);
            
            // Génération numéro de commande format CS-Année-Numéro
            const lastOrder = db.prepare('SELECT id FROM orders ORDER BY id DESC LIMIT 1').get();
            const nextNum = (lastOrder ? lastOrder.id + 1 : 1).toString().padStart(4, '0');
            const orderNumber = `CS-${new Date().getFullYear()}-${nextNum}`;

            const insertStmt = db.prepare(`
                INSERT INTO orders (order_number, client_name, client_phone, client_address, order_type, items, total_price, order_notes, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Nouvelle')
            `);

            const result = insertStmt.run(
                orderNumber,
                body.clientName || 'Client Casa Sushi',
                body.clientPhone || '',
                body.clientAddress || 'Sur place / À emporter',
                body.orderType || 'Livraison',
                JSON.stringify(body.items || []),
                body.totalPrice || 0,
                body.orderNotes || ''
            );

            return sendJson(res, {
                success: true,
                orderId: result.lastInsertRowid,
                orderNumber: orderNumber,
                totalPrice: body.totalPrice
            }, 201);
        } catch (e) {
            console.error('Erreur insertion commande:', e);
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/orders/') && req.method === 'PATCH') {
        try {
            const id = pathname.split('/')[3];
            const body = await parseRequestBody(req);
            if (body.status) {
                db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(body.status, id);
            }
            return sendJson(res, { success: true });
        } catch (e) {
            return sendJson(res, { error: e.message }, 400);
        }
    }

    if (pathname.startsWith('/api/orders/') && req.method === 'DELETE') {
        const id = pathname.split('/')[3];
        db.prepare('DELETE FROM orders WHERE id = ?').run(id);
        return sendJson(res, { success: true });
    }

    // Statistiques globales
    if (pathname === '/api/stats' && req.method === 'GET') {
        const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
        const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'Nouvelle' OR status = 'En préparation'").get().count;
        const totalSales = db.prepare("SELECT SUM(total_price) as sum FROM orders WHERE status != 'Annulée'").get().sum || 0;
        const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
        const activePromos = db.prepare('SELECT COUNT(*) as count FROM promo_packs WHERE is_active = 1').get().count;

        return sendJson(res, {
            totalOrders,
            pendingOrders,
            totalSales,
            totalProducts,
            activePromos
        });
    }

    // Sécurité Admin PIN
    if (pathname === '/api/auth/login' && req.method === 'POST') {
        const body = await parseRequestBody(req);
        const pinRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_pin');
        const correctPin = pinRow ? pinRow.value : 'admin123';
        if (body.pin === correctPin) {
            return sendJson(res, { success: true, token: 'auth_' + Date.now() });
        } else {
            return sendJson(res, { success: false, message: 'Mot de passe incorrect' }, 401);
        }
    }

    if (pathname === '/api/auth/change-pin' && req.method === 'POST') {
        const body = await parseRequestBody(req);
        if (body.newPin && body.newPin.length >= 4) {
            db.prepare('UPDATE settings SET value = ? WHERE key = ?').run(body.newPin, 'admin_pin');
            return sendJson(res, { success: true });
        }
        return sendJson(res, { error: 'Code invalide (min 4 caractères)' }, 400);
    }

    // ==========================================
    // SERVEUR DE FICHIERS STATIQUES FRONTEND
    // ==========================================
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    const ext = path.extname(filePath).toLowerCase();

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Page Non Trouvée');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Erreur serveur: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🍣 ========================================================`);
    console.log(`🍣 CASA SUSHI SERVEUR & SQLITE ACTIF SUR : http://localhost:${PORT}`);
    console.log(`🍣 Base de données SQLite : ${DB_FILE}`);
    console.log(`🍣 Site Client : http://localhost:${PORT}/index.html`);
    console.log(`🍣 Panel Admin : http://localhost:${PORT}/admin.html`);
    console.log(`🍣 Menu PDF : http://localhost:${PORT}/menu-pdf.html`);
    console.log(`🍣 ========================================================`);
});
