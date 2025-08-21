import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const uni = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    course: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { blog, uni };