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
    }),
    mdx(),
    sitemap(),
  ],
  output: "server",
  adapter: cloudflare({
    mode: "directory"
  }),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop"
    }
  }
});
