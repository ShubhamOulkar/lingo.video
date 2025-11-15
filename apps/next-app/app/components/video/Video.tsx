"use client";

import { useRef, useEffect, useState } from "react";
import Transcript from "../transcript/Transcript";
import style from "./Video.module.css";

interface Props {
  src: string;
}

const readCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const c = readCookie("lingo-locale");
    if (c) setLocale(c);
  }, []);

  return (
    <div className={style.video_player}>
      <div className={style.video_container}>
        <video controls preload="metadata" ref={videoRef} poster="i18n.avif">
          <source src={src} type="video/mp4" />
          <track
            src="/subtitles/emotions.en.vtt"
            kind="captions"
            srcLang="en"
            label="English"
            default={locale === "en"}
          />
          {/* Following files are not required, AI is doing translation in real time. */}
          {/* I am keeping these files for checking accuracy of transaltions. Test is by running CC. */}
          <track
            src="/subtitles/emotions.hi.vtt"
            kind="captions"
            srcLang="hi"
            label="Hindi"
            default={locale === "hi"}
          />
          <track
            src="/subtitles/emotions.es.vtt"
            kind="captions"
            srcLang="es"
            label="Spanish"
            default={locale === "es"}
          />
          <track
            src="/subtitles/emotions.de.vtt"
            kind="captions"
            srcLang="de"
            label="German"
            default={locale === "de"}
          />
          <track
            src="/subtitles/emotions.fr.vtt"
            kind="captions"
            srcLang="fr"
            label="French"
            default={locale === "fr"}
          />
          <track
            src="/subtitles/emotions.ja.vtt"
            kind="captions"
            srcLang="hi"
            label="Hindi"
            default={locale === "Japanese"}
          />
        </video>
        <p className={style.video_note}>
          *Note: Press play to start the cue changes and trigger translation. CC
          is available for checking accuracy.
        </p>
      </div>
      <Transcript videoRef={videoRef} locale={locale} />
    </div>
  );
}
