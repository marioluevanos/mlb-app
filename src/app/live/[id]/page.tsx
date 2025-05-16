import { LiveGame } from "@/components/LiveGame/LiveGame";
import { MLBLive } from "@/types.mlb";
import { fetchScheduledGames, mapToLiveGame } from "@/utils/mlb";

export default async function Live({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiLive = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live`;
  const game = await fetch(apiLive);
  const jsonG: MLBLive = await game.json();
  const liveGame = mapToLiveGame(jsonG);
  const [yyyy, mm, dd] = jsonG.gameData.datetime.officialDate.split("-");
  const gamePreviews = await fetchScheduledGames(yyyy, mm, dd);
  const gamePreview = gamePreviews?.games.find((g) => g.id === jsonG.gamePk);

  return (
    <main className="live">
      <LiveGame liveGame={liveGame} gamePreview={gamePreview} />
    </main>
  );
}
