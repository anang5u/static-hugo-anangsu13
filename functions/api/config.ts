import type { PagesFunction } from "@cloudflare/workers-types";

type Env = {
  PEXELS_API_KEY: string;
  FORMSPREE_ENDPOINT: string;
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ⚠️ Hindari expose apiKey ke client jika memungkinkan
  const config = {
    // pexelsApiKey: env.PEXELS_API_KEY, // ❌ jangan expose kecuali kamu benar-benar butuh
    formspreeEndpoint: env.FORMSPREE_ENDPOINT,
  };

  return new Response(JSON.stringify(config, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
