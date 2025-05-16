import { LiveGame } from "@/components/LiveGame/LiveGame";
import { mapToLiveGame } from "@/utils/mlb";
import RAW from "../../../_mockdata/RAW-XINN.json";
import { MLBLive } from "@/types.mlb";

export default async function Live({
  params: _,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = await params;
  // const api = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live`;
  // const game = await fetch(api);
  // const json = await game.json();
  const liveGame = mapToLiveGame(RAW as unknown as MLBLive);

  console.log(liveGame.scoringPlays);

  return (
    <main className="live">
      <LiveGame liveGame={liveGame} />
    </main>
  );
}
