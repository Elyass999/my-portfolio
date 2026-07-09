const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_DIR = __dirname;
const PROJECT_DIR = path.resolve(SCRIPT_DIR, '..');
const IMAGES_DIR = path.join(PROJECT_DIR, 'Projects Pics');

console.log('Project directory:', PROJECT_DIR);
console.log('Images directory:', IMAGES_DIR);

// 1. Ensure sharp is installed
try {
  require('sharp');
  console.log('sharp is already installed.');
} catch (e) {
  console.log('sharp is not installed. Installing sharp locally in scripts folder...');
  try {
    execSync('npm install sharp', { cwd: SCRIPT_DIR, stdio: 'inherit' });
    console.log('sharp successfully installed.');
  } catch (err) {
    console.error('Failed to install sharp:', err.message);
    process.exit(1);
  }
}

const sharp = require('sharp');

// 2. Process all images in "Projects Pics"
async function optimizeImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory does not exist:', IMAGES_DIR);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  console.log(`Found ${files.length} files in Images directory.`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const filePath = path.join(IMAGES_DIR, file);
      const nameWithoutExt = path.basename(file, ext);
      const outFilePath = path.join(IMAGES_DIR, `${nameWithoutExt}.webp`);

      console.log(`Processing: ${file}...`);
      
      try {
        const metadata = await sharp(filePath).metadata();
        let pipeline = sharp(filePath);

        // Clamp large images to max width 1600px for responsive web display
        if (metadata.width > 1600) {
          console.log(`  Resizing from ${metadata.width}px to 1600px width.`);
          pipeline = pipeline.resize({ width: 1600, fit: 'inside', withoutEnlargement: true });
        }

        // Convert to webp with 80% quality
        await pipeline
          .webp({ quality: 80 })
          .toFile(outFilePath);

        const oldSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(outFilePath).size;
        const reduction = ((oldSize - newSize) / oldSize * 100).toFixed(2);

        console.log(`  Success! Size reduced from ${(oldSize / 1024 / 1024).toFixed(2)} MB to ${(newSize / 1024).toFixed(2)} KB (-${reduction}%)`);

        // Move the original file to a backup folder
        const backupDir = path.join(IMAGES_DIR, 'original_backups');
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir);
        }
        fs.renameSync(filePath, path.join(backupDir, file));
        console.log(`  Moved original to backups folder.`);
      } catch (err) {
        console.error(`  Error processing ${file}:`, err.message);
      }
    }
  }

  // Also optimize any other icons or assets if needed.
  console.log('Optimization process completed.');
}

optimizeImages().catch(err => {
  console.error('Error in optimization script:', err);
});
