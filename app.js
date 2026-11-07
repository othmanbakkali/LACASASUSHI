// ==========================================
// CASA SUSHI - BASE DE DONNÉES DU MENU
// Extrait fidèlement des 16 pages de la carte
// ==========================================

const MENU_CATEGORIES = [
    { id: 'tous', name: 'Tous les Plats', icon: 'fa-utensils' },
    { id: 'entrees', name: 'Entrées & Tapas', icon: 'fa-drumstick-bite' },
    { id: 'salades_soupes', name: 'Salades & Soupes', icon: 'fa-bowl-rice' },
    { id: 'makis_california', name: 'Makis & California', icon: 'fa-circle-dot' },
    { id: 'casa_rolls', name: 'Casa Rolls & Spéciaux', icon: 'fa-award' },
    { id: 'aromaki_style', name: 'Aromaki & New Style', icon: 'fa-gem' },
    { id: 'nigiri_gunkan_tataki', name: 'Nigiri, Gunkan & Tataki', icon: 'fa-fish-fins' },
    { id: 'frits_pizza', name: 'Sushi Frits & Pizzas', icon: 'fa-fire-flame-curved' },
    { id: 'bentos', name: 'Bentos Complets', icon: 'fa-box-open' },
    { id: 'plats_chauds', name: 'Plats Chauds & Woks', icon: 'fa-fire' },
    { id: 'brochettes_nouilles_riz', name: 'Yakitori, Nouilles & Riz', icon: 'fa-bowl-food' },
    { id: 'assortiments', name: 'Assortiments & Plateaux', icon: 'fa-layer-group' },
    { id: 'boissons_desserts', name: 'Desserts & Boissons', icon: 'fa-mug-hot' }
];

