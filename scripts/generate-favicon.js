const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Convert SVG to PNG
    await sharp(path.join(__dirname, '../public/favicon.svg'))
      .resize(32, 32)
      .toFormat('png')
      .toFile(path.join(__dirname, '../public/favicon.ico'));
    
    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();
