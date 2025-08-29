# Briefer - Legal Insights & Analysis

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template)

**Professional legal commentary and analysis by a current law student and future barrister.**

## 📚 About

Briefer is a professional legal blog that provides clear, concise insights on contemporary legal issues. Written by a current law student with a passion for legal analysis and advocacy, preparing for a career as a barrister.

### What to Expect

- **Case Analysis**: In-depth examination of landmark cases and recent judgments
- **Legal Commentary**: Expert analysis of legal developments and reforms
- **Practical Insights**: Real-world applications and implications of legal principles

## 🚀 Live Site

**Currently deployed at**: [https://briefer.overlaynet.workers.dev](https://briefer.overlaynet.workers.dev)

## 🛠️ Built With

- **[Astro](https://astro.build)** - Modern static site generator
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Edge deployment platform
- **TypeScript** - Type-safe development
- **MDX** - Enhanced markdown with React components

## 📁 Project Structure

```
briefer/
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Blog posts and content
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── public/             # Static assets
└── dist/              # Build output
```

## 🧞 Development Commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run sync:uni`     | Sync selected Obsidian Uni notes into the site   |
| `npm run deploy`       | Deploy your production site to Cloudflare        |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This project is configured for deployment on Cloudflare Workers:

1. **Build**: `npm run build`
2. **Deploy**: `npm run deploy`

The site automatically deploys to Cloudflare Workers with:
- ✅ Global CDN distribution
- ✅ Automatic HTTPS
- ✅ Edge computing capabilities
- ✅ Built-in analytics

## 📝 Content Management

Blog posts are written in Markdown/MDX and stored in `src/content/blog/`. Each post includes:

- Frontmatter with metadata (title, date, description)
- Markdown content with support for MDX components
- Automatic sitemap generation
- RSS feed generation

### Selectively publishing Obsidian Uni notes

This repo can import a subset of your Obsidian vault (e.g. `LAW10013`, `LAW20009`) and publish them at `/uni`.

- Source vault path: set `OBSIDIAN_UNI_PATH` (defaults to `/Users/rbrenner/Obsidian/Uni`).
- Included courses: set `OBSIDIAN_COURSES` as a comma list (defaults to `LAW10013,LAW20009`).
- Optional per-note flag: set `OBSIDIAN_REQUIRE_PUBLISH=true` to only include notes with `publish: true` in frontmatter.

Commands:

```
OBSIDIAN_UNI_PATH="/Users/rbrenner/Obsidian/Uni" npm run sync:uni
```

How it works:
- Copies Markdown notes to `src/content/uni/<COURSE>/...`
- Copies non-Markdown assets (images, pdfs, etc.) to `public/uni/<COURSE>/...`
- Rewrites common image links in Markdown to reference `/uni/<COURSE>/...`
- Adds `course: <COURSE>` to frontmatter if not present

Routes:
- Index at `/uni`
- Per-note pages at `/uni/<course>/<path-to-note>`

Notes:
- For robust Obsidian-to-Markdown conversion (wiki links, embeds), consider using the `obsidian-export` CLI and running it before `sync:uni`.

## 🎨 Customization


The site uses a custom design system with:
- Professional legal-themed color scheme
- Responsive design for all devices
- Modern typography and spacing
- Glassmorphism UI elements

## 🧩 Add a new static page (About)

Create a simple static page at `/about` using MDX. This does not require any data sources or collections.

1. Create the file `src/pages/about.mdx` with the following content:

   ```mdx
   ---
   title: "About"
   description: "About Briefer — professional legal commentary and analysis"
   ---

   import BaseLayout from "../layouts/BaseLayout.astro";

   <BaseLayout title={frontmatter.title} description={frontmatter.description}>
     <h1>About Briefer</h1>
     <p><strong>Briefer</strong> is a professional legal blog providing clear, concise insights on contemporary legal issues. It is written by a current law student preparing for practice at the Victorian Bar.</p>

     <h2>Focus</h2>
     <ul>
       <li>Case analysis: landmark authorities and recent judgments</li>
       <li>Legal commentary: developments, reforms, and practical implications</li>
       <li>Practice-oriented notes: statutes, principles, and quick references</li>
     </ul>

     <h2>Editorial approach</h2>
     <p>Plain language, rigorous sourcing (AGLC4 where applicable), and pragmatic context for students and practitioners.</p>

     <h2>Contact</h2>
     <p>Connect on <a href="https://linkedin.com/in/russellbrenner">LinkedIn</a> or email <a href="mailto:russ@briefer.me">russ@briefer.me</a>.</p>
   </BaseLayout>
   ```

2. Start the dev server and visit `http://localhost:4321/about`:

   ```bash
   npm run dev
   ```

3. Deploy as usual when satisfied:

   ```bash
   npm run build && npm run deploy
   ```

### Notes
- If your project does not include `src/layouts/BaseLayout.astro`, replace the MDX layout import and wrapper with plain Markdown (keep the frontmatter). Astro will render the page at `/about` automatically.
- To add a navigation link, update your header/nav component under `src/components/` to include an anchor to `/about`.


- **LinkedIn**: [Russell Brenner](https://linkedin.com/in/russellbrenner)
- **Email**: [russ@briefer.me](mailto:russ@briefer.me)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by a future barrister**
