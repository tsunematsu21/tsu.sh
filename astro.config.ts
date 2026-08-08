import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import remarkLinkCard from "remark-link-card-plus";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://tsu.sh",
  integrations: [
    mdx(),
    UnoCSS({
      injectReset: true,
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkLinkCard],
    }),
  },
});
