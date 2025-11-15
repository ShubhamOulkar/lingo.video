import { WebSocketServer } from "ws";
import { LingoDotDevEngine } from "lingo.dev/sdk";
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 3001 });

const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

console.log("🔌 Local WebSocket server running on ws://localhost:3001");

wss.on("connection", (socket) => {
  console.log("⚡ Client connected");

  socket.on("message", async (msg) => {
    try {
      const { text, targetLocale, sourceLocale } = JSON.parse(msg.toString());

      if (!text) return;

      const translated = await lingo.localizeText(text, {
        sourceLocale: sourceLocale ?? null,
        targetLocale,
      });

      socket.send(JSON.stringify({ translated }));
    } catch (err) {
      socket.send(
        JSON.stringify({
          error: err?.message || "Translation failed",
        }),
      );
    }
  });

  socket.on("close", () => console.log("❌ Client disconnected"));
});
