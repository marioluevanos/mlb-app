import './LiveGame.css';
import { useCallback, useEffect, useState } from 'react';
import { Scoreboard } from '../Scoreboard/Scoreboard';
import { GamePreview } from '../GamePreview/GamePreview';
import { GameMatchup } from '../GameMatchup/GameMatchup';
import { GameBug } from '../GameBug/GameBug';
import { PlayEvents } from '../PlayEvents/PlayEvents';
import { InningPlays } from '../InningPlays/InningPlays';
import { GameDecisions } from '../GameDecisions/GameDecisions';
import { TopPerformers } from '../TopPerformers/TopPerformers';
import { TeamCompare } from '../TeamCompare/TeamCompare';
import { GameStreams } from '../GameStreams/GameStreams';
import { GameStartingPitchers } from '../GameStartingPitchers/GameStartingPitchers';
import type { MLBLive } from '@/types.mlb';
import type {
  GamePreview as GamePreviewType,
  GameStreamLinks,
  GameToday,
} from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { mapToLiveGame } from '@/utils/mlb';
import { toKebabCase } from '@/utils/toKebabCase';
import { cn } from '@/utils/cn';

type LiveGameProps = {
  className?: string;
  liveGame?: GameToday;
  gamePreview?: GamePreviewType;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const LiveGame: FC<LiveGameProps> = (props) => {
  const { className, gamePreview, liveGame, onPlayerClick } = props;
  const [game, setGame] = useState<GameToday | undefined>(liveGame);
  const isTopInning = game && game.currentInning?.split(' ')[0] === 'TOP';
  const isFinal = ['Final', 'Game Over'].includes(String(game?.status));
  const isInProgress = game?.status === 'In Progress';
  const isScheduled = game?.status === 'Scheduled';
  const isPregame = game?.status === 'Pre-Game';
  const isPostponed = game?.status === 'Postponed';
  const isWarmup = game?.status === 'Warmup';
  const isPre = isScheduled || isPregame || isPostponed || isWarmup;

  /**
   * Fetch and update the game in progress
   */
  const updateGameInProgress = useCallback(async () => {
    if (!game?.feed) return;
    const response = await fetch(game.feed);
    const live: MLBLive = await response.json();
    const updated = mapToLiveGame(live);

    setGame(updated);
  }, [game]);

  /**
   * Fetch and update the game in progress
   */
  const getLiveGameLinks = useCallback(async () => {
    const url = import.meta.env.VITE_API_URL;
    const response = await fetch(url);
    const jsonLinks: GameStreamLinks = await response.json();

    if (jsonLinks) {
      const g = jsonLinks.games.find((g) => g.id === game?.id);
      if (game && g && g?.streams.length) {
        setGame({
          ...game,
          streams: g.streams,
        });
      }
    }
  }, [game]);

  /**
   * Get live game links
   */
  useEffect(() => {
    getLiveGameLinks();
  }, [getLiveGameLinks]);

  /**
   * Check if game is in progress and update
   */
  useEffect(() => {
    if (game?.status === 'In Progress') {
      const intervalId = setInterval(updateGameInProgress, 15000);
      return () => clearInterval(intervalId);
    }
  }, [game?.status, updateGameInProgress]);

  return !game ? null : (
    <section
      id={game.id.toString()}
      data-status={toKebabCase(game.status)}
      className={cn('live-game', toKebabCase(game.status), className)}
    >
      {game.status === 'In Progress' && game.innings.length > 0 ? (
        <Scoreboard
          innings={game.innings}
          status={game.status}
          teams={[game.away, game.home]}
          isTopInning={isTopInning}
        />
      ) : (
        <>
          {gamePreview && <GamePreview gamePreview={gamePreview} />}
          {isPre && (
            <GameStartingPitchers
              home={game.home.startingPitcher}
              away={game.away.startingPitcher}
              onPlayerClick={onPlayerClick}
            />
          )}
        </>
      )}

      {!isFinal && isInProgress ? (
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

      <PlayEvents events={game.currentPlay?.events} status={game.status} />

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
      <TeamCompare away={game.away} home={game.home} />

      {!isFinal && game.streams.length ? (
        <GameStreams streams={game.streams} />
      ) : null}
    </section>
  );
};
