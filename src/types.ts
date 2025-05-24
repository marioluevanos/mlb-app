import type {
  BattingRecord,
  FieldingRecord,
  ImageCut,
  PitchingRecord,
  PlayEvent,
  PlayResult,
  Playback,
} from './types.mlb';

export type TeamRecord = {
  wins: number;
  losses: number;
  pct: string;
  ties?: number;
};

export type TeamStats = {
  batting: Partial<BattingRecord>;
  pitching: Partial<PitchingRecord>;
  fielding?: Partial<FieldingRecord>;
};

export type TeamClub = {
  record: TeamRecord;
  name: string;
  abbreviation: string;
  logo: string;
  id: number;
  score?: TeamScore;
  startingPitcher?: GamePlayer;
  players?: Array<GamePlayer>;
} & Partial<TeamStats>;

export type ScoreboardTeam = Omit<
  TeamClub,
  'players' | 'batting' | 'fielding' | 'pitching'
>;

export type PlayerSeasonProfile = GamePlayer & {
  mlbDebutDate: string;
  height: string;
  weight: number;
  birthDate: string;
  currentAge: number;
  birthCity: string;
};

export type GameStatus = string;

export type GameHighlight = {
  type: string;
  title: string;
  description?: string;
  duration: string;
  placeholder: {
    sm?: ImageCut;
    lg?: ImageCut;
  };
  video: Playback;
};

export type GameStream = {
  name: string;
  url: string;
};

export type TeamScore = {
  runs?: number;
  hits: number;
  errors: number;
  leftOnBase: number;
};

export type GameInnings = {
  away: TeamScore;
  home: TeamScore;
  num: number;
  ordinalNum: string;
};

export type GamePreview = {
  id: number;
  feed: string;
  content: string;
  status: string;
  doubleHeader: string;
  away: ScheduledTeam;
  home: ScheduledTeam;
  count?: CurrentCount;
  runners?: {
    first?: GamePlayer;
    second?: GamePlayer;
    third?: GamePlayer;
  };

  time?: string;
  currentInning?: string;
  gameNumber: number;
  venue: string | undefined;
};

export type GamePreviews = {
  games: Array<GamePreview>;
  date: string | undefined;
};

export type GameStreamLinks = {
  games: Array<{
    id: number;
    away: {
      name: string;
      id: number;
    };
    home: {
      name: string;
      id: number;
    };
    streams: Array<GameStream>;
  }>;
  date: string;
};

export type ScheduledTeam = {
  record: TeamRecord;
  name: string;
  abbreviation: string;
  logo: string;
  id: number;
  isWinner: boolean;
  score?: TeamScore;
  startingPitcher?: GamePlayer;
};

export type LiveGame = {
  date: string;
  id: number | string;
  feed: string;
  status: GameStatus;
  away: TeamClub;
  home: TeamClub;
  time: string;
  currentInning: string;
  topPerformers: Array<GamePlayer>;
  innings: Array<GameInnings>;
  currentPlay?: CurrentPlay;
  scoringPlays?: {
    [inning: string | number]: Array<ScoringPlay>;
  };
  allPlays?: {
    [inning: string | number]: Array<InningPlay>;
  };
  playsByInning?: Array<InningPlay>;
  decisions: GameDecision | undefined;
  highlights: Array<GameHighlight>;
};

export type InningPlay = {
  teamLogo: string;
  teamAbbreviation: string;
  currentInning?: string;
  inning?: string | number;
  matchup: CurrentMatchup;
  result?: PlayResult;
};

export type ScoringPlay = InningPlay;

export type CurrentPlay = {
  matchup: CurrentMatchup;
  result?: PlayResult;
  events: Array<PlayEvent>;
  count: CurrentCount;
  runners: {
    first?: GamePlayer;
    second?: GamePlayer;
    third?: GamePlayer;
  };
};

export type GameDecision = {
  winner?: GamePlayer;
  loser?: GamePlayer;
  save?: GamePlayer;
};

export type GamePlayer = {
  id?: number;
  avatar?: string;
  fullName?: string;
  summary?: string;
  note?: string;
  position?: string;
  jerseyNumber?: string | number;
  battingOrder?: string | number;
  game?: TeamStats;
  season?: TeamStats;
};

export type CurrentMatchup = {
  batter: GamePlayer;
  pitcher: GamePlayer;
};

export type CurrentCount = {
  balls: number;
  strikes: number;
  outs: number;
};

export type StatsByPosition = {
  [key in Exclude<PlayerStatParams['group'], 'fielding'>]: Array<GamePlayer>;
};

export type StatType = 'Batting' | 'Pitching' | 'Fielding';

/**
 * Where to take the stats from
 */
export type StatSplit = 'Season' | 'Playoff' | 'Game';

export type PlayerStatParams = {
  playerIds: Array<number>;
  season: number;
  group: 'hitting' | 'pitching' | 'fielding';
  /**
   * "R": Represents a regular season game.
   * "P": Indicates a playoff game.
   * "E": Suggests an exhibition game or a preseason game.
   */
  gameType?: 'R' | 'P' | 'E';
};

export type StatMap<T> = Record<
  string,
  {
    statKey: keyof T;
    splitKey: StatSplit;
    value: (p: GamePlayer) => number | string | undefined;
  }
>;
