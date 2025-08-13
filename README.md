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

## 🎨 Customization

The site uses a custom design system with:
- Professional legal-themed color scheme
- Responsive design for all devices
- Modern typography and spacing
- Glassmorphism UI elements

## 📧 Contact & Social

- **LinkedIn**: [Russell Brenner](https://linkedin.com/in/russellbrenner)
- **Email**: [russ@briefer.me](mailto:russ@briefer.me)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by a future barrister**
