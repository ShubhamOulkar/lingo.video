import { LingoDotDevEngine } from "lingo.dev/sdk";

interface EdgeWebSocket extends WebSocket {
  accept(): void;
}

export const config = {
  runtime: "edge",
};

const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

export default {
  async fetch(req: Request) {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair) as [WebSocket, EdgeWebSocket];

    server.accept();

    server.onmessage = async (event) => {
      try {
        const { text, sourceLocale, targetLocale } = JSON.parse(event.data);

        if (!text) return;

        const translated = await lingo.localizeText(text, {
          sourceLocale: sourceLocale ?? null,
          targetLocale,
        });

        server.send(JSON.stringify({ translated }));
      } catch (err: any) {
        server.send(
          JSON.stringify({ error: err?.message || "Translation failed" }),
        );
      }
    };

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  },
};
