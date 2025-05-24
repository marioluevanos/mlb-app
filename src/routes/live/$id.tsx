import './live.css';

import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import type { MLBLive, PlayerProfile } from '@/types.mlb';
import type {
  GamePlayer,
  GameStream,
  GameStreamLinks,
  LiveGame,
  StatType,
  StatsByPosition,
} from '@/types';
import {
  fetchScheduledGames,
  findPlayerProfile,
  getPlayerProfileStats,
  headshot,
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
import { eventEmitter } from '@/utils/eventEmitter';

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
    const statsFetched = useRef(false);

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
        const player = findPlayerProfile({
          playerId,
          game,
        });

        eventEmitter.emit('playerclick', player);
      },
      [game],
    );

    /**
     * Get and filter player ids
     */
    const getIds = useCallback((players: Array<GamePlayer>) => {
      return players.reduce<Array<number>>((acc, p) => {
        if (p.id) {
          acc.push(p.id);
        }
        return acc;
      }, []);
    }, []);

    /**
     * Map season stats to game player object
     */
    const mapToGamePlayer = useCallback(
      (people: Array<PlayerProfile>, type: StatType) => {
        return people.map<GamePlayer>((p) => {
          const stats = p.stats ? p.stats[0]?.splits[0]?.stat : {};

          return {
            position: p.primaryPosition.abbreviation,
            avatar: headshot(p.id),
            fullName: p.fullName,
            id: p.id,
            season: {
              batting: type === 'Batting' ? stats : {},
              pitching: type === 'Pitching' ? stats : {},
            },
          };
        });
      },
      [],
    );

    /**
     * Get platyer stats by team
     */
    const getPlayerStats = useCallback(
      async (players: Array<GamePlayer> | undefined) => {
        const args = (players || []).reduce<StatsByPosition>(
          (acc, p) => {
            const key = p.position === 'P' ? 'pitching' : 'hitting';
            if (p && p.id) {
              acc[key].push(p);
            }
            return acc;
          },
          { pitching: [], hitting: [] },
        );

        const [pitching, hitting] = await Promise.all([
          getPlayerProfileStats({
            playerIds: getIds(args.pitching),
            group: 'pitching',
            season: 2025,
          }),
          getPlayerProfileStats({
            playerIds: getIds(args.hitting),
            group: 'hitting',
            season: 2025,
          }),
        ]);

        const pitchers = mapToGamePlayer(pitching.people, 'Pitching');
        const batters = mapToGamePlayer(hitting.people, 'Batting');

        return [...pitchers, ...batters];
      },
      [getIds, mapToGamePlayer],
    );

    /**
     * Call for more player stats and merge
     */
    const getStatsAndMerge = useCallback(async () => {
      if (statsFetched.current) return;

      const homePlayers = await getPlayerStats(game.home.players);
      const awayPlayers = await getPlayerStats(game.away.players);

      setGame({
        ...game,
        away: {
          ...game.away,
          players: awayPlayers,
        },
        home: {
          ...game.home,
          players: homePlayers,
        },
      });

      statsFetched.current = true;
    }, [game, getPlayerStats]);

    /**
     * Initialize
     */
    useEffect(() => {
      if (isPre) {
        getStatsAndMerge();
      }
    }, [isPre, getStatsAndMerge]);

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
            <GameMatchup
              matchup={game.currentPlay?.matchup}
              onPlayerClick={onPlayerClick}
            >
              <GameBug
                count={game.currentPlay?.count}
                currentInning={game.currentInning}
                runners={game.currentPlay?.runners}
              />
            </GameMatchup>
          ) : (
            <GameDecisions
              onPlayerClick={onPlayerClick}
              decisions={game.decisions}
            />
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
            highlights={game.highlights}
            onPlayerClick={onPlayerClick}
          />

          {game.topPerformers?.length > 0 ? (
            <TopPerformers
              className={cn(isPre && 'pre-game')}
              topPerformers={game.topPerformers}
              title={isPre ? 'Who to Watch' : 'Top Performers'}
              onPlayerClick={onPlayerClick}
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

          {!isFinal && (
            <GameHighlights title="Preview" highlights={game.highlights} />
          )}
        </section>
      </main>
    );
  },
});
