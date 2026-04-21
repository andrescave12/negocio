# 📊 Accounting & Sales Management App - Backend

Backend API para gestionar productos, facturas, gastos y reportes contables.

## 🚀 Características

- ✅ Gestión completa de productos (CRUD)
- ✅ Facturas/Ventas con márgenes configurables
- ✅ Control de gastos por categoría
- ✅ Reportes contables automáticos
- ✅ API REST documentada
- ✅ Validación de datos
- ✅ Control de stock

## 📋 Requisitos

- Node.js (v18+)
- PostgreSQL (v12+)
- npm o yarn

## 🔧 Instalación

### 1. Clonar/Descargar el proyecto

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y actualiza los valores:

```bash
cp .env.example .env
```

**Archivo `.env`:**
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=accounting_db
NODE_ENV=development
```

### 4. Crear base de datos

En PostgreSQL:
```sql
CREATE DATABASE accounting_db;
```

### 5. Ejecutar migraciones

```bash
npm run migrate
```

Este comando creará todas las tablas necesarias.

### 6. Iniciar el servidor

**Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📚 API Endpoints

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Facturas
- `GET /api/invoices` - Obtener facturas (con filtros de fecha)
- `GET /api/invoices/:id` - Obtener factura con detalles
- `POST /api/invoices` - Crear nueva factura
- `DELETE /api/invoices/:id` - Eliminar factura

### Gastos
- `GET /api/expenses` - Obtener gastos (con filtros)
- `GET /api/expenses/:id` - Obtener gasto por ID
- `POST /api/expenses` - Crear nuevo gasto
- `PUT /api/expenses/:id` - Actualizar gasto
- `DELETE /api/expenses/:id` - Eliminar gasto
- `GET /api/expenses/summary` - Resumen de gastos por categoría

### Reportes
- `GET /api/reports` - Obtener reportes contables (con filtros de fecha)

## 📊 Ejemplos de Uso

### Crear Producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD001",
    "name": "Producto A",
    "description": "Descripción",
    "cost": 100,
    "base_price": 150,
    "category": "Electrónica",
    "stock": 10
  }'
```

### Crear Factura
```bash
curl -X POST http://localhost:3000/api/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "invoice_number": "INV001",
    "date": "2024-04-16",
    "items": [
      {
        "product_id": 1,
        "quantity": 2,
        "unit_price": 150,
        "margin_percent": 20,
        "subtotal": 360
      }
    ],
    "notes": "Venta a cliente X"
  }'
```

### Crear Gasto
```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-04-16",
    "category": "Arriendo",
    "amount": 500,
    "description": "Arriendo oficina"
  }'
```

### Obtener Reportes
```bash
curl "http://localhost:3000/api/reports?startDate=2024-04-01&endDate=2024-04-30"
```

## 📁 Estructura de Carpetas

```
backend/
├── src/
│   ├── index.ts          # Punto de entrada principal
│   ├── db.ts             # Configuración de BD
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── invoiceController.ts
│   │   ├── expenseController.ts
│   │   └── reportController.ts
│   └── routes/
│       ├── products.ts
│       ├── invoices.ts
│       ├── expenses.ts
│       └── reports.ts
├── scripts/
│   └── migrate.js        # Script de migración de BD
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄️ Schema de Base de Datos

### Tabla: products
```sql
- id (Primary Key)
- code (Unique)
- name
- description
- cost
- base_price
- category
- stock
- created_at
- updated_at
```

### Tabla: sales_invoices
```sql
- id (Primary Key)
- invoice_number (Unique)
- date
- total
- notes
- created_at
```

### Tabla: sale_items
```sql
- id (Primary Key)
- invoice_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- unit_price
- margin_percent
- subtotal
- created_at
```

### Tabla: expenses
```sql
- id (Primary Key)
- date
- category
- amount
- description
- created_at
```

## 🐛 Troubleshooting

**Error de conexión a BD:**
- Verifica que PostgreSQL está corriendo
- Revisa las credenciales en `.env`
- Asegúrate de que la BD `accounting_db` existe

**Error "table does not exist":**
- Ejecuta `npm run migrate` para crear las tablas

**Puerto 3000 en uso:**
- Cambia el `PORT` en `.env`
- O mata el proceso: `lsof -ti:3000 | xargs kill -9`

## 📝 Próximos Pasos

- [ ] Implementar autenticación (JWT)
- [ ] Crear frontend React
- [ ] Agregar más reportes
- [ ] Deploy en Railway/Heroku
- [ ] Integrar con GitHub

## 📄 Licencia

MIT
