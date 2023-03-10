import type { APIRoute } from "astro";

export const get: APIRoute = async ({ request, url }) => {
  return {
    body: JSON.stringify({
      url: url,
      method: request.method,
    }),
  };
};
