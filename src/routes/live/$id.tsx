import { createFileRoute } from '@tanstack/react-router';
import type { MLBLive } from '@/types.mlb';
import { fetchScheduledGames, mapToLiveGame } from '@/utils/mlb';
import { LiveGame } from '@/components/LiveGame/LiveGame';

export const Route = createFileRoute('/live/$id')({
  loader: async (loader) => {
    const { params } = loader;
    const apiLive = `https://statsapi.mlb.com/api/v1.1/game/${params.id}/feed/live`;
    const game = await fetch(apiLive);
    const jsonLive: MLBLive = await game.json();
    const liveGame = mapToLiveGame(jsonLive);
    const [yyyy, mm, dd] = jsonLive.gameData.datetime.officialDate.split('-');
    const gamePreviews = await fetchScheduledGames(yyyy, mm, dd);

    return {
      gamePreview: gamePreviews?.games.find((g) => g.id === jsonLive.gamePk),
      liveGame,
    };
  },
  component: function RouteComponent() {
    const data = Route.useLoaderData();

    const { liveGame, gamePreview } = data;

    return <LiveGame liveGame={liveGame} gamePreview={gamePreview} />;
  },
});
