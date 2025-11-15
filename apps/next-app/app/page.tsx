import styles from "./page.module.css";
import { list } from "@vercel/blob";
import VideoPlayer from "./components/video/Video";
import UiLangPicker from "./components/uiLangPicker/UiLangPicker";

export default async function Home() {
  const { blobs } = await list({
    prefix: "emotions.mp4",
    limit: 1,
  });
  const { url } = blobs[0];

  return (
    <div className={styles.page}>
      <nav className={styles.header}>
        <span className={styles.logo}>Lingo.video</span>
        <UiLangPicker />
      </nav>
      <main className={styles.main}>
        <h1>Real time video subtitles translation</h1>
        <VideoPlayer src={url} />
      </main>
    </div>
  );
}
