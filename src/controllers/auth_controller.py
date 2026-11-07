"""
Contrôleur Authentification Sécurisée (AuthController)
Architecture MVC - Python avec Tokens Signés HMAC & Anti-Brute Force
"""

from src.models.user import UserModel
from src.models.setting import SettingModel
from src.config.security import (
    create_signed_token,
    is_rate_limited,
    record_failed_login,
    clear_login_attempts
)


class AuthController:
    @staticmethod
    def login(data, client_ip='127.0.0.1'):
        # 1. Protection Anti-Brute Force (Rate Limiting)
        if is_rate_limited(client_ip, max_attempts=5, window_seconds=60):
            return {
                'success': False,
                'message': 'Trop de tentatives échouées. Veuillez patienter 1 minute avant de réessayer.'
            }, 429

        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        pin = data.get('pin', '').strip()

        # 2. Authentification par Username / Password
        if username and password:
            user = UserModel.authenticate(username, password)
            if user:
                clear_login_attempts(client_ip)
                token = create_signed_token(user['id'], user['username'], user['role'])
                return {
                    'success': True,
                    'token': token,
                    'user': {
                        'id': user['id'],
                        'username': user['username'],
                        'fullName': user['fullName'],
                        'role': user['role']
                    }
                }, 200

            record_failed_login(client_ip)
            return {'success': False, 'message': 'Identifiant ou mot de passe incorrect'}, 401

        # 3. Fallback PIN (si fourni seul)
        if pin and SettingModel.verify_pin(pin):
            clear_login_attempts(client_ip)
            token = create_signed_token(1, 'admin', 'admin')
            return {
                'success': True,
                'token': token,
                'user': {
                    'username': 'admin',
                    'fullName': 'Super Administrateur',
                    'role': 'admin'
                }
            }, 200

        record_failed_login(client_ip)
        return {'success': False, 'message': 'Veuillez renseigner votre identifiant et mot de passe'}, 400

    @staticmethod
    def change_pin(data, auth_user=None):
        if not auth_user or auth_user.get('role') != 'admin':
            return {'error': 'Action non autorisée. Rôle Super Admin requis.'}, 403

        new_pin = data.get('newPin', '').strip()
        if len(new_pin) < 4:
            return {'error': 'Le mot de passe doit comporter au moins 4 caractères'}, 400
        SettingModel.update_pin(new_pin)
        return {'success': True}, 200
