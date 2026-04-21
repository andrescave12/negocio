╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║         🚀 GUÍA PRÁCTICA: PONER LA APP A FUNCIONAR (PASO A PASO) 🚀           ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝

⏱️ TIEMPO ESTIMADO: 15-20 minutos

═════════════════════════════════════════════════════════════════════════════════
REQUISITO PREVIO: Instalar Software Necesario
═════════════════════════════════════════════════════════════════════════════════

PASO 0A: Descargar Node.js (si no lo tienes)
─────────────────────────────────────────────
1. Ve a https://nodejs.org/
2. Descarga "LTS" (versión estable)
3. Instala haciendo clic en siguiente/siguiente
4. Abre PowerShell y verifica:
   
   node --version
   npm --version
   
   (Debes ver algo como v18.x.x y 9.x.x)

PASO 0B: Descargar PostgreSQL (si no lo tienes)
────────────────────────────────────────────────
1. Ve a https://www.postgresql.org/download/windows/
2. Descarga el instalador
3. Instala con contraseña: "password" (temporalmente)
4. Deja el puerto: 5432
5. Abre PowerShell y verifica:
   
   psql --version
   
   (Debes ver algo como psql (PostgreSQL) 15.x)

═════════════════════════════════════════════════════════════════════════════════
PASO 1: PREPARAR CARPETAS
═════════════════════════════════════════════════════════════════════════════════

1. Abre PowerShell
2. Navega a tu carpeta negocio:
   
   cd c:\Users\andre\Documents\negocio
   
3. Lista los archivos:
   
   ls
   
   (Debes ver: App.tsx, backend-package.json, frontend-package.json, etc.)

4. Crea estructura de carpetas:
   
   mkdir backend
   mkdir backend\src
   mkdir backend\src\controllers
   mkdir backend\src\middleware
   mkdir backend\scripts
   mkdir frontend
   mkdir frontend\src
   mkdir frontend\src\components

═════════════════════════════════════════════════════════════════════════════════
PASO 2: CONFIGURAR BACKEND
═════════════════════════════════════════════════════════════════════════════════

PASO 2.1: Copiar archivos de backend
─────────────────────────────────────

En PowerShell, dentro de c:\Users\andre\Documents\negocio:

# Copiar configuración
copy backend-package.json backend\package.json
copy tsconfig.json backend\
copy migrate.js backend\scripts\

# Copiar archivos de código
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

# Copiar variables de entorno
copy .env.example backend\.env

PASO 2.2: Instalar dependencias del backend
────────────────────────────────────────────

cd backend
npm install

Espera a que termine (3-5 minutos). Verás:

    added XXX packages in Xs

PASO 2.3: Crear base de datos PostgreSQL
─────────────────────────────────────────

Abre nueva PowerShell y ejecuta:

psql -U postgres

(Te pide contraseña: escribe "password" y presiona Enter)

Luego ejecuta:

CREATE DATABASE accounting_db;
\q

✓ Base de datos creada

PASO 2.4: Ejecutar migraciones (crear tablas)
──────────────────────────────────────────────

En PowerShell dentro de backend/:

npm run migrate

Debes ver:

    🔄 Running database migrations...
    ✅ Database migration completed successfully

✓ Tablas creadas automáticamente

PASO 2.5: Iniciar el backend
─────────────────────────────

Todavía en backend/:

npm run dev

Debes ver:

    🚀 Server running at http://localhost:3000
    ✅ Connected to database

¡Backend listo! ✓

═════════════════════════════════════════════════════════════════════════════════
PASO 3: CONFIGURAR FRONTEND
═════════════════════════════════════════════════════════════════════════════════

PASO 3.1: Abrir NUEVA PowerShell
────────────────────────────────

(No cierres la que tiene el backend, abre otra)

cd c:\Users\andre\Documents\negocio

PASO 3.2: Copiar archivos de frontend
──────────────────────────────────────

