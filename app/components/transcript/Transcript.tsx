"use client";

import { useState, useEffect, RefObject, useRef } from "react";
import style from "./Transcript.module.css";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
  locale: string;
}

function isVTTCue(cue: TextTrackCue | null | undefined): cue is VTTCue {
  return !!cue && "text" in cue;
}

export default function Transcript({ videoRef, locale }: Props) {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [status, setStatus] = useState("idle");

  const ws = useRef<WebSocket | null>(null);
  const translateDebounce = useRef<any>(null);

  useEffect(() => {
    function connect() {
      const socket = new WebSocket(
        process.env.NODE_ENV === "development"
          ? "ws://localhost:3001"
          : "wss://lingo-video.vercel.app/api/translate",
      );

      ws.current = socket;

      socket.onopen = () => {
        console.log(`WS connected: ${socket}`);
        setStatus("ws-connected");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.translated) {
            setTranslatedText(data.translated);
          }
        } catch (e) {
          console.error("WS parse error", e);
        }
      };

      socket.onerror = (err) => {
        console.error("WS error", err);
      };

      socket.onclose = () => {
        console.warn("WS closed — reconnecting in 1s...");
        setTimeout(connect, 1000); // auto reconnect
      };
    }

    connect();

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    async function loadVTT() {
      setStatus("loading-vtt");

      if (!video) return;

      const trackEl = Array.from(video.querySelectorAll("track")).find(
        (t) => (t.getAttribute("srclang") ?? "").toLowerCase() === "en",
      );

      if (!trackEl) {
        setText(`No transcript track for ${locale}`);
        return;
      }

      const vttSrc = trackEl.getAttribute("src")!;
      try {
        const res = await fetch(vttSrc);
        const raw = await res.text();
        setText(raw);
        setStatus("vtt-loaded");
      } catch (err) {
        console.error("VTT load error:", err);
        setStatus("vtt-error");
      }
    }

    loadVTT();
  }, [locale, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tracks = Array.from(video.textTracks);
    const matching = tracks.find(
      (t) => t.language.toLowerCase() === locale.toLowerCase(),
    );

    if (!matching) return;

    matching.mode = "hidden";

    matching.oncuechange = () => {
      const cue = matching.activeCues?.[0];
      if (!isVTTCue(cue)) return;

      const cueText = cue.text;
      setText(cueText);

      // Debounce so we don't spam the socket
      clearTimeout(translateDebounce.current);
      translateDebounce.current = setTimeout(() => {
        ws.current?.send(
          JSON.stringify({
            text: cueText,
            sourceLocale: "en",
            targetLocale: locale,
          }),
        );
      }, 0);
    };
  }, [locale]);

  return (
    <div className={style.transcript}>
      <div>
        <h3>📝 Transcript</h3>
        <p>
          <strong>Status:</strong> {status}
        </p>

        <strong>Original:</strong>
        <p>{text || "Loading transcript…"}</p>
      </div>
      <div>
        <strong>
          Translated by <strong>(Lingo engine)</strong>:
        </strong>
        <p>{translatedText || "Waiting to start video…"}</p>
      </div>
    </div>
  );
}
