import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [solidJs(), sitemap()],
});
