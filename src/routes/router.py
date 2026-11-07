"""
Routeur Principal API REST & Sécurisation des Routes (RBAC)
Architecture MVC - Python avec Validation de Tokens Signés HMAC
"""

from urllib.parse import urlparse, parse_qs
from src.controllers.product_controller import ProductController
from src.controllers.promo_controller import PromoController
from src.controllers.order_controller import OrderController
from src.controllers.category_controller import CategoryController
from src.controllers.user_controller import UserController
from src.controllers.upload_controller import UploadController
from src.controllers.auth_controller import AuthController
from src.controllers.pdf_controller import PdfController
from src.config.security import verify_signed_token


class ApiRouter:
    @staticmethod
    def _extract_auth_user(headers):
        """Extrait et valide le Bearer Token depuis les en-têtes HTTP."""
        if not headers:
            return None
        auth_header = headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return None
        token = auth_header[7:].strip()
        return verify_signed_token(token)

    @classmethod
    def handle_request(cls, method, path, body=None, headers=None, client_ip='127.0.0.1'):
        """Aiguille la requête HTTP et applique le contrôle d'accès sécurisé (RBAC)."""
        parsed_url = urlparse(path)
        pathname = parsed_url.path
        query_params = parse_qs(parsed_url.query)

        # Extraction de l'utilisateur authentifié
        auth_user = cls._extract_auth_user(headers)

        # ==========================================
        # 1. AUTHENTIFICATION & LOGIN
        # ==========================================
        if pathname == '/api/auth/login' and method == 'POST':
            return AuthController.login(body or {}, client_ip=client_ip)

        elif pathname == '/api/auth/change-pin' and method == 'POST':
            if not auth_user or auth_user.get('role') != 'admin':
                return {'error': 'Accès refusé. Rôle Super Admin requis.'}, 403
            return AuthController.change_pin(body or {}, auth_user=auth_user)

        # ==========================================
        # 2. PRODUITS (Lecture publique, Mutations protégées)
        # ==========================================
        elif pathname == '/api/products':
            if method == 'GET':
                return ProductController.get_all()
            elif method == 'POST':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return ProductController.create(body or {})

        elif pathname.startswith('/api/products/'):
            parts = pathname.split('/')
            product_id = parts[3] if len(parts) > 3 else None

            if len(parts) == 4:
                if method == 'GET':
                    return ProductController.get_one(product_id)
                elif method == 'PUT':
                    if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                        return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                    return ProductController.update(product_id, body or {})
                elif method == 'DELETE':
                    if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                        return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                    return ProductController.delete(product_id)

            elif len(parts) == 5 and parts[4] == 'stock' and method == 'PATCH':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager', 'cuisinier'):
                    return {'error': 'Accès refusé.'}, 403
                return ProductController.update_stock(product_id, body or {})

        # ==========================================
        # 3. CATÉGORIES (Lecture publique, Mutations protégées)
        # ==========================================
        elif pathname == '/api/categories':
            if method == 'GET':
                include_inactive = query_params.get('all', ['0'])[0] in ('1', 'true')
                return CategoryController.get_all(include_inactive)
            elif method == 'POST':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return CategoryController.create(body or {})

        elif pathname.startswith('/api/categories/'):
            parts = pathname.split('/')
            cat_id = parts[3] if len(parts) > 3 else None
            if method == 'GET':
                return CategoryController.get_one(cat_id)
            elif method == 'PUT':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return CategoryController.update(cat_id, body or {})
            elif method == 'DELETE':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return CategoryController.delete(cat_id)

        # ==========================================
        # 4. PACKS PROMO PÉRIODIQUES
        # ==========================================
        elif pathname == '/api/promos':
            if method == 'GET':
                return PromoController.get_all()
            elif method == 'POST':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return PromoController.create(body or {})

        elif pathname.startswith('/api/promos/'):
            parts = pathname.split('/')
            promo_id = parts[3] if len(parts) > 3 else None
            if method == 'PUT':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return PromoController.update(promo_id, body or {})
            elif method == 'DELETE':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé. Droits de gestion requis.'}, 403
                return PromoController.delete(promo_id)

        # ==========================================
        # 5. COMMANDES CLIENTS (Création publique, Suivi protégé)
        # ==========================================
        elif pathname == '/api/orders':
            if method == 'GET':
                if not auth_user:
                    return {'error': 'Authentification requise pour consulter les commandes.'}, 401
                status_filter = query_params.get('status', [None])[0]
                return OrderController.get_all(status_filter)
            elif method == 'POST':
                # Les clients peuvent passer commande sans token
                return OrderController.create(body or {})

        elif pathname.startswith('/api/orders/'):
            parts = pathname.split('/')
            order_id = int(parts[3]) if len(parts) > 3 and parts[3].isdigit() else None
            if method == 'PATCH':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager', 'cuisinier'):
                    return {'error': 'Accès refusé. Droits insuffisants.'}, 403
                return OrderController.update_status(order_id, body or {})
            elif method == 'DELETE':
                if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                    return {'error': 'Accès refusé.'}, 403
                return OrderController.delete(order_id)

        # ==========================================
        # 6. TABLEAU DE BORD & STATS (Protégé)
        # ==========================================
        elif pathname == '/api/stats' and method == 'GET':
            if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                return {'error': 'Accès refusé. Authentification requise.'}, 401
            return OrderController.get_stats()

        # ==========================================
        # 7. GESTION DES UTILISATEURS & DROITS (Super Admin Uniquement)
        # ==========================================
        elif pathname == '/api/users':
            if not auth_user or auth_user.get('role') != 'admin':
                return {'error': 'Accès strictement réservé au Super Administrateur.'}, 403
            if method == 'GET':
                return UserController.get_all()
            elif method == 'POST':
                return UserController.create(body or {})

        elif pathname.startswith('/api/users/'):
            if not auth_user or auth_user.get('role') != 'admin':
                return {'error': 'Accès strictement réservé au Super Administrateur.'}, 403
            parts = pathname.split('/')
            user_id = int(parts[3]) if len(parts) > 3 and parts[3].isdigit() else None
            if method == 'GET':
                return UserController.get_one(user_id)
            elif method == 'PUT':
                return UserController.update(user_id, body or {})
            elif method == 'DELETE':
                return UserController.delete(user_id)

        # ==========================================
        # 8. UPLOAD DE PHOTOS (Protégé & Chiffré)
        # ==========================================
        elif pathname == '/api/upload' and method == 'POST':
            if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
                return {'error': 'Accès refusé pour le téléversement.'}, 403
            return UploadController.handle_upload(body or {}, auth_user=auth_user)

        # ==========================================
        # 9. TÉLÉCHARGEMENT DIRECT DU CATALOGUE PDF (SERVEUR)
        # ==========================================
        elif pathname == '/api/menu/pdf' and method == 'GET':
            try:
                pdf_bytes = PdfController.generate_menu_pdf()
                return {
                    '_raw_pdf': pdf_bytes,
                    '_filename': 'Casa_Sushi_Menu_Tanger.pdf'
                }, 200
            except Exception as e:
                return {'error': f"Erreur génération PDF: {str(e)}"}, 500

        # Route non trouvée
        return None
