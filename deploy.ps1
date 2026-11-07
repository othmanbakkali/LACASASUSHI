# Script de déploiement en 1 clic pour Casa Sushi vers https://lacasasushi.sdbo.ma/
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  CASA SUSHI - DEPLOIEMENT EN DIRECT SUR SERVEUR DISTANT" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$serverIp = "198.199.75.86"
$domain = "https://lacasasushi.sdbo.ma/"

Write-Host "`nCible : root@$serverIp ($domain)" -ForegroundColor Yellow
Write-Host "Execution du script Python de deploiement..." -ForegroundColor Gray

python scripts\deploy.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Deploiement termine avec succes !" -ForegroundColor Green
    Write-Host "Le site est accessible sur : $domain" -ForegroundColor Green
} else {
    Write-Host "`n[ERREUR] Une erreur est survenue lors du deploiement." -ForegroundColor Red
}

