const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'out');
const BASE_PATH = '/servus';

console.log('\n🔍 Verificando rutas de fuentes para producción...\n');

// Verificar archivos de fuentes
const mediaDir = path.join(OUT_DIR, '_next/static/media');
const fontFiles = [];

if (fs.existsSync(mediaDir)) {
  const files = fs.readdirSync(mediaDir);
  files.forEach(file => {
    if (/\.(woff2?|ttf|eot|otf)$/i.test(file)) {
      fontFiles.push(file);
    }
  });
}

console.log('📁 Archivos de fuentes encontrados:');
fontFiles.forEach(file => {
  const fullPath = `${BASE_PATH}/_next/static/media/${file}`;
  const filePath = path.join(mediaDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${fullPath}`);
  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`     Tamaño: ${(stats.size / 1024).toFixed(2)} KB`);
  }
});

// Verificar referencias en HTML
console.log('\n📄 Verificando referencias en HTML...\n');
const htmlFiles = ['index.html', 'signin.html', 'signup.html', 'documentation.html', '404.html'];

htmlFiles.forEach(htmlFile => {
  const htmlPath = path.join(OUT_DIR, htmlFile);
  if (fs.existsSync(htmlPath)) {
    const content = fs.readFileSync(htmlPath, 'utf-8');
    const fontMatches = content.match(/href=["']([^"']*\.woff2?[^"']*)["']/g) || [];
    const fontPreloads = content.match(/href=["']([^"']*\.woff2?[^"']*)["']/g) || [];
    
    console.log(`📄 ${htmlFile}:`);
    if (fontMatches.length > 0) {
      fontMatches.forEach(match => {
        const url = match.match(/href=["']([^"']+)["']/)[1];
        const startsWithBase = url.startsWith(BASE_PATH);
        console.log(`  ${startsWithBase ? '✅' : '⚠️ '} ${url}`);
        if (!startsWithBase) {
          console.log(`     ⚠️  ADVERTENCIA: No incluye basePath ${BASE_PATH}`);
        }
      });
    } else {
      console.log(`  ℹ️  No se encontraron referencias de fuentes`);
    }
  }
});

// Verificar referencias en CSS
console.log('\n🎨 Verificando referencias en CSS...\n');
const cssDir = path.join(OUT_DIR, '_next/static/css');
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  cssFiles.forEach(cssFile => {
    const cssPath = path.join(cssDir, cssFile);
    const content = fs.readFileSync(cssPath, 'utf-8');
    const fontMatches = content.match(/url\(([^)]*\.woff2?[^)]*)\)/g) || [];
    
    if (fontMatches.length > 0) {
      console.log(`📄 ${cssFile}:`);
      fontMatches.forEach(match => {
        const url = match.match(/url\(([^)]+)\)/)[1].replace(/['"]/g, '');
        const startsWithBase = url.startsWith(BASE_PATH);
        console.log(`  ${startsWithBase ? '✅' : '⚠️ '} ${url}`);
        if (!startsWithBase) {
          console.log(`     ⚠️  ADVERTENCIA: No incluye basePath ${BASE_PATH}`);
        }
      });
    }
  });
}

console.log('\n✅ Verificación completada\n');
console.log('💡 Para probar localmente como en producción:');
console.log(`   npm run serve:prod`);
console.log(`   Luego visita: http://localhost:3000${BASE_PATH}/\n`);

