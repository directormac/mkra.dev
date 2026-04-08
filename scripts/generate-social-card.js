import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const outputPath = path.join(publicDir, 'social-card.png');

// Social card dimensions
const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

// Create the social card SVG
const socialCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" width="${CARD_WIDTH}" height="${CARD_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#bg)"/>
  
  <!-- Logo centered -->
  <g transform="translate(${CARD_WIDTH / 2 - 150}, ${CARD_HEIGHT / 2 - 150})">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300">
      <path d="M26 70 V36 L41 51 L56 36 V70 M56 54 L74 36 M58 56 L74 72" 
            stroke="#f8fafc" 
            stroke-width="8" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            fill="none"/>
    </svg>
  </g>
  
  <!-- Site name -->
  <text x="${CARD_WIDTH / 2}" y="${CARD_HEIGHT - 80}" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="48" 
        font-weight="600" 
        fill="#f8fafc" 
        text-anchor="middle">mkra.dev</text>
</svg>`;

console.log('Generating social card...\n');

const resvg = new Resvg(socialCardSvg, {
  fitTo: {
    mode: 'width',
    value: CARD_WIDTH,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync(outputPath, pngBuffer);

console.log(`✓ Generated social-card.png (${CARD_WIDTH}x${CARD_HEIGHT})`);
console.log('\n✅ Social card generated successfully!');
