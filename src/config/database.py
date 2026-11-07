"""
Configuration & Initialisation de la Base de Données SQLite pour Casa Sushi
Architecture MVC - Python
"""

import sqlite3
import os
import json

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'casa_sushi.db')
UPLOADS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'uploads')

os.makedirs(UPLOADS_DIR, exist_ok=True)


def get_db_connection():
    """Crée et retourne une connexion SQLite avec support dictionnaire (Row)."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    """Initialise le schéma de la base SQLite et injecte les données par défaut."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Table Utilisateurs (Gestion des rôles & droits)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'manager',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # 2. Table Catégories
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS categories (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            icon TEXT DEFAULT 'fa-utensils',
            order_index INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1
        )
    """)

    # 3. Table Produits
    cursor.execute("""
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
        )
    """)

    # 4. Table Packs Promotionnels
    cursor.execute("""
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
        )
    """)

    # 5. Table Commandes Clients
    cursor.execute("""
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
        )
    """)

    # 6. Table Paramètres
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    """)

    # Seed Utilisateurs par défaut
    cursor.execute("SELECT COUNT(*) as count FROM users")
    if cursor.fetchone()['count'] == 0:
        default_users = [
            ('admin', 'admin123', 'Super Administrateur', 'admin'),
            ('gerant', 'gerant123', 'Gérant Restaurant', 'manager'),
            ('cuisine', 'cuisine123', 'Chef Cuisine & Commandes', 'cuisinier')
        ]
        cursor.executemany("""
            INSERT INTO users (username, password, full_name, role)
            VALUES (?, ?, ?, ?)
        """, default_users)

    # Seed Catégories par défaut
    cursor.execute("SELECT COUNT(*) as count FROM categories")
    if cursor.fetchone()['count'] == 0:
        default_categories = [
            ('entrees', 'Entrées & Tapas', 'fa-drumstick-bite', 1),
            ('salades_soupes', 'Salades & Soupes', 'fa-bowl-rice', 2),
            ('makis_california', 'Makis & California', 'fa-circle-dot', 3),
            ('casa_rolls', 'Casa Rolls & Spéciaux', 'fa-award', 4),
            ('aromaki_style', 'Aromaki & New Style', 'fa-gem', 5),
            ('nigiri_gunkan_tataki', 'Nigiri, Gunkan & Tataki', 'fa-fish-fins', 6),
            ('frits_pizza', 'Sushi Frits & Pizzas', 'fa-fire-flame-curved', 7),
            ('bentos', 'Bentos Complets', 'fa-box-open', 8),
            ('plats_chauds', 'Plats Chauds & Woks', 'fa-fire', 9),
            ('brochettes_nouilles_riz', 'Yakitori, Nouilles & Riz', 'fa-bowl-food', 10),
            ('assortiments', 'Assortiments & Plateaux', 'fa-layer-group', 11),
            ('boissons_desserts', 'Desserts & Boissons', 'fa-mug-hot', 12)
        ]
        cursor.executemany("""
            INSERT INTO categories (id, name, icon, order_index, is_active)
            VALUES (?, ?, ?, ?, 1)
        """, default_categories)

    # Seed initial des packs promo si vide
    cursor.execute("SELECT COUNT(*) as count FROM promo_packs")
    if cursor.fetchone()['count'] == 0:
        cursor.execute("""
            INSERT INTO promo_packs (id, title, old_price, new_price, badge, start_date, end_date, description, image, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        """, (
            'promo-pack-1',
            'Pack Duo Évasion (32 Pièces)',
            260.0,
            199.0,
            '-25% PROMO DUO',
            '2026-08-01',
            '2026-09-30',
            '8pcs California Saumon Cheese + 8pcs Dragon Eye + 8pcs Crunchy Crevette + 8pcs Maki Avocat + 2 Boissons offertes',
            'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
        ))
        cursor.execute("""
            INSERT INTO promo_packs (id, title, old_price, new_price, badge, start_date, end_date, description, image, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        """, (
            'promo-pack-2',
            'Mega Box Weekend Festin (50 Pièces)',
            380.0,
            299.0,
            'OFFRE LIMITÉE',
            '2026-08-01',
            '2026-10-31',
            'Plateau familial complet : Assortiment Crunchy, Roll Norvégien, Ebi Fry, Tataki Saumon, Nems dorés et sauces.',
            'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
        ))

    conn.commit()
    conn.close()
