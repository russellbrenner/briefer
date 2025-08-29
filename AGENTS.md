# Repository Guidelines

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