const MENU_ITEMS = [
    // ==========================================
    // PAGE 1: BOISSONS & DESSERTS
    // ==========================================
    {
        id: 'boi-1',
        name: 'Café Nespresso',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 20,
        pieces: '',
        description: 'Sélection de grands crus de café Nespresso intense et aromatique.',
        ingredients: ['Café Nespresso'],
        tags: ['Boisson Chaude'],
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'boi-2',
        name: 'Thé Jasmin',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 20,
        pieces: '',
        description: 'Thé vert traditionnel parfumé aux fleurs de jasmin.',
        ingredients: ['Thé vert', 'Fleurs de Jasmin'],
        tags: ['Boisson Chaude', 'Traditionnel'],
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'boi-3',
        name: 'Sodas (Coca-Cola, Sprite, Fanta...)',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 18,
        pieces: '33cl',
        description: 'Boisson gazeuse fraîche au choix (Coca-Cola, Zero, Sprite, Fanta...).',
        ingredients: ['Soda au choix'],
        tags: ['Boisson Fraîche'],
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'boi-4',
        name: 'Sidi Ali 50cl',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 14,
        pieces: '50cl',
        description: 'Eau minérale naturelle marocaine pure.',
        ingredients: ['Eau minérale'],
        tags: ['Eau'],
        image: 'https://images.unsplash.com/photo-1559839914-1b396e0a969f?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'boi-5',
        name: 'Sidi Ali 75cl',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 25,
        pieces: '75cl',
        description: 'Eau minérale naturelle bouteille grand format.',
        ingredients: ['Eau minérale'],
        tags: ['Eau'],
        image: 'https://images.unsplash.com/photo-1559839914-1b396e0a969f?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'boi-6',
        name: 'Jus de Citron Frais',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 25,
        pieces: '',
        description: 'Jus de citron pressé minute, ultra-rafraîchissant.',
        ingredients: ['Citron frais', 'Glaçons'],
        tags: ['Frais', 'Fait Maison'],
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'boi-7',
        name: 'Citron - Gingembre Frais',
        category: 'boissons_desserts',
        subcategory: 'Boissons',
        price: 35,
        pieces: '',
        description: 'Élixir énergisant au citron pressé et gingembre frais rapé.',
        ingredients: ['Citron frais', 'Gingembre frais', 'Menthe'],
        tags: ['Frais', 'Signature'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'des-1',
        name: 'Banoffee Pie',
        category: 'boissons_desserts',
        subcategory: 'Desserts',
        price: 35,
        pieces: '1 part',
        description: 'Tarte gourmande anglaise à la banane, confiture de lait caramel, crème fouettée et copeaux de chocolat.',
        ingredients: ['Banane', 'Caramel toffee', 'Crème fouettée', 'Biscuit spéculoos', 'Copeaux de chocolat'],
        tags: ['Gourmand', 'Coup de Cœur'],
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'des-2',
        name: 'Maki Nutella',
        category: 'boissons_desserts',
        subcategory: 'Desserts',
        price: 35,
        pieces: '6 pièces',
        description: 'Délicieux rouleaux de crêpe fine ou riz sucré nappés de Nutella fondant.',
        ingredients: ['Nutella', 'Crêpe fine', 'Éclats de noisettes'],
        tags: ['Chocolat', 'Enfants & Adultes'],
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'des-3',
        name: 'Coupe de Litchis',
        category: 'boissons_desserts',
        subcategory: 'Desserts',
        price: 30,
        pieces: '1 coupe',
        description: 'Litchis asiatiques doux et parfumés servis dans leur sirop frais.',
        ingredients: ['Litchis au sirop', 'Menthe fraîche'],
        tags: ['Frais', 'Léger'],
        image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=600&q=80',
        page: 1
    },
    {
        id: 'des-4',
        name: 'Fondant au Chocolat Coeur Coulant',
        category: 'boissons_desserts',
        subcategory: 'Desserts',
        price: 35,
        pieces: '1 pièce',
        description: 'Gâteau fondant pur chocolat noir avec son cœur chaud intensely coulant.',
        ingredients: ['Chocolat noir pur beurre de cacao', 'Sucre glace', 'Cœur coulant chocolat'],
        tags: ['Chaud', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
        page: 1
    },

    // ==========================================
    // PAGE 2: PHOTO MAKI, TEMAKI, CRUNCHY, TARTARE, SASHIMI
    // ==========================================
    {
        id: 'pm-1',
        name: 'Photo Maki Crabe',
        category: 'makis_california',
        subcategory: 'Photo Maki',
        price: 40,
        pieces: '5 pièces',
        description: 'Grand maki garni de chair de crabe, avocat onctueux, concombre croquant, crevette et mangue fraîche.',
        ingredients: ['Crabe', 'Avocat', 'Concombre', 'Crevette', 'Mangue'],
        tags: ['Frais', 'Photo Maki'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'pm-2',
        name: 'Photo Maki Saumon',
        category: 'makis_california',
        subcategory: 'Photo Maki',
        price: 30,
        pieces: '5 pièces',
        description: 'Maki généreux au saumon frais, surimi tendre, concombre et avocat.',
        ingredients: ['Saumon frais', 'Surimi', 'Concombre', 'Avocat'],
        tags: ['Classique', 'Photo Maki'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'pm-3',
        name: 'Photo Maki Thon',
        category: 'makis_california',
        subcategory: 'Photo Maki',
        price: 35,
        pieces: '5 pièces',
        description: 'Maki au thon rouge frais, avocat fondant, concombre, salade croquante et tobiko.',
        ingredients: ['Thon rouge', 'Avocat', 'Concombre', 'Salade', 'Tobiko'],
        tags: ['Thon', 'Photo Maki'],
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tem-1',
        name: 'Temaki Surimi',
        category: 'makis_california',
        subcategory: 'Temaki',
        price: 30,
        pieces: '1 cône',
        description: 'Cône d\'algue nori croustillante garni de riz vinaigré, surimi et légumes frais.',
        ingredients: ['Surimi', 'Riz', 'Nori', 'Avocat', 'Concombre'],
        tags: ['Temaki'],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tem-2',
        name: 'Temaki Saumon',
        category: 'makis_california',
        subcategory: 'Temaki',
        price: 35,
        pieces: '1 cône',
        description: 'Cône nori garni de généreux dés de saumon frais, avocat et sésame.',
        ingredients: ['Saumon', 'Avocat', 'Riz vinaigré', 'Nori'],
        tags: ['Saumon', 'Temaki'],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tem-3',
        name: 'Temaki Crabe',
        category: 'makis_california',
        subcategory: 'Temaki',
        price: 40,
        pieces: '1 cône',
        description: 'Cône nori au crabe tendre, avocat et concombre.',
        ingredients: ['Chair de crabe', 'Avocat', 'Concombre', 'Nori'],
        tags: ['Temaki'],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tem-4',
        name: 'Temaki Thon',
        category: 'makis_california',
        subcategory: 'Temaki',
        price: 35,
        pieces: '1 cône',
        description: 'Cône nori au thon rouge frais taillé au couteau et avocat.',
        ingredients: ['Thon frais', 'Avocat', 'Riz vinaigré', 'Nori'],
        tags: ['Thon', 'Temaki'],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tem-5',
        name: 'Temaki Mixte',
        category: 'makis_california',
        subcategory: 'Temaki',
        price: 45,
        pieces: '1 cône',
        description: 'Le cône ultime combinant saumon, thon, crabe, crevette, avocat et tobiko.',
        ingredients: ['Saumon', 'Thon', 'Crevette', 'Crabe', 'Avocat', 'Tobiko'],
        tags: ['Mixte', 'Signature'],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'cru-1',
        name: 'Crunchy Surimi',
        category: 'makis_california',
        subcategory: 'Crunchy',
        price: 25,
        pieces: '4 pièces',
        description: 'Rouleau croustillant au surimi pané, fromage cheese fondant, tanouké et shishimi.',
        ingredients: ['Surimi pané', 'Cheese', 'Tanouké croustillant', 'Shishimi'],
        tags: ['Croustillant', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'cru-2',
        name: 'Crunchy Crevette',
        category: 'makis_california',
        subcategory: 'Crunchy',
        price: 40,
        pieces: '4 pièces',
        description: 'Double crevette panée croustillante, cream cheese doux, tanouké et épices shishimi.',
        ingredients: ['Double crevette panée', 'Cheese', 'Tanouké', 'Shishimi'],
        tags: ['Crevette Panée', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'cru-3',
        name: 'Crunchy Crabe',
        category: 'makis_california',
        subcategory: 'Crunchy',
        price: 40,
        pieces: '4 pièces',
        description: 'Crabe, avocat fondant, cream cheese, tanouké et pointe de shishimi.',
        ingredients: ['Crabe', 'Avocat', 'Cheese', 'Tanouké', 'Shishimi'],
        tags: ['Crabe', 'Croustillant'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tar-1',
        name: 'Tartare Saumon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Tartare',
        price: 60,
        pieces: '1 portion',
        description: 'Tartare de saumon frais assaisonné à la ciboulette, sésame et sauce maison sur lit d\'avocat.',
        ingredients: ['Saumon frais', 'Avocat', 'Huile de sésame', 'Ciboulette'],
        tags: ['Frais', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tar-2',
        name: 'Tartare Thon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Tartare',
        price: 65,
        pieces: '1 portion',
        description: 'Tartare de thon rouge frais mariné, épices japonaises et avocat en dés.',
        ingredients: ['Thon rouge frais', 'Avocat', 'Sauce soja japonaise', 'Épices'],
        tags: ['Thon', 'Frais'],
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'tar-3',
        name: 'Tartare Fruits Exotique',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Tartare',
        price: 60,
        pieces: '1 portion',
        description: 'Alliance subtile de saumon frais, avocat crémeux et cubes de mangue mûre.',
        ingredients: ['Saumon frais', 'Avocat', 'Mangue fraîche', 'Vinaigrette yuzu'],
        tags: ['Exotique', 'Fruité'],
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'sas-1',
        name: 'Sashimi Saumon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Sashimi',
        price: 50,
        pieces: '5 pièces',
        description: 'Tranches épaisses de saumon de Norvège extra-frais taillées avec précision.',
        ingredients: ['Saumon frais pure découpe'],
        tags: ['Sans Gluten', 'Frais'],
        image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'sas-2',
        name: 'Sashimi Thon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Sashimi',
        price: 55,
        pieces: '5 pièces',
        description: 'Tranches fines de thon rouge qualité sashimi.',
        ingredients: ['Thon rouge extra-frais'],
        tags: ['Thon', 'Frais'],
        image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
        page: 2
    },
    {
        id: 'sas-3',
        name: 'Sashimi Saint Jacques',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Sashimi',
        price: 60,
        pieces: '5 pièces',
        description: 'Noix de Saint-Jacques fraîches finement émincées d\'une grande délicatesse.',
        ingredients: ['Noix de Saint-Jacques'],
        tags: ['Prestige', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
        page: 2
    },

    // ==========================================
    // PAGE 3: SALADES & SOUPES
    // ==========================================
    {
        id: 'sal-1',
        name: 'Salade de Choux',
        category: 'salades_soupes',
        subcategory: 'Salades',
        price: 20,
        pieces: '1 bol',
        description: 'Choux blanc mariné croquant, carottes râpées, salade verte et concombre.',
        ingredients: ['Choux blanc', 'Carottes', 'Salade verte', 'Concombre', 'Vinaigrette sésame'],
        tags: ['Végétarien', 'Frais'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'sal-2',
        name: 'Salade Goma Wakame',
        category: 'salades_soupes',
        subcategory: 'Salades',
        price: 60,
        pieces: '1 bol',
        description: 'Algues goma wakame assaisonnées au sésame, surimi, dés de saumon frais et chair de crabe.',
        ingredients: ['Goma Wakame', 'Surimi', 'Sésame', 'Saumon', 'Chair de crabe'],
        tags: ['Wakame', 'Signature'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'sal-3',
        name: 'Salade Vietnamienne',
        category: 'salades_soupes',
        subcategory: 'Salades',
        price: 35,
        pieces: '1 bol',
        description: 'Émincé de poulet, chou blanc, carottes croquantes, surimi et cacahuètes grillées concassées.',
        ingredients: ['Poulet', 'Choux blanc', 'Carottes', 'Surimi', 'Arachides'],
        tags: ['Poulet', 'Croquant'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'sal-4',
        name: 'Salade Exotique',
        category: 'salades_soupes',
        subcategory: 'Salades',
        price: 60,
        pieces: '1 bol',
        description: 'Crevettes fraîches, avocat fondant, ananas sucré, dés de mangue, concombre et carottes.',
        ingredients: ['Crevettes', 'Mangue', 'Ananas', 'Avocat', 'Concombre', 'Carottes'],
        tags: ['Exotique', 'Crevettes'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'sal-5',
        name: 'Salade Tori',
        category: 'salades_soupes',
        subcategory: 'Salades',
        price: 40,
        pieces: '1 bol',
        description: 'Filets de poulet tendre, concombre, carottes, wakame, avocat onctueux et tomates cerises.',
        ingredients: ['Poulet', 'Concombre', 'Carotte', 'Wakame', 'Avocat', 'Tomate cerise'],
        tags: ['Poulet', 'Complet'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'sal-6',
        name: 'Salade Royale',
        category: 'salades_soupes',
        subcategory: 'Salades',
        price: 75,
        pieces: '1 bol',
        description: 'Noix de Saint-Jacques poêlées, crevettes royales, anneaux de calamar, saumon fumé, salade et tomates.',
        ingredients: ['Saint-Jacques', 'Crevettes', 'Calamar', 'Saumon fumé', 'Salade verte', 'Concombre', 'Tomate cerise'],
        tags: ['Prestige', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-1',
        name: 'Soupe Miso',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 20,
        pieces: '1 bol',
        description: 'Bouillon traditionnel japonais à la pâte miso avec dés de tofu soyeux et ciboule.',
        ingredients: ['Pâte miso japonaise', 'Tofu soyeux', 'Algues wakamé', 'Ciboulette'],
        tags: ['Chaud', 'Végétarien', 'Traditionnel'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-2',
        name: 'Soupe Udon Crevettes',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 45,
        pieces: '1 bol',
        description: 'Grosses nouilles Udon artisanales, crevettes, gingembre frais, champignons noirs et bouillon onctueux au lait de coco.',
        ingredients: ['Nouilles Udon', 'Crevettes', 'Lait de coco', 'Gingembre frais', 'Champignons noirs'],
        tags: ['Chaud', 'Lait de Coco', 'Coup de Cœur'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-3',
        name: 'Soupe Fruits de Mer',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 40,
        pieces: '1 bol',
        description: 'Bouillon parfumé garni de crevettes, calamars, vermicelles transparents et champignons noirs.',
        ingredients: ['Crevettes', 'Calamar', 'Vermicelle', 'Champignons noirs', 'Carottes'],
        tags: ['Chaud', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-4',
        name: 'Soupe Royale',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 50,
        pieces: '1 bol',
        description: 'Recette riche en crevettes, calamars, vermicelles, champignons noirs et gingembre frais.',
        ingredients: ['Crevettes', 'Calamar', 'Vermicelle', 'Champignons noirs', 'Gingembre frais'],
        tags: ['Chaud', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-5',
        name: 'Soupe Poulet Curry & Gingembre',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 35,
        pieces: '1 bol',
        description: 'Poulet émincé, carottes, chou blanc, courgettes, vermicelles, pointe de curry indien, ail et gingembre.',
        ingredients: ['Poulet', 'Carottes', 'Chou blanc', 'Courgettes', 'Vermicelle', 'Curry indien', 'Gingembre', 'Ail'],
        tags: ['Chaud', 'Poulet', 'Épicé Doux'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-6',
        name: 'Soupe Pékinoise',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 40,
        pieces: '1 bol',
        description: 'Soupe aigre-douce pékinoise au poulet, crevettes, filandres d\'oeuf, champignons de Paris, shiitake et pousses de bambou.',
        ingredients: ['Poulet', 'Crevette', 'Oeuf', 'Champignons Paris', 'Champignons Shiitake', 'Bambou'],
        tags: ['Chaud', 'Pékinoise'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-7',
        name: 'Soupe Yaki',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 50,
        pieces: '1 bol',
        description: 'Bouillon copieux au bœuf émincé, brocolis, nouilles, champignons noirs et œufs de caille.',
        ingredients: ['Bœuf', 'Brocoli', 'Nouilles', 'Champignons noirs', 'Œufs de caille'],
        tags: ['Chaud', 'Boeuf', 'Généreux'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 3
    },
    {
        id: 'soup-8',
        name: 'Soupe Légumes',
        category: 'salades_soupes',
        subcategory: 'Soupes',
        price: 30,
        pieces: '1 bol',
        description: 'Bouillon réconfortant mijoté aux légumes frais du marché de saison.',
        ingredients: ['Sélection de légumes du marché', 'Bouillon de légumes'],
        tags: ['Chaud', 'Végétarien', 'Léger'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 3
    },

    // ==========================================
    // PAGE 4: ENTRÉES, TAPAS ASIATIQUES, KHA NOM LEE, CHIRACHI
    // ==========================================
    {
        id: 'ent-1',
        name: 'Nems au Poulet',
        category: 'entrees',
        subcategory: 'Nems',
        price: 35,
        pieces: '2 pièces',
        description: 'Nems croustillants dorés farcis au poulet tendre, légumes et champignons.',
        ingredients: ['Poulet', 'Carottes', 'Vermicelles', 'Champignons noirs'],
        tags: ['Chaud', 'Croustillant'],
        image: 'https://images.unsplash.com/photo-1548865181-7f8e3c54aa2f?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-2',
        name: 'Nems aux Crevettes',
        category: 'entrees',
        subcategory: 'Nems',
        price: 45,
        pieces: '2 pièces',
        description: 'Nems croustillants aux crevettes parfumées.',
        ingredients: ['Crevettes', 'Légumes', 'Feuille de riz dorée'],
        tags: ['Chaud', 'Crevettes'],
        image: 'https://images.unsplash.com/photo-1548865181-7f8e3c54aa2f?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-3',
        name: 'Nems au Fromage',
        category: 'entrees',
        subcategory: 'Nems',
        price: 40,
        pieces: '2 pièces',
        description: 'Nems au fromage coulant et fondant sous une enveloppe dorée croustillante.',
        ingredients: ['Fromage fondant', 'Pâte à nem'],
        tags: ['Chaud', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1548865181-7f8e3c54aa2f?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-4',
        name: 'Nems aux Légumes',
        category: 'entrees',
        subcategory: 'Nems',
        price: 20,
        pieces: '2 pièces',
        description: 'Nems 100% végétariens aux carottes, chou et champignons noirs.',
        ingredients: ['Légumes de saison', 'Vermicelles de soja'],
        tags: ['Chaud', 'Végétarien'],
        image: 'https://images.unsplash.com/photo-1548865181-7f8e3c54aa2f?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-5',
        name: 'Croquettes au Fromage',
        category: 'entrees',
        subcategory: 'Entrées Chaudes',
        price: 40,
        pieces: '4 pièces',
        description: 'Bouchées panées croustillantes garnies d\'un cœur coulant de fromage fondu.',
        ingredients: ['Fromage coulant', 'Chapelure japonaise panko'],
        tags: ['Chaud', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-6',
        name: 'Poh Pia Sod (Rouleaux de Printemps)',
        category: 'entrees',
        subcategory: 'Entrées Fraîches',
        price: 25,
        pieces: '3 pièces',
        description: 'Rouleaux de printemps ultra-frais au surimi, salade croquante, menthe et vermicelles.',
        ingredients: ['Surimi', 'Galette de riz', 'Salade', 'Herbes fraîches', 'Vermicelles'],
        tags: ['Frais', 'Léger'],
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-7',
        name: 'Chicken Fry',
        category: 'entrees',
        subcategory: 'Entrées Chaudes',
        price: 45,
        pieces: '8 pièces',
        description: 'Morceaux de poulet tendres marinés et frits à la chapelure japonaise croustillante.',
        ingredients: ['Filet de poulet mariné', 'Panure croustillante'],
        tags: ['Chaud', 'Poulet'],
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-8',
        name: 'Crevettes Panées',
        category: 'entrees',
        subcategory: 'Entrées Chaudes',
        price: 70,
        pieces: '8 pièces',
        description: 'Belles crevettes entières enrobées d\'une panure dorée et croustillante servies avec sauce aigre-douce.',
        ingredients: ['Crevettes royales', 'Chapelure Panko'],
        tags: ['Chaud', 'Crevettes', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'ent-9',
        name: 'Bœuf Fromage Pané',
        category: 'entrees',
        subcategory: 'Entrées Chaudes',
        price: 45,
        pieces: '4 pièces',
        description: 'Fines tranches de bœuf enroulées autour d\'un cœur de fromage fondant puis panées et dorées.',
        ingredients: ['Émincé de bœuf', 'Fromage coulant', 'Panure panko'],
        tags: ['Chaud', 'Boeuf', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'tap-1',
        name: 'Tapas Asiatique (1 Personne)',
        category: 'entrees',
        subcategory: 'Plateaux Tapas',
        price: 75,
        pieces: '7 pièces',
        description: 'Assortiment complet : 3 Nems mixtes, 2 Croquettes au fromage fondantes et 2 Chicken fry croustillants.',
        ingredients: ['3 Nems mixtes', '2 Croquettes fromage', '2 Chicken fry'],
        tags: ['Plateau Dégustation', 'Chaud'],
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'tap-2',
        name: 'Tapas Asiatique (2 Personnes)',
        category: 'entrees',
        subcategory: 'Plateaux Tapas',
        price: 120,
        pieces: '9 pièces',
        description: 'Grand plateau à partager : 2 Nems mixtes, 2 Croquettes au fromage, 2 Beignets de crevettes, 1 Bœuf fromage pané et 2 Rouleaux de printemps.',
        ingredients: ['2 Nems mixtes', '2 Croquettes fromage', '2 Beignets crevettes', '1 Bœuf fromage pané', '2 Rouleaux de printemps'],
        tags: ['À Partager', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'dim-1',
        name: 'Kha Nom Lee Kai (Vapeurs Poulet & Champignons)',
        category: 'entrees',
        subcategory: 'Dim Sum Vapeur',
        price: 50,
        pieces: '5 pièces',
        description: 'Raviolis vapeur traditionnels farcis au poulet haché fin et champignons parfumés.',
        ingredients: ['Poulet', 'Champignons', 'Pâte à ravioli vapeur'],
        tags: ['Vapeur', 'Léger'],
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'dim-2',
        name: 'Kha Nom Lee Kung (Vapeurs Crevettes)',
        category: 'entrees',
        subcategory: 'Dim Sum Vapeur',
        price: 55,
        pieces: '5 pièces',
        description: 'Bouchées vapeur translucides garnies de crevettes fraîches hachées.',
        ingredients: ['Crevettes fraîches', 'Assaisonnement asiatique'],
        tags: ['Vapeur', 'Crevettes'],
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'chi-1',
        name: 'Chirachi Saumon',
        category: 'entrees',
        subcategory: 'Chirachi',
        price: 50,
        pieces: '1 grand bol',
        description: 'Grand bol de riz vinaigré tiède recouvert d\'un généreux carpaccio de saumon frais et graines de sésame.',
        ingredients: ['Saumon frais', 'Riz vinaigré', 'Sésame', 'Nori'],
        tags: ['Chirachi', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'chi-2',
        name: 'Chirachi Saumon Avocat',
        category: 'entrees',
        subcategory: 'Chirachi',
        price: 55,
        pieces: '1 grand bol',
        description: 'Bol de riz vinaigré surmonté de tranches de saumon frais et lamelles d\'avocat mûr.',
        ingredients: ['Saumon frais', 'Avocat', 'Riz vinaigré', 'Sésame'],
        tags: ['Chirachi', 'Avocat'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 4
    },
    {
        id: 'chi-3',
        name: 'Chirachi Thon',
        category: 'entrees',
        subcategory: 'Chirachi',
        price: 50,
        pieces: '1 grand bol',
        description: 'Bol de riz vinaigré garni de belles tranches de thon rouge frais.',
        ingredients: ['Thon rouge', 'Riz vinaigré', 'Sésame'],
        tags: ['Chirachi', 'Thon'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 4
    },

    // ==========================================
    // PAGE 5: BENTOS (AVEC BOISSON OFFERTE)
    // ==========================================
    {
        id: 'bento-a',
        name: 'Bento A (Boisson Offerte)',
        category: 'bentos',
        subcategory: 'Bentos',
        price: 159,
        pieces: 'Menu Complet',
        description: 'Menu Bento complet comprenant : Salade de thon (mangue, avocat), Chicken fry croustillant, Nems aux crevettes, Riz végétarien et brocolis sautés. Canette de soda offerte.',
        ingredients: ['Salade thon mangue avocat', 'Chicken fry', 'Nems crevettes', 'Riz végétarien', 'Brocoli', 'Boisson offerte'],
        tags: ['Menu Complet', 'Boisson Offerte', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
        page: 5
    },
    {
        id: 'bento-b',
        name: 'Bento B (Boisson Offerte)',
        category: 'bentos',
        subcategory: 'Bentos',
        price: 180,
        pieces: 'Menu Complet',
        description: 'Menu Bento prestige : Aromaki saumon, Légumes sautés au wok, Salade exotique rafraîchissante, Tataki saumon mi-cuit et Riz nature parfumé. Canette de soda offerte.',
        ingredients: ['Aromaki saumon', 'Légumes sautés', 'Salade exotique', 'Tataki saumon', 'Riz nature', 'Boisson offerte'],
        tags: ['Menu Complet', 'Boisson Offerte', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
        page: 5
    },
    {
        id: 'bento-c',
        name: 'Bento C (Boisson Offerte)',
        category: 'bentos',
        subcategory: 'Bentos',
        price: 160,
        pieces: 'Menu Complet',
        description: 'Menu Bento fusion : Riz cantonais mixte sauté, Nems poulet dorés, California crème cheese et Salade tako savoureuse. Canette de soda offerte.',
        ingredients: ['Riz cantonais mixte', 'Nems poulet', 'California crème cheese', 'Salade tako', 'Boisson offerte'],
        tags: ['Menu Complet', 'Boisson Offerte'],
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
        page: 5
    },

    // ==========================================
    // PAGE 6: CALIFORNIA CLASSIQUES & MAKIS
    // ==========================================
    {
        id: 'cal-1',
        name: 'Classic Masago',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 25,
        pieces: '4 pièces',
        description: 'California roll au surimi et avocat enrobé d’œufs de masago croquants.',
        ingredients: ['Surimi', 'Avocat', 'Masago'],
        tags: ['California'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-2',
        name: 'Crème Cheese',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 30,
        pieces: '4 pièces',
        description: 'Saumon frais fondant, avocat, surimi et cream cheese onctueux.',
        ingredients: ['Saumon', 'Avocat', 'Surimi', 'Cheese'],
        tags: ['Cheese', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-3',
        name: 'Sésame Saumon Avocat',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 30,
        pieces: '4 pièces',
        description: 'Rouleau saumon frais et avocat recouvert de graines de sésame blanc et noir grillées.',
        ingredients: ['Saumon', 'Avocat', 'Graines de sésame'],
        tags: ['Classique'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-4',
        name: 'Ebi Fry',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 30,
        pieces: '4 pièces',
        description: 'Crevette panée croquante, ciboulette fraîche et tranches d\'avocat.',
        ingredients: ['Ebi pané', 'Ciboulette', 'Avocat'],
        tags: ['Crevette Panée'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-5',
        name: 'Tobiko Green',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 30,
        pieces: '4 pièces',
        description: 'Saumon, surimi et fromage cheese recouvert de tobiko vert au wasabi doux.',
        ingredients: ['Saumon', 'Surimi', 'Tobiko vert', 'Cheese'],
        tags: ['Tobiko'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-6',
        name: 'Shaki Yaki',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 20,
        pieces: '4 pièces',
        description: 'Saumon cuit savoureux, mayonnaise japonaise, tobiko orange et avocat.',
        ingredients: ['Saumon cuit', 'Mayonnaise japonaise', 'Tobiko orange', 'Avocat'],
        tags: ['Cuit'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-7',
        name: 'Shichimi',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 30,
        pieces: '4 pièces',
        description: 'Saumon frais et avocat relevés d\'un enrobage d\'épices japonaises shichimi togarashi.',
        ingredients: ['Saumon', 'Avocat', 'Épices Shichimi'],
        tags: ['Spicy'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-8',
        name: 'Thon Tobiko',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 30,
        pieces: '4 pièces',
        description: 'Thon rouge taillé, avocat et enrobage complet d\'œufs de tobiko.',
        ingredients: ['Thon', 'Avocat', 'Tobiko'],
        tags: ['Thon'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'cal-9',
        name: 'Ebi Tobiko',
        category: 'makis_california',
        subcategory: 'California Classiques',
        price: 25,
        pieces: '4 pièces',
        description: 'Crevette ebi, fromage doux, tobiko et avocat.',
        ingredients: ['Cheese', 'Tobiko', 'Ebi', 'Avocat'],
        tags: ['Crevettes'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-1',
        name: 'Maki Concombre',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 15,
        pieces: '6 pièces',
        description: 'Maki végétarien traditionnel au concombre frais et croquant.',
        ingredients: ['Concombre', 'Riz', 'Algue Nori'],
        tags: ['Végétarien'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-2',
        name: 'Maki Surimi',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 20,
        pieces: '6 pièces',
        description: 'Maki classique roulé au surimi.',
        ingredients: ['Surimi', 'Riz', 'Nori'],
        tags: ['Classique'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-3',
        name: 'Maki Avocat',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 20,
        pieces: '6 pièces',
        description: 'Maki onctueux à l\'avocat mûr à point.',
        ingredients: ['Avocat', 'Riz', 'Nori'],
        tags: ['Végétarien'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-4',
        name: 'Maki Saumon Avocat',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 30,
        pieces: '6 pièces',
        description: 'Le grand favori alliant le fondant du saumon frais et la douceur de l\'avocat.',
        ingredients: ['Saumon', 'Avocat', 'Riz', 'Nori'],
        tags: ['Best-Seller'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-5',
        name: 'Maki Crevette',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 25,
        pieces: '6 pièces',
        description: 'Maki aux morceaux de crevette tendre.',
        ingredients: ['Crevette', 'Riz', 'Nori'],
        tags: ['Crevettes'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-6',
        name: 'Maki Saumon',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 25,
        pieces: '6 pièces',
        description: 'Maki pur saumon frais de Norvège.',
        ingredients: ['Saumon', 'Riz', 'Nori'],
        tags: ['Saumon'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-7',
        name: 'Maki Saumon Cheese',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 25,
        pieces: '6 pièces',
        description: 'Saumon frais marié au cream cheese fondant.',
        ingredients: ['Saumon', 'Cream Cheese', 'Riz', 'Nori'],
        tags: ['Cheese'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },
    {
        id: 'mak-8',
        name: 'Maki Thon',
        category: 'makis_california',
        subcategory: 'Makis Classiques',
        price: 30,
        pieces: '6 pièces',
        description: 'Maki au cœur de thon rouge frais.',
        ingredients: ['Thon', 'Riz', 'Nori'],
        tags: ['Thon'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 6
    },

    // ==========================================
    // PAGE 7: ASSORTIMENTS
    // ==========================================
    {
        id: 'ass-1',
        name: 'Assortiment 10 pcs Sushi Saumon',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 90,
        pieces: '10 pièces',
        description: '10 délicieux Nigiri Sushi au saumon frais de Norvège.',
        ingredients: ['10 Sushi Saumon'],
        tags: ['100% Saumon', 'Classique'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-2',
        name: 'Assortiment 10 pcs Mixte',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 95,
        pieces: '10 pièces',
        description: 'Équilibre parfait : 5 Sushi Saumon et 5 Sushi Thon rouge frais.',
        ingredients: ['5 Sushi Saumon', '5 Sushi Thon'],
        tags: ['Mixte', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-3',
        name: 'Assortiment 12 pcs Sushi & California',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 95,
        pieces: '12 pièces',
        description: 'Composition variée : Sushi Saumon, Sushi Ebi, Ebi Tobiko et California Crème cheese.',
        ingredients: ['Sushi Saumon', 'Sushi Ebi', 'Ebi Tobiko', 'Crème Cheese'],
        tags: ['Varié'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-4',
        name: 'Assortiment 24 pcs Mixte Frit & Croustillant',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 150,
        pieces: '24 pièces',
        description: 'Plateau gourmand croustillant : Crunchy, Fry Ebi Fry et Dragon Eye.',
        ingredients: ['Crunchy', 'Fry Ebi Fry', 'Dragon Eye'],
        tags: ['Croustillant', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-5',
        name: 'Assortiment 14 pcs Saumon & Cheese',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 90,
        pieces: '14 pièces',
        description: 'Maki Saumon, California Crème Cheese et Rolls Norvégien.',
        ingredients: ['Maki Saumon', 'Crème cheese', 'Norvégien'],
        tags: ['Cheese', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-6',
        name: 'Assortiment 18 pcs Rolls & Fry',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 140,
        pieces: '18 pièces',
        description: 'Aromaki Saumon, Shaki Roll et Fry Ebi Fry.',
        ingredients: ['Aromaki Saumon', 'Shaki Roll', 'Fry Ebi Fry'],
        tags: ['Généreux'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-7',
        name: 'Assortiment 17 pcs Signature Casa',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 199,
        pieces: '17 pièces',
        description: 'Sélection des rolls d\'exception : Texas, Norvégien, Triangle et Anaconda.',
        ingredients: ['Texas', 'Norvégien', 'Triangle', 'Anaconda'],
        tags: ['Signature', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },
    {
        id: 'ass-8',
        name: 'Assortiment 26 pcs Grand Mix',
        category: 'assortiments',
        subcategory: 'Assortiments',
        price: 150,
        pieces: '26 pièces',
        description: 'Pizza Sushi, Maki Crevettes Panées, California Ebi, Tobiko et Crunchy.',
        ingredients: ['Pizza Sushi', 'Maki Crevettes panées', 'California Ebi', 'Tobiko', 'Crunchy'],
        tags: ['À Partager', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 7
    },

    // ==========================================
    // PAGE 8: AROMAKI & NEW STYLE CASA SUSHI
    // ==========================================
    {
        id: 'aro-1',
        name: 'Aromaki Crevette',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 45,
        pieces: '6 pièces',
        description: 'Feuille de riz transparente parfumée, crevette, avocat, cream cheese, surimi et tobiko.',
        ingredients: ['Crevette', 'Avocat', 'Cheese', 'Surimi', 'Tobiko'],
        tags: ['Aromaki', 'Crevette'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'aro-2',
        name: 'Aromaki Saumon',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 50,
        pieces: '6 pièces',
        description: 'Rouleau aromatique au saumon frais, avocat, surimi, cheese et tobiko.',
        ingredients: ['Saumon', 'Avocat', 'Surimi', 'Cheese', 'Tobiko'],
        tags: ['Aromaki', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'aro-3',
        name: 'Aromaki Virginia',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 55,
        pieces: '6 pièces',
        description: 'Saumon fumé parfumé, avocat, chair de crabe et surimi pané croustillant.',
        ingredients: ['Saumon fumé', 'Avocat', 'Crabe', 'Surimi pané'],
        tags: ['Fumé', 'Crabe'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'aro-4',
        name: 'Aromaki Tahiti',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 50,
        pieces: '6 pièces',
        description: 'Saumon pané, avocat fondant, cream cheese, tobiko et surimi.',
        ingredients: ['Saumon pané', 'Avocat', 'Cheese', 'Tobiko', 'Surimi'],
        tags: ['Saumon Pané'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'aro-5',
        name: 'Aromaki Ibiza',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 50,
        pieces: '6 pièces',
        description: 'Fraîcheur des îles : saumon frais, surimi, mangue sucrée, cheese et tobiko.',
        ingredients: ['Saumon', 'Surimi', 'Mangue', 'Cheese', 'Tobiko'],
        tags: ['Exotique', 'Mangue'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'aro-6',
        name: 'Aromaki Thon',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 50,
        pieces: '6 pièces',
        description: 'Salade verte croquante, thon frais, avocat et sauce chili douce.',
        ingredients: ['Salade', 'Thon', 'Avocat', 'Sauce chili'],
        tags: ['Thon', 'Spicy Doux'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'aro-7',
        name: 'Aromaki Crabe',
        category: 'aromaki_style',
        subcategory: 'Aromaki',
        price: 55,
        pieces: '6 pièces',
        description: 'Crabe délicat, concombre, surimi et avocat crémeux.',
        ingredients: ['Crabe', 'Concombre', 'Surimi', 'Avocat'],
        tags: ['Crabe', 'Frais'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'new-1',
        name: 'Thon Style Casa Sushi',
        category: 'aromaki_style',
        subcategory: 'New Style Casa Sushi',
        price: 50,
        pieces: '4 pièces',
        description: 'Création haute couture au thon rouge mariné, avocat et crabe.',
        ingredients: ['Thon', 'Avocat', 'Crabe'],
        tags: ['Signature', 'New Style'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'new-2',
        name: 'Saumon Style Casa Sushi',
        category: 'aromaki_style',
        subcategory: 'New Style Casa Sushi',
        price: 50,
        pieces: '4 pièces',
        description: 'Saumon frais nappé, cream cheese, feuilles de roquette poivrée et avocat.',
        ingredients: ['Saumon', 'Cheese', 'Roquette', 'Avocat'],
        tags: ['Signature', 'Roquette'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 8
    },
    {
        id: 'new-3',
        name: 'De Luxe Casa Sushi',
        category: 'aromaki_style',
        subcategory: 'New Style Casa Sushi',
        price: 55,
        pieces: '4 pièces',
        description: 'Saumon fumé noble, surimi, avocat, crabe et fromage fondant.',
        ingredients: ['Saumon fumé', 'Surimi', 'Avocat', 'Crabe', 'Cheese'],
        tags: ['Signature', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 8
    },

    // ==========================================
    // PAGE 9: CASA ROLLS & SUSHI CHEESE
    // ==========================================
    {
        id: 'cas-1',
        name: 'Roll Norvégien',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 40,
        pieces: '4 pièces',
        description: 'Saumon frais enveloppant, surimi, avocat et cream cheese.',
        ingredients: ['Saumon', 'Surimi', 'Avocat', 'Cheese'],
        tags: ['Best-Seller'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-2',
        name: 'Roll Anaconda',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 45,
        pieces: '4 pièces',
        description: 'Crevettes panées croustillantes, avocat, surimi, cheese et nappe d\'ebi.',
        ingredients: ['Crevettes panées', 'Avocat', 'Surimi', 'Cheese', 'Ebi'],
        tags: ['Best-Seller', 'Crevette Panée'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-3',
        name: 'Roll Barcelone',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 45,
        pieces: '4 pièces',
        description: 'Crevette, surimi pané, saumon flashy snacké, avocat et fromage doux.',
        ingredients: ['Crevette', 'Surimi pané', 'Saumon flashy', 'Avocat', 'Cheese'],
        tags: ['Saumon Flashy'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-4',
        name: 'Special Z',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 55,
        pieces: '4 pièces',
        description: 'Crabe, concombre, surimi, avocat et mangue enrobé d\'avocat.',
        ingredients: ['Crabe', 'Concombre', 'Surimi', 'Avocat', 'Mangue'],
        tags: ['Exotique', 'Avocat'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-5',
        name: 'Roll Texas',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 45,
        pieces: '4 pièces',
        description: 'Unagi (anguille) panée dorée, cheese fondant, surimi pané et mangue sucrée.',
        ingredients: ['Unagi pané', 'Cheese', 'Surimi pané', 'Mangue'],
        tags: ['Unagi', 'Gourmand'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-6',
        name: 'Roll Okinawa',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 50,
        pieces: '4 pièces',
        description: 'Saumon frais, cheese fondant, sauce chili et sauce créma maison flambée.',
        ingredients: ['Saumon frais', 'Cheese', 'Sauce chili', 'Sauce créma'],
        tags: ['Flambé', 'Créma'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-7',
        name: 'Roll Supreme',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 60,
        pieces: '4 pièces',
        description: 'Salade verte, thon rouge frais, avocat, saumon et sauce chili relevée.',
        ingredients: ['Salade', 'Thon', 'Avocat', 'Saumon', 'Sauce chili'],
        tags: ['Thon & Saumon', 'Spicy'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-8',
        name: 'Roll Rainbow',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 50,
        pieces: '4 pièces',
        description: 'L\'arc-en-ciel de poissons : crabe, avocat, ebi, cheese recouvert de tranches alternées de saumon et thon.',
        ingredients: ['Crabe', 'Avocat', 'Ebi', 'Cheese', 'Saumon', 'Thon'],
        tags: ['Multicolore', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-9',
        name: 'Roll Maguro',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 55,
        pieces: '4 pièces',
        description: 'Crabe, crevette panée croustillante, avocat, thon frais et sauce chili.',
        ingredients: ['Crabe', 'Crevette panée', 'Avocat', 'Thon', 'Sauce chili'],
        tags: ['Thon', 'Crevette Panée'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-10',
        name: 'Shaki Roll',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 55,
        pieces: '4 pièces',
        description: 'Crabe, avocat mûr, saumon frais et surimi.',
        ingredients: ['Crabe', 'Avocat', 'Saumon', 'Surimi'],
        tags: ['Classique Casa'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-11',
        name: 'Roll Triangle',
        category: 'casa_rolls',
        subcategory: 'Casa Rolls',
        price: 65,
        pieces: '4 pièces',
        description: 'Forme pyramidale originale : crevette panée, crabe, avocat, surimi, cheese, saumon frais et tobiko.',
        ingredients: ['Crevette panée', 'Crabe', 'Avocat', 'Surimi', 'Cheese', 'Saumon', 'Tobiko'],
        tags: ['Signature', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 9
    },
    {
        id: 'cas-12',
        name: 'Sushi Cheese Chaud Gratiné',
        category: 'casa_rolls',
        subcategory: 'Sushi Cheese',
        price: 85,
        pieces: '1 grand plat',
        description: 'Plat signature chaud : Avocat, Saumon, Cheese, crabe, crevettes panées nappés d\'un triple fromage fondant gratiné au chalumeau.',
        ingredients: ['Avocat', 'Saumon', 'Cheese', 'Crabe', 'Crevettes panées', 'Triple fromage fondant gratiné'],
        tags: ['Ultra Gourmand', 'Chaud Gratiné', 'Signature Suprême'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        page: 9
    },

    // ==========================================
    // PAGE 10: NIGIRI SUSHI, GUNKAN, TATAKI
    // ==========================================
    {
        id: 'nig-1',
        name: 'Sushi Saumon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Nigiri Sushi',
        price: 25,
        pieces: '2 pièces (par paire)',
        description: 'Boulette de riz vinaigré surmontée d\'une belle tranche de saumon frais.',
        ingredients: ['Saumon frais', 'Riz vinaigré'],
        tags: ['Nigiri'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'nig-2',
        name: 'Sushi Ebi (Crevette)',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Nigiri Sushi',
        price: 25,
        pieces: '2 pièces (par paire)',
        description: 'Nigiri traditionnel à la crevette cuite papillon.',
        ingredients: ['Crevette Ebi', 'Riz vinaigré'],
        tags: ['Nigiri'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'nig-3',
        name: 'Sushi Thon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Nigiri Sushi',
        price: 20,
        pieces: '2 pièces (par paire)',
        description: 'Nigiri au thon rouge frais d\'une belle texture soyeuse.',
        ingredients: ['Thon rouge', 'Riz vinaigré'],
        tags: ['Nigiri', 'Thon'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'nig-4',
        name: 'Sushi Saumon Cheese',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Nigiri Sushi',
        price: 25,
        pieces: '2 pièces (par paire)',
        description: 'Nigiri saumon frais surmonté d\'une touche de cream cheese.',
        ingredients: ['Saumon', 'Cream cheese', 'Riz vinaigré'],
        tags: ['Nigiri', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'nig-5',
        name: 'Sushi Surimi',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Nigiri Sushi',
        price: 15,
        pieces: '2 pièces (par paire)',
        description: 'Nigiri surimi ceinturé d\'une fine lanière de nori.',
        ingredients: ['Surimi', 'Nori', 'Riz'],
        tags: ['Nigiri'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'nig-6',
        name: 'Sushi Avocat Surimi',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Nigiri Sushi',
        price: 20,
        pieces: '2 pièces (par paire)',
        description: 'Nigiri surimi et lamelle d\'avocat frais.',
        ingredients: ['Avocat', 'Surimi', 'Nori', 'Riz'],
        tags: ['Nigiri'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'gun-1',
        name: 'Gun Kan Saumon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Gun Kan',
        price: 30,
        pieces: '2 pièces (par paire)',
        description: 'Bouchée de riz enroulée de nori et généreusement garnie de tartare de saumon assaisonné.',
        ingredients: ['Saumon tartare', 'Ciboulette', 'Nori', 'Riz'],
        tags: ['Gunkan', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'gun-2',
        name: 'Gun Kan Tobiko',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Gun Kan',
        price: 30,
        pieces: '2 pièces (par paire)',
        description: 'Bouchée garnie d\'œufs de poisson volant tobiko croquants.',
        ingredients: ['Tobiko', 'Nori', 'Riz'],
        tags: ['Gunkan', 'Tobiko'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'gun-3',
        name: 'Gun Kan Thon',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Gun Kan',
        price: 25,
        pieces: '2 pièces (par paire)',
        description: 'Bouchée nori au tartare de thon rouge relevé.',
        ingredients: ['Tartare de thon', 'Nori', 'Riz'],
        tags: ['Gunkan', 'Thon'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'gun-4',
        name: 'Gun Kan Crabe',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Gun Kan',
        price: 35,
        pieces: '2 pièces (par paire)',
        description: 'Bouchée nori garnie d\'émietté de chair de crabe.',
        ingredients: ['Crabe', 'Nori', 'Riz'],
        tags: ['Gunkan', 'Crabe'],
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'tat-1',
        name: 'Tataki Thon Mi-Cuit',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Tataki',
        price: 45,
        pieces: '5 pièces',
        description: 'Pavé de thon rouge saisi à la flamme, enrobé de sésame grillé, servi sur lit d\'algues et sauce ponzu.',
        ingredients: ['Thon rouge mi-cuit', 'Graines de sésame', 'Sauce ponzu', 'Salade'],
        tags: ['Tataki', 'Mi-cuit', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        page: 10
    },
    {
        id: 'tat-2',
        name: 'Tataki Saumon Mi-Cuit',
        category: 'nigiri_gunkan_tataki',
        subcategory: 'Tataki',
        price: 45,
        pieces: '5 pièces',
        description: 'Fines tranches de saumon mi-cuit caramélisé au chalumeau et sésame.',
        ingredients: ['Saumon mi-cuit', 'Sésame', 'Sauce ponzu'],
        tags: ['Tataki', 'Mi-cuit'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        page: 10
    },

    // ==========================================
    // PAGE 11: TEPPANYAKI, PAD THAI, SATE, WOKS
    // ==========================================
    {
        id: 'tep-1',
        name: 'Teppanyaki Poulet',
        category: 'plats_chauds',
        subcategory: 'Teppanyaki',
        price: 60,
        pieces: '1 plat avec riz',
        description: 'Émincé de blanc de poulet grillé sur plaque japonaise teppan, légumes croquants sautés et riz blanc.',
        ingredients: ['Poulet grillé teppan', 'Légumes sautés', 'Sauce soja sucrée', 'Riz'],
        tags: ['Chaud', 'Teppanyaki'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'tep-2',
        name: 'Teppanyaki Bœuf',
        category: 'plats_chauds',
        subcategory: 'Teppanyaki',
        price: 85,
        pieces: '1 plat avec riz',
        description: 'Lamelles de bœuf tendre saisies à haute température avec sauce teriyaki maison et riz.',
        ingredients: ['Bœuf saisi', 'Légumes teppan', 'Riz blanc'],
        tags: ['Chaud', 'Bœuf'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'tep-3',
        name: 'Teppanyaki Thon',
        category: 'plats_chauds',
        subcategory: 'Teppanyaki',
        price: 70,
        pieces: '1 plat avec riz',
        description: 'Pavé de thon rouge grillé sur teppan et légumes glacés.',
        ingredients: ['Thon rouge grillé', 'Légumes', 'Riz'],
        tags: ['Chaud', 'Thon'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'tep-4',
        name: 'Teppanyaki Saumon',
        category: 'plats_chauds',
        subcategory: 'Teppanyaki',
        price: 95,
        pieces: '1 plat avec riz',
        description: 'Pavé de saumon frais laqué teriyaki grillé à la perfection.',
        ingredients: ['Saumon grillé', 'Sauce teriyaki', 'Légumes', 'Riz'],
        tags: ['Chaud', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'tep-5',
        name: 'Teppanyaki Crevettes',
        category: 'plats_chauds',
        subcategory: 'Teppanyaki',
        price: 105,
        pieces: '1 plat avec riz',
        description: 'Crevettes royales sautées au teppanyaki avec ail, gingembre et légumes croquants.',
        ingredients: ['Grosses crevettes', 'Ail', 'Gingembre', 'Légumes', 'Riz'],
        tags: ['Chaud', 'Crevettes', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'pad-1',
        name: 'Pad Thaï Poulet',
        category: 'plats_chauds',
        subcategory: 'Pad Thaï',
        price: 75,
        pieces: '1 grand plat',
        description: 'Nouilles de riz thaïlandaises sautées au poulet, champignons noirs, champignons de Paris, shiitake, 3 poivrons et maïs doux.',
        ingredients: ['Poulet', 'Nouilles de riz', 'Champignons noirs', 'Champignons Paris', 'Shiitake', '3 poivrons', 'Maïs'],
        tags: ['Chaud', 'Pad Thaï', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'pad-2',
        name: 'Pad Thaï Bœuf',
        category: 'plats_chauds',
        subcategory: 'Pad Thaï',
        price: 90,
        pieces: '1 grand plat',
        description: 'Pad Thaï authentique au bœuf émincé, champignons noirs, champignons Paris, shiitake, 3 poivrons et maïs.',
        ingredients: ['Bœuf', 'Nouilles de riz', 'Champignons noirs', 'Champignons Paris', 'Shiitake', '3 poivrons', 'Maïs'],
        tags: ['Chaud', 'Bœuf'],
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'pad-3',
        name: 'Pad Thaï Fruits de Mer',
        category: 'plats_chauds',
        subcategory: 'Pad Thaï',
        price: 100,
        pieces: '1 grand plat',
        description: 'Pad Thaï garni de calamars fondants, crevettes, champignons noirs, champignons Paris, shiitake, 3 poivrons et maïs.',
        ingredients: ['Calamars', 'Crevettes', 'Champignons noirs', 'Champignons Paris', 'Shiitake', '3 poivrons', 'Maïs'],
        tags: ['Chaud', 'Fruits de Mer', 'Signature'],
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'sat-1',
        name: 'Saté Poulet',
        category: 'plats_chauds',
        subcategory: 'Saté',
        price: 70,
        pieces: '1 plat',
        description: 'Émincé de poulet mariné à la sauce satée indonésienne aux cacahuètes, champignons de Paris, ail et gingembre frais.',
        ingredients: ['Poulet mariné', 'Sauce satée', 'Champignons Paris', 'Ail', 'Gingembre frais'],
        tags: ['Chaud', 'Sauce Saté'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'sat-2',
        name: 'Saté Bœuf',
        category: 'plats_chauds',
        subcategory: 'Saté',
        price: 85,
        pieces: '1 plat',
        description: 'Émincé de bœuf mariné à la sauce satée onctueuse, champignons de Paris, ail et gingembre frais.',
        ingredients: ['Bœuf émincé', 'Sauce satée', 'Champignons Paris', 'Ail', 'Gingembre frais'],
        tags: ['Chaud', 'Bœuf Saté'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'sat-3',
        name: 'Saté Royal',
        category: 'plats_chauds',
        subcategory: 'Saté',
        price: 95,
        pieces: '1 plat',
        description: 'Noix de Saint-Jacques, calamars et crevettes marinés à la sauce satée riche, champignons de Paris, ail et gingembre.',
        ingredients: ['Saint-Jacques', 'Calamars', 'Crevettes', 'Sauce satée', 'Champignons Paris', 'Ail', 'Gingembre frais'],
        tags: ['Chaud', 'Prestige Saté'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'wok-1',
        name: 'Wok Poulet',
        category: 'plats_chauds',
        subcategory: 'Woks',
        price: 60,
        pieces: '1 wok',
        description: 'Morceaux de poulet et légumes croquants sautés à feu vif au wok traditionnel.',
        ingredients: ['Poulet', 'Légumes de saison sautés', 'Sauce wok'],
        tags: ['Chaud', 'Wok'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'wok-2',
        name: 'Wok Bœuf',
        category: 'plats_chauds',
        subcategory: 'Woks',
        price: 75,
        pieces: '1 wok',
        description: 'Bœuf tendre sauté au wok avec poivrons, oignons et pousses de soja.',
        ingredients: ['Bœuf', 'Légumes wok', 'Sauce soja aromatisée'],
        tags: ['Chaud', 'Wok'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'wok-3',
        name: 'Wok Fruits de Mer',
        category: 'plats_chauds',
        subcategory: 'Woks',
        price: 90,
        pieces: '1 wok',
        description: 'Crevettes, calamars et fruits de mer sautés minute au wok.',
        ingredients: ['Crevettes', 'Calamar', 'Légumes sautés'],
        tags: ['Chaud', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'wok-4',
        name: 'Wok Crevettes',
        category: 'plats_chauds',
        subcategory: 'Woks',
        price: 95,
        pieces: '1 wok',
        description: 'Crevettes sautées aux petits légumes parfumés et sauce asiatique.',
        ingredients: ['Crevettes', 'Légumes croquants'],
        tags: ['Chaud', 'Crevettes'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 11
    },
    {
        id: 'wok-5',
        name: 'Wok Saumon',
        category: 'plats_chauds',
        subcategory: 'Woks',
        price: 95,
        pieces: '1 wok',
        description: 'Dés de saumon frais dorés au wok et légumes glacés au sésame.',
        ingredients: ['Saumon', 'Légumes wok', 'Sésame'],
        tags: ['Chaud', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 11
    },

    // ==========================================
    // PAGE 12: BROCHETTES YAKITORI, NOUILLES & RIZ
    // ==========================================
    {
        id: 'yaki-1',
        name: 'Yakitori Boulettes Poulet (Tsukune)',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Brochettes Yakitori',
        price: 35,
        pieces: '2 pièces',
        description: 'Brochettes japonaises de boulettes de poulet haché laquées à la sauce tare sucrée.',
        ingredients: ['Boulettes de poulet assaisonnées', 'Sauce yakitori'],
        tags: ['Chaud', 'Yakitori'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'yaki-2',
        name: 'Yakitori Poulet',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Brochettes Yakitori',
        price: 30,
        pieces: '2 pièces',
        description: 'Brochettes de morceaux de poulet marinés et caramélisés.',
        ingredients: ['Filet de poulet', 'Sauce yakitori sucrée'],
        tags: ['Chaud', 'Poulet'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'yaki-3',
        name: 'Yakitori Bœuf au Fromage',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Brochettes Yakitori',
        price: 45,
        pieces: '2 pièces',
        description: 'Fines tranches de carpaccio de bœuf enroulées autour d\'un bloc de gouda/emmental coulant.',
        ingredients: ['Bœuf', 'Fromage coulant', 'Sauce teriyaki'],
        tags: ['Chaud', 'Cheese', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'yaki-4',
        name: 'Yakitori Saumon',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Brochettes Yakitori',
        price: 55,
        pieces: '2 pièces',
        description: 'Brochettes de cubes de saumon frais grillés et laqués.',
        ingredients: ['Saumon frais', 'Sauce yakitori'],
        tags: ['Chaud', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'yaki-5',
        name: 'Yakitori Thon',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Brochettes Yakitori',
        price: 50,
        pieces: '2 pièces',
        description: 'Brochettes de thon rouge frais snackées.',
        ingredients: ['Thon rouge', 'Sauce teriyaki'],
        tags: ['Chaud', 'Thon'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'yaki-6',
        name: 'Yakitori Mixte',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Brochettes Yakitori',
        price: 75,
        pieces: '3 pièces',
        description: 'Assortiment de 3 brochettes variées (poulet, bœuf fromage, saumon).',
        ingredients: ['1 Bœuf Fromage', '1 Poulet', '1 Saumon'],
        tags: ['Mixte', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'nou-1',
        name: 'Nouilles Sautées Végétarien',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Nouilles Sautées',
        price: 45,
        pieces: '1 plat',
        description: 'Nouilles aux œufs sautées aux légumes croquants et sauce soja.',
        ingredients: ['Nouilles', 'Légumes de saison', 'Soja'],
        tags: ['Chaud', 'Végétarien'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'nou-2',
        name: 'Nouilles Sautées Poulet',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Nouilles Sautées',
        price: 60,
        pieces: '1 plat',
        description: 'Nouilles sautées avec émincé de poulet tendre et légumes.',
        ingredients: ['Poulet', 'Nouilles', 'Légumes'],
        tags: ['Chaud', 'Poulet'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'nou-3',
        name: 'Nouilles Sautées Fruits de Mer',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Nouilles Sautées',
        price: 80,
        pieces: '1 plat',
        description: 'Nouilles sautées aux crevettes et calamars fondants.',
        ingredients: ['Crevettes', 'Calamars', 'Nouilles', 'Légumes'],
        tags: ['Chaud', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'nou-4',
        name: 'Nouilles Sautées Bœuf',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Nouilles Sautées',
        price: 85,
        pieces: '1 plat',
        description: 'Nouilles sautées au bœuf mariné et sauce parfumée.',
        ingredients: ['Bœuf', 'Nouilles', 'Légumes'],
        tags: ['Chaud', 'Bœuf'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'nou-5',
        name: 'Nouilles Sautées Mixte',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Nouilles Sautées',
        price: 85,
        pieces: '1 plat',
        description: 'Nouilles sautées généreuses au poulet, bœuf et crevettes.',
        ingredients: ['Poulet', 'Bœuf', 'Crevettes', 'Nouilles', 'Légumes'],
        tags: ['Chaud', 'Mixte', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'riz-1',
        name: 'Riz Cantonais Végétarien',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Riz Cantonais',
        price: 45,
        pieces: '1 plat',
        description: 'Riz sauté aux petits pois, maïs, carottes et œufs brouillés.',
        ingredients: ['Riz sauté', 'Petits pois', 'Maïs', 'Carottes', 'Œuf'],
        tags: ['Chaud', 'Végétarien'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'riz-2',
        name: 'Riz Cantonais Poulet',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Riz Cantonais',
        price: 55,
        pieces: '1 plat',
        description: 'Riz cantonais traditionnel garni de dés de poulet doré.',
        ingredients: ['Poulet', 'Riz', 'Œuf', 'Petits pois'],
        tags: ['Chaud', 'Poulet'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'riz-3',
        name: 'Riz Cantonais Fruits de Mer',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Riz Cantonais',
        price: 75,
        pieces: '1 plat',
        description: 'Riz sauté aux crevettes et calamars.',
        ingredients: ['Crevettes', 'Calamar', 'Riz', 'Œuf', 'Petits pois'],
        tags: ['Chaud', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 12
    },
    {
        id: 'riz-4',
        name: 'Riz Cantonais Bœuf',
        category: 'brochettes_nouilles_riz',
        subcategory: 'Riz Cantonais',
        price: 75,
        pieces: '1 plat',
        description: 'Riz cantonais au bœuf émincé et oignons nouveaux.',
        ingredients: ['Bœuf', 'Riz sauté', 'Œuf', 'Petits pois'],
        tags: ['Chaud', 'Bœuf'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 12
    },

    // ==========================================
    // PAGE 13: NOS PLATS & LA MARMITE DU CHEF
    // ==========================================
    {
        id: 'pla-1',
        name: 'Poulet Miel & Gingembre',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 60,
        pieces: '1 plat avec riz',
        description: 'Filet de poulet laqué au miel d\'oranger, gingembre frais râpé, graines de sésame et riz parfumé.',
        ingredients: ['Filet de poulet', 'Miel', 'Gingembre frais', 'Sésame', 'Riz'],
        tags: ['Chaud', 'Sucré-Salé', 'Coup de Cœur'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'pla-2',
        name: 'Riz Thaï Poulet & Œufs de Caille',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 65,
        pieces: '1 plat',
        description: 'Poulet sauté, champignons noirs, champignons de Paris, 2 œufs de caille mollets et riz thaï.',
        ingredients: ['Poulet', 'Champignons noirs', 'Champignons Paris', '2 Œufs de caille', 'Riz'],
        tags: ['Chaud', 'Thaï'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'pla-3',
        name: 'Poulet aux 5 Épices',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 65,
        pieces: '1 plat avec riz',
        description: 'Poulet mijoté aux champignons de Paris, mélange authentique des 5 épices, gingembre frais, ail et riz.',
        ingredients: ['Poulet', 'Champignons Paris', '5 épices', 'Gingembre frais', 'Ail', 'Riz'],
        tags: ['Chaud', '5 Épices'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'pla-4',
        name: 'Bœuf aux 5 Épices',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 85,
        pieces: '1 plat avec riz',
        description: 'Bœuf mijoté aux champignons de Paris, 5 épices traditionnelles, gingembre frais, ail et riz.',
        ingredients: ['Bœuf', 'Champignons Paris', '5 épices', 'Gingembre frais', 'Ail', 'Riz'],
        tags: ['Chaud', 'Bœuf', '5 Épices'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'pla-5',
        name: 'Fruits de Mer aux 5 Épices',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 85,
        pieces: '1 plat avec riz',
        description: 'Calamars et crevettes mijotés aux champignons de Paris, 5 épices, gingembre frais, ail et riz.',
        ingredients: ['Calamars', 'Crevettes', 'Champignons Paris', '5 épices', 'Gingembre frais', 'Ail', 'Riz'],
        tags: ['Chaud', 'Fruits de Mer'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'pla-6',
        name: 'Bœuf Thaï Basilic',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 85,
        pieces: '1 plat avec riz',
        description: 'Émincé de bœuf sauté au basilic thaï frais, carottes, 3 poivrons, champignons de Paris, courgettes et riz.',
        ingredients: ['Émincé de Bœuf', 'Basilic thaï', 'Carottes', '3 poivrons', 'Champignons Paris', 'Courgettes', 'Riz'],
        tags: ['Chaud', 'Bœuf Thaï', 'Basilic'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'pla-7',
        name: 'Crevettes Thaï Basilic',
        category: 'plats_chauds',
        subcategory: 'Nos Plats Signatures',
        price: 95,
        pieces: '1 plat avec riz',
        description: 'Crevettes sautées aux feuilles de basilic frais, carottes, 3 poivrons, champignons de Paris, courgettes et riz.',
        ingredients: ['Crevettes', 'Basilic', 'Carottes', '3 poivrons', 'Champignons Paris', 'Courgettes', 'Riz'],
        tags: ['Chaud', 'Crevettes', 'Basilic'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        page: 13
    },
    {
        id: 'mar-1',
        name: 'La Marmite du Chef Casa',
        category: 'plats_chauds',
        subcategory: 'La Marmite du Chef',
        price: 75,
        pieces: '1 grande marmite',
        description: 'Le chef d\'œuvre mijoté : Calamars, Crevettes, Bœuf tendre, Poulet, champignons de Paris, fleurettes de brocoli et riz.',
        ingredients: ['Calamars', 'Crevettes', 'Bœuf', 'Poulet', 'Champignons Paris', 'Brocoli', 'Riz'],
        tags: ['Plat Signature', 'Chaud', 'Généreux', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        page: 13
    },

    // ==========================================
    // PAGE 14: GRANDS ASSORTIMENTS & LUX SUSHI
    // ==========================================
    {
        id: 'pla-ass-1',
        name: 'Plateau Casa Small',
        category: 'assortiments',
        subcategory: 'Plateaux Assortiments',
        price: 230,
        pieces: '30 pièces',
        description: '30 pièces sélectionnées : Shaki Roll, Norvégien, Anaconda, Texas, Fry Ebi Fry, Crunchy.',
        ingredients: ['Shaki Roll', 'Norvégien', 'Anaconda', 'Texas', 'Fry Ebi Fry', 'Crunchy'],
        tags: ['30 Pièces', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'pla-ass-2',
        name: 'Plateau Casa Délice Mixte',
        category: 'assortiments',
        subcategory: 'Plateaux Assortiments',
        price: 250,
        pieces: '32 pièces',
        description: '4 Sushi Saumon, 3 Sushi Ebi, Sashimi Saumon, California Crème cheese, California Ebi Fry, California Saumon, California Masago, Thon Tobiko.',
        ingredients: ['4 Sushi Saumon', '3 Sushi Ebi', 'Sashimi Saumon', 'California Crème cheese', 'California Ebi Fry', 'California Saumon', 'California Masago', 'Thon Tobiko'],
        tags: ['32 Pièces', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'pla-ass-3',
        name: 'Plateau Casa Classique',
        category: 'assortiments',
        subcategory: 'Plateaux Assortiments',
        price: 310,
        pieces: '46 pièces',
        description: 'Crunchy, Dragon Eye, California Ebi Fry, Pizza Sushi, Norvégien, Sushi Saumon, Sushi Thon, Aromaki saumon, Aromaki Crevette.',
        ingredients: ['Crunchy', 'Dragon Eye', 'California Ebi Fry', 'Pizza Sushi', 'Norvégien', 'Sushi Saumon', 'Sushi Thon', 'Aromaki saumon', 'Aromaki Crevette'],
        tags: ['46 Pièces', 'Fête & Soirée'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'pla-ass-4',
        name: 'Plateau Prestige Casa',
        category: 'assortiments',
        subcategory: 'Plateaux Assortiments',
        price: 320,
        pieces: '48 pièces',
        description: 'Ibiza, Shaki yaki, Norvégien, Anaconda, Aromaki Saumon, Crème Cheese, California Ebi Fry, California Masago, Dragon Eye, Texas.',
        ingredients: ['Ibiza', 'Shaki yaki', 'Norvégien', 'Anaconda', 'Aromaki Saumon', 'Crème Cheese', 'California Ebi Fry', 'California Masago', 'Dragon Eye', 'Texas'],
        tags: ['48 Pièces', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'pla-ass-5',
        name: 'Plateau Géant Casa Mixte',
        category: 'assortiments',
        subcategory: 'Plateaux Assortiments',
        price: 499,
        pieces: '72 pièces',
        description: 'Le festin royal : 6pcs Crunchy, Fry Ebi Fry, Saumon pané, Thon Épicé, Aromaki Fry, Sashimi Thon, Aromaki Crevettes, Maki Surimi, California Masago, Rainbow, Maguro, Texas.',
        ingredients: ['Crunchy (6p)', 'Fry Ebi Fry', 'Saumon pané', 'Thon Épicé', 'Aromaki Fry', 'Sashimi Thon', 'Aromaki Crevettes', 'Maki Surimi', 'California Masago', 'Rainbow', 'Maguro', 'Texas'],
        tags: ['72 Pièces', 'Famille & Amis', 'Coup de Cœur'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'lux-1',
        name: 'Plateau Lux Sushi 20 Pièces',
        category: 'assortiments',
        subcategory: 'Assortiments Lux Sushi',
        price: 300,
        pieces: '20 pièces',
        description: 'Sélection premium gastronomique de 20 pièces créées avec les découpes les plus nobles.',
        ingredients: ['Sashimi nobles', 'Nigiri d\'exception', 'Rolls gastronomiques'],
        tags: ['Lux Sushi', '20 Pièces'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'lux-2',
        name: 'Plateau Lux Sushi 30 Pièces',
        category: 'assortiments',
        subcategory: 'Assortiments Lux Sushi',
        price: 450,
        pieces: '30 pièces',
        description: 'Assortiment d\'orfèvre composé de 30 créations haute gastronomie japonaise.',
        ingredients: ['Poissons d\'exception', 'Noix de Saint-Jacques', 'Rolls signatures'],
        tags: ['Lux Sushi', '30 Pièces'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'lux-3',
        name: 'Plateau Lux Sushi 40 Pièces',
        category: 'assortiments',
        subcategory: 'Assortiments Lux Sushi',
        price: 600,
        pieces: '40 pièces',
        description: 'L\'excellence culinaire : 40 pièces de très haut standing.',
        ingredients: ['Assortiment Lux complet', 'Caviar de poisson', 'Sélection du Chef'],
        tags: ['Lux Sushi', '40 Pièces'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },
    {
        id: 'lux-4',
        name: 'Plateau Royal Lux Sushi 90 Pièces',
        category: 'assortiments',
        subcategory: 'Assortiments Lux Sushi',
        price: 1100,
        pieces: '90 pièces',
        description: 'La plus grande composition Casa Sushi : 90 pièces prestigieuses pour vos événements et grandes réceptions.',
        ingredients: ['90 pièces luxueuses', 'Tous les poissons et crustacés d\'exception'],
        tags: ['Lux Sushi', '90 Pièces', 'Événements & Banquets'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 14
    },

    // ==========================================
    // PAGE 15: SUSHI FRITS & PIZZA SUSHI
    // ==========================================
    {
        id: 'frit-1',
        name: 'Fry Ebi Fry (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 20,
        pieces: '4 pcs (20 dh) / 8 pcs (40 dh)',
        description: 'Crevette panée croustillante, avocat fondant et cheese.',
        ingredients: ['Crevette panée', 'Avocat', 'Cheese'],
        tags: ['Frit', 'Best-Seller'],
        options: [{ name: '4 pièces', price: 20 }, { name: '8 pièces', price: 40 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-2',
        name: 'Thon Épicé Frit (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 20,
        pieces: '4 pcs (20 dh) / 8 pcs (40 dh)',
        description: 'Thon frais, avocat crémeux et sauce chili relevée.',
        ingredients: ['Thon', 'Avocat', 'Sauce chili'],
        tags: ['Frit', 'Spicy'],
        options: [{ name: '4 pièces', price: 20 }, { name: '8 pièces', price: 40 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-3',
        name: 'Aigre Doux Frit (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 25,
        pieces: '4 pcs (25 dh) / 8 pcs (50 dh)',
        description: 'Crevette panée, saumon frais et cheese.',
        ingredients: ['Crevette panée', 'Saumon', 'Cheese'],
        tags: ['Frit'],
        options: [{ name: '4 pièces', price: 25 }, { name: '8 pièces', price: 50 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-4',
        name: 'Saumon Pané Frit (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 25,
        pieces: '4 pcs (25 dh) / 8 pcs (50 dh)',
        description: 'Saumon pané, avocat, surimi et fromage cheese.',
        ingredients: ['Saumon', 'Avocat', 'Surimi', 'Cheese'],
        tags: ['Frit', 'Saumon Pané'],
        options: [{ name: '4 pièces', price: 25 }, { name: '8 pièces', price: 50 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-5',
        name: 'Casa Sushi Frit (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 27,
        pieces: '4 pcs (27 dh) / 8 pcs (55 dh)',
        description: 'Crabe, saumon, crevette panée, noix de Saint-Jacques, mangue sucrée et cheese.',
        ingredients: ['Crabe', 'Saumon', 'Crevette panée', 'Saint-Jacques', 'Mangue', 'Cheese'],
        tags: ['Frit', 'Signature Casa'],
        options: [{ name: '4 pièces', price: 27 }, { name: '8 pièces', price: 55 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-6',
        name: 'Dragon Eye (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 25,
        pieces: '4 pcs (25 dh) / 8 pcs (50 dh)',
        description: 'Le fameux rouleau frit au saumon, poireaux émincés et carotte.',
        ingredients: ['Saumon', 'Poireaux', 'Carotte'],
        tags: ['Frit', 'Best-Seller'],
        options: [{ name: '4 pièces', price: 25 }, { name: '8 pièces', price: 50 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-7',
        name: 'Aromaki Fry (6 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 30,
        pieces: '6 pièces',
        description: 'Aromaki croustillant frit au saumon, avocat et surimi.',
        ingredients: ['Saumon', 'Avocat', 'Surimi'],
        tags: ['Frit', '6 Pièces'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-8',
        name: 'Crunchy Frit (4 ou 8 pcs)',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 20,
        pieces: '4 pcs (20 dh) / 8 pcs (40 dh)',
        description: 'Crevette, cheese fondant, surimi et avocat sous panure croustillante.',
        ingredients: ['Crevette', 'Cheese', 'Surimi', 'Avocat'],
        tags: ['Frit', 'Croustillant'],
        options: [{ name: '4 pièces', price: 20 }, { name: '8 pièces', price: 40 }],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-9',
        name: 'Sushi Tako Frit',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 30,
        pieces: '4 pièces',
        description: '3 poivrons, carottes et fromage gouda fondu.',
        ingredients: ['3 poivrons', 'Carotte', 'Fromage gouda'],
        tags: ['Frit', 'Gouda'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-10',
        name: 'Maki Crema Frit',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 30,
        pieces: '4 pièces',
        description: 'Fromage gouda et crème onctueuse fondante.',
        ingredients: ['Fromage gouda', 'Créma'],
        tags: ['Frit', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-11',
        name: 'Maki Crabe Frit',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 35,
        pieces: '4 pièces',
        description: 'Fromage gouda et chair de crabe sous coque croustillante.',
        ingredients: ['Fromage gouda', 'Crabe'],
        tags: ['Frit', 'Crabe'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-12',
        name: 'Maki Saumon Frit',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 35,
        pieces: '4 pièces',
        description: 'Fromage gouda coulant et saumon frais pané et doré.',
        ingredients: ['Fromage gouda', 'Saumon'],
        tags: ['Frit', 'Saumon'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-13',
        name: 'Maki Saumon Fumé Frit',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 35,
        pieces: '4 pièces',
        description: 'Fromage gouda et saumon fumé d\'exception.',
        ingredients: ['Fromage gouda', 'Saumon fumé'],
        tags: ['Frit', 'Saumon Fumé'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'frit-14',
        name: 'Maki Surimi Tobiko Frit',
        category: 'frits_pizza',
        subcategory: 'Sushi Frits',
        price: 30,
        pieces: '4 pièces',
        description: 'Fromage gouda, surimi et tobiko croustillant.',
        ingredients: ['Fromage gouda', 'Surimi', 'Tobiko'],
        tags: ['Frit', 'Tobiko'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'piz-1',
        name: 'Pizza Sushi Classique',
        category: 'frits_pizza',
        subcategory: 'Pizza Sushi',
        price: 50,
        pieces: '8 pièces',
        description: 'Galette de riz croustillante garnie de saumon frais, avocat, surimi, cheese et tobiko.',
        ingredients: ['Saumon', 'Avocat', 'Surimi', 'Cheese', 'Tobiko'],
        tags: ['Pizza Sushi', '8 Pièces', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'piz-2',
        name: 'Pizza Sushi Spéciale',
        category: 'frits_pizza',
        subcategory: 'Pizza Sushi',
        price: 55,
        pieces: '8 pièces',
        description: 'Crabe, mangue fraîche, avocat, cheese, saumon, surimi et tobiko.',
        ingredients: ['Crabe', 'Mangue', 'Avocat', 'Cheese', 'Saumon', 'Surimi', 'Tobiko'],
        tags: ['Pizza Sushi', 'Exotique'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'piz-3',
        name: 'Pizza Sushi de Luxe',
        category: 'frits_pizza',
        subcategory: 'Pizza Sushi',
        price: 65,
        pieces: '8 pièces',
        description: 'Noix de Saint-Jacques, tanouki croustillant, saumon fumé, sauce kamikaze relevée et tobiko.',
        ingredients: ['Saint-Jacques', 'Tanouki', 'Saumon fumé', 'Sauce kamikaze', 'Tobiko'],
        tags: ['Pizza Sushi', 'Prestige'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 15
    },
    {
        id: 'piz-4',
        name: 'Pizza Sushi Fromage',
        category: 'frits_pizza',
        subcategory: 'Pizza Sushi',
        price: 55,
        pieces: '8 pièces',
        description: 'Saumon, avocat, surimi, fromage carré fondant, gouda et tobiko.',
        ingredients: ['Saumon', 'Avocat', 'Surimi', 'Fromage carré', 'Gouda', 'Tobiko'],
        tags: ['Pizza Sushi', 'Cheese'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
        page: 15
    },

    // ==========================================
    // PAGE 16: SPÉCIAL L & ROULEAUX SPÉCIAUX CASA SUSHI
    // ==========================================
    {
        id: 'spe-1',
        name: 'Spécial Barbecue',
        category: 'casa_rolls',
        subcategory: 'Spécial L',
        price: 40,
        pieces: '4 pièces',
        description: 'Poulet cuit, ananas rôti, cream cheese et masago.',
        ingredients: ['Poulet cuit', 'Ananas', 'Cheese', 'Masago'],
        tags: ['Poulet', 'Sucré-Salé'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-2',
        name: 'Spécial Chicago',
        category: 'casa_rolls',
        subcategory: 'Spécial L',
        price: 50,
        pieces: '4 pièces',
        description: 'Crevettes panées, avocat, chair de crabe et fines lamelles de mangue.',
        ingredients: ['Crevettes panées', 'Avocat', 'Crabe', 'Mangue'],
        tags: ['Crevettes Panées', 'Mangue'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-3',
        name: 'Spécial Fresh',
        category: 'casa_rolls',
        subcategory: 'Spécial L',
        price: 45,
        pieces: '4 pièces',
        description: 'Saumon frais, avocat crémeux, crevette panée et cream cheese.',
        ingredients: ['Saumon', 'Avocat', 'Crevette panée', 'Cheese'],
        tags: ['Frais', 'Best-Seller'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-4',
        name: 'Spécial Philly',
        category: 'casa_rolls',
        subcategory: 'Spécial L',
        price: 50,
        pieces: '4 pièces',
        description: 'Saumon fumé noble, avocat, crevette pochée, concombre croquant et cream cheese.',
        ingredients: ['Saumon fumé', 'Avocat', 'Crevette pochée', 'Concombre', 'Cheese'],
        tags: ['Philly', 'Saumon Fumé'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-5',
        name: 'Spécial Délice',
        category: 'casa_rolls',
        subcategory: 'Spécial L',
        price: 55,
        pieces: '4 pièces',
        description: 'Saumon fumé, thon rouge, avocat, crabe et cheese.',
        ingredients: ['Saumon fumé', 'Thon', 'Avocat', 'Crabe', 'Cheese'],
        tags: ['Prestige', 'Thon & Saumon'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-6',
        name: 'Spécial Thona Roll',
        category: 'casa_rolls',
        subcategory: 'Rouleaux Spéciaux Casa',
        price: 55,
        pieces: '4 pièces',
        description: 'Tartare de thon dynamite épicé, crevette et sauce onctueuse unagi.',
        ingredients: ['Tartare de thon', 'Sauce dynamite', 'Crevette', 'Sauce unagi'],
        tags: ['Signature', 'Dynamite Spicy'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-7',
        name: 'Tokyo Roll',
        category: 'casa_rolls',
        subcategory: 'Rouleaux Spéciaux Casa',
        price: 55,
        pieces: '4 pièces',
        description: 'Avocat, cheese fondant, chair de crabe et fines herbes.',
        ingredients: ['Avocat', 'Cheese', 'Crabe'],
        tags: ['Tokyo', 'Crabe'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-8',
        name: 'Exotique Roll',
        category: 'casa_rolls',
        subcategory: 'Rouleaux Spéciaux Casa',
        price: 55,
        pieces: '4 pièces',
        description: 'Mangue fraîche, saumon pané, avocat, cheese, tobiko et sauce unagi.',
        ingredients: ['Mangue', 'Saumon pané', 'Avocat', 'Cheese', 'Tobiko', 'Sauce unagi'],
        tags: ['Exotique', 'Mangue & Saumon'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-9',
        name: 'Crousty Roll',
        category: 'casa_rolls',
        subcategory: 'Rouleaux Spéciaux Casa',
        price: 60,
        pieces: '4 pièces',
        description: 'Saumon frais, crevette panée, avocat, mangue, ika à la façon du chef, cheese et tobiko.',
        ingredients: ['Saumon', 'Crevette panée', 'Avocat', 'Mangue', 'Ika du chef', 'Cheese', 'Tobiko'],
        tags: ['Signature Suprême', 'Coup de Cœur'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    },
    {
        id: 'spe-10',
        name: 'Pyramode Roll',
        category: 'casa_rolls',
        subcategory: 'Rouleaux Spéciaux Casa',
        price: 60,
        pieces: '4 pièces',
        description: 'Dôme pyramidal garni de tartare de saumon frais à l\'aneth, avocat, surimi pané, cheese et tobiko éclatant.',
        ingredients: ['Tartare saumon à l\'aneth', 'Avocat', 'Surimi pané', 'Cheese', 'Tobiko'],
        tags: ['Signature', 'Pyramide'],
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
        page: 16
    }
];

// ==========================================
// ÉTAT DE L'APPLICATION & GESTION DU PANIER
// ==========================================
let currentCategory = 'tous';
let currentSearch = '';
let activeFilterTag = 'tous';
let cart = JSON.parse(localStorage.getItem('casa_sushi_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('casa_sushi_favs') || '[]');

// Configuration Restaurant & WhatsApp
const RESTAURANT_INFO = {
    name: 'Casa Sushi',
    tagline: 'Art & Passion du Sushi Japonais d\'Exception',
    phone: '+212601860939',
    displayPhone: '06 01 86 09 39',
    whatsappNumber: '212601860939',
    instagram: 'https://www.instagram.com/casa.sushi_tanger?igsi=MXAwdG1ndmNxbjJ0cw==',
    instagramHandle: '@casa.sushi_tanger',
    facebook: 'https://www.facebook.com/lacasasushi1',
    facebookName: '@lacasasushi1',
    currency: 'DH',
    address: 'Tanger, Maroc',
    hours: '12h00 - 00h00 (7j/7)'
};

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadDynamicMenuData();
    initCategoryTabs();
    initFilterTags();
    renderPromoPacksBanner();
    renderMenuItems();
    initSearch();
    initCartDrawer();
    initDishModal();
    updateCartUI();
    initPdfDownloader();
    setupSmoothScroll();
    initCasaSushiMap();
    initMobileNavigation();
});

// Chargement des données synchronisées avec l'administration et SQLite
let activeMenuItems = [];

async function loadDynamicMenuData() {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            activeMenuItems = await res.json();
            renderMenuItems();
            return;
        }
    } catch(e) {}

    // Fallback local
    const stored = localStorage.getItem('casa_sushi_menu_items');
    if (stored) {
        try {
            activeMenuItems = JSON.parse(stored);
        } catch (e) {
            activeMenuItems = MENU_ITEMS;
        }
    } else {
        activeMenuItems = MENU_ITEMS;
    }
    renderMenuItems();
}

// Rendu dynamique de la section des Packs Promotionnels Périodiques depuis SQLite
async function renderPromoPacksBanner() {
    const promoContainer = document.getElementById('promo-packs-section');
    if (!promoContainer) return;

    let promos = [];
    try {
        const res = await fetch('/api/promos');
        if (res.ok) {
            promos = await res.json();
        }
    } catch(e) {}

    if (!promos || promos.length === 0) {
        try {
            promos = JSON.parse(localStorage.getItem('casa_sushi_promo_packs') || '[]');
        } catch(e) {}
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const activePromos = promos.filter(p => {
        if (p.active === false) return false;
        if (p.startDate && p.startDate > todayStr) return false;
        if (p.endDate && p.endDate < todayStr) return false;
        return true;
    });

    if (activePromos.length === 0) {
        promoContainer.style.display = 'none';
        return;
    }

    promoContainer.style.display = 'block';
    promoContainer.innerHTML = `
        <div class="promo-section-header">
            <div class="promo-header-badge"><i class="fa-solid fa-fire"></i> Offres Spéciales</div>
            <h2 class="promo-section-title">Packs & Promotions du Moment</h2>
            <p class="promo-section-subtitle">Profitez de nos formules festives et packs dégustation à prix exclusif !</p>
        </div>
        <div class="promo-cards-grid">
            ${activePromos.map(p => `
                <div class="client-promo-card">
                    <div class="client-promo-badge">${p.badge || 'PROMO'}</div>
                    <div class="client-promo-img-wrapper">
                        <img src="${p.image}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'">
                    </div>
                    <div class="client-promo-content">
                        ${p.endDate ? `
                            <div class="client-promo-timer">
                                <i class="fa-solid fa-clock"></i> Valable jusqu'au ${p.endDate}
                            </div>
                        ` : ''}
                        <h3 class="client-promo-title">${p.title}</h3>
                        <p class="client-promo-desc">${p.description}</p>
                        <div class="client-promo-footer">
                            <div class="client-promo-prices">
                                ${p.oldPrice ? `<span class="client-old-price">${p.oldPrice} DH</span>` : ''}
                                <span class="client-new-price">${p.newPrice} <small>DH</small></span>
                            </div>
                            <button class="btn-add-cart-promo" onclick="addPromoPackToCart('${p.id}')">
                                <i class="fa-solid fa-cart-plus"></i> Commander ce Pack
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function addPromoPackToCart(promoId) {
    let promos = [];
    try {
        promos = JSON.parse(localStorage.getItem('casa_sushi_promo_packs') || '[]');
    } catch(e) {}
    
    const pack = promos.find(p => p.id === promoId);
    if (!pack) return;

    const cartKey = `pack_${pack.id}`;
    const existingIndex = cart.findIndex(c => c.cartKey === cartKey);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            cartKey,
            id: pack.id,
            name: `🔥 ${pack.title}`,
            price: pack.newPrice,
            pieces: 'Pack Promo',
            image: pack.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`Pack ajouté au panier : ${pack.title}`);
}

// 1. Initialisation des Onglets Catégories (Dynamique depuis SQLite)
async function initCategoryTabs() {
    const navContainer = document.getElementById('category-nav-list');
    if (!navContainer) return;

    let categories = [
        { id: 'tous', name: 'Tous les Plats', icon: 'fa-utensils' }
    ];

    try {
        const res = await fetch('/api/categories');
        if (res.ok) {
            const apiCats = await res.json();
            if (apiCats && apiCats.length > 0) {
                apiCats.forEach(c => {
                    categories.push({
                        id: c.id,
                        name: c.name,
                        icon: c.icon.startsWith('fa-') ? c.icon : `fa-${c.icon}`
                    });
                });
            } else {
                categories = MENU_CATEGORIES;
            }
        } else {
            categories = MENU_CATEGORIES;
        }
    } catch(e) {
        categories = MENU_CATEGORIES;
    }

    navContainer.innerHTML = categories.map((cat, idx) => `
        <button class="cat-tab-btn ${cat.id === 'tous' ? 'active' : ''}" data-cat="${cat.id}">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');

    navContainer.querySelectorAll('.cat-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            navContainer.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.cat;
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            renderMenuItems();
        });
    });
}

// 2. Filtres par Tags (Spicy, Veggie, Cheese, Signature...)
function initFilterTags() {
    const tagsContainer = document.getElementById('quick-tags-list');
    if (!tagsContainer) return;

    const tags = ['Tous', 'Signature', 'Best-Seller', 'Cheese', 'Spicy', 'Végétarien', 'Chaud', 'Crevettes', 'Saumon', 'Thon'];
    tagsContainer.innerHTML = tags.map((tag, idx) => `
        <button class="tag-pill-btn ${idx === 0 ? 'active' : ''}" data-tag="${tag.toLowerCase()}">
            ${tag}
        </button>
    `).join('');

    tagsContainer.querySelectorAll('.tag-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tagsContainer.querySelectorAll('.tag-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilterTag = btn.dataset.tag;
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            renderMenuItems();
        });
    });
}

// 3. Recherche en Direct
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search-btn');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        if (clearBtn) {
            clearBtn.style.display = currentSearch ? 'flex' : 'none';
        }
        renderMenuItems();
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            clearBtn.style.display = 'none';
            renderMenuItems();
        });
    }
}

// 4. Rendu des Plats dans la Grille
function renderMenuItems() {
    const grid = document.getElementById('menu-items-grid');
    const countDisplay = document.getElementById('results-count');
    if (!grid) return;

    const sourceItems = (activeMenuItems && activeMenuItems.length > 0) ? activeMenuItems : MENU_ITEMS;

    let filtered = sourceItems.filter(item => {
        // Filtrage catégorie
        const matchCategory = currentCategory === 'tous' || item.category === currentCategory;

        // Filtrage recherche
        const matchSearch = !currentSearch || 
            item.name.toLowerCase().includes(currentSearch) ||
            item.description?.toLowerCase().includes(currentSearch) ||
            item.subcategory?.toLowerCase().includes(currentSearch) ||
            item.ingredients?.some(ing => ing.toLowerCase().includes(currentSearch)) ||
            item.tags?.some(t => t.toLowerCase().includes(currentSearch));

        // Filtrage tag
        const matchTag = activeFilterTag === 'tous' || 
            item.tags?.some(t => t.toLowerCase().includes(activeFilterTag)) ||
            (activeFilterTag === 'végétarien' && item.tags?.some(t => t.toLowerCase().includes('végé')));

        return matchCategory && matchSearch && matchTag;
    });

    if (countDisplay) {
        countDisplay.textContent = `${filtered.length} plat${filtered.length > 1 ? 's' : ''} disponible${filtered.length > 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-utensils-slash"></i>
                <h3>Aucun plat trouvé</h3>
                <p>Essayez un autre mot-clé ou réinitialisez les filtres.</p>
                <button class="btn-reset-filters" onclick="resetAllFilters()">Voir tous les plats</button>
            </div>
        `;
        return;
    }

    // Regrouper ou afficher en cartes luxueuses
    grid.innerHTML = filtered.map(item => {
        const isFav = favorites.includes(item.id);
        const inStock = item.inStock !== false;
        const tagsHtml = (item.tags || []).map(t => {
            let cls = 'badge-default';
            if (t.includes('Signature') || t.includes('Suprême') || t.includes('Coup de Cœur')) cls = 'badge-signature';
            else if (t.includes('Best-Seller') || t.includes('Prestige')) cls = 'badge-bestseller';
            else if (t.includes('Spicy')) cls = 'badge-spicy';
            else if (t.includes('Végétarien')) cls = 'badge-veggie';
            else if (t.includes('Cheese')) cls = 'badge-cheese';
            return `<span class="dish-badge ${cls}">${t}</span>`;
        }).join('');

        return `
            <article class="dish-card ${!inStock ? 'out-of-stock' : ''}" data-id="${item.id}">
                <div class="dish-img-wrapper" onclick="openDishModal('${item.id}')">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'">
                    <div class="dish-img-overlay">
                        <span><i class="fa-solid fa-eye"></i> Aperçu détaillé</span>
                    </div>
                    ${item.pieces ? `<div class="dish-piece-tag"><i class="fa-solid fa-cubes-stacked"></i> ${item.pieces}</div>` : ''}
                    ${!inStock ? `<div class="dish-out-badge">Épuisé</div>` : ''}
                    <button class="dish-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${item.id}')" title="Ajouter aux favoris">
                        <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                </div>
                
                <div class="dish-content">
                    <div class="dish-header">
                        <span class="dish-subcategory">${item.subcategory || 'Spécialité'}</span>
                        <div class="dish-badges">${tagsHtml}</div>
                    </div>

                    <h3 class="dish-title" onclick="openDishModal('${item.id}')">${item.name}</h3>
                    
                    <p class="dish-desc">${item.description || ''}</p>
                    
                    ${item.ingredients && item.ingredients.length > 0 ? `
                        <div class="dish-ingredients">
                            <i class="fa-solid fa-leaf"></i>
                            <span>${item.ingredients.slice(0, 4).join(', ')}${item.ingredients.length > 4 ? '...' : ''}</span>
                        </div>
                    ` : ''}

                    <div class="dish-footer">
                        <div class="dish-price-box">
                            <span class="price-val">${item.price}</span>
                            <span class="price-curr">${RESTAURANT_INFO.currency}</span>
                        </div>

                        ${inStock ? `
                            <button class="btn-add-cart" onclick="addToCart('${item.id}')">
                                <i class="fa-solid fa-plus"></i>
                                <span>Ajouter</span>
                            </button>
                        ` : `
                            <button class="btn-add-cart disabled" disabled style="opacity: 0.5; cursor: not-allowed;">
                                <span>Épuisé</span>
                            </button>
                        `}
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function resetAllFilters() {
    currentCategory = 'tous';
    currentSearch = '';
    activeFilterTag = 'tous';
    
    document.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === 'tous'));
    document.querySelectorAll('.tag-pill-btn').forEach(b => b.classList.toggle('active', b.dataset.tag === 'tous'));
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    
    renderMenuItems();
}

// 5. Gestion des Favoris
function toggleFavorite(e, id) {
    e.stopPropagation();
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('casa_sushi_favs', JSON.stringify(favorites));
    renderMenuItems();
}

// 6. Gestion du Panier & WhatsApp Checkout
function addToCart(id, optionIndex = null) {
    const sourceItems = (activeMenuItems && activeMenuItems.length > 0) ? activeMenuItems : MENU_ITEMS;
    const item = sourceItems.find(i => i.id === id);
    if (!item) return;

    if (item.inStock === false) {
        showToast('Désolé, ce plat est temporairement épuisé.');
        return;
    }

    let price = item.price;
    let selectedOptionName = '';

    if (optionIndex !== null && item.options && item.options[optionIndex]) {
        price = item.options[optionIndex].price;
        selectedOptionName = item.options[optionIndex].name;
    }

    const cartKey = optionIndex !== null ? `${item.id}_${optionIndex}` : item.id;
    const existingIndex = cart.findIndex(c => c.cartKey === cartKey);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            cartKey,
            id: item.id,
            name: item.name + (selectedOptionName ? ` (${selectedOptionName})` : ''),
            price: price,
            pieces: item.pieces,
            image: item.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`Ajouté au panier : ${item.name}`);
}

function updateCartQuantity(cartKey, delta) {
    const index = cart.findIndex(c => c.cartKey === cartKey);
    if (index > -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    saveCart();
    updateCartUI();
}

function clearCart() {
    if (confirm('Voulez-vous vider votre panier ?')) {
        cart = [];
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('casa_sushi_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const badgeCounts = document.querySelectorAll('.cart-count-badge');
    badgeCounts.forEach(b => {
        b.textContent = totalCount;
        b.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });

    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartFooter = document.getElementById('cart-drawer-footer');

    if (cartTotalPrice) {
        cartTotalPrice.textContent = `${totalPrice} ${RESTAURANT_INFO.currency}`;
    }

    if (cartItemsList) {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Votre panier est vide</p>
                    <span>Ajoutez de succulents sushis pour commander !</span>
                </div>
            `;
            if (cartFooter) cartFooter.style.display = 'none';
        } else {
            if (cartFooter) cartFooter.style.display = 'block';
            cartItemsList.innerHTML = cart.map(item => `
                <div class="cart-item-row">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-unit-price">${item.price} ${RESTAURANT_INFO.currency}</div>
                        <div class="cart-item-qty-control">
                            <button onclick="updateCartQuantity('${item.cartKey}', -1)"><i class="fa-solid fa-minus"></i></button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity('${item.cartKey}', 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="cart-item-total-col">
                        <span class="subtotal-val">${item.price * item.quantity} ${RESTAURANT_INFO.currency}</span>
                        <button class="btn-remove-item" onclick="updateCartQuantity('${item.cartKey}', -999)" title="Supprimer">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// 7. Panier Coulissant (Drawer)
function initCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const openBtns = document.querySelectorAll('.open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const checkoutForm = document.getElementById('whatsapp-order-form');

    const openDrawer = () => {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    openBtns.forEach(btn => btn.addEventListener('click', openDrawer));
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', sendWhatsAppOrder);
    }
}

// 8. Génération & Envoi de la Commande WhatsApp
async function sendWhatsAppOrder(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showToast('Votre panier est vide.');
        return;
    }

    const clientName = document.getElementById('client-name').value.trim();
    const clientPhone = document.getElementById('client-phone').value.trim();
    const clientAddress = document.getElementById('client-address').value.trim();
    const orderNotes = document.getElementById('order-notes').value.trim();
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Livraison';

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 1. Sauvegarde dans la base de données SQLite
    let orderNumber = `CS-${Date.now().toString().slice(-4)}`;
    try {
        const orderPayload = {
            clientName,
            clientPhone,
            clientAddress: orderType === 'Livraison' ? clientAddress : 'À emporter (Restaurant Tanger)',
            orderType,
            orderNotes,
            totalPrice,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                selectedOptionName: item.selectedOptionName || null
            }))
        };

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
            const data = await res.json();
            if (data.orderNumber) {
                orderNumber = data.orderNumber;
            }
        }
    } catch (err) {
        console.warn('Mode hors-ligne, commande directe WhatsApp', err);
    }

    // 2. Construction du Message WhatsApp structuré
    let message = `🍣 *NOUVELLE COMMANDE CASA SUSHI* 🍣\n`;
    message += `📋 *Réf. Commande :* \`${orderNumber}\`\n`;
    message += `📅 *Date :* ${new Date().toLocaleString('fr-FR')}\n`;
    message += `──────────────────────\n`;
    message += `👤 *Client :* ${clientName}\n`;
    message += `📞 *Téléphone :* ${clientPhone}\n`;
    message += `🛵 *Mode :* ${orderType}\n`;

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* x${item.quantity} = ${item.price * item.quantity} DH\n`;
    });

    message += `--------------------------------\n`;
    message += `💰 *TOTAL À PAYER :* *${totalPrice} DH*\n\n`;

    if (orderNotes) {
        message += `📝 *Notes supplémentaires :* ${orderNotes}\n\n`;
    }

    message += `🙏 Merci de confirmer ma commande et de m'indiquer le délai estimé !`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// 9. Modale Détail Plat
function initDishModal() {
    const modal = document.getElementById('dish-modal');
    const overlay = document.getElementById('dish-modal-overlay');
    const closeBtn = document.getElementById('close-dish-modal-btn');

    if (!modal) return;

    const closeModal = () => {
        modal.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
}

// ===================================================
// MODULE CARTE INTERACTIVE & GÉOLOCALISATION GPS
// ===================================================

const RESTAURANT_COORDS = {
    lat: 35.7767,
    lng: -5.8039,
    name: 'Casa Sushi Tanger',
    address: 'Boulevard Mohammed V, Tanger, Maroc'
};

let casaMap = null;
let userMarker = null;
let userAccuracyCircle = null;
let routeLine = null;
let geoWatchId = null;

function initCasaSushiMap() {
    const mapEl = document.getElementById('casa-sushi-map');
    if (!mapEl || typeof L === 'undefined') return;

    // Initialiser la carte Leaflet
    casaMap = L.map('casa-sushi-map', {
        scrollWheelZoom: false
    }).setView([RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng], 14);

    // Tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(casaMap);

    // Icône personnalisée Restaurant
    const sushiIcon = L.divIcon({
        className: 'custom-sushi-marker',
        html: `<div style="background: linear-gradient(135deg, #e63946, #b51726); color: #fff; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; box-shadow: 0 4px 15px rgba(230, 57, 70, 0.7); border: 2px solid #fff;"><i class="fa-solid fa-fish"></i></div>`,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -22]
    });

    const restaurantMarker = L.marker([RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng], { icon: sushiIcon }).addTo(casaMap);
    
    restaurantMarker.bindPopup(`
        <div style="text-align: center; padding: 0.4rem;">
            <h4 style="font-size: 1rem; color: #f4a261; margin-bottom: 0.2rem; font-family: 'Cinzel', serif;">🍣 CASA SUSHI</h4>
            <p style="font-size: 0.82rem; margin-bottom: 0.4rem; color: #ccc;">${RESTAURANT_COORDS.address}</p>
            <span style="background: #25d366; color: #fff; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">Ouvert 7j/7 • 12h - 00h</span>
        </div>
    `).openPopup();
}

// Détection GPS en temps réel sur la carte
function detectRealtimeMapLocation() {
    if (!navigator.geolocation) {
        alert('La géolocalisation n\'est pas supportée par votre navigateur.');
        return;
    }

    const btn = document.getElementById('btn-detect-realtime-gps');
    const infoBox = document.getElementById('map-live-distance-box');
    const textSpan = document.getElementById('map-distance-text');

    if (btn) {
        btn.classList.add('tracking');
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Recherche GPS en direct...</span>`;
    }

    if (infoBox) infoBox.style.display = 'flex';
    if (textSpan) textSpan.textContent = 'Acquisition de votre signal GPS...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Calcul distance
            const distanceKm = calculateDistance(RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng, userLat, userLng);
            const deliveryEstimate = Math.max(15, Math.round(15 + (distanceKm * 3.5)));

            if (textSpan) {
                textSpan.innerHTML = `Vous êtes à <strong>${distanceKm.toFixed(1)} km</strong> de Casa Sushi • Livraison estimée : <strong>~${deliveryEstimate} min</strong>`;
            }

            if (btn) {
                btn.classList.remove('tracking');
                btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Position détectée (${distanceKm.toFixed(1)} km)</span>`;
            }

            if (casaMap) {
                // Supprimer anciens marqueurs s'ils existent
                if (userMarker) casaMap.removeLayer(userMarker);
                if (userAccuracyCircle) casaMap.removeLayer(userAccuracyCircle);
                if (routeLine) casaMap.removeLayer(routeLine);

                // Icône Client
                const userIcon = L.divIcon({
                    className: 'custom-user-marker',
                    html: `<div style="background: #2ec4b6; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; box-shadow: 0 0 15px #2ec4b6; border: 2px solid #fff;"><i class="fa-solid fa-location-crosshairs"></i></div>`,
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    popupAnchor: [0, -18]
                });

                userMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(casaMap);
                userMarker.bindPopup(`
                    <div style="text-align: center; padding: 0.3rem;">
                        <h4 style="font-size: 0.95rem; color: #2ec4b6; margin-bottom: 0.2rem;">📍 Votre Position</h4>
                        <p style="font-size: 0.8rem; margin: 0;">Distance : <strong>${distanceKm.toFixed(1)} km</strong></p>
                    </div>
                `).openPopup();

                userAccuracyCircle = L.circle([userLat, userLng], {
                    radius: accuracy,
                    color: '#2ec4b6',
                    fillColor: '#2ec4b6',
                    fillOpacity: 0.15
                }).addTo(casaMap);

                // Ligne de liaison
                routeLine = L.polyline([
                    [RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng],
                    [userLat, userLng]
                ], {
                    color: '#f4a261',
                    dashArray: '8, 8',
                    weight: 3
                }).addTo(casaMap);

                casaMap.fitBounds(L.latLngBounds([
                    [RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng],
                    [userLat, userLng]
                ]), { padding: [60, 60] });
            }

            showToast(`Position détectée ! Distance : ${distanceKm.toFixed(1)} km`);
        },
        (error) => {
            if (btn) {
                btn.classList.remove('tracking');
                btn.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> <span>Détecter ma position en temps réel</span>`;
            }
            if (textSpan) textSpan.textContent = 'Accès GPS refusé ou indisponible.';
            showToast('Impossible d\'obtenir la géolocalisation.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// Détection GPS et remplissage automatique de l'adresse dans le panier
function detectUserLocationForCart() {
    if (!navigator.geolocation) {
        showToast('La géolocalisation n\'est pas supportée.');
        return;
    }

    const addrInput = document.getElementById('client-address');
    const indicator = document.getElementById('gps-status-indicator');
    const btn = document.getElementById('btn-autofill-gps');

    if (indicator) {
        indicator.style.display = 'block';
        indicator.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Détection de votre position GPS...';
    }
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            try {
                // Reverse Geocoding avec OpenStreetMap Nominatim
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
                if (res.ok) {
                    const data = await res.json();
                    const road = data.address.road || data.address.pedestrian || data.address.suburb || '';
                    const suburb = data.address.neighbourhood || data.address.suburb || '';
                    const city = data.address.city || data.address.town || 'Tanger';
                    const formatted = `${road}${suburb ? ', ' + suburb : ''}, ${city} (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
                    
                    if (addrInput) {
                        addrInput.value = formatted;
                    }
                    if (indicator) {
                        indicator.innerHTML = `<i class="fa-solid fa-check"></i> Adresse détectée : <strong>${road || city}</strong>`;
                    }
                    showToast('Adresse de livraison détectée !');
                }
            } catch(e) {
                if (addrInput) {
                    addrInput.value = `Position GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)} (Tanger)`;
                }
            } finally {
                if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
            }
        },
        (err) => {
            if (indicator) indicator.innerHTML = '<span style="color: #ff6b6b;"><i class="fa-solid fa-triangle-exclamation"></i> Accès GPS refusé. Veuillez saisir manuellement.</span>';
            if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
            showToast('Erreur d\'accès GPS.');
        },
        { enableHighAccuracy: true, timeout: 8000 }
    );
}

// Calcul de distance Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function openDishModal(id) {
    const sourceItems = (activeMenuItems && activeMenuItems.length > 0) ? activeMenuItems : MENU_ITEMS;
    const item = sourceItems.find(i => i.id === id);
    if (!item) return;

    const modal = document.getElementById('dish-modal');
    const overlay = document.getElementById('dish-modal-overlay');
    const bodyContent = document.getElementById('dish-modal-body');

    if (!modal || !bodyContent) return;

    let optionsHtml = '';
    if (item.options && item.options.length > 0) {
        optionsHtml = `
            <div class="modal-options-group">
                <label>Format / Quantité :</label>
                <div class="options-selector">
                    ${item.options.map((opt, idx) => `
                        <label class="option-pill">
                            <input type="radio" name="modal-dish-opt" value="${idx}" ${idx === 0 ? 'checked' : ''}>
                            <span>${opt.name} (${opt.price} DH)</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    bodyContent.innerHTML = `
        <div class="modal-dish-layout">
            <div class="modal-dish-img-side">
                <img src="${item.image}" alt="${item.name}">
                <div class="modal-dish-page-ref">Page ${item.page || '1'} du menu</div>
                <a href="${item.image}" download="Casa_Sushi_${item.name.replace(/\s+/g, '_')}.jpg" target="_blank" class="btn-download-dish-photo" title="Télécharger cette photo en haute définition">
                    <i class="fa-solid fa-download"></i> Télécharger la Photo HD
                </a>
            </div>
            
            <div class="modal-dish-info-side">
                <div class="modal-dish-category">${item.subcategory}</div>
                <h2 class="modal-dish-title">${item.name}</h2>
                
                <div class="modal-dish-badges">
                    ${item.tags.map(t => `<span class="dish-badge">${t}</span>`).join('')}
                    ${item.pieces ? `<span class="dish-badge badge-pieces"><i class="fa-solid fa-cubes-stacked"></i> ${item.pieces}</span>` : ''}
                </div>

                <p class="modal-dish-desc">${item.description}</p>

                <div class="modal-dish-ingredients-box">
                    <h4><i class="fa-solid fa-list-check"></i> Ingrédients & Composition :</h4>
                    <ul>
                        ${item.ingredients.map(ing => `<li><i class="fa-solid fa-check"></i> ${ing}</li>`).join('')}
                    </ul>
                </div>

                ${optionsHtml}

                <div class="modal-dish-action-bar">
                    <div class="modal-price">
                        <span class="price-val" id="modal-active-price">${item.price}</span>
                        <span class="price-curr">DH</span>
                    </div>

                    <button class="btn-modal-add-cart" id="btn-modal-submit-cart">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>Ajouter au panier</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Écouteur options de prix
    const radioOpts = bodyContent.querySelectorAll('input[name="modal-dish-opt"]');
    radioOpts.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const optIndex = parseInt(e.target.value);
            const selectedOpt = item.options[optIndex];
            const priceEl = document.getElementById('modal-active-price');
            if (priceEl && selectedOpt) {
                priceEl.textContent = selectedOpt.price;
            }
        });
    });

    // Écouteur bouton ajout
    const addBtn = document.getElementById('btn-modal-submit-cart');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            let chosenOpt = null;
            const checkedRadio = bodyContent.querySelector('input[name="modal-dish-opt"]:checked');
            if (checkedRadio) {
                chosenOpt = parseInt(checkedRadio.value);
            }
            addToCart(item.id, chosenOpt);
            modal.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// 10. Toast Notification
function showToast(text) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${text}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// 11. Gestion du Générateur de Catalogue PDF
function openPdfModal() {
    const modal = document.getElementById('pdf-generator-modal');
    const overlay = document.getElementById('pdf-modal-overlay');
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closePdfModal() {
    const modal = document.getElementById('pdf-generator-modal');
    const overlay = document.getElementById('pdf-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function executePdfDownload() {
    closePdfModal();
    showToast('Téléchargement du catalogue PDF Casa Sushi en cours...');
    
    // Téléchargement direct du fichier PDF généré par le serveur Python
    const downloadLink = document.createElement('a');
    downloadLink.href = '/api/menu/pdf';
    downloadLink.download = 'Casa_Sushi_Menu_Tanger.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function initPdfDownloader() {
    const pdfOverlay = document.getElementById('pdf-modal-overlay');
    if (pdfOverlay) {
        pdfOverlay.addEventListener('click', closePdfModal);
    }
}

// 12. Défilement Fluide
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const el = document.querySelector(targetId);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// 13. Menu Navigation Mobile
function initMobileNavigation() {
    const toggleBtn = document.getElementById('mobile-menu-toggle-btn');
    const closeBtn = document.getElementById('close-mobile-nav-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-nav-overlay');

    if (!drawer || !overlay) return;

    function openMobileNav() {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobileNav();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileNav);
    }

    overlay.addEventListener('click', closeMobileNav);

    // Fermer le menu lors du clic sur un lien interne
    drawer.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            closeMobileNav();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeMobileNav();
        }
    });
}