# Copiar configuración
copy frontend-package.json frontend\package.json
copy vite.config.ts frontend\
copy tailwind.config.js frontend\
copy postcss.config.js frontend\
copy index.html frontend\

# Copiar archivos de código - componentes
copy Products.tsx frontend\src\components\
copy Invoices.tsx frontend\src\components\
copy Expenses.tsx frontend\src\components\
copy Reports-with-charts.tsx frontend\src\components\Reports.tsx
copy Chart.tsx frontend\src\components\
copy ExportControl.tsx frontend\src\components\
copy LoginPage.tsx frontend\src\components\

# Copiar archivos de código - raíz src
copy App.tsx frontend\src\
copy api.ts frontend\src\
copy main.tsx frontend\src\
copy index.css frontend\src\

# Copiar variables de entorno
copy .env.example frontend\.env.local

Edita frontend\.env.local:
  - Abre el archivo
  - Asegúrate que diga:
    VITE_API_URL=http://localhost:3000/api

PASO 3.3: Instalar dependencias del frontend
─────────────────────────────────────────────

cd frontend
npm install

Espera 3-5 minutos a que termine.

PASO 3.4: Iniciar el frontend
──────────────────────────────

npm run dev

Debes ver:

    VITE v5.0.0 ready in 500 ms
    ➜  Local:   http://localhost:5173/

✓ Frontend listo

═════════════════════════════════════════════════════════════════════════════════
PASO 4: PROBAR EN EL NAVEGADOR
═════════════════════════════════════════════════════════════════════════════════

1. Abre navegador (Chrome, Firefox, Edge)
2. Ve a: http://localhost:5173

Debes ver la página de login.

PRUEBA 4.1: Registrarse
───────────────────────
1. Haz clic en "¿Sin cuenta? Regístrate"
2. Llena:
   - Nombre: "Juan Pérez"
   - Correo: "juan@example.com"
   - Contraseña: "password123"
3. Haz clic en "Crear Cuenta"
4. Verás el Dashboard

✓ Autenticación funcionando

PRUEBA 4.2: Crear Producto
──────────────────────────
1. Haz clic en "📦 Productos"
2. Haz clic en "+ Nuevo Producto"
3. Llena:
   - Código: PROD001
   - Nombre: Laptopeo
   - Costo: 800
   - Precio Base: 1200
   - Stock: 5
4. Haz clic en "Guardar Producto"

✓ Producto creado en la tabla

PRUEBA 4.3: Crear Factura
──────────────────────────
1. Haz clic en "📋 Facturas"
2. Haz clic en "+ Nueva Factura"
3. Llena:
   - # Factura: INV001
   - Fecha: hoy
   - Selecciona el producto: PROD001 - Laptopeo
   - Cantidad: 2
   - Precio: 1200
   - Margen: 15
4. Haz clic en "Crear Factura"

✓ Factura creada

PRUEBA 4.4: Crear Gasto
───────────────────────
1. Haz clic en "💰 Gastos"
2. Haz clic en "+ Nuevo Gasto"
3. Llena:
   - Fecha: hoy
   - Categoría: Arriendo
   - Monto: 500
   - Descripción: Arriendo oficina
4. Haz clic en "Guardar Gasto"

✓ Gasto creado

PRUEBA 4.5: Ver Reportes
────────────────────────
1. Haz clic en "📊 Reportes"
2. Verás:
   - Total Ventas: $2,760 (o similar)
   - Total Gastos: $500
   - Margen Bruto: XX%
   - Utilidad Neta: $... (Ventas - Gastos)
   - Gráficos interactivos

✓ Reportes funcionando

PRUEBA 4.6: Exportar PDF
────────────────────────
1. En Reportes, haz clic en "📄 PDF"
2. Se descarga automáticamente

✓ Exportación PDF funcionando

