import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [solidJs(), sitemap()]
});