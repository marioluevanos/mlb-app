import './InningPlays.css';

import { Tabs } from '../ui/Tabs/Tabs';
import { PlaysByInning } from '../PlaysByInning/PlaysByInning';
import { ScoringPlays } from '../ScoringPlays/ScoringPlays';
import type { GameStatus, GameToday, InningPlay } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cn } from '@/utils/cn';

type InningPlaysProps = {
  status: GameStatus;
  className?: string;
  currentInning?: string;
  playsByInning?: Array<InningPlay>;
  scoringPlays?: GameToday['scoringPlays'];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const InningPlays: FC<InningPlaysProps> = (props) => {
  const {
    className,
    status,
    currentInning = '',
    playsByInning,
    scoringPlays,
    onPlayerClick,
  } = props;
  const isPreGame = status === 'Pre-Game';
  const isScheduled = status === 'Scheduled';
  const isWarmup = status === 'Warmup';
  const isFinal = ['Final', 'Game Over'].includes(status);

  if (isPreGame || isScheduled || isWarmup) {
    return null;
  }

  if (isFinal) {
    return (
      <>
        <ScoringPlays
          className="is-final"
          title="Scoring Plays"
          scoringPlays={scoringPlays}
          onPlayerClick={onPlayerClick}
        />
      </>
    );
  }

  return (
    <Tabs
      className={cn('inning-plays', className)}
      tabs={[<>{currentInning.toLowerCase()} Plays</>, <>Scoring Plays</>]}
    >
      <PlaysByInning
        playsByInning={playsByInning}
        onPlayerClick={onPlayerClick}
      />
      <ScoringPlays scoringPlays={scoringPlays} onPlayerClick={onPlayerClick} />
    </Tabs>
  );
};
