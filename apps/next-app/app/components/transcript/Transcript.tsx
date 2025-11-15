"use client";

import { useState, useEffect, type RefObject, useRef } from "react";
import LangPicker from "../common/LangPicker";
import styles from "./Transcript.module.css";

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
  const [wsLocale, setWsLocale] = useState(locale);

  const ws = useRef<WebSocket | null>(null);
  const translateDebounce = useRef<any>(null);

  useEffect(() => {
    function connect() {
      const socket = new WebSocket(
        process.env.NODE_ENV === "development"
          ? "ws://localhost:3001/ws"
          : "wss://lingo-video-ws.onrender.com/ws",
      );

      ws.current = socket;

      socket.onopen = () => {
        console.log(`WS connected: ${socket.url}`);
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

    const tracks = Array.from(video.textTracks);
    const matching = tracks.find((t) => t.language.toLowerCase() === "en");

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
            targetLocale: wsLocale,
          }),
        );
      }, 0);
    };
  }, [locale, wsLocale]);

  return (
    <div className={styles.transcriptCard}>
      <h3 className={styles.cardTitle}>
        <svg
          className={styles.cardIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Real-Time Transcript
      </h3>

      <div className={styles.spaceY}>
        <div className={styles.originalBox}>
          <p className={styles.labelOriginal}>
            Original (<span>en</span>):
          </p>
          <p className={styles.textContent}>
            {text || "Waiting for video playback..."}
          </p>
        </div>

        <div className={styles.translatedBox}>
          <p className={styles.labelTranslated}>
            <span>
              Translated to (<span>{wsLocale}</span>)
            </span>
            <strong className={styles.engineLabel}>Lingo Engine</strong>
          </p>
          <p className={styles.textContent}>
            {translatedText || "Awaiting translation..."}
          </p>
        </div>
      </div>

      <p className={styles.statusFooter}>
        WS Status: <span className={styles.statusOk}>{status}</span>
      </p>
    </div>
  );
}
