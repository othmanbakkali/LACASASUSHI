import os
import sys
import tarfile
import tempfile
import paramiko

SERVER_IP = "198.199.75.86"
SERVER_USER = "root"
SERVER_PWD = "lOnohi_1989$tm"
DOMAIN = "lacasasushi.sdbo.ma"
REMOTE_DIR = "/var/www/lacasasushi"
ARCHIVE_NAME = "deploy_casa_sushi.tar.gz"

def create_local_archive(output_path):
    print("📦 Création de l'archive de déploiement...")
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    exclude_dirs = {'.git', '__pycache__', 'scratch', '.vscode', '.idea'}
    exclude_files = {'.DS_Store', 'deploy_casa_sushi.tar.gz', 'test_sec.py', 'test_menu.pdf', 'test_photo_menu.pdf'}
    
    def filter_func(tarinfo):
        base = os.path.basename(tarinfo.name)
        if base in exclude_dirs or base in exclude_files:
            return None
        if tarinfo.name.endswith('.pyc'):
            return None
        return tarinfo

    with tarfile.open(output_path, "w:gz") as tar:
        # Include core files and folders
        items_to_add = [
            'app.py',
            'requirements.txt',
            'casa_sushi.db',
            'index.html',
            'style.css',
            'app.js',
            'admin.html',
            'admin.js',
            'menu-pdf.html',
            'src',
            'scripts',
            'uploads'
        ]
        
        for item in items_to_add:
            full_path = os.path.join(root_dir, item)
            if os.path.exists(full_path):
                tar.add(full_path, arcname=item, filter=filter_func)
                print(f"  + Ajouté : {item}")
    
    archive_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"✅ Archive créée avec succès : {output_path} ({archive_size:.2f} Mo)\n")

