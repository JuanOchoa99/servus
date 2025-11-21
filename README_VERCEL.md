# 🚀 Deployment en Vercel - Guía Rápida

## ✅ Ya estás en Vercel, ¿qué sigue?

### Paso 1: Configurar Variables de Entorno

1. Ve a tu proyecto en **Vercel Dashboard**
2. Ve a **Settings** → **Environment Variables**
3. Agrega estas variables:

#### Variables de Google Calendar (OBLIGATORIAS):
```
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REDIRECT_URI=https://tu-dominio.vercel.app
GOOGLE_REFRESH_TOKEN=tu_refresh_token
```

#### Variables Opcionales:
```
GOOGLE_CALENDAR_ID=primary
TZ=America/Mexico_City
```

4. **IMPORTANTE**: Selecciona **"All"** environments (o al menos Production)

### Paso 2: Redesplegar

1. Ve a **Deployments**
2. Haz clic en los **3 puntos (...)** del último deployment
3. Selecciona **"Redeploy"**
4. ✅ Listo - Las variables se aplicarán

### Paso 3: Verificar que Funciona

Prueba estas URLs (reemplaza `tu-dominio` con tu dominio real):

- `https://tu-dominio.vercel.app/api/calendar/get-events`
- `https://tu-dominio.vercel.app/api/calendar/create-event`

**Si ves JSON en lugar de HTML**, ¡está funcionando! 🎉

## ❌ Error: "No existing credentials found"

**No te preocupes por este error.** 

El workflow de GitHub Actions está deshabilitado por defecto porque:
- ✅ Vercel despliega automáticamente cada push a GitHub
- ✅ No necesitas configurar tokens en GitHub Secrets
- ✅ Es más simple y confiable

**El error es del workflow `.github/workflows/deploy.yml` que está deshabilitado.** Puedes ignorarlo o eliminarlo completamente.

## 📝 ¿Dónde están mis credenciales de Google Calendar?

Si no las tienes, sigue las instrucciones en:
- 📄 `GOOGLE_CALENDAR_SETUP.md`

## 🎯 Resumen

1. ✅ Ya tienes tu proyecto en Vercel
2. ⬜ Agrega variables de entorno en Vercel Dashboard
3. ⬜ Redesplega el proyecto
4. ⬜ Verifica que las APIs funcionen

**¡Eso es todo!** Vercel maneja todo lo demás automáticamente. 🚀

