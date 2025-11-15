import { LocaleSwitcher } from "lingo.dev/react/client";
import styles from "./page.module.css";
import { list } from "@vercel/blob";
import VideoPlayer from "./components/video/Video";

export default async function Home() {
  const { blobs } = await list({
    prefix: "emotions.mp4",
    limit: 1,
  });
  const { url } = blobs[0];

  return (
    <div className={styles.page}>
      <LocaleSwitcher locales={["en", "hi"]} />
      <main className={styles.main}>
        <VideoPlayer src={url} />
      </main>
    </div>
  );
}
