# Configuración en Vercel - Guía Paso a Paso

## 🎯 ¿Cómo Funciona Vercel?

**Vercel despliega automáticamente** cada vez que haces push a tu repositorio de GitHub. No necesitas configurar GitHub Actions manualmente. Una vez que conectes tu repositorio desde el dashboard de Vercel, todo se hace automáticamente.

## ✅ Pasos para Configurar tu Proyecto en Vercel

### 0. **Conectar Repositorio de GitHub (Si aún no lo has hecho)**

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **"Add New..."** → **"Project"**
3. Selecciona tu repositorio de GitHub (`JuanOchoa99/servus`)
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Haz clic en **"Deploy"**

Vercel desplegará automáticamente cada push a `main` ✨

### 1. **Configurar Variables de Entorno en Vercel**

Ve a tu proyecto en Vercel Dashboard → **Settings** → **Environment Variables** y agrega:

#### Variables Públicas (NEXT_PUBLIC_*):
- `NEXT_PUBLIC_BASE_PATH` = `/servus` (opcional, para mantener consistencia)

#### Variables Privadas (para las APIs):
- `GOOGLE_CLIENT_ID` = `tu_client_id_de_google`
- `GOOGLE_CLIENT_SECRET` = `tu_client_secret_de_google`
- `GOOGLE_REDIRECT_URI` = `https://tu-dominio-vercel.vercel.app/api/auth/callback/google`
- `GOOGLE_REFRESH_TOKEN` = `tu_refresh_token`
- `GOOGLE_CALENDAR_ID` = `primary` (opcional, por defecto usa 'primary')
- `TZ` = `America/Mexico_City` (opcional, tu zona horaria)

⚠️ **Importante**: Asegúrate de seleccionar el ambiente correcto (Production, Preview, Development) o selecciona "All" para aplicar a todos.

### 2. **Configurar Dominio Personalizado (Opcional)**

Si quieres usar un dominio personalizado:
- Ve a **Settings** → **Domains**
- Agrega tu dominio personalizado
- Sigue las instrucciones de DNS que Vercel te proporciona

### 3. **Redesplegar el Proyecto**

Después de agregar las variables de entorno:
- Ve a la pestaña **Deployments**
- Haz clic en los **3 puntos (...)** del deployment más reciente
- Selecciona **Redeploy**
- Esto aplicará las nuevas variables de entorno

### 4. **Verificar que las APIs Funcionan**

Una vez desplegado, verifica que las rutas de API funcionen:

- `https://tu-proyecto.vercel.app/api/calendar/get-events`
- `https://tu-proyecto.vercel.app/api/calendar/create-event`
- `https://tu-proyecto.vercel.app/api/calendar/get-busy-slots`

**Nota**: Si tienes `basePath` configurado, las rutas serán:
- `https://tu-proyecto.vercel.app/servus/api/calendar/get-events`

## 🔍 Solución de Problemas

### Error 404 en las APIs

Si ves un 404 en las rutas de API:

1. **Verifica que las variables de entorno estén configuradas correctamente**
2. **Redesplega** el proyecto después de agregar las variables
3. **Revisa los logs** en Vercel Dashboard → Deployments → [Tu deployment] → Functions

### Error "Invalid refresh token"

1. Genera un nuevo refresh token siguiendo las instrucciones en `GOOGLE_CALENDAR_SETUP.md`
2. Actualiza la variable `GOOGLE_REFRESH_TOKEN` en Vercel
3. Redesplega

### Las APIs devuelven HTML en lugar de JSON

Esto significa que las rutas de API no están siendo reconocidas. Verifica:
1. Que el proyecto no tenga `ENABLE_STATIC_EXPORT=true` configurado
2. Que las rutas estén en `src/app/api/`
3. Revisa los logs de build en Vercel

## 📝 Estructura de URLs en Vercel

Con la configuración actual:
- **Sin basePath**: `https://tu-proyecto.vercel.app/api/calendar/...`
- **Con basePath**: `https://tu-proyecto.vercel.app/servus/api/calendar/...`

El `vercel.json` incluye un rewrite para manejar ambas rutas.

## 🚀 Próximos Pasos

1. ✅ Agrega las variables de entorno en Vercel
2. ✅ Redesplega el proyecto
3. ✅ Prueba las rutas de API
4. ✅ Verifica que el calendario funcione en tu sitio

## 💡 Tips

- ✅ **Vercel despliega automáticamente** cada push a la rama `main` - No necesitas GitHub Actions
- ✅ Puedes configurar branches de preview para PRs (automático)
- ✅ Los logs de las funciones serverless están disponibles en el dashboard
- ✅ Vercel tiene un límite generoso de requests en el plan Hobby (gratis)
- ⚠️ **El workflow `.github/workflows/deploy.yml` es OPCIONAL** - Vercel maneja todo automáticamente

## 🤔 ¿Necesito el Workflow de GitHub Actions?

**Respuesta corta: NO.** 

El workflow `.github/workflows/deploy.yml` está deshabilitado por defecto porque:
- Vercel despliega automáticamente cuando conectas tu repositorio
- Es más simple y confiable
- No necesitas configurar tokens adicionales

**Solo necesitas el workflow si:**
- Quieres desplegar desde GitHub Actions en lugar de Vercel automático
- En ese caso, agrega `VERCEL_TOKEN` a GitHub Secrets y descomenta las líneas en el workflow

