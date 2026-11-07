#!/bin/bash
set -e

echo "=== 1. Décompression des fichiers dans /var/www/lacasasushi ==="
mkdir -p /var/www/lacasasushi
tar -xzf /root/deploy_casa_sushi.tar.gz -C /var/www/lacasasushi/

echo "=== 2. Environnement virtuel Python ==="
python3 -m venv /var/www/lacasasushi/venv
/var/www/lacasasushi/venv/bin/pip install --upgrade pip
/var/www/lacasasushi/venv/bin/pip install -r /var/www/lacasasushi/requirements.txt

echo "=== 3. Permissions www-data ==="
chown -R www-data:www-data /var/www/lacasasushi
chmod -R 775 /var/www/lacasasushi
chmod 664 /var/www/lacasasushi/casa_sushi.db

echo "=== 4. Service Systemd ==="
cat << 'EOF' > /etc/systemd/system/lacasasushi.service
[Unit]
Description=Casa Sushi Python MVC Server
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/lacasasushi
Environment="PORT=5055"
Environment="PATH=/var/www/lacasasushi/venv/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart=/var/www/lacasasushi/venv/bin/python app.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now lacasasushi.service
systemctl restart lacasasushi.service

echo "=== 5. Configuration Nginx ==="
cat << 'EOF' > /etc/nginx/sites-available/lacasasushi.sdbo.ma
upstream lacasasushi_backend {
    server 127.0.0.1:5055;
}

server {
    server_name lacasasushi.sdbo.ma;
    client_max_body_size 50M;

    location /uploads/ {
        alias /var/www/lacasasushi/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        proxy_pass http://lacasasushi_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 80;
}
EOF

ln -sf /etc/nginx/sites-available/lacasasushi.sdbo.ma /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "=== 6. SSL Certbot ==="
certbot --nginx -d lacasasushi.sdbo.ma --non-interactive --agree-tos -m contact@lacasasushi.sdbo.ma --redirect || true

echo "=== 6. Statut du service ==="
systemctl is-active lacasasushi.service
