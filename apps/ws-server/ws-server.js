import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { LingoDotDevEngine } from "lingo.dev/sdk";
import dotenv from "dotenv";

dotenv.config();

// Express app + HTTP server
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// WebSocket server mounted at /ws
const wss = new WebSocketServer({ server, path: "/ws" });

// Lingo Engine
const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

// Simple HTTP route (optional)
app.get("/", (req, res) => {
  res.send("Lingo WS Server is running.");
});

// WebSocket events
wss.on("connection", (socket) => {
  console.log("⚡ Client connected");

  socket.on("message", async (msg) => {
    try {
      const { text, sourceLocale, targetLocale } = JSON.parse(msg.toString());

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

// Start HTTP + WS server
server.listen(PORT, () => {
  console.log(`🔌 WS server is running on port ${PORT}`);
  console.log(`WS endpoint: ws://localhost:${PORT}/ws`);
});
