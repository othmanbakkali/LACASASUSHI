"""
Contrôleur Produits (ProductController)
Architecture MVC - Python
"""

from src.models.product import ProductModel


class ProductController:
    @staticmethod
    def get_all():
        return ProductModel.get_all(), 200

    @staticmethod
    def get_one(product_id):
        product = ProductModel.get_by_id(product_id)
        if not product:
            return {'error': 'Plat non trouvé'}, 404
        return product, 200

    @staticmethod
    def create(data):
        if not data.get('name') or not data.get('price'):
            return {'error': 'Nom et prix obligatoires'}, 400
        new_id = ProductModel.create(data)
        return {'success': True, 'id': new_id}, 201

    @staticmethod
    def update(product_id, data):
        ProductModel.update(product_id, data)
        return {'success': True}, 200

    @staticmethod
    def update_stock(product_id, data):
        in_stock = data.get('inStock', True)
        ProductModel.update_stock(product_id, in_stock)
        return {'success': True}, 200

    @staticmethod
    def delete(product_id):
        ProductModel.delete(product_id)
        return {'success': True}, 200
