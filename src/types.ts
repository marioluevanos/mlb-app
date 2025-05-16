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

export type ScoreboardTeam = Omit<
  TeamClub,
  "players" | "batting" | "fielding" | "pitching"
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
  games: GamePreview[];
  date: string | undefined;
};

export type ScheduledTeam = {
  record: TeamRecord;
  name: string;
  logo: string;
  id: number;
  isWinner: boolean;
  score?: TeamScore;
};

export type GameToday = {
  id: number;
  feed: string;
  status: GameStatus;
  away: TeamClub;
  home: TeamClub;
  time: string;
  currentInning: string;
  topPerformers: GamePlayer[];
  innings: GameInnings[];
  currentPlay?: CurrentPlay;
  scoringPlays?: ScoringPlay[];
  playsByInning?: InningPlay[];
  decisions: GameDecision | undefined;
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
  events: PlayEvent[];
  result?: PlayResult;
  count: CurrentCount;
  runners: {
    first?: GamePlayer;
    second?: GamePlayer;
    third?: GamePlayer;
  };
};
