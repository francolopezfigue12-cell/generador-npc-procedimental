@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
title Generador Procedimental de NPCs

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No se encontró Node.js en el sistema.
  echo Instala Node.js desde https://nodejs.org/ y vuelve a intentarlo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Falló la instalación de dependencias.
    pause
    exit /b 1
  )
)

node -e "setTimeout(function(){process.exit(1)},700);require('http').get('http://localhost:5185',function(res){var b='';res.on('data',function(c){b+=c});res.on('end',function(){process.exit(b.indexOf('Generador Procedimental de NPCs')!==-1?0:1)})}).on('error',function(){process.exit(1)})"
if not errorlevel 1 (
  echo El servidor ya está ejecutándose. Abriendo http://localhost:5185/ ...
  start "" "http://localhost:5185/"
  exit /b 0
)

echo ============================================================
echo   Iniciando Generador Procedimental de NPCs...
echo   URL local: http://localhost:5185/
echo.
echo   Se abrirá tu navegador automáticamente.
echo   No cierres esta ventana mientras uses la aplicación;
echo   ciérrala cuando quieras apagar el servidor.
echo ============================================================
echo.

call npm run dev -- --port 5185 --open
if errorlevel 1 (
  echo.
  echo [ERROR] El servidor se detuvo con errores.
  pause
)
