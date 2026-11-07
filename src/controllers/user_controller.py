"""
Contrôleur Gestion des Utilisateurs & Droits (UserController)
Architecture MVC - Python
"""

from src.models.user import UserModel


class UserController:
    @staticmethod
    def get_all():
        return UserModel.get_all(), 200

    @staticmethod
    def get_one(user_id):
        user = UserModel.get_by_id(user_id)
        if not user:
            return {'error': 'Utilisateur non trouvé'}, 404
        return user, 200

    @staticmethod
    def create(data):
        if not data.get('username') or not data.get('password'):
            return {'error': 'Nom d\'utilisateur et mot de passe obligatoires'}, 400
        try:
            user_id = UserModel.create(data)
            return {'success': True, 'id': user_id}, 201
        except Exception as e:
            return {'error': 'Ce nom d\'utilisateur existe déjà'}, 400

    @staticmethod
    def update(user_id, data):
        UserModel.update(user_id, data)
        return {'success': True}, 200

    @staticmethod
    def delete(user_id):
        UserModel.delete(user_id)
        return {'success': True}, 200
