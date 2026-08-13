import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/contents/posts",
    generateId: ({ entry }) =>
      entry.replace(/\/index\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}_/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const works = defineCollection({
  loader: file("src/contents/works.yaml"),
  schema: z.object({
    order: z.number(),
    items: z.array(
      z.object({
        name: z.string(),
        url: z.url(),
        description: z.string(),
        icon: z.string(),
        archived: z.boolean().optional(),
      }),
    ),
  }),
});

export const collections = { posts, works };
