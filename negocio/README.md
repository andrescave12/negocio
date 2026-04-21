# 💼 APP CONTABLE Y VENTAS

Sistema completo de gestión de ventas, productos, gastos y reportes contables con autenticación, gráficos y exportación.

[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)]()
[![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-blue)]()
[![Frontend](https://img.shields.io/badge/frontend-React%2018%20%2B%20TypeScript-blueviolet)]()
[![Database](https://img.shields.io/badge/database-PostgreSQL-336791)]()

## 🚀 Features

### 📦 Productos
- Gestión completa de inventario
- Costo, precio, stock, categoría
- CRUD con validación

### 📋 Facturas/Ventas
- Crear facturas multi-producto
- Márgenes personalizados por producto
- Cálculo automático de totales
- Control de stock en tiempo real

### 💰 Gastos
- Registro por categoría
- Análisis de gastos totales
- Resumen por período

### 📊 Reportes
- KPIs en tiempo real
- Gráficos interactivos (Chart.js)
- Análisis de márgenes
- **Exportación a PDF y Excel**

### 🔐 Seguridad
- Autenticación JWT
- Contraseñas encriptadas (bcrypt)
- Validación de entrada
- Variables de entorno

---

## 📋 Requisitos

- **Node.js** 18+
- **PostgreSQL** 12+
- **npm** o **yarn**

---

## ⚡ Quick Start (Local)

### 1. Backend
```bash
cd backend
npm install
npm run migrate
npm run dev
```
Backend estará en `http://localhost:3000`

### 2. Frontend (nueva terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend estará en `http://localhost:5173`

### Prueba rápida
1. Registra usuario en login
2. Crea un producto
3. Crea una factura
4. Verifica reportes

---

## 🌐 Deployment

### Production
- **Backend**: Railway
- **Frontend**: Vercel
- **CI/CD**: GitHub Actions

Ver `DEPLOY.md` para instrucciones detalladas.

---

## 📁 Documentación

- **[SETUP.md](./SETUP.md)** - Instalación local paso a paso
- **[BACKEND-README.md](./BACKEND-README.md)** - Documentación backend
- **[FRONTEND-README.md](./FRONTEND-README.md)** - Documentación frontend
- **[DEPLOY.md](./DEPLOY.md)** - Guía de deployment
- **[railway-deploy.md](./railway-deploy.md)** - Deploy en Railway
- **[vercel-deploy.md](./vercel-deploy.md)** - Deploy en Vercel

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│   React App     │
│   (Vercel)      │
└────────┬────────┘
         │ API
         ▼
┌─────────────────┐
│  Express API    │
│  (Railway)      │
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│  PostgreSQL     │
│  (Railway DB)   │
└─────────────────┘
```

---

## 📊 Endpoints Principales

```
POST   /api/auth/register       
POST   /api/auth/login          
GET    /api/products            
POST   /api/products            
GET    /api/invoices            
POST   /api/invoices            
GET    /api/expenses            
POST   /api/expenses            
GET    /api/reports             
GET    /api/reports/export/pdf  
GET    /api/reports/export/excel
```

Ver `BACKEND-README.md` para documentación completa.

---

## 📊 Stack Tecnológico

### Backend
- **Express** 4.18 - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **PDFKit** - PDF generation
- **ExcelJS** - Excel export
- **TypeScript** - Type safety

### Frontend
- **React** 18 - UI framework
- **TypeScript** - Type safety
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js** - Charts
- **Vite** - Build tool

---

## 🔐 Seguridad

✅ JWT authentication
✅ Bcrypt password hashing
✅ CORS enabled
✅ Input validation
✅ Environment variables
✅ SQL prepared statements
✅ HTTPS ready (Vercel/Railway)

---

## 📈 Roadmap

- [ ] 2FA - Autenticación de dos factores
- [ ] Rate limiting - Protección de API
- [ ] Notificaciones por email
- [ ] API documentation (Swagger)
- [ ] Mobile app (React Native)
- [ ] Integraciones de pago
- [ ] Machine learning

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing`)
3. Commit cambios (`git commit -am 'Add feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

---

## 📝 Licencia

MIT License - Libre para usar en proyectos personales y comerciales

---

## 📞 Soporte

Para problemas específicos:
- Backend issues: Revisar logs en `backend/`
- Frontend issues: Verificar console en navegador
- Database issues: Conectar con `psql` y verificar tablas

---

## 👨‍💻 Desarrollado por

**Tu Nombre** - Creador de esta aplicación

---

## 📊 Estadísticas

- **Archivos**: 40+
- **Líneas de código**: 10,000+
- **Controllers**: 7
- **Componentes**: 7
- **Tablas de BD**: 5
- **Endpoints API**: 20+

---

## ✨ Características Destacadas

🎯 **CRUD Completo** - Productos, Facturas, Gastos
📊 **Reportes en Tiempo Real** - Con gráficos interactivos
📄 **Exportación** - PDF y Excel
🔐 **Seguro** - JWT + bcrypt
☁️ **Cloud Ready** - Deployment en Railway/Vercel
🚀 **Producción** - Listo para usar

---

**¡Bienvenido a tu nueva aplicación contable! 💼✨**

Comienza en **3 pasos**:
1. `npm install`
2. `npm run migrate`
3. `npm run dev`
