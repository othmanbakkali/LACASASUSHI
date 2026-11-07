"""
Contrôleur Commandes & Statistiques (OrderController)
Architecture MVC - Python
"""

from src.models.order import OrderModel
from src.models.product import ProductModel
from src.models.promo_pack import PromoPackModel


class OrderController:
    @staticmethod
    def get_all(status_filter=None):
        orders = OrderModel.get_all(status_filter)
        return orders, 200

    @staticmethod
    def create(data):
        if not data.get('items') or not data.get('clientName'):
            return {'error': 'Informations de commande incomplètes'}, 400
        result = OrderModel.create(data)
        return {
            'success': True,
            'orderId': result['orderId'],
            'orderNumber': result['orderNumber'],
            'totalPrice': result['totalPrice']
        }, 201

    @staticmethod
    def update_status(order_id, data):
        new_status = data.get('status')
        if not new_status:
            return {'error': 'Statut requis'}, 400
        OrderModel.update_status(order_id, new_status)
        return {'success': True}, 200

    @staticmethod
    def delete(order_id):
        OrderModel.delete(order_id)
        return {'success': True}, 200

    @staticmethod
    def get_stats():
        stats = OrderModel.get_stats()
        stats['totalProducts'] = ProductModel.count()
        stats['activePromos'] = PromoPackModel.count()
        return stats, 200
