"""
Modèle Produit (ProductModel) - Accès aux données SQLite
Architecture MVC - Python
"""

import json
from src.config.database import get_db_connection


class ProductModel:
    @staticmethod
    def get_all():
        """Récupère tous les plats triés."""
        conn = get_db_connection()
        rows = conn.execute("SELECT * FROM products ORDER BY rowid ASC").fetchall()
        conn.close()

        products = []
        for r in rows:
            products.append({
                'id': r['id'],
                'name': r['name'],
                'category': r['category'],
                'subcategory': r['subcategory'],
                'price': r['price'],
                'pieces': r['pieces'],
                'description': r['description'],
                'ingredients': json.loads(r['ingredients'] or '[]'),
                'tags': json.loads(r['tags'] or '[]'),
                'image': r['image'],
                'inStock': bool(r['in_stock']),
                'createdAt': r['created_at']
            })
        return products

    @staticmethod
    def get_by_id(product_id):
        """Récupère un plat par son ID."""
        conn = get_db_connection()
        r = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
        conn.close()
        if not r:
            return None
        return {
            'id': r['id'],
            'name': r['name'],
            'category': r['category'],
            'subcategory': r['subcategory'],
            'price': r['price'],
            'pieces': r['pieces'],
            'description': r['description'],
            'ingredients': json.loads(r['ingredients'] or '[]'),
            'tags': json.loads(r['tags'] or '[]'),
            'image': r['image'],
            'inStock': bool(r['in_stock'])
        }

    @staticmethod
    def create(data):
        """Crée un nouveau plat."""
        conn = get_db_connection()
        product_id = data.get('id') or f"custom-{int(data.get('timestamp', 0))}"
        conn.execute("""
            INSERT INTO products (id, name, category, subcategory, price, pieces, description, ingredients, tags, image, in_stock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            product_id,
            data.get('name', ''),
            data.get('category', ''),
            data.get('subcategory', ''),
            float(data.get('price', 0)),
            data.get('pieces', ''),
            data.get('description', ''),
            json.dumps(data.get('ingredients', [])),
            json.dumps(data.get('tags', [])),
            data.get('image', ''),
            1 if data.get('inStock', True) else 0
        ))
        conn.commit()
        conn.close()
        return product_id

    @staticmethod
    def update(product_id, data):
        """Met à jour un plat existant."""
        conn = get_db_connection()
        conn.execute("""
            UPDATE products SET 
                name = ?, category = ?, subcategory = ?, price = ?, 
                pieces = ?, description = ?, ingredients = ?, tags = ?, 
                image = ?, in_stock = ?
            WHERE id = ?
        """, (
            data.get('name', ''),
            data.get('category', ''),
            data.get('subcategory', ''),
            float(data.get('price', 0)),
            data.get('pieces', ''),
            data.get('description', ''),
            json.dumps(data.get('ingredients', [])),
            json.dumps(data.get('tags', [])),
            data.get('image', ''),
            1 if data.get('inStock', True) else 0,
            product_id
        ))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def update_stock(product_id, in_stock):
        """Active ou désactive la disponibilité d'un plat."""
        conn = get_db_connection()
        conn.execute("UPDATE products SET in_stock = ? WHERE id = ?", (1 if in_stock else 0, product_id))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def delete(product_id):
        """Supprime un plat de la base."""
        conn = get_db_connection()
        conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def count():
        """Nombre total de plats."""
        conn = get_db_connection()
        val = conn.execute("SELECT COUNT(*) as count FROM products").fetchone()['count']
        conn.close()
        return val
