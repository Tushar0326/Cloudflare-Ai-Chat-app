export class ChatMemory {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/get") {
      const history = await this.state.storage.get("history") || [];
      return new Response(JSON.stringify({ history }));
    }

    if (url.pathname === "/save") {
      const body = await request.json();

      let history = await this.state.storage.get("history") || [];

      history.push(
        { role: "user", content: body.user },
        { role: "assistant", content: body.assistant }
      );

      history = history.slice(-10);

      await this.state.storage.put("history", history);
      return new Response("Saved");
    }

    return new Response("Not Found", { status: 404 });
  }
}


