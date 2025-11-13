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
        src={`subtitles/emotions.${locale}.vtt`}
        kind="subtitles"
        srcLang={locale || "en"}
        label={locale || "en"}
      />
      Your browser does not support the video tag.
    </video>
  );
}
