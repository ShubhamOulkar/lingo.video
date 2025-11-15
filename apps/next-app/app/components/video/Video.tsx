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
    // read locale only on client
    const c = readCookie("lingo-locale");
    if (c) setLocale(c);
  }, []);

  return (
    <div className={style.video_container}>
      <video
        width="500"
        height="300"
        controls
        preload="metadata"
        ref={videoRef}
        poster="i18n.avif"
      >
        <source src={src} type="video/mp4" />
        <track
          src="/subtitles/emotions.en.vtt"
          kind="captions"
          srcLang="en"
          label="English"
          default={locale === "en"}
        />
        <track
          src="/subtitles/emotions.hi.vtt"
          kind="captions"
          srcLang="hi"
          label="Hindi"
          default={locale === "hi"}
        />
      </video>
      <hr />
      <Transcript videoRef={videoRef} locale={locale} />
    </div>
  );
}
