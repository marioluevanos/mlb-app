import {
  BattingRecord,
  FieldingRecord,
  ImageCut,
  PitchingRecord,
  Playback,
  PlayEvent,
  PlayResult,
} from "./types.mlb";

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
  players?: GamePlayer[];
} & Partial<TeamStats>;

export type TeamRoster = GamePlayer;

export type GameStatus =
  | "Final"
  | "Scheduled"
  | "Pre-Game"
  | "Postponed"
  | "In Progress"
  | "Game Over"
  | "Warmup"
  // Check these with startsWith
  | "Umpire review"
  | "Manager challenge"
  | "Delayed Start";

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

export type GameToday = {
  id: number;
  feed: string;
  content: string;
  status: GameStatus;
  away: TeamClub;
  home: TeamClub;
  time: string;
  currentInning: string;
  topPerformers: GamePlayer[];
  highlights: GameHighlight[];
  streams: GameStream[];
  innings: GameInnings[];
  currentPlay?: CurrentPlay;
  scoringPlays?: ScoringPlay[];
  playsByInning?: InningPlay[];
  decisions: GameDecision;
};

export type InningPlay = Omit<CurrentPlay, "runners" | "count" | "events"> & {
  teamAbbreviation: string;
};

export type ScoringPlay = Omit<CurrentPlay, "runners" | "count" | "events"> & {
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
  batter: {
    bats?: string;
  } & GamePlayer;
  pitcher: {
    throws?: string;
  } & GamePlayer;
};

export type CurrentCount = {
  balls: number;
  strikes: number;
  outs: number;
};

export type CurrentPlay = {
  matchup: CurrentMatchup;
  count: CurrentCount;
  events: PlayEvent[];
  result?: PlayResult;
  runners: {
    first?: GamePlayer;
    second?: GamePlayer;
    third?: GamePlayer;
  };
};
