import './Player.css';
import type { BaseSyntheticEvent, FC } from 'react';
import type { GamePlayer } from '@/types';
import { cn } from '@/utils/cn';

export type PlayerProps = {
  className?: string;
  onClick?: (event: BaseSyntheticEvent) => void;
  player?: Pick<
    GamePlayer,
    | 'avatar'
    | 'id'
    | 'fullName'
    | 'jerseyNumber'
    | 'position'
    | 'summary'
    | 'note'
  >;
};

export const Player: FC<PlayerProps> = (props) => {
  const { className, player, onClick } = props;
  const fullName = player?.fullName || '';
  const summary = player?.summary;
  const position = player?.position;
  const avatar =
    player?.avatar ||
    'https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.3.0/images/players/default-batter.svg';
  const note = player?.note;

  return (
    player && (
      <div
        className={cn('player', className)}
        data-player-id={player.id}
        onClick={onClick}
      >
        <img
          width={128}
          height={128}
          className="player-avatar loading"
          src={avatar}
          alt={fullName}
        />
        <span data-pos={position} className="player-name">
          {fullName}
        </span>
        {(summary || note) && (
          <span className="player-summary">{summary || note}</span>
        )}
        {note && <span className="player-note">{note}</span>}
      </div>
    )
  );
};
