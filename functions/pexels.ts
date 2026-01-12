type Env = {
  PEXELS_API_KEY: string;
  FORMSPREE_ENDPOINT: string;
};

export const onRequest = async (
  context: {
    request: Request;
    env: Env;
  }
) => {
    const { request, env } = context;
    const url = new URL(request.url);
    //const query = url.searchParams.get("q");

    //const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    const res = await fetch(`https://formspree.io/f/abc123`, {
        headers: {
        Authorization: `R8Ca5YljmjdxvbHVZtlFdyjTanEOQdL7QCufMF6EiLlZ6pfkIzAmZo3u`//env.PEXELS_API_KEY,
        },
    });

    return new Response(res.body, {
        headers: { "Content-Type": "application/json" },
    });
};
