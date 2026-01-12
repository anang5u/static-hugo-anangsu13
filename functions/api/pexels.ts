import type { PagesFunction } from "@cloudflare/workers-types";

type Env = {
  PEXELS_API_KEY: string;
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Missing query parameter ?q=" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const pexelsUrl = new URL("https://api.pexels.com/v1/search");
    pexelsUrl.searchParams.set("query", query);
    pexelsUrl.searchParams.set("per_page", "12");

    const res = await fetch(pexelsUrl.toString(), {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // cache 5 menit (hemat quota)
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch Pexels" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