═════════════════════════════════════════════════════════════════════════════════
✅ TODO FUNCIONANDO - RESUMEN
═════════════════════════════════════════════════════════════════════════════════

Ahora tienes:

✓ Backend corriendo en http://localhost:3000
✓ Frontend corriendo en http://localhost:5173
✓ Base de datos PostgreSQL funcionando
✓ API respondiendo correctamente
✓ Componentes React renderizando
✓ Gráficos funcionando
✓ Exportación a PDF/Excel disponible

═════════════════════════════════════════════════════════════════════════════════
🛑 SOLUCIÓN DE PROBLEMAS
═════════════════════════════════════════════════════════════════════════════════

PROBLEMA: "npm: no se reconoce como comando"
SOLUCIÓN: Node.js no está instalado. Ve a https://nodejs.org/ y descárgalo.

PROBLEMA: "psql: no se reconoce como comando"
SOLUCIÓN: PostgreSQL no está instalado. Ve a https://www.postgresql.org/ y descárgalo.

PROBLEMA: "Error: Database connection refused"
SOLUCIÓN: 
  1. Verifica que PostgreSQL está corriendo
  2. En Windows: Services → PostgreSQL debe estar "Running"
  3. Reinicia PostgreSQL si es necesario

PROBLEMA: "Port 3000 already in use"
SOLUCIÓN: 
  1. Abre PowerShell
  2. Ejecuta: netstat -ano | findstr :3000
  3. Mata el proceso: taskkill /PID <PID> /F
  4. O cambia PORT en backend/.env

PROBLEMA: "Cannot GET /"
SOLUCIÓN: El backend no está corriendo. Ejecuta "npm run dev" en la carpeta backend/

PROBLEMA: "Cannot find module 'express'"
SOLUCIÓN: Las dependencias no están instaladas. Ejecuta "npm install" en backend/ o frontend/

PROBLEMA: "Port 5173 already in use"
SOLUCIÓN: Similar a puerto 3000. Usa otro puerto o mata el proceso.

═════════════════════════════════════════════════════════════════════════════════
🔄 SECUENCIA CORRECTA (CADA VEZ QUE INICIES)
═════════════════════════════════════════════════════════════════════════════════

Cada vez que quieras usar la app:

TERMINAL 1:
$ cd backend
$ npm run dev
(Espera: "🚀 Server running at http://localhost:3000")

TERMINAL 2 (en nueva PowerShell):
$ cd frontend
$ npm run dev
(Espera: "http://localhost:5173/")

NAVEGADOR:
→ http://localhost:5173

¡Listo para usar!

═════════════════════════════════════════════════════════════════════════════════
💡 TIPS ÚTILES
═════════════════════════════════════════════════════════════════════════════════

• Para apagar la app: Presiona Ctrl+C en cualquiera de las terminales
• Los cambios en código se recargan automáticamente
• Abre DevTools: F12 o Ctrl+Shift+I para ver errores
• Revisa la consola para mensajes de error
• Base de datos se mantiene entre reinicios
• Para limpiar la BD: DROP DATABASE accounting_db; CREATE DATABASE accounting_db;

═════════════════════════════════════════════════════════════════════════════════
📞 ¿SIGUE SIN FUNCIONAR?
═════════════════════════════════════════════════════════════════════════════════

Verifica:
  ☐ Node.js instalado: node --version
  ☐ PostgreSQL instalado: psql --version
  ☐ Base de datos creada: psql -U postgres -l
  ☐ Backend corriendo: http://localhost:3000
  ☐ Frontend corriendo: http://localhost:5173
  ☐ Sin errores en consola (F12)
  ☐ npm install ejecutado en ambas carpetas

Si todo falla, elimina node_modules y package-lock.json, luego:
  npm install

═════════════════════════════════════════════════════════════════════════════════

¡AHORA SÍ! TU APP CONTABLE ESTÁ FUNCIONANDO 🎉

═════════════════════════════════════════════════════════════════════════════════
