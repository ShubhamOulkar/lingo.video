interface EdgeWebSocket extends WebSocket {
  accept(): void;
}

declare global {
  interface ResponseInit {
    webSocket?: WebSocket;
  }

  const WebSocketPair: new () => { 0: WebSocket; 1: EdgeWebSocket };
}

export const runtime = "edge";

export async function GET(req: Request) {
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair) as [WebSocket, EdgeWebSocket];

  server.accept();

  server.onmessage = async (event) => {
    try {
      const { text, sourceLocale, targetLocale } = JSON.parse(event.data);

      if (!text) return;

      // Proxy to Node API
      const res = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({ text, sourceLocale, targetLocale }),
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret": process.env.INTERNAL_API_SECRET!,
        },
      });

      const data = await res.json();

      server.send(JSON.stringify({ translated: data.translated }));
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
}
