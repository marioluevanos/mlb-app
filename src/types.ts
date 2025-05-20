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

export type TeamRoster = GamePlayer;

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
  logo: string;
  id: number;
  isWinner: boolean;
  score?: TeamScore;
  startingPitcher?: GamePlayer;
};

export type GameToday = {
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
  streams: Array<GameStream>;
};

export type InningPlay = Omit<CurrentPlay, 'runners' | 'count' | 'events'> & {
  teamAbbreviation: string;
  currentInning?: string;
};

export type ScoringPlay = Omit<CurrentPlay, 'runners' | 'count' | 'events'> & {
  inning: string;
  teamAbbreviation: string;
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

export type CurrentPlay = {
  matchup: CurrentMatchup;
  events: Array<PlayEvent>;
  result?: PlayResult;
  count: CurrentCount;
  runners: {
    first?: GamePlayer;
    second?: GamePlayer;
    third?: GamePlayer;
  };
};
