import { ChatMemory } from "./memory.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve static assets ONLY if ASSETS exists
    if (request.method === "GET") {
      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }
      return new Response("OK");
    }

    // Chat endpoint
    if (url.pathname === "/chat" && request.method === "POST") {
      const { userId, message } = await request.json();

      const id = env.CHAT_MEMORY.idFromName(userId);
      const memory = env.CHAT_MEMORY.get(id);

      const memRes = await memory.fetch("https://do/get");
      const { history } = await memRes.json();

      const messages = [
        { role: "system", content: "You are a helpful AI assistant." },
        ...history,
        { role: "user", content: message }
      ];

      // AI call (FIXED MODEL BELOW)
      const ai = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct",
        { messages }
      );

      const reply = ai.response;

      await memory.fetch("https://do/save", {
        method: "POST",
        body: JSON.stringify({
          user: message,
          assistant: reply
        })
      });

      return new Response(
        JSON.stringify({ reply }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};

export { ChatMemory };
