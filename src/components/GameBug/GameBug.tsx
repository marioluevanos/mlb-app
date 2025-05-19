import './GameBug.css';
import { CurrentInning } from '../CurrentInning/CurrentInning';
import type { FC, ReactNode } from 'react';
import type { CurrentPlay } from '@/types';
import { cn } from '@/utils/cn';

export type GameBugProps = {
  className?: string;
  children?: ReactNode;
  count?: CurrentPlay['count'];
  runners?: CurrentPlay['runners'];
  currentInning?: string;
};

export const GameBug: FC<GameBugProps> = (props) => {
  const { count, runners, currentInning, className } = props;

  return (
    <span className={cn('game-bug', className)}>
      <span className="bases">
        <span className={cn('base second', runners?.second && 'runner')}></span>
        <span className={cn('base first', runners?.first && 'runner')}></span>
        <span className={cn('base third', runners?.third && 'runner')}></span>
        <span className="base home"></span>
      </span>
      <div className="balls-strikes">
        <span className="balls">{count?.balls}</span> &ndash;
        <span className="strikes">{count?.strikes}</span>
      </div>
      <div className="outs">
        {Array.from({ length: 3 }, (_, i) => (
          <span
            className={cn('out', (count?.outs || 0) > i && 'is-out')}
            key={i}
          >
            {i}
          </span>
        ))}
      </div>
      {currentInning && <CurrentInning currentInning={currentInning} />}
    </span>
  );
};
