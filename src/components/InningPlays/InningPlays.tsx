import './InningPlays.css';

import { Tabs } from '../ui/Tabs/Tabs';
import { PlaysByInning } from '../PlaysByInning/PlaysByInning';
import { ScoringPlays } from '../ScoringPlays/ScoringPlays';
import { AllPlays } from '../AllPlays/AllPlays';
import type { GameStatus, InningPlay, LiveGame } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cn } from '@/utils/cn';
import { parseStatus } from '@/utils/mlb';

type InningPlaysProps = {
  status: GameStatus;
  className?: string;
  currentInning?: string;
  playsByInning?: Array<InningPlay>;
  allPlays?: LiveGame['allPlays'];
  scoringPlays?: LiveGame['scoringPlays'];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const InningPlays: FC<InningPlaysProps> = (props) => {
  const {
    className,
    status,
    currentInning = '',
    playsByInning,
    scoringPlays,
    allPlays,
    onPlayerClick,
  } = props;
  const { isPre, isScheduled, isWarmup, isFinal } = parseStatus(status);

  if (isPre || isScheduled || isWarmup) {
    return null;
  }

  if (isFinal) {
    return (
      <Tabs
        className={cn('inning-plays', className)}
        tabs={[<>Scoring Plays</>, <>All Plays</>]}
      >
        <ScoringPlays
          className="is-final"
          scoringPlays={scoringPlays}
          onPlayerClick={onPlayerClick}
        />
        <AllPlays allPlays={allPlays} />
      </Tabs>
    );
  }

  return (
    <Tabs
      className={cn('inning-plays', className)}
      tabs={[
        <>{currentInning.toLowerCase()} Plays</>,
        <>Scoring Plays</>,
        <>All Plays</>,
      ]}
    >
      <PlaysByInning
        playsByInning={playsByInning}
        onPlayerClick={onPlayerClick}
      />
      <ScoringPlays scoringPlays={scoringPlays} onPlayerClick={onPlayerClick} />
      <AllPlays allPlays={allPlays} />
    </Tabs>
  );
};
