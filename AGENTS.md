# Repository Guidelines & Agent Usage Summary

This document serves as a comprehensive guide for understanding the repository structure, development workflow, and the AI agents used in building this professional documentation system.

## Claude Code Agent Usage Summary

### Primary Agents Used

1. **General-purpose Agent**: Used extensively for complex multi-step tasks including:
   - Analyzing existing Starlight implementation and theme issues  
   - Researching content enhancement patterns and transformation strategies
   - Troubleshooting build and deployment issues across multiple iterations

2. **DevOps Engineer Agent**: Employed for:
   - Cloudflare Pages deployment configuration and optimization
   - Build pipeline setup with post-build cleanup processes  
   - Static site generation architecture decisions

### Key Transformation Prompts Used

The markdown enhancement system uses these automated transformation patterns:

```javascript
// Definition patterns
"Definition:" → `:::note[Definition]`

// Case law formatting  
"Key Cases:" → `:::note[Key Cases]`

// Practice guidance
"Practice Tip:" → `:::tip[Practice Tip]` 

// Important legal elements
"Key Elements:" → `:::caution[Key Elements]`

// Section references with badges
"s 55" → `<Badge text="s 55" variant="tip" />`

// Structured callouts for legal content
"Rule:" → `:::caution[Rule]`
"Remember:" → `:::tip[Remember]`
```

### Content Processing Workflow

1. **Obsidian Sync**: Raw markdown with `publish: true` frontmatter
2. **Enhancement Pipeline**: Automated pattern matching and Starlight component injection
3. **Build Process**: Static generation with optimized assets and lightbox functionality
4. **Deployment**: Cloudflare Pages with build cleanup and performance optimization

## Project Structure & Module Organization
- `src/`: App code.
  - `components/` (Astro UI, PascalCase), `layouts/`, `pages/` (routes), `content/` → `blog/`, `uni/`, and `docs/` (Starlight).
  - `styles/`: Global styles and Starlight customization.
    - `global.css`: Professional legal theme with Inter/Newsreader fonts, navy/gold palette.
    - `starlight-custom.css`: Starlight-specific overrides for legal academic styling.
- `public/`: Static assets served at root (`/uni/<COURSE>/...`).
- `functions/_middleware.js`: Workers middleware that blocks disallowed file types.
- `scripts/`: Build/sync utilities (`sync-obsidian.mjs`, `post-build.mjs`).
- `dist/`: Build output (generated). Do not edit.
- `src/content.config.ts`: Content collections with schemas for `blog`, `uni`, and `docs` (docsSchema from Starlight).
- `astro.config.mjs`, `wrangler.toml`: Astro + Cloudflare Workers + Starlight configuration.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start local dev at `http://localhost:4323` (Starlight integration).
- `npm run build`: Production build + post-build cleanup.
- `npm run build:raw`: Build without post-processing.
- `npm run preview`: Preview the built site locally.
- `npm run sync:uni`: Sync Obsidian notes → `src/content/uni/` and media → `public/uni/`.
- `npm run sync:enhanced`: Enhanced sync with automatic Starlight transformation.
- `npm run sync:media`: Copy media from vault with size/meta rules.
- `npm run deploy`: Build and deploy via Cloudflare Wrangler.

## Coding Style & Naming Conventions
- Language: TypeScript + ESM; Astro components in `.astro`, content in `.md/.mdx`.
- Indentation: `.astro` uses tabs (match existing); `.ts/.mjs` use 2 spaces.
- Naming: Components `PascalCase.astro`; pages and assets `kebab-case`; content slugs descriptive (e.g., `law20009-week-7.md`).
- Frontmatter: Follow schemas in `src/content.config.ts` (`blog`, `uni`, `docs` for Starlight).
- Starlight Content: Use Starlight callouts (`:::note`, `:::tip`, `:::caution`, `:::danger`) for enhanced formatting.

## Testing Guidelines
- No formal test suite yet. Validate by:
  - Running `npm run build` → no errors; `npm run preview` for manual QA.
  - Check content validation errors from Astro content collections.
  - Verify middleware behavior by requesting uncommon file types (should 404).

## Commit & Pull Request Guidelines
- Use Conventional Commits observed in history: `feat(scope): ...`, `fix: ...`, `docs: ...`, `chore: ...`, `refactor: ...`.
- PRs should include: clear description, linked issues, screenshots for UI changes, and deployment notes (Wrangler/R2/KV updates).
- Keep diffs focused; update README/DEPLOYMENT if workflows change.

## Security & Configuration Tips
- Do not commit secrets. Use `wrangler secret put` and environment vars (`OBSIDIAN_*`).
- R2/KV bindings are defined in `wrangler.toml`; keep IDs out of code.
- Post-build and middleware intentionally remove/deny non-web file types; store documents (PDF, DOCX) in R2.
