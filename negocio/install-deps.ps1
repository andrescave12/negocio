
# Script para instalar dependencias con monitoreo
cd "c:\Users\andre\Documents\negocio"

Write-Host "🗑️ Limpiando node_modules antiguo..."
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
}

Write-Host "🔄 Ejecutando npm install..."
$startTime = Get-Date

# Ejecutar npm install y mostrar output en tiempo real
npm install 2>&1 | ForEach-Object {
    $elapsed = (Get-Date) - $startTime
    Write-Host "[$('{0:hh\:mm\:ss}' -f $elapsed)] $_"
    
    # Si pasa más de 3 minutos sin completar, avisar
    if ($elapsed.TotalSeconds -gt 180) {
        Write-Host "⚠️  WARNING: npm install lleva más de 3 minutos. Espera un poco más..."
    }
}

$endTime = Get-Date
$duration = $endTime - $startTime

if (Test-Path "node_modules") {
    $count = @(Get-ChildItem node_modules -ErrorAction SilentlyContinue).Count
    Write-Host ""
    Write-Host "✅ npm install COMPLETÓ en $('{0:hh\:mm\:ss}' -f $duration)"
    Write-Host "📦 $count paquetes instalados"
} else {
    Write-Host ""
    Write-Host "❌ npm install FALLÓ"
    exit 1
}
