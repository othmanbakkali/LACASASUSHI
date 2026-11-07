"""
Modèle Paramètres & Authentification (SettingModel)
Architecture MVC - Python
"""

from src.config.database import get_db_connection


class SettingModel:
    @staticmethod
    def get(key, default=None):
        conn = get_db_connection()
        row = conn.execute("SELECT value FROM settings WHERE key = ?", (key,)).fetchone()
        conn.close()
        return row['value'] if row else default

    @staticmethod
    def set(key, value):
        conn = get_db_connection()
        conn.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (key, value))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def verify_pin(pin):
        correct_pin = SettingModel.get('admin_pin', 'admin123')
        return pin == correct_pin

    @staticmethod
    def update_pin(new_pin):
        return SettingModel.set('admin_pin', new_pin)
