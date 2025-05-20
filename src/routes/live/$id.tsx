import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import type { MLBLive } from '@/types.mlb';
import { fetchScheduledGames, mapToLiveGame } from '@/utils/mlb';
import { LiveGame } from '@/components/LiveGame/LiveGame';
import { useMLB } from '@/components/ui/MLBProvider';

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
    const router = useRouterState();
    const { pathname } = router.location;
    const routeId = +pathname.replace(/\D+/g, '');
    const { liveGame, setLiveGame } = useMLB();

    useEffect(() => {
      if (!liveGame || Number(liveGame.id) !== routeId) {
        setLiveGame(data.liveGame);
      }
    }, [liveGame, setLiveGame, data.liveGame, routeId]);

    return <LiveGame liveGame={data.liveGame} gamePreview={data.gamePreview} />;
  },
});
