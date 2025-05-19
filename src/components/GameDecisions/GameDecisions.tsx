import './GameDecisions.css';
import { Player } from '../Player/Player';
import type { FC, ReactNode } from 'react';
import type { PlayerProps } from '../Player/Player';
import type { GameDecision } from '@/types';

export type GameDecisionsProps = {
  className?: string;
  decisions?: GameDecision;
  children?: ReactNode;
  onPlayerClick?: PlayerProps['onClick'];
};

export const GameDecisions: FC<GameDecisionsProps> = (props) => {
  const { decisions, onPlayerClick } = props;

  return (
    decisions?.winner && (
      <section className="game-decisions">
        <h3>Decision</h3>
        {decisions.winner && (
          <Player
            onClick={onPlayerClick}
            className="winner"
            player={decisions.winner}
          />
        )}
        {decisions.loser && (
          <Player
            onClick={onPlayerClick}
            className="loser"
            player={decisions.loser}
          />
        )}
        {decisions.save?.fullName && (
          <Player
            onClick={onPlayerClick}
            className="save"
            player={decisions.save}
          />
        )}
      </section>
    )
  );
};
