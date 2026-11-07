"""
Contrôleur Catégories (CategoryController)
Architecture MVC - Python
"""

from src.models.category import CategoryModel


class CategoryController:
    @staticmethod
    def get_all(include_inactive=False):
        return CategoryModel.get_all(include_inactive), 200

    @staticmethod
    def get_one(cat_id):
        cat = CategoryModel.get_by_id(cat_id)
        if not cat:
            return {'error': 'Catégorie non trouvée'}, 404
        return cat, 200

    @staticmethod
    def create(data):
        if not data.get('name'):
            return {'error': 'Le nom de la catégorie est obligatoire'}, 400
        cat_id = CategoryModel.create(data)
        return {'success': True, 'id': cat_id}, 201

    @staticmethod
    def update(cat_id, data):
        CategoryModel.update(cat_id, data)
        return {'success': True}, 200

    @staticmethod
    def delete(cat_id):
        CategoryModel.delete(cat_id)
        return {'success': True}, 200
