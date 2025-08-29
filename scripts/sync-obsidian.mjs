#!/usr/bin/env node
// Sync selected Obsidian course folders into the Astro site.
// - Copies Markdown notes into `src/content/uni/<COURSE>/...`
// - Copies non-Markdown assets into `public/uni/<COURSE>/...`
// - Rewrites common image links in Markdown to point at `/uni/<COURSE>/...`

import { promises as fs } from 'node:fs';
import path from 'node:path';

const VAULT_PATH = process.env.OBSIDIAN_UNI_PATH || '/Users/rbrenner/Obsidian/Uni';
const COURSES = (process.env.OBSIDIAN_COURSES || 'LAW10013,LAW20009')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const REQUIRE_PUBLISH = (process.env.OBSIDIAN_REQUIRE_PUBLISH || 'true').toLowerCase() === 'true';

const DEST_CONTENT = path.resolve('src/content/uni');
const DEST_PUBLIC = path.resolve('public/uni');

const MD_EXT = new Set(['.md', '.mdx']);
const IGNORE_DIRS = new Set(['.obsidian', '.trash', '.git', 'Templates']);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function rmrf(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

async function* walk(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    const rel = path.relative(base, abs);
    if (entry.isDirectory()) {
      yield* walk(abs, base);
    } else {
      yield { abs, rel, name: entry.name };
    }
  }
}

function rewriteMarkdownLinks({ content, course }) {
  // 1) Rewrite standard relative image links: ![alt](path)
  //    Only rewrite non-HTTP(S) links.
  content = content.replace(/!\[[^\]]*\]\((?!https?:)([^)]+)\)/g, (m, p1) => {
    // Normalize spaces in paths
    const clean = p1.replace(/\\ /g, ' ').trim();
    const abs = `/uni/${course}/${clean}`.replace(/\\/g, '/');
    return m.replace(p1, abs);
  });

  // 2) Rewrite Obsidian wiki-embedded files with extensions: ![[file.ext]]
  content = content.replace(/!\[\[([^\]|#]+\.(?:png|jpg|jpeg|gif|svg|pdf))[^\]]*\]\]/gi, (m, p1) => {
    const clean = p1.trim();
    const abs = `/uni/${course}/${clean}`;
    return `![](${abs})`;
  });

  return content;
}

function parseFrontmatter(str) {
  if (!str.startsWith('---')) return { fm: null, body: str };
  const end = str.indexOf('\n---', 3);
  if (end === -1) return { fm: null, body: str };
  const raw = str.slice(3, end).trim();
  const body = str.slice(end + 4);
  // naive YAML parser for a few fields
  const fm = Object.create(null);
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim();
      fm[key] = val.replace(/^"|"$/g, '');
    }
  }
  return { fm, body };
}

async function syncCourse(course) {
  const srcCourseDir = path.join(VAULT_PATH, course);
  const destContentDir = path.join(DEST_CONTENT, course);
  const destPublicDir = path.join(DEST_PUBLIC, course);

  // Clean destinations for idempotency
  await rmrf(destContentDir);
  await rmrf(destPublicDir);
  await ensureDir(destContentDir);
  await ensureDir(destPublicDir);

  for await (const { abs, rel } of walk(srcCourseDir, srcCourseDir)) {
    const ext = path.extname(rel).toLowerCase();
    const isMarkdown = MD_EXT.has(ext);
    const from = abs;
    const to = path.join(isMarkdown ? destContentDir : destPublicDir, rel);
    await ensureDir(path.dirname(to));

    if (isMarkdown) {
      let text = await fs.readFile(from, 'utf8');
      // Optionally require publish: true
      if (REQUIRE_PUBLISH) {
        const { fm } = parseFrontmatter(text);
        if (!fm || !/^true$/i.test(String(fm.publish || ''))) {
          continue; // skip
        }
      }
      text = rewriteMarkdownLinks({ content: text, course });

      // Derive tags from vault path segments and course
      const relDir = path.dirname(rel);
      const dirSegments = relDir === '.' ? [] : relDir.split(path.sep).filter(Boolean);
      const derivedTags = [course, 'uni', ...dirSegments]
        .filter(Boolean)
        .map((t) => t.trim())
        .filter((t, i, a) => a.indexOf(t) === i);
      const tagList = derivedTags.map((t) => `"${t}"`).join(', ');

      // Ensure the course and tags are present in frontmatter
      if (text.startsWith('---')) {
        const end = text.indexOf('\n---', 3);
        if (end !== -1) {
          const head = text.slice(0, end);
          const body = text.slice(end + 4);
          const courseLine = /\ncourse:/i.test(head) ? '' : `\ncourse: ${course}`;
          const tagsLine = /\ntags:/i.test(head) ? '' : `\ntags: [${tagList}]`;
          text = `${head}${courseLine}${tagsLine}\n---${body}`;
        }
      } else {
        // Add frontmatter if not present
        const title = path.basename(from, path.extname(from));
        text = `---\ntitle: "${title}"\ncourse: ${course}\ntags: [${tagList}]\ndate: ${new Date().toISOString().split('T')[0]}\n---\n\n${text}`;
      }
      await fs.writeFile(to, text, 'utf8');
    } else {
      await fs.copyFile(from, to);
    }
  }
}

async function main() {
  console.log(`Syncing from vault: ${VAULT_PATH}`);
  console.log(`Courses: ${COURSES.join(', ')}`);
  await ensureDir(DEST_CONTENT);
  await ensureDir(DEST_PUBLIC);
  for (const course of COURSES) {
    const exists = await fs
      .stat(path.join(VAULT_PATH, course))
      .then((s) => s.isDirectory())
      .catch(() => false);
    if (!exists) {
      console.warn(`Skipping '${course}': not found in vault.`);
      continue;
    }
    await syncCourse(course);
  }
  console.log('Sync complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
