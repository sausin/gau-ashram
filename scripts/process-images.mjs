import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGE_SIZES = [
  { width: 480, suffix: '_small' },
  { width: 800, suffix: '_medium' },
  { width: 1024, suffix: '_large' },
];

// Only generate responsive variants for these critical images
const CRITICAL_IMAGES = [
  'gau-background.webp',
  'gau-background2.webp',
  'about.webp',
  'volunteer.webp',
  'plantation.webp',
  'plantation2.webp',
  'plantation3.webp',
  'gsa-garden.webp'
];

const PUBLIC_DIR = './public';
// Always output to public - let Vite handle copying to dist during build
const OUTPUT_DIR = './public';

async function processImage(imagePath) {
  const { dir, name, ext } = path.parse(imagePath);
  const relativeDir = path.relative(PUBLIC_DIR, dir);
  const outputDir = path.join(OUTPUT_DIR, relativeDir);
  const fileName = `${name}.webp`;

  fs.mkdirSync(outputDir, { recursive: true });

  // Only generate responsive variants for critical images
  const isCritical = CRITICAL_IMAGES.includes(fileName);
  
  if (isCritical) {
    for (const size of IMAGE_SIZES) {
      const outputFileName = `${name}${size.suffix}.webp`;
      const outputPath = path.join(outputDir, outputFileName);
      
      try {
        await sharp(imagePath)
          .resize(size.width, null, { 
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ 
            quality: 65,
            effort: 6 // Higher effort for better compression
          })
          .toFile(outputPath);
        console.log(`Generated responsive: ${outputPath}`);
      } catch (error) {
        console.error(`Error processing ${imagePath} to ${outputPath}:`, error);
      }
    }
  }

  // Also copy the original image (if not already webp) and convert to webp for direct use
  if (ext !== '.webp') {
    const originalWebpName = `${name}.webp`;
    const originalWebpPath = path.join(outputDir, originalWebpName);
    try {
      await sharp(imagePath)
        .webp({ 
          quality: 65,
          effort: 6
        })
        .toFile(originalWebpPath);
      console.log(`Generated original WebP: ${originalWebpPath}`);
    } catch (error) {
      console.error(`Error converting original ${imagePath} to WebP:`, error);
    }
  }
}

async function findAndProcessImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Exclude node_modules and other build-related directories
      if (!filePath.includes('node_modules') && !filePath.includes('dist')) {
        await findAndProcessImages(filePath);
      }
    } else if (stat.isFile() && (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp'))) {
      // Exclude favicon source and other specific files if they are handled separately
      // Also skip already processed responsive images (with _small, _medium, _large suffixes)
      const hasResponsiveSuffix = file.includes('_small.') || file.includes('_medium.') || file.includes('_large.');
      if (file !== 'logo_short.png' && !hasResponsiveSuffix) {
        await processImage(filePath);
      }
    }
  }
}

// Function to resize logo_short.png for favicon generation
async function resizeLogo() {
  const logoPath = path.join(PUBLIC_DIR, 'logo_short.png');
  const tempPath = path.join(PUBLIC_DIR, 'logo_short_temp.png');
  
  try {
    console.log('Checking logo_short.png size...');
    
    // Check current dimensions
    const metadata = await sharp(logoPath).metadata();
    
    if (metadata.width > 256 || metadata.height > 256) {
      console.log(`Resizing logo_short.png from ${metadata.width}x${metadata.height} to 256x256...`);
      
      await sharp(logoPath)
        .resize(256, 256, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // transparent background
        })
        .png({ 
          quality: 80,
          compressionLevel: 9 // Maximum compression
        })
        .toFile(tempPath);
      
      // Replace the original file
      fs.unlinkSync(logoPath);
      fs.renameSync(tempPath, logoPath);
      
      console.log('✅ Logo resized successfully to 256x256 pixels!');
    } else {
      console.log('Logo is already appropriately sized for favicon generation.');
    }
    
  } catch (error) {
    console.error('Error resizing logo:', error.message);
    
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

(async () => {
  console.log('Starting image processing...');
  
  // First resize the logo if needed
  await resizeLogo();
  
  // Then process other images
  await findAndProcessImages(PUBLIC_DIR);
  console.log('Image processing complete.');
})();
