"""
Module de Sécurité & Cryptographie pour Casa Sushi
Architecture MVC - Python
- Hachage sécurisé des mots de passe (PBKDF2-HMAC-SHA256 avec sel)
- Génération et validation de Tokens signés HMAC (JWT-like)
- Protection contre les attaques par force brute (Rate Limiting)
- Sécurisation et chiffrement/obfuscation des chemins de fichiers
"""

import os
import hmac
import hashlib
import time
import json
import base64
import secrets

# Clé secrète du serveur pour la signature des tokens (générée ou persistée)
SECRET_KEY = os.environ.get('CASA_SECRET_KEY', 'casa_sushi_secret_jwt_hmac_key_2026_tanger_gastronomy_secure_salt_99')

# Stockage en mémoire pour le rate-limiting des tentatives de connexion
_login_attempts = {}


def hash_password(password: str, salt: str = None) -> str:
    """Hache un mot de passe avec PBKDF2-HMAC-SHA256 et un sel cryptographique."""
    if not salt:
        salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}:{key.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    """Vérifie un mot de passe contre son hash sécurisé ou hash de compatibilité."""
    if not stored_hash:
        return False

    # Format sécurisé avec sel (salt:hex)
    if ':' in stored_hash:
        salt, expected_hex = stored_hash.split(':', 1)
        actual_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return hmac.compare_digest(actual_key.hex(), expected_hex)
    
    # Rétro-compatibilité si mot de passe non encore migré
    return hmac.compare_digest(password, stored_hash)


def create_signed_token(user_id: int, username: str, role: str, expires_in_seconds: int = 86400) -> str:
    """Crée un token cryptographiquement signé avec expiration (durée 24h par défaut)."""
    payload = {
        'id': user_id,
        'username': username,
        'role': role,
        'exp': int(time.time()) + expires_in_seconds,
        'nonce': secrets.token_hex(8)
    }
    payload_json = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    payload_b64 = base64.urlsafe_b64encode(payload_json).decode('utf-8').rstrip('=')

    signature = hmac.new(SECRET_KEY.encode('utf-8'), payload_b64.encode('utf-8'), hashlib.sha256).hexdigest()
    return f"{payload_b64}.{signature}"


def verify_signed_token(token: str) -> dict:
    """Valide la signature et la date d'expiration d'un token. Retourne le payload ou None."""
    if not token or '.' not in token:
        return None

    try:
        parts = token.split('.', 1)
        if len(parts) != 2:
            return None

        payload_b64, signature = parts
        
        # Vérification de signature HMAC
        expected_sig = hmac.new(SECRET_KEY.encode('utf-8'), payload_b64.encode('utf-8'), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            return None

        # Décodage du payload avec padding
        padding = '=' * (-len(payload_b64) % 4)
        payload_json = base64.urlsafe_b64decode(payload_b64 + padding).decode('utf-8')
        payload = json.loads(payload_json)

        # Vérification de l'expiration
        if payload.get('exp', 0) < int(time.time()):
            return None

        return payload
    except Exception:
        return None


def is_rate_limited(ip_address: str, max_attempts: int = 5, window_seconds: int = 60) -> bool:
    """Vérifie si une adresse IP a dépassé le nombre maximal de tentatives de connexion."""
    now = time.time()
    attempts = _login_attempts.get(ip_address, [])

    # Nettoyage des anciennes tentatives hors fenêtre
    attempts = [t for t in attempts if now - t < window_seconds]
    _login_attempts[ip_address] = attempts

    if len(attempts) >= max_attempts:
        return True

    return False


def record_failed_login(ip_address: str):
    """Enregistre un échec de connexion pour le rate-limiting."""
    now = time.time()
    if ip_address not in _login_attempts:
        _login_attempts[ip_address] = []
    _login_attempts[ip_address].append(now)


def clear_login_attempts(ip_address: str):
    """Réinitialise les tentatives après une connexion réussie."""
    if ip_address in _login_attempts:
        del _login_attempts[ip_address]


def is_safe_path(base_dir: str, target_path: str) -> bool:
    """Protège contre les attaques de type Path Traversal (../)."""
    try:
        abs_base = os.path.abspath(base_dir)
        abs_target = os.path.abspath(target_path)
        common = os.path.commonpath([abs_base, abs_target])
        return common == abs_base
    except Exception:
        return False
