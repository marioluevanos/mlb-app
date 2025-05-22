import './live.css';

import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import type { MLBLive } from '@/types.mlb';
import type { GameStream, GameStreamLinks, LiveGame } from '@/types';
import {
  fetchScheduledGames,
  getPlayerProfile,
  isWinner,
  mapToLiveGame,
  parseStatus,
} from '@/utils/mlb';
import { toKebabCase } from '@/utils/toKebabCase';
import { cn } from '@/utils/cn';
import { Scoreboard } from '@/components/Scoreboard/Scoreboard';
import { GameStartingPitchers } from '@/components/GameStartingPitchers/GameStartingPitchers';
import { GamePreview } from '@/components/GamePreview/GamePreview';
import { GameMatchup } from '@/components/GameMatchup/GameMatchup';
import { GameBug } from '@/components/GameBug/GameBug';
import { GameDecisions } from '@/components/GameDecisions/GameDecisions';
import { PlayEvents } from '@/components/PlayEvents/PlayEvents';
import { InningPlays } from '@/components/InningPlays/InningPlays';
import { TopPerformers } from '@/components/TopPerformers/TopPerformers';
import { TeamCompare } from '@/components/TeamCompare/TeamCompare';
import { GameHighlights } from '@/components/GameHighlights/GameHighlights';
import { Header } from '@/components/ui/Header/Header';
import { GameStreams } from '@/components/GameStreams/GameStreams';
import { toLegibleDate } from '@/utils/date';
import { useOutsideClick } from '@/components/ui/useOutsideClick';
import { TvIcon } from '@/components/ui/Icon';
import { BoxScore } from '@/components/BoxScore/BoxScore';

