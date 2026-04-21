# Script para iniciar la app - sin necesidad de npm install completo

$baseDir = "c:\Users\andre\Documents\negocio"
cd $baseDir

Write-Host "═══════════════════════════════════════════════════════════"
Write-Host "🚀 STARTUP SCRIPT - Accounting App Frontend"
Write-Host "═══════════════════════════════════════════════════════════"
Write-Host ""

# Paso 1: Verificar si node_modules existe
Write-Host "[1] Verificando instalación de paquetes..."
if (Test-Path "node_modules\.bin\vite.cmd") {
    Write-Host "✓ node_modules ya existe, saltando instalación"
} else {
    Write-Host "⏳ Instalando dependencias (espera 5-10 minutos)..."
    npm install --legacy-peer-deps --no-fund --no-audit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠ npm install falló, pero intentando continuar..."
    }
}

Write-Host ""
Write-Host "[2] Iniciando servidor de desarrollo..."
Write-Host "⏳ Por favor espera a que Vite se inicie..."
Write-Host ""

npm run dev

Write-Host ""
Write-Host "✓ Servidor detenido"
