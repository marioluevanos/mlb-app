import { Fragment } from 'react';
import type { FC } from 'react';
import type { BoxPlayersProps } from './BoxPlayers';
import type { GamePlayer } from '@/types';
import { cn } from '@/utils/cn';
import { cssVars } from '@/utils/cssVars';

export const BoxStats: FC<
  Pick<BoxPlayersProps, 'splits' | 'statType' | 'onPlayerClick' | 'matchup'> & {
    currentPlayers: Array<GamePlayer>;
  }
> = (props) => {
  const { statType, splits, onPlayerClick, matchup, currentPlayers } = props;
  const statKey: keyof GamePlayer = splits === 'Game' ? 'game' : 'season';
  const gameBattingStats = {
    AB: (p: GamePlayer) => p.game?.batting?.atBats,
    R: (p: GamePlayer) => p.game?.batting?.runs,
    H: (p: GamePlayer) => p.game?.batting?.hits,
    HR: (p: GamePlayer) => p.game?.batting?.homeRuns,
    RBI: (p: GamePlayer) => p.game?.batting?.rbi,
    BB: (p: GamePlayer) => p.game?.batting?.baseOnBalls,
    SO: (p: GamePlayer) => p.game?.batting?.strikeOuts,
    TB: (p: GamePlayer) => p.game?.batting?.totalBases,
    AVG: (p: GamePlayer) => p.season?.batting?.avg?.slice(0, 4),
    OPS: (p: GamePlayer) => p.season?.batting?.ops?.slice(0, 4),
  };
  const gamePitchingStats = {
    IP: (p: GamePlayer) => p.game?.pitching.inningsPitched,
    H: (p: GamePlayer) => p.game?.pitching?.hits,
    R: (p: GamePlayer) => p.game?.pitching?.runs,
    ER: (p: GamePlayer) => p.game?.pitching?.earnedRuns,
    BB: (p: GamePlayer) => p.game?.pitching?.baseOnBalls,
    K: (p: GamePlayer) => p.game?.pitching?.strikeOuts,
    HR: (p: GamePlayer) => p.game?.pitching?.homeRuns,
    ERA: (p: GamePlayer) => p.season?.pitching?.era,
    WHIP: (p: GamePlayer) => p.season?.pitching?.whip,
    W: (p: GamePlayer) => p.season?.pitching?.wins,
    L: (p: GamePlayer) => p.season?.pitching?.losses,
  };
  const seasonBattingStats = {
    G: (p: GamePlayer) => p.season?.batting?.gamesPlayed,
    AB: (p: GamePlayer) => p.season?.batting?.atBats,
    PA: (p: GamePlayer) => p.season?.batting?.plateAppearances,
    R: (p: GamePlayer) => p.season?.batting?.runs,
    H: (p: GamePlayer) => p.season?.batting?.hits,
    HR: (p: GamePlayer) => p.season?.batting?.homeRuns,
    RBI: (p: GamePlayer) => p.season?.batting?.rbi,
    BB: (p: GamePlayer) => p.season?.batting?.baseOnBalls,
    SO: (p: GamePlayer) => p.season?.batting?.strikeOuts,
    TB: (p: GamePlayer) => p.season?.batting?.totalBases,
    AVG: (p: GamePlayer) => p.season?.batting?.avg?.slice(0, 4),
    SLG: (p: GamePlayer) => p.season?.batting?.slg?.slice(0, 4),
    OPS: (p: GamePlayer) => p.season?.batting?.ops?.slice(0, 4),
    IBB: (p: GamePlayer) => p.season?.batting?.intentionalWalks,
  };
  const seasonPitchingStats = {
    G: (p: GamePlayer) => p.season?.pitching?.gamesPlayed,
    W: (p: GamePlayer) => p.season?.pitching?.wins,
    L: (p: GamePlayer) => p.season?.pitching?.losses,
    IP: (p: GamePlayer) => p.season?.pitching.inningsPitched,
    H: (p: GamePlayer) => p.season?.pitching?.hits,
    'H/9': (p: GamePlayer) => p.season?.pitching?.hitsPer9Inn,
    R: (p: GamePlayer) => p.season?.pitching?.runs,
    'RS/9': (p: GamePlayer) => p.season?.pitching?.runsScoredPer9,
    HR: (p: GamePlayer) => p.season?.pitching?.homeRuns,
    'HR/9': (p: GamePlayer) => p.season?.pitching?.homeRunsPer9,
    K: (p: GamePlayer) => p.season?.pitching?.strikeOuts,
    'K/9': (p: GamePlayer) => p.season?.pitching?.strikeoutsPer9Inn,
    BB: (p: GamePlayer) => p.season?.pitching?.baseOnBalls,
    'BB/9': (p: GamePlayer) => p.season?.pitching?.walksPer9Inn,
    ER: (p: GamePlayer) => p.season?.pitching?.earnedRuns,
    ERA: (p: GamePlayer) => p.season?.pitching?.era,
    WHIP: (p: GamePlayer) => p.season?.pitching?.whip,
    SV: (p: GamePlayer) => p.season?.pitching?.saves,
  };

  let source: Record<string, (p: GamePlayer) => number | string | undefined> =
    {};

  if (statKey === 'game') {
    source = statType === 'Batting' ? gameBattingStats : gamePitchingStats;
  }

  if (statKey === 'season') {
    source = statType === 'Batting' ? seasonBattingStats : seasonPitchingStats;
  }

  const gridTemplateColumns = Object.entries(source).reduce<string>(
    (acc, [key, stat]) => {
      const max = Math.max(
        key.length,
        ...currentPlayers.map((p) => String(stat(p)).length),
      );
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
        {Object.keys(source).map((label) => (
          <span key={label}>{label}</span>
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
          statKey,
        )}
      >
        {Object.values(source).map((stat, index) => (
          <span key={index}>{stat(player)}</span>
        ))}
      </div>
    )),
  ];
};
