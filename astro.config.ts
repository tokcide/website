import { defineConfig } from "astro/config";
// Server Side Rendering
import vercel from "@astrojs/vercel/serverless";
// UI Framework
import solidJs from "@astrojs/solid-js";
// CSS Framework
import unocss from "@unocss/astro";
import presetWind from "@unocss/preset-wind";
// AstroVite-plugins
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({ analytics: true }),
  integrations: [
    solidJs(),
    unocss({
      presets: [
        presetWind(),
        /* more presets */
      ],
    }),
  ],
  vite: {
    plugins: [basicSsl()],
  },
});
