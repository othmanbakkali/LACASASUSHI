"""
CASA SUSHI - SERVEUR PRINCIPAL SÉCURISÉ & POINT D'ENTRÉE MVC (PYTHON)
=====================================================================
Architecture Modèle - Vue - Contrôleur avec SQLite3, Cryptographie & Sécurité
"""

import http.server
import socketserver
import json
import os
import mimetypes
from urllib.parse import urlparse
from src.config.database import init_database
from src.routes.router import ApiRouter
from src.config.security import is_safe_path

PORT = int(os.environ.get('PORT', 5000))
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


class CasaSushiHandler(http.server.BaseHTTPRequestHandler):
    def _add_security_headers(self):
        """Ajoute les en-têtes HTTP de sécurité renforcée."""
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def _send_json_response(self, data, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self._add_security_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def _send_binary_pdf(self, pdf_bytes, filename="Casa_Sushi_Menu_Tanger.pdf", status_code=200):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/pdf')
        self.send_header('Content-Disposition', f'attachment; filename="{filename}"; filename*=UTF-8\'\'{filename}')
        self.send_header('Content-Length', str(len(pdf_bytes)))
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self._add_security_headers()
        self.end_headers()
        self.wfile.write(pdf_bytes)

    def _parse_json_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length > 0:
            raw_body = self.rfile.read(content_length).decode('utf-8')
            try:
                return json.loads(raw_body)
            except Exception:
                return {}
        return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self._add_security_headers()
        self.end_headers()

    def do_GET(self):
        self._route_request('GET')

    def do_POST(self):
        self._route_request('POST')

    def do_PUT(self):
        self._route_request('PUT')

    def do_PATCH(self):
        self._route_request('PATCH')

    def do_DELETE(self):
        self._route_request('DELETE')

    def _route_request(self, method):
        parsed_url = urlparse(self.path)
        pathname = parsed_url.path
        client_ip = self.client_address[0] if self.client_address else '127.0.0.1'

        # 1. Requête API REST (Prise en charge sécurisée par le Routeur MVC)
        if pathname.startswith('/api/'):
            body = self._parse_json_body() if method in ('POST', 'PUT', 'PATCH') else None
            result = ApiRouter.handle_request(method, self.path, body, dict(self.headers), client_ip=client_ip)
            if result:
                data, status_code = result
                # Réponse binaire PDF directe
                if isinstance(data, dict) and '_raw_pdf' in data:
                    self._send_binary_pdf(data['_raw_pdf'], data.get('_filename', 'Casa_Sushi_Menu_Tanger.pdf'), status_code)
                else:
                    self._send_json_response(data, status_code)
            else:
                self._send_json_response({'error': 'Point de terminaison introuvable ou méthode non supportée'}, 404)
            return

        # 2. Fichiers Statiques Frontend (Vues & Assets avec protection Path Traversal)
        if method != 'GET':
            self.send_error(405, "Méthode non autorisée")
            return

        clean_path = pathname.lstrip('/')
        if not clean_path:
            clean_path = 'index.html'

        file_path = os.path.join(ROOT_DIR, clean_path)

        # Protection contre la fuite de chemins (Path Traversal ../)
        if not is_safe_path(ROOT_DIR, file_path) or not os.path.isfile(file_path):
            self.send_error(404, "Page Non Trouvée")
            return

        # Bloquer l'accès direct aux fichiers internes du serveur
        blocked_extensions = ('.db', '.py', '.pyc', '.git', '.env', '.log')
        if any(clean_path.endswith(ext) for ext in blocked_extensions) or 'src/' in clean_path:
            self.send_error(403, "Accès Interdit")
            return

        mime_type, _ = mimetypes.guess_type(file_path)
        if not mime_type:
            mime_type = 'application/octet-stream'

        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', mime_type)
            self.send_header('Content-Length', str(len(content)))
            self._add_security_headers()
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f"Erreur de lecture: {str(e)}")


def run_server():
    print("[*] Initialisation de la base SQLite, hachage des mots de passe et securite...")
    init_database()

    socketserver.TCPServer.allow_reuse_address = True

    with socketserver.TCPServer(("", PORT), CasaSushiHandler) as httpd:
        print("========================================================")
        print(f" CASA SUSHI - SERVEUR ACTIF : http://localhost:{PORT}")
        print(" Génération PDF Serveur : http://localhost:5000/api/menu/pdf")
        print(f" Site Client : http://localhost:{PORT}/index.html")
        print(f" Panel Admin : http://localhost:{PORT}/admin.html")
        print(f" Menu PDF    : http://localhost:{PORT}/menu-pdf.html")
        print("========================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[!] Arret du serveur Casa Sushi.")


if __name__ == '__main__':
    run_server()
