import './GamePreview.css';

import { Link } from '@tanstack/react-router';
import { Team } from '../Team/Team';
import { TeamScore } from '../TeamScore/TeamScore';
import { GamePreviewDetails } from './GamePreviewDetails';
import type { BaseSyntheticEvent, FC } from 'react';
import type { GamePreview as GamePreviewType } from '@/types';
import { cn } from '@/utils/cn';
import { toKebabCase } from '@/utils/toKebabCase';
import { isWinner, parseStatus } from '@/utils/mlb';

export type GamePreviewProps = {
  className?: string;
  gamePreview: GamePreviewType;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const GamePreview: FC<GamePreviewProps> = (props) => {
  const { className, gamePreview } = props;
  const { away, home, status, id } = gamePreview;
  const { isPre } = parseStatus(status);
  const winner = isWinner(away.score, home.score);

  return (
    <section
      id={id.toString()}
      data-status={toKebabCase(status)}
      className={cn(
        'game-preview',
        toKebabCase(status),
        isPre && 'is-pre',
        className,
      )}
    >
      <Link
        className="game-preview-link"
        to="/live/$id"
        params={{
          id: id.toString(),
        }}
      >
        {away.name} vs {home.name}
      </Link>
      <div className="game-preview-teams">
        <Team
          key={away.id}
          team={away}
          label="abbreviation"
          className={cn('game-preview-away', winner === 'away' && 'winner')}
        >
          <span className="game-preview-record">
            ({away.record.wins} &ndash; {away.record.losses})
          </span>
          {!isPre && <TeamScore score={away.score} />}
        </Team>
        <Team
          key={home.id}
          team={home}
          label="abbreviation"
          className={cn('game-preview-home', winner === 'home' && 'winner')}
        >
          <span className="game-preview-record">
            ({home.record.wins} &ndash; {home.record.losses})
          </span>
          {!isPre && <TeamScore score={home.score} />}
        </Team>
      </div>

      <GamePreviewDetails gamePreview={gamePreview} />
    </section>
  );
};
