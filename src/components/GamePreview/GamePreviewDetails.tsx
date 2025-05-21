import './GamePreview.css';
import { GameBug } from '../GameBug/GameBug';
import { CurrentInning } from '../CurrentInning/CurrentInning';
import type { FC } from 'react';
import type { GamePreview } from '@/types';
import { cn } from '@/utils/cn';
import { parseStatus } from '@/utils/mlb';

export type GamePreviewDetailsProps = {
  className?: string;
  gamePreview: GamePreview;
};

export const GamePreviewDetails: FC<GamePreviewDetailsProps> = (props) => {
  const { gamePreview, className } = props;
  const {
    status,
    currentInning = '',
    time,
    count,
    runners,
    gameNumber,
    doubleHeader,
  } = gamePreview;
  const {
    isFinal,
    isScheduled,
    isPregame,
    isPostponed,
    isWarmup,
    isSuspended,
  } = parseStatus(status);

  if (isPregame || isScheduled || isWarmup) {
    return (
      <span className="game-preview-details">
        <span className={cn('game-time', className)}>{time}</span>
      </span>
    );
  }

  if (isSuspended) {
    return (
      <span className="game-preview-details">
        <span className={cn('game-status', className)}>
          {gamePreview.status}
        </span>
        <CurrentInning currentInning={currentInning} />
      </span>
    );
  }

  if (isFinal || isPostponed) {
    const totalInnings = parseInt(currentInning?.replace(/\D+/g, ''));
    const isExtraInnings = totalInnings > 9;
    return (
      <span className="game-preview-details">
        <span className={cn('game-status', className)}>
          {isFinal ? 'Final' : gamePreview.status}
        </span>
        {isExtraInnings && (
          <span className={cn('total-innings', className)}>
            /{totalInnings}
          </span>
        )}
        {['Y', 'S'].includes(doubleHeader) ? (
          <span className="double-header">/Game {gameNumber}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className="game-preview-details">
      <GameBug currentInning={currentInning} count={count} runners={runners} />
    </span>
  );
};
