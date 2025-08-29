// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://briefer.me",
  integrations: [mdx(), sitemap()],
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
