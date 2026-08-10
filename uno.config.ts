import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    {
      "bg-base": "bg-white dark:bg-zinc-900",
      "color-base": "text-black dark:text-white",
    },
  ],
  content: {
    filesystem: ["src/**/*.{yaml,yml}"],
    pipeline: {
      include: [/\.(astro|mdx?|html|[jt]sx|ya?ml)($|\?)/],
    },
  },
  presets: [
    presetMini(),
    presetAttributify(),
    presetWind3(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
