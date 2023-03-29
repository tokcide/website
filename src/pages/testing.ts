import type { APIRoute } from "astro";

export const handler: APIRoute = async ({ request, url }) => {
  return {
    body: JSON.stringify({
      url: url,
      method: request.method,
    }),
  };
};
