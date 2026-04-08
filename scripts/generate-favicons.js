import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
const publicDir = path.join(__dirname, '..', 'public');
const faviconDir = path.join(publicDir, 'favicon');

// Ensure favicon directory exists
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Sizes to generate
const sizes = [
  { width: 16, height: 16, name: 'favicon-16x16.png', dir: faviconDir },
  { width: 32, height: 32, name: 'favicon-32x32.png', dir: faviconDir },
  { width: 180, height: 180, name: 'apple-touch-icon.png', dir: publicDir },
  { width: 192, height: 192, name: 'icon-192x192.png', dir: publicDir },
  { width: 512, height: 512, name: 'icon-512x512.png', dir: publicDir },
];

console.log('Generating favicon assets...\n');

for (const { width, height, name, dir } of sizes) {
  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const outputPath = path.join(dir, name);
  fs.writeFileSync(outputPath, pngBuffer);

  console.log(`✓ Generated ${name} (${width}x${height})`);
}

console.log('\n✅ Favicon assets generated successfully!');