export const Route = createFileRoute('/live/$id')({
  loader: async (loader) => {
    const { params } = loader;
    const apiLive = `https://statsapi.mlb.com/api/v1.1/game/${params.id}/feed/live`;
    const game = await fetch(apiLive);
    const jsonLive: MLBLive = await game.json();
    const liveGame = await mapToLiveGame(jsonLive);
    const [yyyy, mm, dd] = jsonLive.gameData.datetime.officialDate.split('-');
    const gamePreviews = await fetchScheduledGames(yyyy, mm, dd);

    return {
      gamePreview: gamePreviews?.games.find((g) => g.id === jsonLive.gamePk),
      liveGame,
    };
  },
  component: function Live() {
    const data = Route.useLoaderData();
    const [game, setGame] = useState<LiveGame>(data.liveGame);
    const [gameStreams, setGameStreams] = useState<Array<GameStream>>([]);
    const isTopInning = game && game.currentInning?.split(' ')[0] === 'TOP';
    const { isPre, isFinal, isInProgress, isSuspended } = parseStatus(
      game?.status,
    );
    const date = toLegibleDate(game.date, false);
    const [tvPanelOpen, setTvPanelOpen] = useState(false);
    const winner = isWinner(game.away.score, game.home.score);

    /**
     * Handle outside click
     */
    const onOutsideClickRef = useOutsideClick<HTMLDivElement>(() =>
      setTvPanelOpen(false),
    );

    /**
     * Fetch and update the game in progress
     */
    const updateGameInProgress = useCallback(async () => {
      if (!game?.feed) return;
      const response = await fetch(game.feed);
      const live: MLBLive = await response.json();
      const updated = await mapToLiveGame(live);

      setGame(updated);
    }, [game, setGame]);

    /**
     * Fetch and update the game in progress
     */
    const getLiveGameLinks = useCallback(async () => {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(url);
      const jsonLinks: GameStreamLinks = await response.json();

      if (jsonLinks) {
        const g = jsonLinks.games.find((g) => g.id === game?.id);
        if (g && g?.streams.length) {
          setGameStreams(g.streams);
        }
      }
    }, [setGameStreams, game.id]);

    /**
     * On Player click
     */
    const onPlayerClick = useCallback(
      (event: BaseSyntheticEvent) => {
        event?.preventDefault();

        const target = event.target;
        const playerId = +target.dataset?.playerId;
        const player = getPlayerProfile({
          playerId,
          gameId: +game.id,
          games: [],
        });

        // setActivePlayer(player);
        console.log(player);
      },
      [game],
    );

    /**
     * Get live game links
     */
    useEffect(() => {
      if (gameStreams.length === 0 && !isFinal) {
        getLiveGameLinks();
      }
    }, [getLiveGameLinks, gameStreams, isFinal]);

    /**
     * Check if game is in progress and update
     */
    useEffect(() => {
      if (game?.status === 'In Progress') {
        const intervalId = setInterval(updateGameInProgress, 15000);
        return () => clearInterval(intervalId);
      }
    }, [game?.status, updateGameInProgress]);

    /**
     * When the game stream tv panel is open, add an event listender to close it on scroll
     */
    useEffect(() => {
      if (tvPanelOpen) {
        const onScroll = () => setTvPanelOpen(false);
        window.addEventListener('scroll', onScroll);

        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }
    }, [tvPanelOpen]);

    return (
      <main id="live-game">
        <Header
          ref={onOutsideClickRef}
          navChildren={
            <>
              <span className="date">{date}</span>
              {game?.status && <span className="status">{game?.status}</span>}
              {!isFinal && gameStreams.length ? (
                <button
                  className="streams"
                  onClick={() => setTvPanelOpen((prev) => !prev)}
                >
                  <TvIcon />
                </button>
              ) : null}
            </>
          }
        >
          {!isFinal && gameStreams.length ? (
            <GameStreams
              className={cn(tvPanelOpen && 'is-tv-open')}
              streams={gameStreams}
            />
          ) : null}
        </Header>
        <section
          id={game.id.toString()}
          data-status={toKebabCase(game.status)}
          className={cn('live-game', toKebabCase(game.status))}
        >
          {(isInProgress || isFinal || isSuspended) &&
          game.innings.length > 0 ? (
            <Scoreboard
              innings={game.innings}
              status={game.status}
              teams={[game.away, game.home]}
              isTopInning={isTopInning}
            />
          ) : (
            <>
              {data.gamePreview && (
                <GamePreview gamePreview={data.gamePreview} />
              )}
              {isPre && (
                <GameStartingPitchers
                  home={game.home.startingPitcher}
                  away={game.away.startingPitcher}
                  onPlayerClick={onPlayerClick}
                />
              )}
            </>
          )}

          {(!isFinal && isInProgress) || (!isFinal && isSuspended) ? (
            <GameMatchup matchup={game.currentPlay?.matchup}>
              <GameBug
                count={game.currentPlay?.count}
                currentInning={game.currentInning}
                runners={game.currentPlay?.runners}
              />
            </GameMatchup>
          ) : (
            <GameDecisions decisions={game.decisions} />
          )}

          {!isPre && (
            <PlayEvents
              events={game.currentPlay?.events}
              status={game.status}
            />
          )}

          <InningPlays
            status={game.status}
            currentInning={game.currentInning}
            playsByInning={game.playsByInning}
            scoringPlays={game.scoringPlays}
            allPlays={game.allPlays}
          />

          {game.topPerformers?.length > 0 ? (
            <TopPerformers
              className={cn(isPre && 'pre-game')}
              topPerformers={game.topPerformers}
              title={isPre ? 'Who to Watch' : 'Top Performers'}
            />
          ) : null}

          {!isPre && <TeamCompare away={game.away} home={game.home} />}

          <BoxScore
            home={game.home}
            away={game.away}
            winner={winner}
            status={game.status}
            onPlayerClick={onPlayerClick}
            matchup={{
              batterId: game.currentPlay?.matchup.batter.id,
              pitcherId: game.currentPlay?.matchup.pitcher.id,
            }}
            currentInning={game.currentInning}
          />

          <GameHighlights
            title={isPre ? 'Preview' : 'Highlights'}
            highlights={game.highlights}
          />
        </section>
      </main>
    );
  },
});
