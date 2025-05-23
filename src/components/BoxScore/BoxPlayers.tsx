import { useMemo } from 'react';
import { BoxStats } from './BoxStats';
import type { BaseSyntheticEvent, FC } from 'react';
import type { BoxScoreProps } from './BoxScore';
import type { ReactNode } from '@tanstack/react-router';
import type { GamePlayer, StatType } from '@/types';
import { toKebabCase } from '@/utils/toKebabCase';
import { cn } from '@/utils/cn';
import { getPlayerFirstName } from '@/utils/mlb';

export type BoxPlayersProps = {
  title?: string;
  players?: Array<GamePlayer>;
  className?: string;
  statType: StatType;
  /**
   * Where to take the stats from
   */
  splits: 'Season' | 'Playoff' | 'Game';
  header?: ReactNode;
  matchup?: BoxScoreProps['matchup'];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const BoxPlayers: FC<BoxPlayersProps> = (props) => {
  const {
    matchup,
    header,
    className,
    players = [],
    title,
    statType,
    splits = 'Season',
    onPlayerClick,
  } = props;

  /**
   * Get Batters or Pitchers
   */
  const currentPlayers = useMemo(() => {
    const order =
      statType === 'Batting'
        ? getBattingOrder(players)
        : getPitchingOrder(players);

    if (splits === 'Game' && order.length) {
      return order;
    }

    if (statType === 'Pitching') {
      return players.filter((p) => {
        if (p.position === 'P') {
          return p;
        }
      });
    }

    return players.filter((p) => {
      if (p.position !== 'P') {
        return p;
      }
    });
  }, [statType, players, splits]);

  /**
   * Pinch hitter class
   */
  const ph = (bo?: number | string) => (Number(bo) % 100 > 0 ? 'ph' : '');

  return currentPlayers.length > 0 ? (
    <section className={cn('box-players', toKebabCase(splits), className)}>
      {header}
      <div className="box-players-data">
        <div className="box-player-names">
          <div className="box-heading-labels">
            <span className="box-name">{title}</span>
          </div>
          {currentPlayers.map((player, index) => (
            <span
              className={cn(
                'box-name',
                matchup?.batterId === player.id && 'active',
                matchup?.pitcherId === player.id && 'active',
                ph(player.battingOrder),
              )}
              data-pos={player.position}
              data-player-id={player.id}
              key={`${player.id}-${index}`}
              onClick={onPlayerClick}
            >
              {getPlayerFirstName(player.fullName)}
            </span>
          ))}
        </div>
        <div className={cn('box-player-stats', toKebabCase(statType))}>
          <BoxStats
            splits={splits}
            key="box-score-players"
            currentPlayers={currentPlayers}
            statType={statType}
            onPlayerClick={onPlayerClick}
            matchup={matchup}
          />
        </div>
      </div>
    </section>
  ) : null;
};

/**
 * Get the batting order
 */
function getBattingOrder(players: Array<GamePlayer>) {
  return players
    .reduce<Array<GamePlayer>>((acc, p) => {
      if (typeof p.battingOrder === 'number') {
        acc.push(p);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      if (Number(a.battingOrder) > Number(b.battingOrder)) {
        return 1;
      }
      if (Number(a.battingOrder) < Number(b.battingOrder)) {
        return -1;
      }
      return 0;
    });
}

/**
 * Get the pitching order
 */
function getPitchingOrder(players: Array<GamePlayer>) {
  return players.reduce<Array<GamePlayer>>((acc, p) => {
    if (p.position === 'P' && Object.values(p.game?.pitching || {}).length) {
      acc.unshift(p);
    }
    return acc;
  }, []);
}
