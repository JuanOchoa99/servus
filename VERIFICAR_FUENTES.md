# 🔍 Verificación de Fuentes en Producción

## ✅ Estado Actual

Las fuentes están configuradas correctamente con el `basePath` `/servus/`:

- **Fuentes DM_Sans**: `/servus/_next/static/media/13971731025ec697-s.p.woff2` y `/servus/_next/static/media/7ab938503e4547a1-s.woff2`
- **Fuentes Slick Carousel**: `/servus/_next/static/media/slick.*.woff`

## 🧪 Probar Localmente (Como en Producción)

### Opción 1: Script Automático
```bash
npm run serve:prod
```
Luego visita: `http://localhost:3000/servus/`

### Opción 2: Verificar Rutas
```bash
npm run check:fonts
```
Este script verifica:
- ✅ Que los archivos de fuentes existan
- ✅ Que las rutas en HTML incluyan el basePath
- ✅ Que las rutas en CSS incluyan el basePath

## 🔧 Verificar en Producción Real (GitHub Pages)

1. **Abre las DevTools del navegador** (F12)
2. **Ve a la pestaña Network**
3. **Filtra por "Font"**
4. **Recarga la página** (Ctrl+Shift+R o Cmd+Shift+R)
5. **Verifica que las fuentes carguen con status 200**

### Rutas esperadas:
- `https://juanochoa99.github.io/servus/_next/static/media/13971731025ec697-s.p.woff2`
- `https://juanochoa99.github.io/servus/_next/static/media/7ab938503e4547a1-s.woff2`

## ⚠️ Si las fuentes NO cargan en producción:

### Problema 1: Caché de GitHub Pages
- Espera 5-10 minutos después del deploy
- Limpia la caché del navegador (Ctrl+Shift+Del)
- Prueba en modo incógnito

### Problema 2: Rutas incorrectas
- Verifica que `next.config.mjs` tenga:
  ```javascript
  basePath: "/servus",
  assetPrefix: "/servus/",
  ```

### Problema 3: CORS o Headers
- GitHub Pages debería servir las fuentes sin problemas
- Si ves errores 404, verifica que los archivos estén en `out/_next/static/media/`

## 📝 Debugging

Si necesitas ver qué está pasando:

1. **En el navegador (DevTools > Console):**
   ```javascript
   // Verificar si las fuentes están cargadas
   document.fonts.check('16px DM Sans')
   ```

2. **Verificar rutas en HTML generado:**
   ```bash
   grep -r "woff2" out/*.html
   ```

3. **Verificar rutas en CSS:**
   ```bash
   grep -r "woff2" out/_next/static/css/
   ```

## 🎯 Solución Rápida

Si las fuentes no cargan después del deploy:

1. Verifica que el build incluya las fuentes:
   ```bash
   ls -la out/_next/static/media/*.woff2
   ```

2. Verifica que el deploy incluya `_next`:
   ```bash
   npm run deploy
   ```

3. Espera 5 minutos y verifica en:
   `https://juanochoa99.github.io/servus/`

