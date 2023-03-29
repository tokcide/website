import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { createContext } from "shared/context";
import { appRouter } from "shared/router";

export const all: APIRoute = ({ params, request }) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};
/*
import type { HTTPHeaders } from "@trpc/client";
import { resolveHTTPResponse } from "@trpc/server/http";
import type { APIContext } from "astro";
import { appRouter } from "../../server";

async function httpHandler({ request, params }: APIContext): Promise<Response> {
  const query = new URL(request.url).searchParams;

  const requestBody = request.method === "GET" ? {} : await request.json();

  const { status, headers, ...response } = await resolveHTTPResponse({
    createContext: async () => {
      return {};
    },
    router: appRouter,
    path: params.api as string,
    req: {
      query,
      method: request.method,
      headers: request.headers as unknown as HTTPHeaders,
      body: requestBody,
    },
  });

  return new Response(response.body, {
    headers: headers as HeadersInit,
    status,
  });
}

export const post = httpHandler;

export const get = httpHandler;
*/
