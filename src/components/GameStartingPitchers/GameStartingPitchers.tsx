import './GameStartingPitchers.css';
import { Player } from '../Player/Player';
import type { BaseSyntheticEvent, FC } from 'react';
import type { GamePlayer } from '@/types';

type GameStartingPitchersProps = {
  home?: GamePlayer;
  away?: GamePlayer;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const GameStartingPitchers: FC<GameStartingPitchersProps> = (props) => {
  const { home, away, onPlayerClick } = props;
  return (
    <div className="game-starting-pitchers">
      <h3>Probable Pitchers</h3>
      <Player
        className="starting-pitcher"
        player={away}
        onClick={onPlayerClick}
      />
      <span className="vs">vs</span>
      <Player
        className="starting-pitcher"
        player={home}
        onClick={onPlayerClick}
      />
    </div>
  );
};
