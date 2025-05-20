import './TopPerformers.css';
import { Player } from '../Player/Player';
import type { BaseSyntheticEvent, FC } from 'react';
import type { GamePlayer } from '@/types';
import { cn } from '@/utils/cn';

export type TopPerformersProps = {
  title?: string;
  className?: string;
  topPerformers?: Array<GamePlayer>;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { title, className, topPerformers, onPlayerClick } = props;
  return (
    <section className={cn('top-performers', className)}>
      {title && <h3>{title}</h3>}
      {topPerformers?.map((player) => (
        <Player player={player} key={player.fullName} onClick={onPlayerClick} />
      ))}
    </section>
  );
};
