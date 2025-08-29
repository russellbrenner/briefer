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
      sidebar: [
        {
          label: 'Evidence Law (LAW20009)',
          items: [
            'law20009-week1-intro-relevance',
            'law20009-week7-study-guide',
            'law20009-week7-hearsay-flowchart',
          ],
        },
        {
          label: 'Commercial Law (LAW10013)',
          items: [
            'law10013-week1-intro-commercial-law',
            'law10013-week2-sale-of-goods',
          ],
        },
      ],
    }),
    mdx(),
    sitemap(),
  ],
  output: "static",
  image: {
    service: {
      entrypoint: "astro/assets/services/noop"
    }
  }
});
