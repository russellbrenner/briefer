# Briefer - Legal Insights & Analysis

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template)

**Professional legal commentary and analysis by a current law student and future barrister.**

## 🚀 Live Sites

- **Primary**: [https://briefer.me](https://briefer.me)
- **Workers**: [https://briefer.overlaynet.workers.dev](https://briefer.overlaynet.workers.dev)

## 🛠️ Built With

- **[Astro](https://astro.build)** - Modern static site generator
- **[Starlight](https://starlight.astro.build)** - Professional documentation framework
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Edge computing platform
- **TypeScript** - Type-safe development
- **MDX** - Enhanced markdown with React components

## 📁 Project Structure

```
briefer/
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Blog posts and content
│   │   ├── blog/       # Blog posts (markdown/mdx)
│   │   ├── docs/       # Starlight documentation (study materials)
│   │   └── uni/        # University notes (synced from Obsidian)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles + Starlight customization
├── public/             # Static assets
├── scripts/            # Build and sync scripts
├── dist/              # Build output (generated)
├── wrangler.toml      # Cloudflare Workers configuration
└── .github/workflows/ # GitHub Actions CI/CD
```

## 🚀 Complete Deployment Guide

### Prerequisites

1. **Node.js** (v18+)
2. **Git** configured with your details
3. **Cloudflare account** with Workers enabled
4. **Wrangler CLI** authenticated (`npx wrangler login`)
5. **Obsidian vault** (if syncing university notes)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-username/briefer.git
cd briefer

# Install dependencies
npm install

# Configure Git for privacy (optional)
git config user.name "Your Preferred Name"
git config user.email "your-email@example.com"
```

### Environment Configuration

Set up environment variables for Obsidian sync:

```bash
# In your shell profile (.bashrc, .zshrc, etc.)
export OBSIDIAN_UNI_PATH="/path/to/your/Obsidian/Uni"
export OBSIDIAN_COURSES="LAW10013,LAW20009"  # Comma-separated list
export OBSIDIAN_REQUIRE_PUBLISH=true  # Only sync notes with publish: true
```

### Development Workflow

```bash
# 1. Start development server
npm run dev
# Opens at http://localhost:4323

# 2. Sync university notes (if applicable)
npm run sync:uni

# 3. Test local build
npm run build
npm run preview
```

### Production Deployment

#### Method 1: Automated (GitHub Actions)

1. **Push to main branch** - deployment happens automatically:
```bash
git add -A
git commit -m "Your commit message"
git push origin main
```

2. **Monitor deployment** at https://github.com/your-username/briefer/actions

#### Method 2: Manual Deployment

```bash
# Complete build and deploy
npm run deploy

# Or step by step
npm run build
npx wrangler deploy --env production
```

## 📝 Content Management

### Starlight Documentation (Study Materials)

Create professional study guides in `src/content/docs/` with Starlight formatting:

```markdown
---
title: "Week 7 Study Guide: Hearsay Evidence"
description: "Comprehensive study guide covering hearsay evidence rules and exceptions"
sidebar:
  order: 1
---

# Study Guide: Hearsay Evidence

## Core Concepts

:::note[Definition]
Evidence of a statement offered to prove the truth of what is being asserted.
:::

### Key Cases

:::tip[Subramaniam v Public Prosecutor]
Classic case illustrating hearsay vs original evidence distinction.
:::
```

### Blog Posts

Create files in `src/content/blog/` with this structure:

```markdown
---
title: "Your Post Title"
description: "Brief description"
pubDate: "2025-08-29"
tags: ["legal", "analysis"]
---

Your content here...
```

### University Notes (Obsidian Integration)

#### Obsidian Note Requirements

For a note to be published, it must have this frontmatter:

```yaml
---
publish: true
title: "Week 7 - Study Guide: Hearsay Evidence"
course: LAW20009  # Optional - auto-added if missing
tags:             # Optional - auto-generated if missing
  - LAW20009
  - evidence
  - hearsay
  - study-guide
  - week7
  - uni
---

Your note content here...
```

#### Obsidian Folder Structure

```
/Users/your-username/Obsidian/Uni/
├── LAW20009/
│   ├── Week 7/
│   │   ├── Week 7 - Study Guide.md     # ✅ publish: true
│   │   ├── Week 7 Canvas.md            # ❌ no publish flag
│   │   └── Week 7 Flow Chart.md        # ❌ publish: false
│   └── Cases/
│       └── Important Case.pdf          # Auto-moved to R2
└── LAW10013/
    └── Week 1/
        └── Introduction.md             # ❌ no publish flag
```

#### Sync Commands

```bash
# Sync all notes (respects OBSIDIAN_REQUIRE_PUBLISH setting)
npm run sync:uni

# Force sync only published notes
OBSIDIAN_REQUIRE_PUBLISH=true npm run sync:uni

# Sync specific path
OBSIDIAN_UNI_PATH="/custom/path" npm run sync:uni
```

## 🔧 Build and Deploy Procedures

### Clean Deployment Process

When experiencing caching issues, follow this complete reset:

```bash
# 1. Clear all caches
rm -rf .astro dist node_modules/.astro

# 2. Clear content and re-sync
rm -rf src/content/uni
OBSIDIAN_REQUIRE_PUBLISH=true npm run sync:uni

# 3. Verify content
find src/content -name "*.md" -o -name "*.mdx"

# 4. Clean build
npm run build

# 5. Deploy
npx wrangler deploy --env production

# 6. Commit state
git add -A
git commit -m "Clean deployment with verified content"
git push
```

### Troubleshooting Cache Issues

If old content persists after deployment:

1. **Clear browser cache**: Hard refresh (Ctrl+F5 / Cmd+Shift+R)
2. **Try incognito mode**: Bypasses all local caches
3. **Different browser/device**: Rule out browser-specific issues
4. **Mobile hotspot**: Rule out DNS/ISP caching
5. **Wait 5-10 minutes**: CDN propagation time
6. **Force cache refresh**: Add `?v=timestamp` to URL

### GitHub Actions Deployment

The automated deployment runs on every push to `main`:

```yaml
# .github/workflows/deploy.yml
- Build with Node.js 20
- Install dependencies with npm ci
- Run npm run build
- Deploy to Cloudflare Workers
```

**Monitoring deployments:**
- GitHub: https://github.com/your-username/briefer/actions
- Cloudflare: https://dash.cloudflare.com/workers

## 🚨 Common Issues & Solutions

### Issue: "HTTP ERROR 500" on site

**Causes:**
- CDN caching stale content
- Browser caching old version
- DNS propagation delay

**Solutions:**
1. Hard refresh browser (Ctrl+F5)
2. Clear browser data completely
3. Try incognito mode
4. Wait 10-15 minutes for CDN
5. Try accessing worker URL directly

### Issue: Old blog posts still appearing

**Causes:**
- Cached build artifacts
- Content not properly removed from source

**Solutions:**
```bash
# Clear everything and rebuild
rm -rf .astro dist node_modules/.astro src/content/blog/*
npm run build
npx wrangler deploy --env production
```

### Issue: Obsidian sync not working

**Causes:**
- Path doesn't exist
- No notes have `publish: true`
- Environment variables not set

**Solutions:**
```bash
# Check path exists
ls -la "$OBSIDIAN_UNI_PATH"

# Check for published notes
grep -r "publish: true" "$OBSIDIAN_UNI_PATH"

# Debug sync
OBSIDIAN_REQUIRE_PUBLISH=true npm run sync:uni
find src/content/uni -name "*.md"
```

### Issue: Wrangler authentication

```bash
# Re-authenticate
npx wrangler logout
npx wrangler login

# Check auth
npx wrangler whoami
```

## 🎯 Content Publishing Workflow

### For University Notes

1. **Create note in Obsidian** with `publish: true` frontmatter
2. **Sync to project**: `npm run sync:uni`
3. **Test locally**: `npm run dev`
4. **Deploy**: `git push` (auto-deploys) or `npm run deploy`

### For Blog Posts

1. **Create markdown file** in `src/content/blog/`
2. **Add frontmatter** with title, date, description, tags
3. **Test locally**: `npm run dev`
4. **Deploy**: `git push` or `npm run deploy`

## 🔍 Debugging Commands

```bash
# Check content structure
find src/content -type f -name "*.md" -o -name "*.mdx" | head -20

# Verify Obsidian sync
grep -l "publish: true" src/content/uni/**/*.md

# Test build without deploy
npm run build:raw  # Builds without post-processing
npm run preview    # Preview build locally

# Check Wrangler config
npx wrangler whoami
npx wrangler deployments list --env production

# Monitor live logs (during deployment testing)
npx wrangler tail briefer --env production --format pretty
```

## 🌐 Domain Configuration

- **briefer.me** → Cloudflare Workers custom domain
- **briefer.overlaynet.workers.dev** → Default Workers subdomain

Both serve the same content with global CDN caching.

## 📊 Analytics & Monitoring

- **Cloudflare Analytics**: Built-in traffic and performance metrics
- **GitHub Actions**: Deployment success/failure notifications
- **Wrangler Logs**: Real-time error monitoring

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by a future barrister**

## ✨ Key Features

### Professional Legal Documentation
- **Starlight Integration**: Professional documentation framework for study materials
- **Interactive Callouts**: Note, tip, caution, and danger callouts for better content organization
- **Auto-generated Navigation**: Sidebar and table of contents generated from file structure
- **Professional Styling**: Custom CSS for legal academic content presentation

### Content Management
- **Multi-source Content**: Blog posts, university notes (Obsidian sync), and Starlight docs
- **Selective Publishing**: Only sync Obsidian notes with `publish: true` flag
- **Rich Typography**: Inter and Newsreader fonts for professional appearance
- **Responsive Design**: Mobile-optimized for study on any device

### Development & Deployment
- **Modern Stack**: Astro 5 + Starlight + TypeScript + Cloudflare Workers
- **Edge Deployment**: Global CDN with Cloudflare Workers for fast access
- **Automated CI/CD**: GitHub Actions for seamless deployments
- **Content Collections**: Type-safe content with schema validation

*Last updated: August 29, 2025*