import { fetchTodaysGames } from "@/utils/games";
import styles from "./page.module.css";
import { formatDateInput, getLocalDate } from "@/utils/date";

export default async function Home() {
  const today = formatDateInput(getLocalDate());
  const todaysGames = await fetchTodaysGames(...today);

  console.log(JSON.stringify(todaysGames?.games[0]), { todaysGames });

  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
