import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { LingoDotDevEngine } from "lingo.dev/sdk";
import dotenv from "dotenv";
import crypto from "crypto";
import { createClient } from "redis";

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// WebSocket server
const wss = new WebSocketServer({ server, path: "/ws" });

// Redis Client
const redis = createClient({
  url: process.env.REDIS_URL,
});
redis.on("error", (err) => console.error("Redis Error:", err));
await redis.connect();

// Helper to hash text
const hashText = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");

// Lingo Engine
const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

wss.on("connection", (socket) => {
  console.log("⚡ Client connected");

  socket.on("message", async (msg) => {
    try {
      const { text, sourceLocale, targetLocale } = JSON.parse(msg.toString());
      if (!text) return;

      // Create cache key
      const key = `translation:${sourceLocale || "auto"}:${targetLocale}:${hashText(text)}`;

      // 1. Check cache
      const cached = await redis.get(key);
      if (cached) {
        socket.send(
          JSON.stringify({
            translated: JSON.parse(cached),
            cached: true,
          }),
        );
        console.log(`⚡cached key: ${key}`);
        return;
      }

      // 2. Call Lingo API
      const translated = await lingo.localizeText(text, {
        sourceLocale: sourceLocale ?? null,
        targetLocale,
        fast: true,
      });

      // 3. Save to cache
      await redis.set(key, JSON.stringify(translated));

      socket.send(
        JSON.stringify({
          translated,
          cached: false,
        }),
      );
      console.log(`🐢...live ${key}`);
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
