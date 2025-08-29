#!/usr/bin/env node
// Selectively sync media files from Obsidian vault
// Only copies files with "publish: true" in accompanying .meta files

import { promises as fs } from 'node:fs';
import path from 'node:path';

const VAULT_PATH = process.env.OBSIDIAN_UNI_PATH || '/Users/rbrenner/Obsidian/Uni';
const DEST_PUBLIC = path.resolve('public/uni');
const MAX_SIZE_MB = parseInt(process.env.MAX_MEDIA_SIZE || '10');
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// Media extensions to consider
const MEDIA_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg',
  '.mp3', '.m4a', '.wav',
  '.mp4', '.webm',
  '.pdf'
]);

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function shouldPublish(mediaPath) {
  // Check for a .meta file with the same name
  const metaPath = mediaPath + '.meta';
  try {
    const metaContent = await fs.readFile(metaPath, 'utf8');
    return metaContent.includes('publish: true');
  } catch {
    // No meta file, check size
    const size = await getFileSize(mediaPath);
    return size <= MAX_SIZE_BYTES;
  }
}

async function* walkMedia(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const abs = path.join(dir, entry.name);
    const rel = path.relative(base, abs);
    
    if (entry.isDirectory()) {
      yield* walkMedia(abs, base);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (MEDIA_EXT.has(ext)) {
        yield { abs, rel, name: entry.name };
      }
    }
  }
}

async function syncMedia(coursePath) {
  const courseName = path.basename(coursePath);
  const destDir = path.join(DEST_PUBLIC, courseName);
  
  console.log(`Syncing media for ${courseName}...`);
  let copied = 0;
  let skipped = 0;
  
  for await (const { abs, rel } of walkMedia(coursePath, coursePath)) {
    if (await shouldPublish(abs)) {
      const dest = path.join(destDir, rel);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(abs, dest);
      console.log(`  ✓ ${rel}`);
      copied++;
    } else {
      skipped++;
    }
  }
  
  console.log(`  ${copied} files copied, ${skipped} skipped`);
}

async function main() {
  const courses = await fs.readdir(VAULT_PATH, { withFileTypes: true });
  
  for (const course of courses) {
    if (!course.isDirectory()) continue;
    if (course.name.startsWith('.')) continue;
    
    const coursePath = path.join(VAULT_PATH, course.name);
    await syncMedia(coursePath);
  }
  
  console.log('\nMedia sync complete!');
  console.log(`Max file size: ${MAX_SIZE_MB}MB`);
  console.log('Larger files need .meta files with "publish: true"');
}

main().catch(console.error);