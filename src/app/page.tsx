import styles from "./page.module.css";
import { GamePreviews } from "@/components/GamePreviews/GamePreviews";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GamePreviews />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
