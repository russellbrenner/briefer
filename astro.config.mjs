// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://briefer.me",
  integrations: [
    starlight({
      title: 'Legal Study Notes',
      description: 'Professional law study materials and resources',
      social: [
        {
          icon: 'linkedin',
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/rbrenner',
        },
      ],
      customCss: [
        './src/styles/starlight-custom.css',
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/lightbox.js',
            defer: true,
          },
        },
      ],
      sidebar: [
        {
          label: 'Evidence Law (LAW20009)',
          items: [
            'law20009-week1-intro-relevance',
            'law20009-week1-week-1-collab-notes',
            'law20009-week2-week-2-collab-notes',
            'law20009-week3-week-3-collab-notes',
            'law20009-week4-week-4-collab-notes',
            'law20009-week5-week-5-collab-notes',
            'law20009-week7-study-guide',
            'law20009-week7-hearsay-flowchart',
          ],
        },
        {
          label: 'Commercial Law (LAW10013)',
          items: [
            'law10013-week1-intro-commercial-law',
            'law10013-week1-week-1-collab-notes',
            'law10013-week2-sale-of-goods',
            'law10013-week2-week-2-collab-notes',
            'law10013-week3-week-3-collab-notes',
            'law10013-week4-week-4-collab-notes',
          ],
        },
      ],
    }),
    mdx(),
    sitemap(),
  ],
  output: "server",
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop"
    }
  }
});