def run_ssh_command(ssh, cmd, ignore_error=False):
    print(f"🚀 [SSH Exec] {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, get_pty=True)
    
    output_lines = []
    for line in iter(stdout.readline, ""):
        line_str = line.strip()
        if line_str:
            print(f"   | {line_str}")
            output_lines.append(line_str)
            
    exit_status = stdout.channel.recv_exit_status()
    if exit_status != 0 and not ignore_error:
        err_msg = "".join(stderr.readlines())
        print(f"❌ Erreur ({exit_status}) : {err_msg}")
        return False, output_lines
    return True, output_lines

def deploy():
    print(f"🔌 Connexion SSH à {SERVER_USER}@{SERVER_IP}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(
            hostname=SERVER_IP,
            port=22,
            username=SERVER_USER,
            password=SERVER_PWD,
            timeout=20,
            look_for_keys=False,
            allow_agent=False
        )
        print("✅ Connexion SSH réussie !\n")
    except Exception as e:
        print(f"❌ Échec de la connexion SSH : {e}")
        return False

    # 1. Vérifier l'OS et les dépendances du serveur
    print("🔍 Vérification de l'environnement serveur...")
    run_ssh_command(ssh, "lsb_release -d || cat /etc/os-release | grep PRETTY_NAME")
    run_ssh_command(ssh, "which python3 && which nginx && which certbot || echo 'Certains outils doivent être installés'")

    # 2. Préparer l'archive locale
    temp_dir = tempfile.gettempdir()
    local_archive_path = os.path.join(temp_dir, ARCHIVE_NAME)
    create_local_archive(local_archive_path)

    # 3. Transférer via SFTP
    print(f"📤 Téléversement de l'archive vers /root/{ARCHIVE_NAME}...")
    sftp = ssh.open_sftp()
    remote_archive_path = f"/root/{ARCHIVE_NAME}"
    
    def sftp_callback(transferred, total):
        pct = (transferred / total) * 100
        sys.stdout.write(f"\r   Transfert : {pct:.1f}% ({transferred}/{total} octets)")
        sys.stdout.flush()
        
    sftp.put(local_archive_path, remote_archive_path, callback=sftp_callback)
    sftp.close()
    print("\n✅ Archive téléversée avec succès !\n")

    # 4. Exécuter le script de déploiement et configuration
    remote_deploy_script = f"""#!/bin/bash
set -e

echo "=== 1. Préparation du répertoire applicatif ==="
mkdir -p {REMOTE_DIR}
mkdir -p {REMOTE_DIR}/uploads

# Sauvegarde de la base si elle existe déjà
if [ -f "{REMOTE_DIR}/casa_sushi.db" ]; then
    echo "Sauvegarde de sécurité de casa_sushi.db..."
    cp "{REMOTE_DIR}/casa_sushi.db" "{REMOTE_DIR}/casa_sushi.db.bak"
fi

tar -xzf /root/{ARCHIVE_NAME} -C {REMOTE_DIR}/

# Restaurer la base de prod si la sauvegarde existe pour ne pas perdre les commandes en direct
if [ -f "{REMOTE_DIR}/casa_sushi.db.bak" ]; then
    echo "Restauration de la base active..."
    mv "{REMOTE_DIR}/casa_sushi.db.bak" "{REMOTE_DIR}/casa_sushi.db"
fi

echo "=== 2. Installation des dépendances Python ==="
apt-get update -y > /dev/null 2>&1 || true
apt-get install -y python3 python3-pip python3-venv nginx certbot python3-certbot-nginx > /dev/null 2>&1 || true

if [ ! -d "{REMOTE_DIR}/venv" ]; then
    python3 -m venv {REMOTE_DIR}/venv
fi

{REMOTE_DIR}/venv/bin/pip install --upgrade pip > /dev/null 2>&1
{REMOTE_DIR}/venv/bin/pip install -r {REMOTE_DIR}/requirements.txt

echo "=== 3. Ajustement des permissions www-data ==="
chown -R www-data:www-data {REMOTE_DIR}
chmod -R 775 {REMOTE_DIR}
if [ -f "{REMOTE_DIR}/casa_sushi.db" ]; then
    chmod 664 {REMOTE_DIR}/casa_sushi.db
fi

echo "=== 4. Configuration et démarrage du Service Systemd ==="
cat << 'SERVICE_EOF' > /etc/systemd/system/lacasasushi.service
[Unit]
Description=Casa Sushi Python MVC Production Server
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory={REMOTE_DIR}
Environment="PORT=5055"
Environment="PATH={REMOTE_DIR}/venv/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart={REMOTE_DIR}/venv/bin/python app.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
SERVICE_EOF

systemctl daemon-reload
systemctl enable lacasasushi.service
systemctl restart lacasasushi.service

echo "=== 5. Configuration Nginx pour {DOMAIN} ==="
cat << 'NGINX_EOF' > /etc/nginx/sites-available/{DOMAIN}
upstream lacasasushi_backend {{
    server 127.0.0.1:5055;
}}

server {{
    listen 80;
    server_name {DOMAIN};
    return 301 https://$host$request_uri;
}}

server {{
    listen 443 ssl;
    server_name {DOMAIN};
    client_max_body_size 50M;

    ssl_certificate /etc/letsencrypt/live/{DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/{DOMAIN}/privkey.pem;

    location /uploads/ {{
        alias {REMOTE_DIR}/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }}

    location / {{
        proxy_pass http://lacasasushi_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }}
}}
NGINX_EOF

ln -sf /etc/nginx/sites-available/{DOMAIN} /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "=== 6. Statut final du service ==="
systemctl is-active lacasasushi.service
curl -I http://127.0.0.1:5055/ || true
"""
    
    print("⚙️  Exécution du script d'installation et de déploiement à distance...")
    # Sauvegarder le script sur le serveur et l'exécuter
    run_ssh_command(ssh, f"cat << 'SCRIPT_EOF' > /root/run_deploy.sh\n{remote_deploy_script}\nSCRIPT_EOF")
    run_ssh_command(ssh, "chmod +x /root/run_deploy.sh && /root/run_deploy.sh")
    
    # 5. Tester l'URL finale
    print(f"\n🌐 Test de réponse HTTP pour https://{DOMAIN}...")
    run_ssh_command(ssh, f"curl -ILs https://{DOMAIN} | head -n 15 || curl -ILs http://{DOMAIN} | head -n 15", ignore_error=True)

    ssh.close()
    print("\n🎉 Déploiement terminé avec succès !")
    return True

if __name__ == "__main__":
    success = deploy()
    sys.exit(0 if success else 1)

