"""
Contrôleur Packs Promo (PromoController)
Architecture MVC - Python
"""

from src.models.promo_pack import PromoPackModel


class PromoController:
    @staticmethod
    def get_all():
        return PromoPackModel.get_all(), 200

    @staticmethod
    def create(data):
        if not data.get('title') or not data.get('newPrice'):
            return {'error': 'Titre et prix promo obligatoires'}, 400
        new_id = PromoPackModel.create(data)
        return {'success': True, 'id': new_id}, 201

    @staticmethod
    def update(promo_id, data):
        PromoPackModel.update(promo_id, data)
        return {'success': True}, 200

    @staticmethod
    def delete(promo_id):
        PromoPackModel.delete(promo_id)
        return {'success': True}, 200
