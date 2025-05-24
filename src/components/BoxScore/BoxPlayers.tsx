import { useCallback, useState } from 'react';
import { useOutsideClick } from '../ui/useOutsideClick';
import { BoxStats } from './BoxStats';
import type { BaseSyntheticEvent, FC } from 'react';
import type { BoxScoreProps } from './BoxScore';
import type { ReactNode } from '@tanstack/react-router';
import type { GamePlayer, StatSplit, StatType } from '@/types';
import type { BattingRecord, PitchingRecord } from '@/types.mlb';
import { toKebabCase } from '@/utils/toKebabCase';
import { cn } from '@/utils/cn';
import { getPlayerFirstName } from '@/utils/mlb';

type SortKey = keyof PitchingRecord & keyof BattingRecord;

type SortPayload = {
  sortKey: SortKey;
  splitKey: Exclude<Lowercase<StatSplit>, 'playoff'>;
};

export type BoxPlayersProps = {
  title?: string;
  players?: Array<GamePlayer>;
  className?: string;
  statType: StatType;
  splits: StatSplit;
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

  const HIGHLIGH_CLASS = 'highlighted';
  const statKey = statType === 'Batting' ? 'batting' : 'pitching';
  const [sort, setSort] = useState<SortPayload>();

  const getSiblings = (el: (HTMLDivElement | Element) | null) =>
    Array.from(el?.parentElement?.children || []);

  const currentPlayers = sortyByStat(
    getCurrentPlayers(players, statType, splits),
    sort?.splitKey,
    statKey,
    sort?.sortKey,
  );

  /**
   * Sort the stats
   */
  const onSortClick = useCallback((event: BaseSyntheticEvent) => {
    const { sortKey, splitKey } = event.target.dataset;
    setSort({ sortKey, splitKey });
  }, []);

  /**
   * Handle row clicks on a stat row
   */
  const onRowClick = useCallback((event: BaseSyntheticEvent) => {
    const { target: statNode } = event;
    const { playerId } = statNode.dataset;
    const playerNameSel = `.box-name[data-player-id="${playerId}"]`;
    const playerNode = document.querySelector(playerNameSel);
    const rowSiblings = getSiblings(statNode);
    const nameSiblings = getSiblings(playerNode);

    rowSiblings.forEach((el) => el.classList.remove(HIGHLIGH_CLASS));
    nameSiblings.forEach((el) => el.classList.remove(HIGHLIGH_CLASS));

    statNode.classList.add(HIGHLIGH_CLASS);
    playerNode?.classList.add(HIGHLIGH_CLASS);
  }, []);

  /**
   * Handle outside click
   */
  const onOutsideClickRef = useOutsideClick<HTMLDivElement>(() => {
    onOutsideClickRef.current
      ?.querySelectorAll('.highlighted')
      .forEach((el) => el.classList.remove(HIGHLIGH_CLASS));
  });

  /**
   * Pinch hitter class
   */
  const ph = (bo?: number | string) => (Number(bo) % 100 > 0 ? 'ph' : '');

  return currentPlayers.length > 0 ? (
    <section
      className={cn('box-players', toKebabCase(splits), className)}
      ref={onOutsideClickRef}
    >
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
              data-batting-order={player.battingOrder}
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
            onSortClick={onSortClick}
            onPlayerClick={onRowClick}
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

function sortyByStat(
  players: Array<GamePlayer>,
  splitKey: 'game' | 'season' | undefined,
  statKey: 'batting' | 'pitching',
  sortKey: SortKey | undefined,
) {
  if (!sortKey || !splitKey) return players;

  return players.sort((a, b) => {
    if (a[splitKey] && b[splitKey]) {
      const aStats = a[splitKey][statKey];
      const bStats = b[splitKey][statKey];
      if (aStats && bStats) {
        const aVal = Number(aStats[sortKey]);
        const bVal = Number(bStats[sortKey]);

        return aVal > bVal ? -1 : 1;
      }
    }
    return 0;
  });
}

function getCurrentPlayers(
  players: Array<GamePlayer>,
  statType: StatType,
  splits: StatSplit,
) {
  /**
   * Get Batters or Pitchers
   */

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
}
