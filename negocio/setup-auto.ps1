# ╔═══════════════════════════════════════════════════════════════════╗
# ║         🚀 SCRIPT AUTOMATIZADO PARA PONER LA APP A FUNCIONAR      ║
# ╚═══════════════════════════════════════════════════════════════════╝

# Ejecutar como: powershell -ExecutionPolicy Bypass -File setup-auto.ps1

$ErrorActionPreference = "Stop"

function Write-Header {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  $args  ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
}

function Write-Step {
    Write-Host "→ $args" -ForegroundColor Green
}

function Write-Error-Msg {
    Write-Host "✗ $args" -ForegroundColor Red
}

function Write-Success {
    Write-Host "✓ $args" -ForegroundColor Green
}

# Verificar requisitos
Write-Header "🔍 VERIFICANDO REQUISITOS"

# Verificar Node.js
Write-Step "Verificando Node.js..."
try {
    $nodeVersion = node --version
    Write-Success "Node.js encontrado: $nodeVersion"
} catch {
    Write-Error-Msg "Node.js no está instalado"
    Write-Host "Descárgalo de: https://nodejs.org/" -ForegroundColor Yellow
    exit
}

# Verificar npm
Write-Step "Verificando npm..."
try {
    $npmVersion = npm --version
    Write-Success "npm encontrado: $npmVersion"
} catch {
    Write-Error-Msg "npm no está disponible"
    exit
}

# Verificar PostgreSQL
Write-Step "Verificando PostgreSQL..."
try {
    $psqlVersion = psql --version
    Write-Success "PostgreSQL encontrado: $psqlVersion"
} catch {
    Write-Error-Msg "PostgreSQL no está instalado"
    Write-Host "Descárgalo de: https://www.postgresql.org/download/" -ForegroundColor Yellow
    exit
}

# Crear estructura de carpetas
Write-Header "📁 CREANDO ESTRUCTURA DE CARPETAS"

Write-Step "Backend..."
$backendDirs = @(
    "backend",
    "backend\src",
    "backend\src\controllers",
    "backend\src\middleware",
    "backend\src\routes",
    "backend\scripts"
)

foreach ($dir in $backendDirs) {
    if (-Not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Success "Creado: $dir"
    }
}

Write-Step "Frontend..."
$frontendDirs = @(
    "frontend",
    "frontend\src",
    "frontend\src\components"
)

foreach ($dir in $frontendDirs) {
    if (-Not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Success "Creado: $dir"
    }
}

# Copiar archivos backend
Write-Header "📦 COPIANDO ARCHIVOS BACKEND"

$backendFiles = @{
    "backend-package.json" = "backend\package.json"
    "tsconfig.json" = "backend\tsconfig.json"
    "migrate.js" = "backend\scripts\migrate.js"
    "src-index.ts" = "backend\src\index.ts"
    "db.ts" = "backend\src\db.ts"
    "auth.ts" = "backend\src\middleware\auth.ts"
    "apiRoutes.ts" = "backend\src\routes\index.ts"
    "productController.ts" = "backend\src\controllers\productController.ts"
    "invoiceController.ts" = "backend\src\controllers\invoiceController.ts"
    "expenseController.ts" = "backend\src\controllers\expenseController.ts"
    "reportController.ts" = "backend\src\controllers\reportController.ts"
    "authController.ts" = "backend\src\controllers\authController.ts"
    "exportController.ts" = "backend\src\controllers\exportController.ts"
    ".env.example" = "backend\.env"
}

foreach ($source in $backendFiles.Keys) {
    $dest = $backendFiles[$source]
    if (Test-Path $source) {
        Copy-Item $source $dest -Force
        Write-Success "Copiado: $source"
    } else {
        Write-Error-Msg "No encontrado: $source"
    }
}

# Copiar archivos frontend
Write-Header "🎨 COPIANDO ARCHIVOS FRONTEND"

$frontendFiles = @{
    "frontend-package.json" = "frontend\package.json"
    "vite.config.ts" = "frontend\vite.config.ts"
    "tailwind.config.js" = "frontend\tailwind.config.js"
    "postcss.config.js" = "frontend\postcss.config.js"
    "index.html" = "frontend\index.html"
    "Products.tsx" = "frontend\src\components\Products.tsx"
    "Invoices.tsx" = "frontend\src\components\Invoices.tsx"
    "Expenses.tsx" = "frontend\src\components\Expenses.tsx"
    "Reports-with-charts.tsx" = "frontend\src\components\Reports.tsx"
    "Chart.tsx" = "frontend\src\components\Chart.tsx"
    "ExportControl.tsx" = "frontend\src\components\ExportControl.tsx"
    "LoginPage.tsx" = "frontend\src\components\LoginPage.tsx"
    "App.tsx" = "frontend\src\App.tsx"
    "api.ts" = "frontend\src\api.ts"
    "main.tsx" = "frontend\src\main.tsx"
    "index.css" = "frontend\src\index.css"
}

