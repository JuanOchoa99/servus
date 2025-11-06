# Fonts Verification for Production

## Current Status

Fonts are correctly configured with the `basePath` `/servus/`:

- **DM_Sans Fonts**: `/servus/_next/static/media/13971731025ec697-s.p.woff2` and `/servus/_next/static/media/7ab938503e4547a1-s.woff2`
- **Slick Carousel Fonts**: `/servus/_next/static/media/slick.*.woff`

## Test Locally (As Production)

### Option 1: Automatic Script
```bash
npm run serve:prod
```
Then visit: `http://localhost:3000/servus/`

### Option 2: Verify Paths
```bash
npm run check:fonts
```
This script checks:
- ✅ That font files exist
- ✅ That HTML paths include the basePath
- ✅ That CSS paths include the basePath

## Verify in Real Production (GitHub Pages)

1. **Open browser DevTools** (F12)
2. **Go to Network tab**
3. **Filter by "Font"**
4. **Reload the page** (Ctrl+Shift+R or Cmd+Shift+R)
5. **Verify that fonts load with status 200**

### Expected paths:
- `https://juanochoa99.github.io/servus/_next/static/media/13971731025ec697-s.p.woff2`
- `https://juanochoa99.github.io/servus/_next/static/media/7ab938503e4547a1-s.woff2`

## ⚠️ If fonts DON'T load in production:

### Problem 1: GitHub Pages Cache
- Wait 5-10 minutes after deploy
- Clear browser cache (Ctrl+Shift+Del)
- Try in incognito mode

### Problem 2: Incorrect paths
- Verify that `next.config.mjs` has:
  ```javascript
  basePath: "/servus",
  assetPrefix: "/servus/",
  ```

### Problem 3: CORS or Headers
- GitHub Pages should serve fonts without issues
- If you see 404 errors, verify files are in `out/_next/static/media/`

## Debugging

If you need to see what's happening:

1. **In browser (DevTools > Console):**
   ```javascript
   // Check if fonts are loaded
   document.fonts.check('16px DM Sans')
   ```

2. **Verify paths in generated HTML:**
   ```bash
   grep -r "woff2" out/*.html
   ```

3. **Verify paths in CSS:**
   ```bash
   grep -r "woff2" out/_next/static/css/
   ```

## Quick Solution

If fonts don't load after deploy:

1. Verify build includes fonts:
   ```bash
   ls -la out/_next/static/media/*.woff2
   ```

2. Verify deploy includes `_next`:
   ```bash
   npm run deploy
   ```

3. Wait 5 minutes and verify at:
   `https://juanochoa99.github.io/servus/`

