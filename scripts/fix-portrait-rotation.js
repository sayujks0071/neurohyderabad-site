const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(process.cwd(), 'public/images/dr-sayuj-krishnan-portrait.jpg');
const outputPath = path.join(process.cwd(), 'public/images/dr-sayuj-krishnan-portrait-v2.jpg');

async function fixRotation() {
  try {
    console.log(`Processing ${inputPath}...`);

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    await sharp(inputPath)
      .rotate() // Auto-rotate based on EXIF
      .resize(400) // Resize to a reasonable dimension (DoctorCard uses 128x128, so 400 is plenty for retina)
      .withMetadata(false) // Strip metadata to prevent browser confusion
      .toFile(outputPath);

    console.log(`Successfully created ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
    process.exit(1);
  }
}

fixRotation();
