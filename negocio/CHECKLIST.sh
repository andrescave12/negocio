#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     🎯 CHECKLIST DE INSTALACIÓN Y CONFIGURACIÓN 🎯           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Helper function
check_item() {
    echo ""
    echo -e "${BLUE}→${NC} $1"
    read -p "  ¿Completado? (s/n): " response
    if [[ $response == "s" ]] || [[ $response == "S" ]]; then
        echo -e "${GREEN}  ✓ Completado${NC}"
    else
        echo -e "${YELLOW}  ⚠ Pendiente${NC}"
    fi
}

echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}FASE 1: PREPARACIÓN${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

check_item "¿Instalaste Node.js v18+?"
check_item "¿Instalaste PostgreSQL?"
check_item "¿Clonar/descargar el repositorio?"

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}FASE 2: CONFIGURACIÓN DEL BACKEND${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

check_item "¿Crear carpeta backend/ con su estructura?"
check_item "¿Copiar archivos TypeScript al backend/src/?"
check_item "¿Copiar backend-package.json → backend/package.json?"
check_item "¿npm install en la carpeta backend/?"
check_item "¿Crear base de datos PostgreSQL (accounting_db)?"
check_item "¿Configurar archivo .env del backend?"
check_item "¿Ejecutar npm run migrate?"
check_item "¿npm run dev en backend (port 3000)?"

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}FASE 3: CONFIGURACIÓN DEL FRONTEND${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

check_item "¿Crear carpeta frontend/ con su estructura?"
check_item "¿Copiar archivos React al frontend/src/?"
check_item "¿Copiar frontend-package.json → frontend/package.json?"
check_item "¿npm install en la carpeta frontend/?"
check_item "¿Configurar .env.local del frontend?"
check_item "¿npm run dev en frontend (port 5173)?"

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}FASE 4: PRUEBAS EN DESARROLLO${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

check_item "¿Acceder a http://localhost:5173?"
check_item "¿Registrarse con usuario de prueba?"
check_item "¿Crear un producto de prueba?"
check_item "¿Crear una factura de prueba?"
check_item "¿Verificar gráficos en reportes?"
check_item "¿Probar exportación a PDF?"
check_item "¿Probar exportación a Excel?"

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}FASE 5: DEPLOYMENT (OPCIONAL)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

check_item "¿Crear cuenta en Railway?"
check_item "¿Crear proyecto en Railway con PostgreSQL?"
check_item "¿Desplegar backend en Railway?"
check_item "¿Crear cuenta en Vercel?"
check_item "¿Conectar repo de GitHub a Vercel?"
check_item "¿Desplegar frontend en Vercel?"
check_item "¿Verificar URLs en producción?"

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}FASE 6: SEGURIDAD Y FINALIZACIÓN${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

check_item "¿Cambiar JWT_SECRET en producción?"
check_item "¿Actualizar CORS en backend para producción?"
check_item "¿Configurar variables de entorno en Railway?"
check_item "¿Configurar variables de entorno en Vercel?"
check_item "¿Probar autenticación en producción?"
check_item "¿Crear copia de seguridad de la BD?"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                ¡INSTALACIÓN COMPLETADA! ✨                     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Próximos pasos:"
echo "  1. Consulta SETUP.md para instalación detallada"
echo "  2. Consulta DEPLOY.md para deployment"
echo "  3. Consulta README.md para overview del proyecto"
echo ""
