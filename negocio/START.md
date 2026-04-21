🚀 CÓMO PONER LA APP A FUNCIONAR - ¡MÁS SIMPLE POSIBLE!
═══════════════════════════════════════════════════════════════════════════════

⏱️ TIEMPO: 15 minutos

TIENES 2 OPCIONES:


╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║  OPCIÓN 1: 🤖 AUTOMÁTICO (LA MÁS FÁCIL) ⭐⭐⭐                            ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

PASO 1: Abre PowerShell
  • Presiona Windows + R
  • Escribe: powershell
  • Presiona Enter

PASO 2: Ve a la carpeta negocio
  Copia y pega esto:
  
  cd c:\Users\andre\Documents\negocio

PASO 3: Ejecuta el script automático
  Copia y pega esto:
  
  powershell -ExecutionPolicy Bypass -File setup-auto.ps1

PASO 4: Espera 🕐
  • El script va a:
    ✓ Crear carpetas
    ✓ Copiar archivos
    ✓ Instalar todo
    ✓ Crear la base de datos
    ✓ Iniciar backend y frontend automáticamente
  
  • Esto toma 5-10 minutos
  • ¡NO cierres la ventana!

PASO 5: Abre navegador
  • Ve a: http://localhost:5173
  • ¡Listo! La app está funcionando


╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║  OPCIÓN 2: 👨‍💻 MANUAL (PASO A PASO)                                      ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

PASO 1: Copiar archivos

Abre PowerShell en c:\Users\andre\Documents\negocio

Copia y pega TODA esta sección (incluyendo el texto entre líneas):

─────────────────────────────────────────────────────────────────────────────
# COPIAR ARCHIVOS BACKEND
mkdir backend\src\controllers
mkdir backend\src\middleware
mkdir backend\scripts
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

# COPIAR ARCHIVOS FRONTEND
mkdir frontend\src\components
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

# CREAR .env.local
@"
VITE_API_URL=http://localhost:3000/api
"@ | Out-File frontend\.env.local
─────────────────────────────────────────────────────────────────────────────

Presiona Enter para ejecutar todo.


PASO 2: Instalar backend

  cd backend
  npm install
  cd ..

Espera 5-10 minutos.


PASO 3: Crear base de datos

  psql -U postgres -c "CREATE DATABASE accounting_db;"

(Te va a pedir contraseña: teclea "password" y presiona Enter)


PASO 4: Instalar frontend

  cd frontend
  npm install
  cd ..

Espera 5-10 minutos nuevamente.


PASO 5: Ejecutar migraciones

  cd backend
  npm run migrate
  cd ..

Debes ver: "✅ Database migration completed successfully"


PASO 6: Iniciar backend (TERMINAL 1)

  cd backend
  npm run dev

Debes ver:
  🚀 Server running at http://localhost:3000
  ✅ Connected to database

¡NO cierres esta ventana!


PASO 7: Iniciar frontend (TERMINAL 2)

Abre NUEVA PowerShell (no cierres la anterior)

  cd c:\Users\andre\Documents\negocio
  cd frontend
  npm run dev

Debes ver:
  http://localhost:5173/

¡NO cierres esta ventana!


PASO 8: Abre navegador

  http://localhost:5173

¡LA APP ESTÁ CORRIENDO!


═════════════════════════════════════════════════════════════════════════════
PROBAR LA APP
═════════════════════════════════════════════════════════════════════════════

1. REGISTRARSE
   • Correo: test@example.com
   • Contraseña: password123
   • Haz clic en "Crear Cuenta"

2. VER DASHBOARD
   • Verás el menú con: Productos, Facturas, Gastos, Reportes

3. CREAR PRODUCTO
   • Haz clic en "📦 Productos"
   • "➕ Nuevo Producto"
   • Llena:
     - Código: PROD001
     - Nombre: Laptop
     - Costo: 800
     - Precio Base: 1200
     - Stock: 5
   • "Guardar Producto"

4. CREAR FACTURA
   • Haz clic en "📋 Facturas"
   • "➕ Nueva Factura"
   • Llena:
     - # Factura: INV001
     - Fecha: (hoy)
     - Selecciona: PROD001 - Laptop
     - Cantidad: 2
     - Precio: 1200
     - Margen: 15
   • "Crear Factura"

5. VER REPORTES
   • Haz clic en "📊 Reportes"
   • Verás:
     - Total Ventas
     - Total Gastos
     - Gráficos
     - Botones PDF/Excel

✓ ¡TODO FUNCIONA!


═════════════════════════════════════════════════════════════════════════════
❌ ERRORES Y SOLUCIONES
═════════════════════════════════════════════════════════════════════════════

❌ "npm: no se reconoce"
→ Instala Node.js: https://nodejs.org/

❌ "psql: no se reconoce"
→ Instala PostgreSQL: https://www.postgresql.org/

❌ "Port 3000 already in use"
→ Otro programa ocupa el puerto
→ Solución: Abre Task Manager, busca "node" y ciérralo

❌ "Cannot connect to database"
→ PostgreSQL no está corriendo
→ Solución: Abre Services, busca PostgreSQL, haz clic derecho y "Start"

❌ "Cannot GET /"
→ Backend no está corriendo
→ Verifica que ejecutaste "npm run dev" en backend

❌ "npm install es lento"
→ Es normal, puede tomar 10 minutos
→ No cierres la ventana

❌ Página en blanco en navegador
→ Abre DevTools: Presiona F12
→ Ve a Console
→ Busca mensajes de error


═════════════════════════════════════════════════════════════════════════════
💡 IMPORTANTE
═════════════════════════════════════════════════════════════════════════════

• NECESITAS 2 PowerShell abiertas:
  - Una para backend: cd backend && npm run dev
  - Otra para frontend: cd frontend && npm run dev

• AMBAS deben estar corriendo para que la app funcione

• Para apagar: Presiona Ctrl+C en cualquiera

• La próxima vez que inicies, solo repite:
  - Terminal 1: cd backend && npm run dev
  - Terminal 2: cd frontend && npm run dev
  - Navegador: http://localhost:5173


═════════════════════════════════════════════════════════════════════════════
📚 DOCUMENTACIÓN
═════════════════════════════════════════════════════════════════════════════

Si necesitas más detalles:

• GUIA-VISUAL.txt       → Diagrama visual con ASCII art
• INICIAR-APP.md        → Instrucciones ultra simples
• QUICK-START.md        → Guía paso a paso detallada
• SETUP.md              → Instalación completa
• README.md             → Descripción del proyecto


═════════════════════════════════════════════════════════════════════════════

✨ ¡LISTO! Tu aplicación contable está lista para usar ✨

Si tienes dudas, revisa alguno de estos archivos.
