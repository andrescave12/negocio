# Vercel Deployment Guide

## 1. Crear cuenta en Vercel
- Ir a https://vercel.com
- Iniciar sesión con GitHub

## 2. Deploy desde GitHub

```bash
# Asegúrate que el código esté en GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

## 3. Importar en Vercel

1. Ir a https://vercel.com/new
2. Seleccionar tu repositorio
3. Configurar:
   - **Root Directory:** `frontend/`
   - **Framework Preset:** Vite
   - **Environment Variables:**
     - `VITE_API_URL=https://tu-backend-railway.up.railway.app/api`

4. Hacer clic en **Deploy**

## 4. Configurar dominio personalizado (opcional)

1. Ir a Settings > Domains
2. Agregar dominio personalizado
3. Seguir instrucciones de DNS

---

**URL del frontend:** `https://tu-proyecto.vercel.app`

## Despliegue automático

Cada push a `main` genera un nuevo deploy automáticamente.

