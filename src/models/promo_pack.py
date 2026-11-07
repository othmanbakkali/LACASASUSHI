"""
Modèle Pack Promotionnel (PromoPackModel) - Accès aux données SQLite
Architecture MVC - Python
"""

from src.config.database import get_db_connection


class PromoPackModel:
    @staticmethod
    def get_all():
        """Récupère tous les packs promotionnels."""
        conn = get_db_connection()
        rows = conn.execute("SELECT * FROM promo_packs ORDER BY created_at DESC").fetchall()
        conn.close()

        promos = []
        for r in rows:
            promos.append({
                'id': r['id'],
                'title': r['title'],
                'oldPrice': r['old_price'],
                'newPrice': r['new_price'],
                'badge': r['badge'],
                'startDate': r['start_date'],
                'endDate': r['end_date'],
                'description': r['description'],
                'image': r['image'],
                'active': bool(r['is_active'])
            })
        return promos

    @staticmethod
    def create(data):
        """Crée un nouveau pack promo."""
        conn = get_db_connection()
        promo_id = data.get('id') or f"promo-{int(data.get('timestamp', 0))}"
        conn.execute("""
            INSERT INTO promo_packs (id, title, old_price, new_price, badge, start_date, end_date, description, image, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            promo_id,
            data.get('title', ''),
            data.get('oldPrice'),
            float(data.get('newPrice', 0)),
            data.get('badge', 'PROMO'),
            data.get('startDate'),
            data.get('endDate'),
            data.get('description', ''),
            data.get('image', ''),
            1 if data.get('active', True) else 0
        ))
        conn.commit()
        conn.close()
        return promo_id

    @staticmethod
    def update(promo_id, data):
        """Met à jour un pack promo existant."""
        conn = get_db_connection()
        conn.execute("""
            UPDATE promo_packs SET 
                title = ?, old_price = ?, new_price = ?, badge = ?, 
                start_date = ?, end_date = ?, description = ?, image = ?, 
                is_active = ?
            WHERE id = ?
        """, (
            data.get('title', ''),
            data.get('oldPrice'),
            float(data.get('newPrice', 0)),
            data.get('badge', 'PROMO'),
            data.get('startDate'),
            data.get('endDate'),
            data.get('description', ''),
            data.get('image', ''),
            1 if data.get('active', True) else 0,
            promo_id
        ))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def delete(promo_id):
        """Supprime un pack promo."""
        conn = get_db_connection()
        conn.execute("DELETE FROM promo_packs WHERE id = ?", (promo_id,))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def count():
        """Nombre de packs actifs."""
        conn = get_db_connection()
        val = conn.execute("SELECT COUNT(*) as count FROM promo_packs WHERE is_active = 1").fetchone()['count']
        conn.close()
        return val
