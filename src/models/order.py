"""
Modèle Commande (OrderModel) - Accès aux données SQLite
Architecture MVC - Python
"""

import json
from datetime import datetime
from src.config.database import get_db_connection


class OrderModel:
    @staticmethod
    def get_all(status_filter=None):
        """Récupère les commandes triées par date décroissante."""
        conn = get_db_connection()
        if status_filter and status_filter != 'all':
            rows = conn.execute("SELECT * FROM orders WHERE status = ? ORDER BY id DESC", (status_filter,)).fetchall()
        else:
            rows = conn.execute("SELECT * FROM orders ORDER BY id DESC").fetchall()
        conn.close()

        orders = []
        for r in rows:
            orders.append({
                'id': r['id'],
                'order_number': r['order_number'],
                'client_name': r['client_name'],
                'client_phone': r['client_phone'],
                'client_address': r['client_address'],
                'order_type': r['order_type'],
                'items': json.loads(r['items'] or '[]'),
                'total_price': r['total_price'],
                'order_notes': r['order_notes'],
                'status': r['status'],
                'created_at': r['created_at']
            })
        return orders

    @staticmethod
    def create(data):
        """Enregistre une nouvelle commande client et génère son numéro de suivi CS-Année-Num."""
        conn = get_db_connection()
        last_row = conn.execute("SELECT id FROM orders ORDER BY id DESC LIMIT 1").fetchone()
        next_id = (last_row['id'] + 1) if last_row else 1
        year = datetime.now().year
        order_number = f"CS-{year}-{str(next_id).zfill(4)}"

        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO orders (order_number, client_name, client_phone, client_address, order_type, items, total_price, order_notes, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Nouvelle')
        """, (
            order_number,
            data.get('clientName', 'Client Casa Sushi'),
            data.get('clientPhone', ''),
            data.get('clientAddress', 'Sur place / À emporter'),
            data.get('orderType', 'Livraison'),
            json.dumps(data.get('items', [])),
            float(data.get('totalPrice', 0)),
            data.get('orderNotes', '')
        ))
        conn.commit()
        order_id = cursor.lastrowid
        conn.close()

        return {
            'orderId': order_id,
            'orderNumber': order_number,
            'totalPrice': data.get('totalPrice', 0)
        }

    @staticmethod
    def update_status(order_id, status):
        """Met à jour le statut d'une commande (En préparation, En livraison, Livrée, Annulée)."""
        conn = get_db_connection()
        conn.execute("UPDATE orders SET status = ? WHERE id = ?", (status, order_id))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def delete(order_id):
        """Supprime une commande."""
        conn = get_db_connection()
        conn.execute("DELETE FROM orders WHERE id = ?", (order_id,))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def get_stats():
        """Statistiques globales pour le dashboard."""
        conn = get_db_connection()
        total_orders = conn.execute("SELECT COUNT(*) as count FROM orders").fetchone()['count']
        pending_orders = conn.execute("SELECT COUNT(*) as count FROM orders WHERE status IN ('Nouvelle', 'En préparation')").fetchone()['count']
        total_sales_row = conn.execute("SELECT SUM(total_price) as sum FROM orders WHERE status != 'Annulée'").fetchone()
        total_sales = total_sales_row['sum'] or 0
        conn.close()

        return {
            'totalOrders': total_orders,
            'pendingOrders': pending_orders,
            'totalSales': total_sales
        }
