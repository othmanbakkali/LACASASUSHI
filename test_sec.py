import urllib.request
import urllib.error
import json

def test_req(name, url, method='GET', data=None, headers=None):
    if headers is None:
        headers = {}
    req = urllib.request.Request(url, method=method)
    for k, v in headers.items():
        req.add_header(k, v)
    if data:
        req.data = json.dumps(data).encode('utf-8')
        req.add_header('Content-Type', 'application/json')
    try:
        res = urllib.request.urlopen(req)
        body = res.read().decode('utf-8')
        print(f"[OK] {name} -> Code: {res.status} | Extrait: {body[:60]}...")
        return res.status, body
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f"[SEC-BLOCKED] {name} -> Code: {e.code} | Reponse: {body[:60]}...")
        return e.code, body

print("=== 1. TEST ACCES PUBLIC ===")
test_req("Plats Publics", "http://localhost:5000/api/products")

print("\n=== 2. TEST PROTECTION SANS TOKEN (Doit bloquer 401/403) ===")
test_req("Commandes sans Token", "http://localhost:5000/api/orders")
test_req("Stats sans Token", "http://localhost:5000/api/stats")
test_req("Utilisateurs sans Token", "http://localhost:5000/api/users")

print("\n=== 3. AUTHENTIFICATION & OBTENTION DU TOKEN SIGNE HMAC ===")
code, body = test_req("Login Admin", "http://localhost:5000/api/auth/login", method="POST", data={"username":"admin", "password":"admin123"})
token = json.loads(body).get("token")

print("\n=== 4. TEST AVEC BEARER TOKEN ADMIN SIGNE (Doit autoriser 200) ===")
if token:
    test_req("Commandes avec Token Admin", "http://localhost:5000/api/orders", headers={"Authorization": f"Bearer {token}"})
    test_req("Stats avec Token Admin", "http://localhost:5000/api/stats", headers={"Authorization": f"Bearer {token}"})
    test_req("Users avec Token Admin", "http://localhost:5000/api/users", headers={"Authorization": f"Bearer {token}"})

print("\n=== 5. TEST PROTECTION CHEMINS & PATH TRAVERSAL (Doit bloquer 403/404) ===")
test_req("Path Traversal BDD", "http://localhost:5000/../casa_sushi.db")
test_req("Fichier Source Interne", "http://localhost:5000/src/config/database.py")