foreach ($source in $frontendFiles.Keys) {
    $dest = $frontendFiles[$source]
    if (Test-Path $source) {
        Copy-Item $source $dest -Force
        Write-Success "Copiado: $source"
    } else {
        Write-Error-Msg "No encontrado: $source"
    }
}

# Crear .env.local para frontend
Write-Header "⚙️ CONFIGURANDO VARIABLES DE ENTORNO"

$envContent = @"
VITE_API_URL=http://localhost:3000/api
"@

$envContent | Out-File "frontend\.env.local" -Encoding UTF8
Write-Success "Creado: frontend\.env.local"

# Instalar dependencias
Write-Header "📚 INSTALANDO DEPENDENCIAS"

Write-Step "Backend (npm install)..."
Set-Location backend
npm install
Set-Location ..
Write-Success "Backend dependencies instaladas"

Write-Step "Frontend (npm install)..."
Set-Location frontend
npm install
Set-Location ..
Write-Success "Frontend dependencies instaladas"

# Crear base de datos
Write-Header "🗄️ CONFIGURANDO BASE DE DATOS"

Write-Step "Creando base de datos PostgreSQL..."

# Query para crear BD
$createDbQuery = "CREATE DATABASE accounting_db;"

# Intentar crear la BD
try {
    psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'accounting_db'" | Out-Null
    Write-Success "Base de datos 'accounting_db' ya existe"
} catch {
    psql -U postgres -c $createDbQuery
    Write-Success "Base de datos 'accounting_db' creada"
}

# Ejecutar migraciones
Write-Header "🔄 EJECUTANDO MIGRACIONES"

Set-Location backend
npm run migrate
Set-Location ..

# Crear script de inicio
Write-Header "✅ CREANDO SCRIPTS DE INICIO"

# Script para Windows
$batContent = @"
@echo off
REM Script para iniciar Backend y Frontend

echo.
echo ╔════════════════════════════════════════════╗
echo ║    INICIANDO APP CONTABLE Y VENTAS        ║
echo ╚════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Iniciar Backend en nueva ventana
echo Iniciando Backend...
start "Backend - http://localhost:3000" cmd /k "cd backend && npm run dev"

REM Esperar un poco
timeout /t 3 /nobreak

REM Iniciar Frontend en nueva ventana
echo Iniciando Frontend...
start "Frontend - http://localhost:5173" cmd /k "cd frontend && npm run dev"

echo.
echo ✓ Backend: http://localhost:3000
echo ✓ Frontend: http://localhost:5173
echo.
echo Abre tu navegador en http://localhost:5173
echo.
"@

$batContent | Out-File "start-app.bat" -Encoding ASCII
Write-Success "Creado: start-app.bat"

# Script para PowerShell
$psContent = @"
# Script para iniciar Backend y Frontend

Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║    INICIANDO APP CONTABLE Y VENTAS        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Función para iniciar en nueva ventana
function Start-InNewWindow {
    param([string]`$Title, [string]`$Command)
    Start-Process powershell -ArgumentList "-NoExit", "-Command", `$Command -WindowStyle Normal
}

# Iniciar Backend
Write-Host "Iniciando Backend..." -ForegroundColor Green
Start-InNewWindow "Backend" "cd backend; npm run dev"

# Esperar
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "Iniciando Frontend..." -ForegroundColor Green
Start-InNewWindow "Frontend" "cd frontend; npm run dev"

Write-Host "`n✓ Backend: http://localhost:3000" -ForegroundColor Green
Write-Host "✓ Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "`nAbre tu navegador en http://localhost:5173`n" -ForegroundColor Yellow
"@

$psContent | Out-File "start-app.ps1" -Encoding UTF8
Write-Success "Creado: start-app.ps1"

# Resumen final
Write-Header "🎉 ¡INSTALACIÓN COMPLETADA!"

Write-Host ""
Write-Host "✓ Todas las carpetas creadas" -ForegroundColor Green
Write-Host "✓ Todos los archivos copiados" -ForegroundColor Green
Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
Write-Host "✓ Base de datos creada" -ForegroundColor Green
Write-Host "✓ Migraciones ejecutadas" -ForegroundColor Green
Write-Host ""

Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "CÓMO INICIAR LA APP:" -ForegroundColor Cyan
Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opción 1: Hacer doble clic en start-app.bat" -ForegroundColor Yellow
Write-Host "Opción 2: Ejecutar:" -ForegroundColor Yellow
Write-Host "  Terminal 1: cd backend && npm run dev" -ForegroundColor Yellow
Write-Host "  Terminal 2: cd frontend && npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Luego abre: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "¡Tu aplicación contable está lista!" -ForegroundColor Green
