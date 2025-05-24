import type { GamePlayer, StatMap, StatSplit, StatType } from '@/types';
import type { BattingRecord, PitchingRecord } from '@/types.mlb';

export function getSource(splits: StatSplit, statType: StatType) {
  const gameBattingStats: StatMap<BattingRecord> = {
    AB: {
      value: (p: GamePlayer) => p.game?.batting?.atBats,
      statKey: 'atBats',
      splitKey: 'Game',
    },
    R: {
      value: (p: GamePlayer) => p.game?.batting?.runs,
      statKey: 'runs',
      splitKey: 'Game',
    },
    H: {
      value: (p: GamePlayer) => p.game?.batting?.hits,
      statKey: 'hits',
      splitKey: 'Game',
    },
    HR: {
      value: (p: GamePlayer) => p.game?.batting?.homeRuns,
      statKey: 'homeRuns',
      splitKey: 'Game',
    },
    RBI: {
      value: (p: GamePlayer) => p.game?.batting?.rbi,
      statKey: 'rbi',
      splitKey: 'Game',
    },
    BB: {
      value: (p: GamePlayer) => p.game?.batting?.baseOnBalls,
      statKey: 'baseOnBalls',
      splitKey: 'Game',
    },
    SO: {
      value: (p: GamePlayer) => p.game?.batting?.strikeOuts,
      statKey: 'strikeOuts',
      splitKey: 'Game',
    },
    TB: {
      value: (p: GamePlayer) => p.game?.batting?.totalBases,
      statKey: 'totalBases',
      splitKey: 'Game',
    },
    AVG: {
      value: (p: GamePlayer) => p.season?.batting?.avg?.slice(0, 4),
      statKey: 'avg',
      splitKey: 'Season',
    },
    OPS: {
      value: (p: GamePlayer) => p.season?.batting?.ops?.slice(0, 4),
      statKey: 'ops',
      splitKey: 'Season',
    },
  };

  const gamePitchingStats: StatMap<PitchingRecord> = {
    IP: {
      value: (p: GamePlayer) => p.game?.pitching.inningsPitched,
      statKey: 'inningsPitched',
      splitKey: 'Game',
    },
    H: {
      value: (p: GamePlayer) => p.game?.pitching?.hits,
      statKey: 'hits',
      splitKey: 'Game',
    },
    R: {
      value: (p: GamePlayer) => p.game?.pitching?.runs,
      statKey: 'runs',
      splitKey: 'Game',
    },
    ER: {
      value: (p: GamePlayer) => p.game?.pitching?.earnedRuns,
      statKey: 'earnedRuns',
      splitKey: 'Game',
    },
    BB: {
      value: (p: GamePlayer) => p.game?.pitching?.baseOnBalls,
      statKey: 'baseOnBalls',
      splitKey: 'Game',
    },
    K: {
      value: (p: GamePlayer) => p.game?.pitching?.strikeOuts,
      statKey: 'strikeOuts',
      splitKey: 'Game',
    },
    HR: {
      value: (p: GamePlayer) => p.game?.pitching?.homeRuns,
      statKey: 'homeRuns',
      splitKey: 'Game',
    },
    ERA: {
      value: (p: GamePlayer) => p.season?.pitching?.era,
      statKey: 'era',
      splitKey: 'Season',
    },
    WHIP: {
      value: (p: GamePlayer) => p.season?.pitching?.whip,
      statKey: 'whip',
      splitKey: 'Season',
    },
    W: {
      value: (p: GamePlayer) => p.season?.pitching?.wins,
      statKey: 'wins',
      splitKey: 'Season',
    },
    L: {
      value: (p: GamePlayer) => p.season?.pitching?.losses,
      statKey: 'losses',
      splitKey: 'Season',
    },
  };

  const seasonBattingStats: StatMap<BattingRecord> = {
    G: {
      value: (p: GamePlayer) => p.season?.batting?.gamesPlayed,
      statKey: 'gamesPlayed',
      splitKey: 'Season',
    },
    AB: {
      value: (p: GamePlayer) => p.season?.batting?.atBats,
      statKey: 'atBats',
      splitKey: 'Season',
    },
    PA: {
      value: (p: GamePlayer) => p.season?.batting?.plateAppearances,
      statKey: 'plateAppearances',
      splitKey: 'Season',
    },
    R: {
      value: (p: GamePlayer) => p.season?.batting?.runs,
      statKey: 'runs',
      splitKey: 'Season',
    },
    H: {
      value: (p: GamePlayer) => p.season?.batting?.hits,
      statKey: 'hits',
      splitKey: 'Season',
    },
    HR: {
      value: (p: GamePlayer) => p.season?.batting?.homeRuns,
      statKey: 'homeRuns',
      splitKey: 'Season',
    },
    RBI: {
      value: (p: GamePlayer) => p.season?.batting?.rbi,
      statKey: 'rbi',
      splitKey: 'Season',
    },
    BB: {
      value: (p: GamePlayer) => p.season?.batting?.baseOnBalls,
      statKey: 'baseOnBalls',
      splitKey: 'Season',
    },
    SO: {
      value: (p: GamePlayer) => p.season?.batting?.strikeOuts,
      statKey: 'strikeOuts',
      splitKey: 'Season',
    },
    TB: {
      value: (p: GamePlayer) => p.season?.batting?.totalBases,
      statKey: 'totalBases',
      splitKey: 'Season',
    },
    AVG: {
      value: (p: GamePlayer) => p.season?.batting?.avg?.slice(0, 4),
      statKey: 'avg',
      splitKey: 'Season',
    },
    SLG: {
      value: (p: GamePlayer) => p.season?.batting?.slg?.slice(0, 4),
      statKey: 'slg',
      splitKey: 'Season',
    },
    OPS: {
      value: (p: GamePlayer) => p.season?.batting?.ops?.slice(0, 4),
      statKey: 'ops',
      splitKey: 'Season',
    },
    IBB: {
      value: (p: GamePlayer) => p.season?.batting?.intentionalWalks,
      statKey: 'intentionalWalks',
      splitKey: 'Season',
    },
  };
  const seasonPitchingStats: StatMap<PitchingRecord> = {
    G: {
      value: (p: GamePlayer) => p.season?.pitching?.gamesPlayed,
      statKey: 'gamesPlayed',
      splitKey: 'Season',
    },
    W: {
      value: (p: GamePlayer) => p.season?.pitching?.wins,
      statKey: 'wins',
      splitKey: 'Season',
    },
    L: {
      value: (p: GamePlayer) => p.season?.pitching?.losses,
      statKey: 'losses',
      splitKey: 'Season',
    },
    IP: {
      value: (p: GamePlayer) => p.season?.pitching.inningsPitched,
      statKey: 'inningsPitched',
      splitKey: 'Season',
    },
    H: {
      value: (p: GamePlayer) => p.season?.pitching?.hits,
      statKey: 'hits',
      splitKey: 'Season',
    },
    'H/9': {
      value: (p: GamePlayer) => p.season?.pitching?.hitsPer9Inn,
      statKey: 'hitsPer9Inn',
      splitKey: 'Season',
    },
    R: {
      value: (p: GamePlayer) => p.season?.pitching?.runs,
      statKey: 'runs',
      splitKey: 'Season',
    },
    'RS/9': {
      value: (p: GamePlayer) => p.season?.pitching?.runsScoredPer9,
      statKey: 'runsScoredPer9',
      splitKey: 'Season',
    },
    HR: {
      value: (p: GamePlayer) => p.season?.pitching?.homeRuns,
      statKey: 'homeRuns',
      splitKey: 'Season',
    },
    'HR/9': {
      value: (p: GamePlayer) => p.season?.pitching?.homeRunsPer9,
      statKey: 'homeRunsPer9',
      splitKey: 'Season',
    },
    K: {
      value: (p: GamePlayer) => p.season?.pitching?.strikeOuts,
      statKey: 'strikeOuts',
      splitKey: 'Season',
    },
    'K/9': {
      value: (p: GamePlayer) => p.season?.pitching?.strikeoutsPer9Inn,
      statKey: 'strikeoutsPer9Inn',
      splitKey: 'Season',
    },
    BB: {
      value: (p: GamePlayer) => p.season?.pitching?.baseOnBalls,
      statKey: 'baseOnBalls',
      splitKey: 'Season',
    },
    'BB/9': {
      value: (p: GamePlayer) => p.season?.pitching?.walksPer9Inn,
      statKey: 'walksPer9Inn',
      splitKey: 'Season',
    },
    ER: {
      value: (p: GamePlayer) => p.season?.pitching?.earnedRuns,
      statKey: 'earnedRuns',
      splitKey: 'Season',
    },
    ERA: {
      value: (p: GamePlayer) => p.season?.pitching?.era,
      statKey: 'era',
      splitKey: 'Season',
    },
    WHIP: {
      value: (p: GamePlayer) => p.season?.pitching?.whip,
      statKey: 'whip',
      splitKey: 'Season',
    },
    SV: {
      value: (p: GamePlayer) => p.season?.pitching?.saves,
      statKey: 'saves',
      splitKey: 'Season',
    },
  };

  const statKey: keyof GamePlayer = splits === 'Game' ? 'game' : 'season';

  if (statKey === 'season') {
    return statType === 'Batting' ? seasonBattingStats : seasonPitchingStats;
  }

  return statType === 'Batting' ? gameBattingStats : gamePitchingStats;
}
