"""
Contrôleur Téléversement Sécurisé & Obfuscation des Fichiers (UploadController)
Architecture MVC - Python
"""

import os
import time
import base64
import secrets
import hashlib
from src.config.database import UPLOADS_DIR
from src.config.security import is_safe_path


class UploadController:
    @staticmethod
    def handle_upload(data, auth_user=None):
        # 1. Vérification des droits d'accès
        if not auth_user or auth_user.get('role') not in ('admin', 'manager'):
            return {'error': 'Accès refusé. Droits administrateur ou gérant requis.'}, 403

        raw_data = data.get('data')
        if not raw_data:
            return {'error': 'Données d\'image manquantes'}, 400

        try:
            # 2. Validation du format Base64
            if ',' in raw_data:
                header, encoded = raw_data.split(',', 1)
            else:
                encoded = raw_data
                header = ''

            # 3. Validation stricte du type MIME
            allowed_types = {
                'image/jpeg': '.jpg',
                'image/png': '.png',
                'image/webp': '.webp',
                'image/gif': '.gif'
            }

            ext = '.jpg'
            for mime, extension in allowed_types.items():
                if mime in header:
                    ext = extension
                    break

            # 4. Obfuscation & Chiffrement du nom de fichier (Hash SHA-256 + Token aléatoire)
            random_token = secrets.token_hex(16)
            timestamp = int(time.time())
            filename_hash = hashlib.sha256(f"{timestamp}_{random_token}".encode('utf-8')).hexdigest()[:24]
            filename = f"cs_{filename_hash}{ext}"

            file_path = os.path.join(UPLOADS_DIR, filename)

            # 5. Protection Path Traversal
            if not is_safe_path(UPLOADS_DIR, file_path):
                return {'error': 'Tentative d\'accès non sécurisé'}, 400

            image_bytes = base64.b64decode(encoded)
            
            # Limite taille (max 10MB)
            if len(image_bytes) > 10 * 1024 * 1024:
                return {'error': 'La taille de l\'image ne doit pas dépasser 10 Mo'}, 400

            with open(file_path, 'wb') as f:
                f.write(image_bytes)

            file_url = f"/uploads/{filename}"
            return {'success': True, 'url': file_url, 'filename': filename}, 201
        except Exception as e:
            return {'error': f"Erreur de téléversement: {str(e)}"}, 500
