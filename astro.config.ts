import { defineConfig } from "astro/config";
// Server Side Rendering
import netlify from "@astrojs/netlify/functions";
// UI Framework
import solidJs from "@astrojs/solid-js";
// CSS Framework
import unocss from "@unocss/astro";
import presetWind from "@unocss/preset-wind";
// AstroVite-plugins
import sitemap from "@astrojs/sitemap";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [
    solidJs(),
    unocss({
      presets: [
        presetWind(),
        /* more presets */
      ],
      safelist: [
        /* this you can use to exclude utilities from purge */
      ],
    }),
    sitemap(),
  ],
  vite: {
    plugins: [basicSsl()],
  },
});
