const fs = require('fs');

function generateSVG(width, height, text) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#E5E7EB"/>
  <text
    x="50%"
    y="50%"
    font-family="Arial"
    font-size="24"
    fill="#6B7280"
    text-anchor="middle"
    dominant-baseline="middle"
  >${text}</text>
</svg>`;
}

async function main() {
  const images = [
    { path: 'public/images/hero-cleaning.jpg.svg', width: 1920, height: 1080, text: 'Hero Cleaning Image' },
    { path: 'public/images/about-cleaning.jpg.svg', width: 800, height: 600, text: 'About Cleaning Image' },
    { path: 'public/images/testimonials/sarah.jpg.svg', width: 400, height: 400, text: 'Sarah' },
    { path: 'public/images/testimonials/michael.jpg.svg', width: 400, height: 400, text: 'Michael' },
    { path: 'public/images/testimonials/emily.jpg.svg', width: 400, height: 400, text: 'Emily' },
  ];

  for (const img of images) {
    const svg = generateSVG(img.width, img.height, img.text);
    fs.writeFileSync(img.path, svg);
    console.log(`Generated ${img.path}`);
  }
}

main().catch(console.error);
