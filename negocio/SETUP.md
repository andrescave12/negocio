# 🚀 Guía de Instalación Completa - Aplicación Contable y Ventas

Instrucciones paso a paso para configurar tanto el **Backend** como el **Frontend**.

## 📋 Requisitos Previos

- **Node.js** v18+ ([descargar](https://nodejs.org/))
- **PostgreSQL** ([descargar](https://www.postgresql.org/download/))
- **npm** (incluido con Node.js)
- Editor de código (VS Code recomendado)

---

## ⚙️ PARTE 1: Configurar Backend

### Paso 1: Preparar carpeta del backend

Dentro de tu proyecto `negocio/`, crea esta estructura:

```
backend/
├── src/
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── invoiceController.ts
│   │   ├── expenseController.ts
│   │   └── reportController.ts
│   ├── routes/
│   │   └── index.ts (usa apiRoutes.ts)
│   ├── index.ts (usa src-index.ts)
│   └── db.ts
├── scripts/
│   └── migrate.js
├── package.json (usa backend-package.json)
├── tsconfig.json
├── .env
└── .env.example
```

**Archivos a copiar/renombrar:**
```bash
# Desde negocio/ al backend/:
- src-index.ts → src/index.ts
- apiRoutes.ts → src/routes/index.ts
- db.ts → src/db.ts
- productController.ts → src/controllers/productController.ts
- invoiceController.ts → src/controllers/invoiceController.ts
- expenseController.ts → src/controllers/expenseController.ts
- reportController.ts → src/controllers/reportController.ts
- backend-package.json → package.json
- migrate.js → scripts/migrate.js
```

### Paso 2: Instalar dependencias del backend

```bash
cd backend
npm install
```

**Espera a que termine. Verás:**
```
added XX packages in Ys
```

### Paso 3: Configurar base de datos

**Abrir Terminal/CMD** y conectarse a PostgreSQL:

```bash
# Linux/Mac
psql -U postgres

# Windows (busca "SQL Shell" en inicio)
```

**En PostgreSQL, ejecutar:**
```sql
CREATE DATABASE accounting_db;
\q
```

### Paso 4: Configurar variables de entorno

Crear archivo `.env` en `backend/`:

```bash
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_contraseña  # La que pusiste al instalar PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=accounting_db
NODE_ENV=development
```

### Paso 5: Crear tablas en la BD

```bash
npm run migrate
```

**Debe mostrar:**
```
✅ Database migration completed successfully
```

### Paso 6: Iniciar el backend

```bash
npm run dev
```

**Verás:**
```
🚀 Server running at http://localhost:3000
✅ Connected to database at 2024-04-16T22:00:00.000Z
```

✅ **Backend listo!** Deja esta terminal abierta.

---

## 🎨 PARTE 2: Configurar Frontend

### Paso 1: Preparar carpeta del frontend

En `negocio/`, crea esta estructura:

```
frontend/
├── src/
│   ├── components/
│   │   ├── Products.tsx
│   │   ├── Invoices.tsx
│   │   ├── Expenses.tsx
│   │   └── Reports.tsx
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json (usa frontend-package.json)
└── .env.local
```

**Archivos a copiar:**
```bash
# Archivos .tsx en src/components/:
- Products.tsx
- Invoices.tsx
- Expenses.tsx
- Reports.tsx

# Archivos de configuración en raíz:
- App.tsx → src/App.tsx
- main.tsx → src/main.tsx
- api.ts → src/api.ts
- index.css → src/index.css
- index.html
- vite.config.ts
- tailwind.config.js
- postcss.config.js
- frontend-package.json → package.json
```

### Paso 2: Instalar dependencias del frontend

**Abrir NUEVA terminal** y:

```bash
cd frontend
npm install
```

**Espera a que termine.**

### Paso 3: Crear archivo .env.local

En `frontend/`, crear `.env.local`:

```
VITE_API_URL=http://localhost:3000/api
```

### Paso 4: Iniciar el frontend

```bash
npm run dev
```

**Verás:**
```
VITE v5.0.0 ready in 500 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ **Frontend listo!** Se abrirá automáticamente.

---

## ✅ Verificación Final

Abre `http://localhost:5173` en tu navegador.

### Checklist:
- [ ] Página carga correctamente
- [ ] Sidebar visible a la izquierda
- [ ] Puedo navegar entre páginas
- [ ] No hay errores en consola (F12 → Console)

### Prueba Productos:
1. Haz clic en **📦 Productos**
2. Haz clic en **+ Nuevo Producto**
3. Llena el formulario:
   - Código: `PROD001`
   - Nombre: `Producto Ejemplo`
   - Costo: `100`
   - Precio Base: `150`
   - Stock: `10`
4. Haz clic **Guardar Producto**
5. El producto debe aparecer en la tabla

### Prueba Facturas:
1. Haz clic en **📋 Facturas**
2. Haz clic en **+ Nueva Factura**
3. Llena:
   - # Factura: `INV001`
   - Fecha: (hoy)
   - Selecciona el producto `PROD001`
   - Cantidad: `2`
   - Precio: `150`
   - Margen: `20`
4. Haz clic **Crear Factura**
5. La factura debe aparecer en la lista

---

## 📁 Estructura Final Completa

```
negocio/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── index.ts
│   │   └── db.ts
│   ├── scripts/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── index.html
│   └── .env.local
│
├── SETUP.md (este archivo)
├── BACKEND-README.md
└── FRONTEND-README.md
```

---

## 🐛 Solución de Problemas

### Error: "Cannot GET /"
**Solución:** El backend no está corriendo. Asegúrate de:
```bash
cd backend
npm run dev
```

### Error: "Cannot connect to database"
**Solución:**
```bash
# Verifica PostgreSQL está corriendo
# Windows: Services → PostgreSQL
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Verifica credenciales en .env
# Ejecuta migración: npm run migrate
```

### Error: ENOENT: no such file or directory
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puertos en uso
```bash
# Si el puerto 3000 está en uso:
# Cambia PORT en backend/.env

# Si el puerto 5173 está en uso:
# Vite usa automáticamente otro puerto
```

---

## 🚀 Próximos Pasos

1. ✅ Backend funcionando
2. ✅ Frontend funcionando
3. [ ] Agregar autenticación
4. [ ] Exportar reportes a PDF
5. [ ] Deploy en la nube

---

## 📞 Soporte

Para más información:
- Backend: Ver `BACKEND-README.md`
- Frontend: Ver `FRONTEND-README.md`

¡Listo para contabilizar! 💼✨
