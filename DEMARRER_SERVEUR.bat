@echo off
title Casa Sushi - Serveur Python (Architecture MVC) & SQLite
echo ========================================================
echo   DEMARRAGE DE CASA SUSHI (Serveur Python MVC + SQLite)
echo ========================================================
echo.
echo Ouverture de l'application sur http://localhost:5000
echo.
start http://localhost:5000/index.html
start http://localhost:5000/admin.html
python app.py
pause
