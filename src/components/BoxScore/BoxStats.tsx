import { Fragment } from 'react';
import { getSource } from './BoxScore.utils';
import type { BaseSyntheticEvent, FC } from 'react';
import type { BoxPlayersProps } from './BoxPlayers';
import type { GamePlayer } from '@/types';
import { cn } from '@/utils/cn';
import { cssVars } from '@/utils/cssVars';
import { toKebabCase } from '@/utils/toKebabCase';

type BoxStatsProps = Pick<
  BoxPlayersProps,
  'splits' | 'statType' | 'onPlayerClick' | 'matchup'
> & {
  currentPlayers: Array<GamePlayer>;
  onSortClick?: (event: BaseSyntheticEvent) => void;
};

export const BoxStats: FC<BoxStatsProps> = (props) => {
  const {
    statType,
    splits,
    onPlayerClick,
    onSortClick,
    matchup,
    currentPlayers,
  } = props;
  const source = getSource(splits, statType);
  const gridTemplateColumns = Object.entries(source).reduce<string>(
    (acc, [key, stat]) => {
      const stats = currentPlayers.map((p) => String(stat.value(p)).length);
      const max = Math.max(key.length, ...stats);
      acc += `${max + 2}ch `;
      return acc;
    },
    '',
  );

  return [
    <Fragment key={statType}>
      <div
        className="box-stats box-heading-labels"
        style={cssVars({ gridTemplateColumns })}
      >
        {Object.entries(source).map(([key, stat]) => (
          <span
            key={key}
            onClick={onSortClick}
            data-sort-key={stat.statKey}
            data-split-key={toKebabCase(stat.splitKey)}
            className="box-stats-label"
          >
            {key}
          </span>
        ))}
      </div>
    </Fragment>,
    currentPlayers.map((player, index) => (
      <div
        key={`${player.id}-${index}`}
        data-player-id={player.id}
        onClick={onPlayerClick}
        style={cssVars({ gridTemplateColumns })}
        className={cn(
          'box-stats',
          matchup?.batterId === player.id && 'active',
          matchup?.pitcherId === player.id && 'active',
          statType.toLowerCase(),
          toKebabCase(splits),
        )}
      >
        {Object.values(source).map((stat, index) => (
          <span key={index}>{stat.value(player)}</span>
        ))}
      </div>
    )),
  ];
};
