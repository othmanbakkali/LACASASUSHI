"""
Modèle Catégorie (CategoryModel) - Accès aux données SQLite
Architecture MVC - Python
"""

from src.config.database import get_db_connection


class CategoryModel:
    @staticmethod
    def get_all(include_inactive=False):
        """Récupère toutes les catégories ordonnées."""
        conn = get_db_connection()
        if include_inactive:
            rows = conn.execute("SELECT * FROM categories ORDER BY order_index ASC").fetchall()
        else:
            rows = conn.execute("SELECT * FROM categories WHERE is_active = 1 ORDER BY order_index ASC").fetchall()
        conn.close()

        categories = []
        for r in rows:
            categories.append({
                'id': r['id'],
                'name': r['name'],
                'icon': r['icon'] or 'fa-utensils',
                'orderIndex': r['order_index'],
                'isActive': bool(r['is_active'])
            })
        return categories

    @staticmethod
    def get_by_id(cat_id):
        conn = get_db_connection()
        r = conn.execute("SELECT * FROM categories WHERE id = ?", (cat_id,)).fetchone()
        conn.close()
        if not r:
            return None
        return {
            'id': r['id'],
            'name': r['name'],
            'icon': r['icon'] or 'fa-utensils',
            'orderIndex': r['order_index'],
            'isActive': bool(r['is_active'])
        }

    @staticmethod
    def create(data):
        cat_id = data.get('id') or data.get('name', '').lower().replace(' ', '_').replace('&', 'and')
        conn = get_db_connection()
        conn.execute("""
            INSERT INTO categories (id, name, icon, order_index, is_active)
            VALUES (?, ?, ?, ?, ?)
        """, (
            cat_id,
            data.get('name', ''),
            data.get('icon', 'fa-utensils'),
            int(data.get('orderIndex', 99)),
            1 if data.get('isActive', True) else 0
        ))
        conn.commit()
        conn.close()
        return cat_id

    @staticmethod
    def update(cat_id, data):
        conn = get_db_connection()
        conn.execute("""
            UPDATE categories SET 
                name = ?, icon = ?, order_index = ?, is_active = ?
            WHERE id = ?
        """, (
            data.get('name', ''),
            data.get('icon', 'fa-utensils'),
            int(data.get('orderIndex', 0)),
            1 if data.get('isActive', True) else 0,
            cat_id
        ))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def delete(cat_id):
        conn = get_db_connection()
        conn.execute("DELETE FROM categories WHERE id = ?", (cat_id,))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def count():
        conn = get_db_connection()
        val = conn.execute("SELECT COUNT(*) as count FROM categories WHERE is_active = 1").fetchone()['count']
        conn.close()
        return val
