"use client";

import { useLingoLocale } from "lingo.dev/react-client";

interface VideoPlayer {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayer) {
  const locale = useLingoLocale();
  return (
    <video width="320" height="240" controls preload="none">
      <source src={src} type="video/mp4" />
      <track
        src="subtitles/emotions.en.vtt"
        kind="subtitles"
        srcLang="en"
        label="english"
        default={locale === "en"}
      />
      <track
        src="subtitles/emotions.hi.vtt"
        kind="subtitles"
        srcLang="hi"
        label="hindi"
        default={locale === "hi"}
      />
      Your browser does not support the video tag.
    </video>
  );
}
