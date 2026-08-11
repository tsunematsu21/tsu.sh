import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import { externalLinks, linkCards } from "./src/satteri";

// https://astro.build/config
export default defineConfig({
  site: "https://tsu.sh",
  integrations: [
    mdx(),
    UnoCSS({
      injectReset: true,
    }),
    sitemap(),
  ],
  markdown: {
    processor: satteri({
      mdastPlugins: [linkCards],
      hastPlugins: [externalLinks],
    }),
  },
});
