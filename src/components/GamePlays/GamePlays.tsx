import './GamePlays.css';

import { Tabs } from '../ui/Tabs/Tabs';
import { PlaysByInning } from '../PlaysByInning/PlaysByInning';
import { ScoringPlays } from '../ScoringPlays/ScoringPlays';
import { AllPlays } from '../AllPlays/AllPlays';
import { GameHighlights } from '../GameHighlights/GameHighlights';
import type { GameStatus, InningPlay, LiveGame } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cn } from '@/utils/cn';
import { parseStatus } from '@/utils/mlb';

type GamePlaysProps = {
  status: GameStatus;
  className?: string;
  currentInning?: string;
  playsByInning?: Array<InningPlay>;
  allPlays?: LiveGame['allPlays'];
  scoringPlays?: LiveGame['scoringPlays'];
  highlights?: LiveGame['highlights'];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const GamePlays: FC<GamePlaysProps> = (props) => {
  const {
    className,
    status,
    currentInning = '',
    playsByInning,
    scoringPlays,
    allPlays,
    highlights = [],
    onPlayerClick,
  } = props;
  const { isPre, isScheduled, isWarmup, isFinal } = parseStatus(status);

  if (isPre || isScheduled || isWarmup) {
    return null;
  }

  return (
    <Tabs
      className={cn('inning-plays', className)}
      tabs={[
        !isFinal ? <>{currentInning.toLowerCase()} Plays</> : null,
        <>Scoring Plays</>,
        <>All Plays</>,
        <>Highlights</>,
      ]}
    >
      {!isFinal && (
        <PlaysByInning
          playsByInning={playsByInning}
          onPlayerClick={onPlayerClick}
        />
      )}
      <ScoringPlays scoringPlays={scoringPlays} onPlayerClick={onPlayerClick} />
      <AllPlays allPlays={allPlays} onPlayerClick={onPlayerClick} />
      <GameHighlights highlights={highlights} />
    </Tabs>
  );
};
