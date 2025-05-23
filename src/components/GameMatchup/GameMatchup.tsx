import './GameMatchup.css';
import { Player } from '../Player/Player';
import type { BaseSyntheticEvent, FC, ReactNode } from 'react';
import type { CurrentMatchup } from '@/types';

export type GameMatchupProps = {
  className?: string;
  matchup?: CurrentMatchup;
  children?: ReactNode;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const GameMatchup: FC<GameMatchupProps> = (props) => {
  const { children, matchup, onPlayerClick } = props;

  return (
    matchup && (
      <section className="game-matchup">
        <h3>Current Matchup</h3>
        <div className="current-matchup">
          <Player player={matchup.batter} onClick={onPlayerClick} />
          <Player player={matchup.pitcher} onClick={onPlayerClick} />
        </div>
        {children}
      </section>
    )
  );
};
