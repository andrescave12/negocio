╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║              🚀 INSTRUCCIONES ULTRA SIMPLES (COPIA Y PEGA) 🚀                 ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝

═════════════════════════════════════════════════════════════════════════════════
OPCIÓN 1: AUTOMÁTICO (RECOMENDADO) ⭐
═════════════════════════════════════════════════════════════════════════════════

1. Abre PowerShell en la carpeta negocio
2. Copia y pega ESTO:

    powershell -ExecutionPolicy Bypass -File setup-auto.ps1

3. Espera 5-10 minutos a que instale todo
4. Se abrirán 2 ventanas automáticamente
5. Abre navegador en: http://localhost:5173

¡LISTO! ✓

═════════════════════════════════════════════════════════════════════════════════
OPCIÓN 2: MANUAL (PASO A PASO)
═════════════════════════════════════════════════════════════════════════════════

PRIMER PASO: Crear carpetas

Abre PowerShell en c:\Users\andre\Documents\negocio y ejecuta:

    mkdir backend/src/controllers
    mkdir backend/src/middleware
    mkdir backend/scripts
    mkdir frontend/src/components

SEGUNDO PASO: Copiar archivos backend

Todavía en PowerShell, ejecuta TODO esto:

    copy backend-package.json backend\package.json
    copy tsconfig.json backend\
    copy migrate.js backend\scripts\
    copy src-index.ts backend\src\index.ts
    copy db.ts backend\src\
    copy auth.ts backend\src\middleware\auth.ts
    copy apiRoutes.ts backend\src\routes\index.ts
    copy productController.ts backend\src\controllers\
    copy invoiceController.ts backend\src\controllers\
    copy expenseController.ts backend\src\controllers\
    copy reportController.ts backend\src\controllers\
    copy authController.ts backend\src\controllers\
    copy exportController.ts backend\src\controllers\
    copy .env.example backend\.env

TERCER PASO: Instalar backend

    cd backend
    npm install
    cd ..

CUARTO PASO: Crear base de datos

    psql -U postgres -c "CREATE DATABASE accounting_db;"

QUINTO PASO: Copiar archivos frontend

    copy frontend-package.json frontend\package.json
    copy vite.config.ts frontend\
    copy tailwind.config.js frontend\
    copy postcss.config.js frontend\
    copy index.html frontend\
    copy Products.tsx frontend\src\components\
    copy Invoices.tsx frontend\src\components\
    copy Expenses.tsx frontend\src\components\
    copy Reports-with-charts.tsx frontend\src\components\Reports.tsx
    copy Chart.tsx frontend\src\components\
    copy ExportControl.tsx frontend\src\components\
    copy LoginPage.tsx frontend\src\components\
    copy App.tsx frontend\src\
    copy api.ts frontend\src\
    copy main.tsx frontend\src\
    copy index.css frontend\src\

SEXTO PASO: Instalar frontend

    cd frontend
    npm install
    cd ..

SÉPTIMO PASO: Crear .env.local

Crea un archivo frontend\.env.local con este contenido:

    VITE_API_URL=http://localhost:3000/api

OCTAVO PASO: Ejecutar migraciones

    cd backend
    npm run migrate
    cd ..

NOVENO PASO: Iniciar backend

TERMINAL 1:

    cd backend
    npm run dev

Debes ver: "🚀 Server running at http://localhost:3000"

DÉCIMO PASO: Iniciar frontend

TERMINAL 2 (nueva PowerShell):

    cd frontend
    npm run dev

Debes ver: "http://localhost:5173/"

UNDÉCIMO PASO: Abre navegador

    http://localhost:5173

¡LISTO! ✓

═════════════════════════════════════════════════════════════════════════════════
PRUEBAS RÁPIDAS
═════════════════════════════════════════════════════════════════════════════════

1. Regístrate:
   - Correo: test@example.com
   - Contraseña: password123

2. Crea producto:
   - Código: PROD001
   - Nombre: Test
   - Costo: 100
   - Precio: 150
   - Stock: 10

3. Crea factura:
   - # Factura: INV001
   - Selecciona el producto
   - Cantidad: 2
   - Margen: 20

4. Ve a Reportes:
   - Verás los números
   - Gráficos
   - Botones PDF/Excel

✓ TODO FUNCIONANDO

═════════════════════════════════════════════════════════════════════════════════
🛑 ERRORES COMUNES Y SOLUCIONES
═════════════════════════════════════════════════════════════════════════════════

❌ "npm no se reconoce"
→ Instala Node.js desde https://nodejs.org/

❌ "psql no se reconoce"
→ Instala PostgreSQL desde https://www.postgresql.org/

❌ "Port 3000 already in use"
→ Abre Task Manager, busca node.exe, y ciérralo
→ O cambia PORT en backend/.env

❌ "Cannot GET /"
→ Asegúrate que backend está corriendo (npm run dev)

❌ "Database connection failed"
→ Abre Services, verifica que PostgreSQL está Running
→ Si no, reinicia PostgreSQL

❌ "npm install es muy lento"
→ Es normal, puede tomar 5-10 minutos
→ NO cierres la ventana

═════════════════════════════════════════════════════════════════════════════════
💡 TIPS
═════════════════════════════════════════════════════════════════════════════════

• Cada vez que inicies, necesitas 2 PowerShell:
  - Una con backend
  - Una con frontend

• Los cambios en código se actualizan automáticamente (HMR)

• F12 en navegador abre DevTools para ver errores

• Ctrl+C detiene cualquiera de los servidores

• La base de datos persiste entre reinicios

═════════════════════════════════════════════════════════════════════════════════
✅ VERIFICACIÓN FINAL
═════════════════════════════════════════════════════════════════════════════════

Antes de comenzar, verifica:

☐ Node.js instalado:     node --version
☐ npm instalado:         npm --version
☐ PostgreSQL instalado:  psql --version

Si todos muestran versiones, ¡estás listo!

═════════════════════════════════════════════════════════════════════════════════

¡ÉXITO! 🚀✨

Si necesitas ayuda, revisa QUICK-START.md para más detalles.
