import './TopPerformers.css';
import { Player } from '../Player/Player';
import type { BaseSyntheticEvent, FC } from 'react';
import type { GamePlayer } from '@/types';

export type TopPerformersProps = {
  topPerformers?: Array<GamePlayer>;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { topPerformers, onPlayerClick } = props;
  return (
    <section className="top-performers">
      <h3>Top Performers</h3>
      {topPerformers?.map((player) => (
        <Player player={player} key={player.fullName} onClick={onPlayerClick} />
      ))}
    </section>
  );
};
