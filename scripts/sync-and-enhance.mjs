#!/usr/bin/env node

/**
 * Sync and Enhancement Script
 * 1. Syncs Obsidian notes (existing sync-obsidian.mjs functionality)
 * 2. Enhances markdown with Starlight components
 * 3. Creates optimized docs for legal study materials
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { MarkdownEnhancer } from './enhance-markdown.mjs';

class ObsidianToStarlightSync {
  constructor() {
    this.enhancer = new MarkdownEnhancer();
    this.uniSourceDir = 'src/content/uni';
    this.docsTargetDir = 'src/content/docs';
  }

  /**
   * Main sync and enhancement process
   */
  async syncAndEnhance() {
    console.log('🔄 Starting Obsidian to Starlight sync and enhancement...');
    
    // Find all publish=true notes
    const publishNotes = await this.findPublishNotes();
    console.log(`📋 Found ${publishNotes.length} notes marked for publishing`);
    
    // Process each note
    for (const notePath of publishNotes) {
      await this.processNote(notePath);
    }
    
    console.log('✅ Sync and enhancement complete!');
  }

  /**
   * Find all markdown files with publish: true
   */
  async findPublishNotes() {
    const notes = [];
    
    async function searchDir(dir) {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await searchDir(fullPath);
        } else if (entry.isFile() && extname(entry.name) === '.md') {
          const content = await readFile(fullPath, 'utf-8');
          if (content.includes('publish: true')) {
            notes.push(fullPath);
          }
        }
      }
    }
    
    await searchDir(this.uniSourceDir);
    return notes;
  }

  /**
   * Process a single note: enhance and copy to docs
   */
  async processNote(notePath) {
    try {
      const content = await readFile(notePath, 'utf-8');
      const enhanced = await this.enhanceContent(content, notePath);
      const targetPath = this.getTargetPath(notePath);
      
      await writeFile(targetPath, enhanced);
      console.log(`📝 Enhanced and copied: ${basename(notePath)} → ${basename(targetPath)}`);
    } catch (error) {
      console.error(`❌ Error processing ${notePath}:`, error.message);
    }
  }

  /**
   * Enhance content with Starlight components and legal formatting
   */
  async enhanceContent(content, sourcePath) {
    // Extract and enhance frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    let frontmatter = '';
    let body = content;
    
    if (frontmatterMatch) {
      const originalFrontmatter = frontmatterMatch[1];
      frontmatter = this.enhanceFrontmatter(originalFrontmatter, sourcePath);
      body = content.slice(frontmatterMatch[0].length);
    }

    // Apply content enhancements
    body = this.enhancer.enhance(body, sourcePath);
    body = this.addLegalSpecificEnhancements(body);
    
    return `---\n${frontmatter}\n---\n\n${body}`;
  }

  /**
   * Enhance frontmatter with Starlight-specific fields
   */
  enhanceFrontmatter(originalFrontmatter, sourcePath) {
    const lines = originalFrontmatter.split('\n');
    const frontmatter = {};
    
    // Parse existing frontmatter
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    }

    // Extract metadata from path
    const pathParts = sourcePath.split('/');
    const courseMatch = sourcePath.match(/(LAW\d{5})/);
    const weekMatch = sourcePath.match(/Week (\d+)/);
    
    // Generate enhanced frontmatter
    const enhanced = {
      title: frontmatter.title || this.generateTitle(sourcePath),
      description: frontmatter.description || this.generateDescription(sourcePath),
      sidebar: {
        label: this.generateSidebarLabel(sourcePath),
        order: weekMatch ? parseInt(weekMatch[1]) : 99
      }
    };

    // Convert back to YAML
    return Object.entries(enhanced)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}:\n${Object.entries(value)
            .map(([k, v]) => `  ${k}: ${typeof v === 'string' ? `"${v}"` : v}`)
            .join('\n')}`;
        }
        return `${key}: "${value}"`;
      })
      .join('\n');
  }

  /**
   * Add legal-specific enhancements
   */
  addLegalSpecificEnhancements(content) {
    // Enhance case names with proper styling
    content = content.replace(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+v\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g, 
      '<Badge text="$1 v $2" variant="caution" />');
    
    // Enhance statutory references
    content = content.replace(/\b(Evidence Act 2008|Goods Act 1958|Competition and Consumer Act 2010)\s*\(([^)]+)\)/g,
      '**$1** *($2)*');
    
    // Create study cards for key concepts
    content = content.replace(/^## (Key Concepts?|Legal Doctrines?)$/gm, 
      '## $1\n\nimport { Card, CardGrid } from \'@astrojs/starlight/components\';\n');
    
    return content;
  }

  /**
   * Generate target file path in docs directory
   */
  getTargetPath(sourcePath) {
    const pathParts = sourcePath.split('/');
    const course = pathParts.find(p => p.match(/LAW\d{5}/))?.toLowerCase();
    const week = pathParts.find(p => p.match(/Week \d+/))?.toLowerCase().replace(' ', '');
    const filename = basename(sourcePath, '.md')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
    
    const targetName = course && week ? 
      `${course}-${week}-${filename}.md` : 
      `${filename}.md`;
    
    return join(this.docsTargetDir, targetName);
  }

  /**
   * Generate user-friendly titles
   */
  generateTitle(sourcePath) {
    const filename = basename(sourcePath, '.md');
    const weekMatch = filename.match(/Week (\d+)/);
    const course = sourcePath.match(/(LAW\d{5})/)?.[1];
    
    if (weekMatch && course) {
      return `${course} Week ${weekMatch[1]}: ${filename.replace(/Week \d+ - ?/, '')}`;
    }
    
    return filename.replace(/[-_]/g, ' ');
  }

  /**
   * Generate descriptions based on content
   */
  generateDescription(sourcePath) {
    if (sourcePath.includes('Evidence')) return 'Evidence law principles and applications';
    if (sourcePath.includes('Commercial')) return 'Commercial law concepts and case studies';
    return 'Legal study materials and analysis';
  }

  /**
   * Generate sidebar labels
   */
  generateSidebarLabel(sourcePath) {
    const filename = basename(sourcePath, '.md');
    return filename.replace(/Week \d+ - ?/, '').replace(/[-_]/g, ' ');
  }
}

// Run the sync if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const sync = new ObsidianToStarlightSync();
  sync.syncAndEnhance().catch(console.error);
}

export { ObsidianToStarlightSync };