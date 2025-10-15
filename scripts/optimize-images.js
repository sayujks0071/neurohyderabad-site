#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is available, if not install it
function ensureSharp() {
  try {
    require('sharp');
  } catch (error) {
    console.log('Installing sharp for image optimization...');
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
  }
}

async function optimizeImages() {
  ensureSharp();
  const sharp = require('sharp');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  
  // Image optimization configurations
  const configs = [
    {
      input: path.join(imagesDir, 'logo.png'),
      outputs: [
        { format: 'webp', quality: 85, suffix: '.webp' },
        { format: 'avif', quality: 80, suffix: '.avif' },
        { format: 'png', quality: 90, suffix: '-optimized.png' }
      ]
    },
    {
      input: path.join(imagesDir, 'og-default.jpg'),
      outputs: [
        { format: 'webp', quality: 85, suffix: '.webp' },
        { format: 'avif', quality: 80, suffix: '.avif' },
        { format: 'jpeg', quality: 90, suffix: '-optimized.jpg' }
      ]
    }
  ];
  
  for (const config of configs) {
    if (!fs.existsSync(config.input)) {
      console.log(`Skipping ${config.input} - file not found`);
      continue;
    }
    
    console.log(`Optimizing ${path.basename(config.input)}...`);
    
    for (const output of config.outputs) {
      const outputPath = config.input.replace(/\.[^/.]+$/, output.suffix);
      
      try {
        let pipeline = sharp(config.input);
        
        // Apply format-specific optimizations
        switch (output.format) {
          case 'webp':
            pipeline = pipeline.webp({ quality: output.quality });
            break;
          case 'avif':
            pipeline = pipeline.avif({ quality: output.quality });
            break;
          case 'jpeg':
            pipeline = pipeline.jpeg({ quality: output.quality, progressive: true });
            break;
          case 'png':
            pipeline = pipeline.png({ quality: output.quality, compressionLevel: 9 });
            break;
        }
        
        await pipeline.toFile(outputPath);
        
        const originalSize = fs.statSync(config.input).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        console.log(`  ✓ ${path.basename(outputPath)} (${(optimizedSize / 1024).toFixed(1)}KB, ${savings}% smaller)`);
        
      } catch (error) {
        console.error(`  ✗ Failed to create ${path.basename(outputPath)}:`, error.message);
      }
    }
  }
  
  console.log('\nImage optimization complete!');
}

// Run the optimization
optimizeImages().catch(console.error);
