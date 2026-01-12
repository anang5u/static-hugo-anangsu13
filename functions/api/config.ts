export const onRequest = async (context: {
  request: Request;
  env: {
    PEXELS_API_KEY: string;
    FORMSPREE_ENDPOINT: string;
  };
}) => {
  const { request, env } = context;

  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const config = {
    pexelsApiKey: env.PEXELS_API_KEY,
    formspreeEndpoint: env.FORMSPREE_ENDPOINT,
  };

  return new Response(JSON.stringify(config, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
