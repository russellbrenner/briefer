#!/usr/bin/env node

import { readdir, unlink, stat, writeFile, appendFile } from 'fs/promises';
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

const logFile = join(process.cwd(), 'build-cleanup.log');
let removedFiles = [];

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
        // Log file for local debugging (will be in .gitignore)
        removedFiles.push(fullPath);
        await unlink(fullPath);
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
    
    // Write log file locally (will be in .gitignore)
    if (removedFiles.length > 0) {
      const timestamp = new Date().toISOString();
      const logContent = `Build cleanup log - ${timestamp}\n${removedFiles.join('\n')}\n\n`;
      await writeFile(logFile, logContent);
    }
    
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