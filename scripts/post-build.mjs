#!/usr/bin/env node

import { readdir, unlink, stat } from 'fs/promises';
import { join, extname } from 'path';

// Files to keep - same as in the middleware
const ALLOWED_EXTENSIONS = new Set([
  '.html',
  '.htm',
  '.md',
  '.mdx',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
  '.avif',
  '.bmp',
  '.tiff',
  '.tif',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.css',
  '.js',
  '.mjs',
  '.map',
  '.xml',
  '.json',
  '.webmanifest'
]);

// Files to move to R2 (for future implementation)
const R2_EXTENSIONS = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.rtf',
  '.odt'
]);

async function cleanDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively clean subdirectories
      await cleanDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      
      if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
        if (R2_EXTENSIONS.has(ext)) {
          console.log(`[R2] File will be moved to R2: ${fullPath}`);
          // For now, just remove it. Later this can be uploaded to R2
          await unlink(fullPath);
        } else {
          console.log(`[REMOVE] Removing non-allowed file: ${fullPath}`);
          await unlink(fullPath);
        }
      }
    }
  }
}

async function main() {
  const distPath = join(process.cwd(), 'dist');
  
  try {
    const distStat = await stat(distPath);
    if (!distStat.isDirectory()) {
      console.error('Error: dist folder is not a directory');
      process.exit(1);
    }
    
    console.log('Cleaning dist folder - removing non-allowed file types...');
    await cleanDirectory(distPath);
    console.log('Dist folder cleaned successfully!');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Error: dist folder not found. Run build first.');
    } else {
      console.error('Error cleaning dist folder:', error);
    }
    process.exit(1);
  }
}

main();