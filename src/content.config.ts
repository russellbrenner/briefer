import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

// Note collections

// Additional collection for selectively-published Obsidian notes
const uni = defineCollection({
  loader: glob({ base: "./src/content/uni", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    course: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }).passthrough(),
});

// Starlight docs collection
const docs = defineCollection({ 
  schema: docsSchema() 
});

export const collections = { blog, uni, docs };
