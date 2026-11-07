"""
Modèle Utilisateur (UserModel) - Gestion des Utilisateurs & Rôles
Architecture MVC - Python avec Hachage Sécurisé PBKDF2
"""

from src.config.database import get_db_connection
from src.config.security import hash_password, verify_password


class UserModel:
    @staticmethod
    def get_all():
        """Récupère tous les utilisateurs (sans exposer les hashs de mots de passe)."""
        conn = get_db_connection()
        rows = conn.execute("SELECT id, username, full_name, role, created_at FROM users ORDER BY id ASC").fetchall()
        conn.close()

        users = []
        for r in rows:
            users.append({
                'id': r['id'],
                'username': r['username'],
                'fullName': r['full_name'],
                'role': r['role'],
                'createdAt': r['created_at']
            })
        return users

    @staticmethod
    def get_by_id(user_id):
        conn = get_db_connection()
        r = conn.execute("SELECT id, username, full_name, role, created_at FROM users WHERE id = ?", (user_id,)).fetchone()
        conn.close()
        if not r:
            return None
        return {
            'id': r['id'],
            'username': r['username'],
            'fullName': r['full_name'],
            'role': r['role'],
            'createdAt': r['created_at']
        }

    @staticmethod
    def authenticate(username, password):
        """Vérifie le login & mot de passe avec hachage sécurisé et migration automatique si nécessaire."""
        conn = get_db_connection()
        r = conn.execute("SELECT * FROM users WHERE username = ?", (username.strip(),)).fetchone()
        
        if not r:
            conn.close()
            return None

        stored_password_hash = r['password']
        if not verify_password(password, stored_password_hash):
            conn.close()
            return None

        # Si le mot de passe stocké n'était pas encore haché avec sel (salt:hex), on le migre automatiquement
        if ':' not in stored_password_hash:
            new_hash = hash_password(password)
            conn.execute("UPDATE users SET password = ? WHERE id = ?", (new_hash, r['id']))
            conn.commit()

        user_data = {
            'id': r['id'],
            'username': r['username'],
            'fullName': r['full_name'],
            'role': r['role']
        }
        conn.close()
        return user_data

    @staticmethod
    def create(data):
        """Crée un utilisateur avec mot de passe haché de manière sécurisée."""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        raw_password = data.get('password', '').strip()
        secure_hash = hash_password(raw_password)

        cursor.execute("""
            INSERT INTO users (username, password, full_name, role)
            VALUES (?, ?, ?, ?)
        """, (
            data.get('username', '').strip(),
            secure_hash,
            data.get('fullName', '').strip(),
            data.get('role', 'manager').strip()
        ))
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        return user_id

    @staticmethod
    def update(user_id, data):
        """Met à jour un utilisateur (avec nouveau hash si mot de passe fourni)."""
        conn = get_db_connection()
        if data.get('password'):
            secure_hash = hash_password(data.get('password').strip())
            conn.execute("""
                UPDATE users SET 
                    username = ?, password = ?, full_name = ?, role = ?
                WHERE id = ?
            """, (
                data.get('username', '').strip(),
                secure_hash,
                data.get('fullName', '').strip(),
                data.get('role', 'manager').strip(),
                user_id
            ))
        else:
            conn.execute("""
                UPDATE users SET 
                    username = ?, full_name = ?, role = ?
                WHERE id = ?
            """, (
                data.get('username', '').strip(),
                data.get('fullName', '').strip(),
                data.get('role', 'manager').strip(),
                user_id
            ))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def delete(user_id):
        conn = get_db_connection()
        conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
        conn.commit()
        conn.close()
        return True
