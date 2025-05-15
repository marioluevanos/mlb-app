import { LiveGame } from "@/components/LiveGame/LiveGame";
import { mapToLiveGame } from "@/utils/mlb";

export default async function Live({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const api = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live`;
  const game = await fetch(api);
  const json = await game.json();
  const liveGame = mapToLiveGame(json);
  const { status, innings, away, home, currentInning } = liveGame;
  const isTopInning = currentInning.split(" ")[0] === "TOP";

  return (
    <main className="live">
      <LiveGame
        {...liveGame}
        id={id}
        status={status}
        teams={[away, home]}
        innings={innings}
        isTopInning={isTopInning}
      />
    </main>
  );
}
