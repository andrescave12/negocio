# Railway Deployment Guide

## 1. Crear cuenta en Railway
- Ir a https://railway.app
- Iniciar sesión con GitHub

## 2. Conectar el repositorio
```bash
# Desde tu repo, instalar CLI de Railway
npm install -g @railway/cli

# Iniciar sesión
railway login

# Crear proyecto
railway init
```

## 3. Crear servicio de base de datos PostgreSQL

En el dashboard de Railway:
1. Crear nuevo proyecto
2. Agregar servicio: PostgreSQL
3. Copiar URL de conexión: `postgresql://user:pass@host:port/database`

## 4. Desplegar Backend

```bash
# En la carpeta backend/
railway init

# Configurar variables de entorno
railway env add DB_USER=postgres
railway env add DB_PASSWORD=<password>
railway env add DB_HOST=<host>
railway env add DB_PORT=5432
railway env add DB_NAME=accounting_db
railway env add JWT_SECRET=<generate-a-secret-key>
railway env add NODE_ENV=production
railway env add PORT=3000

# Deploy
railway up
```

## 5. Desplegar Frontend

En Vercel (ver vercel-deploy.md)

---

**URL del backend:** Se mostrará después del deploy
**Actualizar VITE_API_URL en frontend con esta URL**

