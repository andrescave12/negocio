# 🎨 Frontend - Aplicación React de Contabilidad y Ventas

Frontend moderno construido con React 18, TypeScript y Tailwind CSS.

## 🚀 Características

- ✅ Dashboard intuitivo
- ✅ Gestión de productos con CRUD completo
- ✅ Creación de facturas con cálculo automático de márgenes
- ✅ Registro y análisis de gastos
- ✅ Reportes contables en tiempo real
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Navegación fluida con React Router

## 📋 Requisitos

- Node.js (v18+)
- npm o yarn
- Backend ejecutándose en `http://localhost:3000`

## 🔧 Instalación

### 1. Navegar a la carpeta del frontend

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea `.env.local` en la raíz del proyecto frontend:

```
VITE_API_URL=http://localhost:3000/api
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Products.tsx       # Gestión de productos
│   │   ├── Invoices.tsx       # Gestión de facturas
│   │   ├── Expenses.tsx       # Gestión de gastos
│   │   └── Reports.tsx        # Reportes contables
│   ├── api.ts                 # Cliente API con Axios
│   ├── App.tsx                # Aplicación principal
│   ├── main.tsx               # Punto de entrada
│   ├── index.css              # Estilos globales
│   └── vite-env.d.ts
├── public/
├── index.html                 # HTML principal
├── vite.config.ts             # Configuración Vite
├── tailwind.config.js         # Configuración Tailwind
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 📱 Páginas Disponibles

### 1. **Dashboard** (/)
- Resumen visual de la aplicación
- Accesos rápidos a funciones principales

### 2. **Productos** (/products)
- Ver todos los productos
- Crear nuevos productos
- Editar y eliminar productos
- Información de costo, precio y stock

### 3. **Facturas** (/invoices)
- Crear nuevas facturas
- Seleccionar múltiples productos por factura
- Aplicar márgenes de ganancia personalizados
- Cálculo automático de totales
- Historial de facturas

### 4. **Gastos** (/expenses)
- Registrar nuevos gastos
- Categorizar gastos (Arriendo, Servicios, etc.)
- Ver resumen de gastos por categoría
- Historial completo de gastos

### 5. **Reportes** (/reports)
- Reportes por período personalizable
- Total de ventas e invoices
- Total de gastos
- Análisis de márgenes de ganancia
- Visualización de utilidad neta
- Ventas por categoría

## 🔌 Integración con API

La aplicación consume la API del backend. Endpoints principales:

```javascript
// Productos
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

// Facturas
GET    /api/invoices
POST   /api/invoices
DELETE /api/invoices/:id

// Gastos
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id

// Reportes
GET    /api/reports
```

## 🎨 Personalización

### Cambiar colores
Edita `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Agregar nueva página
1. Crea componente en `src/components/`
2. Importa en `App.tsx`
3. Agrega ruta en React Router

## 📦 Construir para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 🐛 Troubleshooting

**Error: Cannot connect to API**
- Verifica que el backend está corriendo en puerto 3000
- Revisa `VITE_API_URL` en `.env.local`

**Error: Module not found**
- Ejecuta `npm install` nuevamente
- Borra `node_modules` y `package-lock.json`

**Estilos no aplican**
- Ejecuta `npm run dev` y refresca el navegador
- Limpia caché: Ctrl+Shift+Delete

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Sube la carpeta dist/ a GitHub Pages
```

### Heroku
```bash
npm run build
git add .
git commit -m "Build frontend"
git push heroku main
```

## 📚 Dependencias Principales

- **React 18** - UI library
- **React Router 6** - Routing
- **Axios** - HTTP client
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📝 Próximos Pasos

- [ ] Agregar autenticación con JWT
- [ ] Exportar reportes a PDF/Excel
- [ ] Gráficos avanzados con Chart.js
- [ ] Modo oscuro
- [ ] Sincronización offline
- [ ] Notificaciones en tiempo real

## 📄 Licencia

MIT
