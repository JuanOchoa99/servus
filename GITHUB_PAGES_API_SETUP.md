# Configuración de APIs Externas para GitHub Pages

## ❌ Problema

**GitHub Pages solo sirve archivos estáticos** (HTML, CSS, JS). No puede ejecutar:
- ❌ API Routes de Next.js
- ❌ Servidores Node.js
- ❌ Backend code

## ✅ Solución: APIs Externas (Serverless Functions)

Para usar las funcionalidades del calendario en GitHub Pages, necesitas desplegar las API routes a un servicio que soporte funciones serverless:

### Opción 1: Vercel (Recomendado - Más fácil)

1. **Crear un proyecto separado solo para APIs** en Vercel:
   ```bash
   # En una carpeta separada (ej: servus-api)
   mkdir servus-api
   cd servus-api
   ```

2. **Copiar solo las API routes**:
   - Copia la carpeta `src/app/api` a tu nuevo proyecto
   - Copia `package.json` y las dependencias necesarias

3. **Desplegar a Vercel**:
   ```bash
   vercel
   ```

4. **Configurar variables de entorno en Vercel**:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI`
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_CALENDAR_ID` (opcional)

5. **Obtener la URL de tu API** (ej: `https://servus-api.vercel.app`)

6. **Configurar en GitHub Pages**:
   - Agrega `NEXT_PUBLIC_API_URL=https://servus-api.vercel.app` a las variables de entorno del workflow de GitHub Actions
   - O crea un archivo `.env.production` con:
     ```
     NEXT_PUBLIC_API_URL=https://servus-api.vercel.app
     ```

### Opción 2: Desplegar Todo en Vercel (Más simple)

Si desplegas todo el proyecto en Vercel (incluyendo frontend y APIs), todo funcionará automáticamente sin configuración adicional.

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Configura las variables de entorno en Vercel Dashboard
4. Deploy automático en cada push

### Opción 3: Railway, Netlify Functions, etc.

Similar a Vercel, puedes usar otros servicios de serverless functions.

## 📝 Configuración en GitHub Actions

Actualiza tu workflow `.github/workflows/deploy-pages.yml`:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /servus
  NEXT_PUBLIC_API_URL: https://tu-api-url.vercel.app  # 👈 Agrega esto
  ENABLE_STATIC_EXPORT: "true"
  NODE_ENV: production
```

## 🔧 Variables de Entorno

### Para el Frontend (GitHub Pages):
- `NEXT_PUBLIC_API_URL`: URL base de tus APIs externas (sin `/api` al final)
  - Ejemplo: `https://servus-api.vercel.app`

### Para el Backend (Vercel/Serverless):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_CALENDAR_ID` (opcional)

## 🧪 Probar Localmente

### Modo Estático (simula GitHub Pages):
```bash
NEXT_PUBLIC_API_URL=https://tu-api-url.vercel.app ENABLE_STATIC_EXPORT=true npm run build
cd out
python3 -m http.server 3000
```

### Modo Normal (con APIs locales):
```bash
npm run serve:prod
```

## ⚠️ Importante

- **GitHub Pages NO puede ejecutar API routes**
- Debes usar APIs externas (serverless functions) o desplegar todo en Vercel
- Las APIs deben estar públicamente accesibles (CORS configurado si es necesario)
- Vercel soporta CORS automáticamente para dominios verificados

