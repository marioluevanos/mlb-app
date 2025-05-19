import { createFileRoute } from '@tanstack/react-router';
import type { MLBLive } from '@/types.mlb';
import { fetchScheduledGames, mapToLiveGame } from '@/utils/mlb';
import { LiveGame } from '@/components/LiveGame/LiveGame';

export const Route = createFileRoute('/live/$id')({
  loader: async (loader) => {
    const { params } = loader;
    const apiLive = `https://statsapi.mlb.com/api/v1.1/game/${params.id}/feed/live`;
    const game = await fetch(apiLive);
    const jsonG: MLBLive = await game.json();
    const liveGame = mapToLiveGame(jsonG);
    const [yyyy, mm, dd] = jsonG.gameData.datetime.officialDate.split('-');
    const gamePreviews = await fetchScheduledGames(yyyy, mm, dd);
    return {
      gamePreview: gamePreviews?.games.find((g) => g.id === jsonG.gamePk),
      liveGame,
    };
  },
  component: function RouteComponent() {
    const data = Route.useLoaderData();

    console.log({ data });

    if (!data) return null;
    const { liveGame, gamePreview } = data;

    return <LiveGame liveGame={liveGame} gamePreview={gamePreview} />;
  },
});
