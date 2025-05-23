export interface MLBGames {
  dates: Array<MLBDates>;
}
export interface MLBDates {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  games: Array<MLBGamePreview>;
  events: Array<unknown>;
}

export interface MLBGamePreview {
  gamePk: number;
  gameGuid: string;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  officialDate: string;
  status: GameStatus;
  teams: GameTeams;
  venue: VenueRef;
  content: ContentLink;
  isTie: boolean;
  gameNumber: number;
  publicFacing: boolean;
  doubleHeader: string;
  gamedayType: string;
  tiebreaker: string;
  calendarEventID: string;
  seasonDisplay: string;
  dayNight: string;
  scheduledInnings: number;
  reverseHomeAwayStatus: boolean;
  inningBreakLength: number;
  gamesInSeries: number;
  seriesGameNumber: number;
  seriesDescription: string;
  recordSource: string;
  ifNecessary: string;
  ifNecessaryDescription: string;
}

export interface GameTeams {
  away: TeamInfo;
  home: TeamInfo;
}

export interface TeamInfo {
  leagueRecord: LeagueRecord;
  score: number;
  team: TeamRef;
  isWinner: boolean;
  splitSquad: boolean;
  seriesNumber: number;
}

export interface LeagueRecord {
  wins: number;
  losses: number;
  pct: string;
}

export interface ContentLink {
  link: string;
}

export type MLBLive = {
  gamePk: number;
  link: string;
  metaData: unknown;
  gameData: GameData;
  liveData: {
    plays: {
      allPlays: Array<AtBat>;
      currentPlay: CurrentPlay;
      scoringPlays: ScoringPlays;
      playsByInning: Array<PlaysByInning>;
    };
    linescore: Linescore;
    boxscore: Boxscore;
    decisions: Decisions;
  };
};

export type PlaysByInning = {
  bottom: Array<number>;
  top: Array<number>;
  startIndex: number;
  endIndex: number;
};

export interface MLBContent {
  highlights: HighlightsData;
}

export interface HighlightsData {
  scoreboard: null;
  gameCenter: null;
  milestone: null;
  highlights: HighlightCollection;
}

export interface HighlightCollection {
  items: Array<HighlightItem>;
}

export interface HighlightItem {
  type: string;
  state: string;
  date: string;
  id: string;
  headline: string;
  seoTitle: string;
  slug: string;
  blurb: string;
  image: HighlightImage;
  noIndex: boolean;
  mediaPlaybackId: string;
  title: string;
  description: string;
  duration: string;
  mediaPlaybackUrl: string;
  playbacks: Array<Playback>;
}

export interface HighlightImage {
  title: string;
  altText: string | null;
  templateUrl: string;
  cuts: Array<ImageCut>;
}

export interface ImageCut {
  aspectRatio: string;
  width: number;
  height: number;
  src: string;
  at2x: string;
  at3x: string;
}

export interface Playback {
  name: string;
  url: string;
  width: string;
  height: string;
}

/**
 * Game Data
 */
export interface GameData {
  game: GameMeta;
  datetime: GameDateTime;
  status: GameStatus;
  teams: {
    away: TeamData;
    home: TeamData;
  };
  players: Record<string, PlayerInfo>;
  venue: Venue;
  officialVenue: VenueRef;
  weather: Weather;
  gameInfo: GameInfoSummary;
  review: Review;
  flags: Flags;
  alerts: Array<Record<string, unknown>>;
  probablePitchers: {
    away: PersonRef;
    home: PersonRef;
  };
  officialScorer: PersonRef;
  primaryDatacaster: PersonRef;
  moundVisits: {
    away: Usage;
    home: Usage;
  };
}

export interface GameMeta {
  pk: number;
  type: string;
  doubleHeader: string;
  id: string;
  gamedayType: string;
  tiebreaker: string;
  gameNumber: number;
  calendarEventID: string;
  season: string;
  seasonDisplay: string;
}

export interface GameDateTime {
  dateTime: string;
  originalDate: string;
  officialDate: string;
  dayNight: string;
  time: string;
  ampm: string;
}

export interface GameStatus {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  statusCode: string;
  startTimeTBD: boolean;
  abstractGameCode: string;
}

export interface TeamData {
  springLeague: LeagueRef;
  allStarStatus: string;
  id: number;
  name: string;
  link: string;
  season: number;
  venue: VenueRef;
  springVenue: VenueRef;
  teamCode: string;
  fileCode: string;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  league: LeagueRef;
  division: DivisionRef;
  sport: SportRef;
  shortName: string;
  record: TeamRecord;
  franchiseName: string;
  clubName: string;
  active: boolean;
}

export interface LeagueRef {
  id: number;
  name: string;
  link: string;
  abbreviation?: string;
}

export interface DivisionRef {
  id: number;
  name: string;
  link: string;
}

export interface SportRef {
  id: number;
  link: string;
  name: string;
}

export interface VenueRef {
  id: number;
  link: string;
  name?: string;
}

export interface TeamRecord {
  gamesPlayed: number;
  wildCardGamesBack: string;
  leagueGamesBack: string;
  springLeagueGamesBack: string;
  sportGamesBack: string;
  divisionGamesBack: string;
  conferenceGamesBack: string;
  leagueRecord: RecordLine;
  records: Record<string, unknown>;
  divisionLeader: boolean;
  wins: number;
  losses: number;
  winningPercentage: string;
}

export interface RecordLine {
  wins: number;
  losses: number;
  ties: number;
  pct: string;
}

export interface Position {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}

export interface Side {
  code: string;
  description: string;
}

export interface PlayerInfo {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince?: string;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;
  primaryPosition: Position;
  useName: string;
  useLastName: string;
  middleName?: string;
  boxscoreName: string;
  nickName?: string;
  gender: string;
  isPlayer: boolean;
  isVerified: boolean;
  draftYear?: number;
  mlbDebutDate: string;
  batSide: Side;
  pitchHand: Side;
  nameFirstLast: string;
  nameSlug: string;
  firstLastName: string;
  lastFirstName: string;
  lastInitName: string;
  initLastName: string;
  fullFMLName: string;
  fullLFMName: string;
  strikeZoneTop: number;
  strikeZoneBottom: number;
  pronunciation?: string;
  nameMatrilineal?: string;
}

export interface Venue {
  id: number;
  name: string;
  link: string;
  location: Location;
  timeZone: TimeZone;
  fieldInfo: FieldInfo;
  active: boolean;
  season: string;
}

export interface Location {
  address1: string;
  city: string;
  state: string;
  stateAbbrev: string;
  postalCode: string;
  defaultCoordinates: Coordinates;
  azimuthAngle: number;
  elevation: number;
  country: string;
  phone: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TimeZone {
  id: string;
  offset: number;
  offsetAtGameTime: number;
  tz: string;
}

export interface FieldInfo {
  capacity: number;
  turfType: string;
  roofType: string;
  leftLine: number;
  leftCenter: number;
  center: number;
  rightCenter: number;
  rightLine: number;
}

export interface Weather {
  condition: string;
  temp: string;
  wind: string;
}

export interface GameInfoSummary {
  attendance: number;
  firstPitch: string;
  gameDurationMinutes: number;
}

export interface Review {
  hasChallenges: boolean;
  away: Usage;
  home: Usage;
}

export interface Usage {
  used: number;
  remaining: number;
}

export interface Flags {
  noHitter: boolean;
  perfectGame: boolean;
  awayTeamNoHitter: boolean;
  awayTeamPerfectGame: boolean;
  homeTeamNoHitter: boolean;
  homeTeamPerfectGame: boolean;
}

/**
 * All Plays
 * liveData.allPlays
 */
export interface AtBat {
  result: PlayResult;
  about: PlayAbout;
  count: Count;
  matchup: PlayMatchup;
  pitchIndex: Array<number>;
  actionIndex: Array<number>;
  runnerIndex: Array<number>;
  runners: Array<RunnerMovementRecord>;
  playEvents: Array<PlayEvent>;
  playEndTime: string;
  atBatIndex: number;
}

export interface PlayMatchup {
  batter: PersonRef;
  batSide: CodeDescription;
  pitcher: PersonRef;
  pitchHand: CodeDescription;
  postOnFirst?: PersonRef;
  postOnSecond?: PersonRef;
  batterHotColdZones: Array<ZoneValue>;
  pitcherHotColdZones: Array<ZoneValue>;
  splits: {
    batter: string;
    pitcher: string;
    menOnBase: string;
  };
}

export interface PickoffEvent extends BasePlayEvent<PickoffDetails> {
  isPitch: false;
  type: 'pickoff';
  playId: string;
}

export interface PickoffDetails {
  description: string;
  code: string;
  isOut: boolean;
  hasReview: boolean;
  fromCatcher: boolean;
  disengagementNum: number;
}

/**
 * Current Play
 * liveData.plays.currentPlay
 */
export interface CurrentPlay {
  result: PlayResult;
  about: PlayAbout;
  count: Count;
  matchup: Matchup;
  pitchIndex: Array<number>;
  actionIndex: Array<number>;
  runnerIndex: Array<number>;
  runners: Array<RunnerMovementRecord>;
  playEvents: Array<PlayEvent>;
  playEndTime: string;
  atBatIndex: number;
}

export interface PlayResult {
  type: string;
  event: string;
  eventType: string;
  description: string;
  rbi: number;
  awayScore: number;
  homeScore: number;
  isOut: boolean;
}

export interface PlayAbout {
  atBatIndex: number;
  halfInning: string;
  isTopInning: boolean;
  inning: number;
  startTime: string;
  endTime: string;
  isComplete: boolean;
  isScoringPlay: boolean;
  hasReview: boolean;
  hasOut: boolean;
  captivatingIndex: number;
}

export interface Count {
  balls: number;
  strikes: number;
  outs: number;
}

export interface Matchup {
  batter: PersonRef;
  batSide: CodeDescription;
  pitcher: PersonRef;
  pitchHand: CodeDescription;
  batterHotColdZoneStats: HotColdZoneStats;
  batterHotColdZones: Array<ZoneValue>;
  pitcherHotColdZones: Array<ZoneValue>;
  splits: {
    batter: string;
    pitcher: string;
    menOnBase: string;
  };
}

export interface PersonRef {
  id: number;
  fullName: string;
  link: string;
}

export interface CodeDescription {
  code: string;
  description: string;
}

export interface HotColdZoneStats {
  stats: Array<HotColdZoneStatBlock>;
}

export interface HotColdZoneStatBlock {
  type: { displayName: string };
  group: { displayName: string };
  exemptions: Array<unknown>;
  splits: Array<{
    stat: {
      name: string;
      zones: Array<ZoneValue>;
    };
  }>;
}

export interface ZoneValue {
  zone: string;
  color: string;
  temp: string;
  value: string;
}

export interface RunnerMovementRecord {
  movement: {
    originBase: string | null;
    start: string | null;
    end: string | null;
    outBase: string | null;
    isOut: boolean;
    outNumber: number;
  };
  details: RunnerDetails;
  credits: Array<Credit>;
}

export interface RunnerDetails {
  event: string;
  eventType: string;
  movementReason: string | null;
  runner: PersonRef;
  responsiblePitcher: PersonRef | null;
  isScoringEvent: boolean;
  rbi: boolean;
  earned: boolean;
  teamUnearned: boolean;
  playIndex: number;
}

export interface Credit {
  player: { id: number; link: string };
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  credit: string;
}

export type PlayEvent =
  | SubstitutionEvent
  | ActionEvent
  | PitchEvent
  | PickoffEvent;

interface BasePlayEvent<PickoffDetails> {
  details: PickoffDetails;
  count: Count;
  index: number;
  startTime: string;
  endTime: string;
  isPitch: boolean;
  type: string;
}

// --- Substitution ---
export interface SubstitutionEvent extends BasePlayEvent<SubstitutionDetails> {
  isPitch: false;
  isSubstitution: true;
  player: PersonRef;
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  battingOrder: string;
  replacedPlayer: PersonRef;
  base: number;
}

export interface SubstitutionDetails {
  description: string;
  event: string;
  eventType: string;
  awayScore: number;
  homeScore: number;
  isScoringPlay: boolean;
  isOut: boolean;
  hasReview: boolean;
}

// --- Pitch ---
export interface PitchEvent extends BasePlayEvent<PitchDetails> {
  isPitch: true;
  pitchData: PitchData;
  playId: string;
  pitchNumber: number;
}

export interface PitchDetails {
  call: CodeDescription;
  description: string;
  code: string;
  ballColor: string;
  trailColor: string;
  isInPlay: boolean;
  isStrike: boolean;
  isBall: boolean;
  type: CodeDescription;
  isOut: boolean;
  hasReview: boolean;
}

export interface PitchData {
  startSpeed: number;
  endSpeed: number;
  strikeZoneTop: number;
  strikeZoneBottom: number;
  coordinates: {
    aY: number;
    aZ: number;
    pfxX: number;
    pfxZ: number;
    pX: number;
    pZ: number;
    vX0: number;
    vY0: number;
    vZ0: number;
    x: number;
    y: number;
    x0: number;
    y0: number;
    z0: number;
    aX: number;
  };
  breaks: {
    breakAngle: number;
    breakLength: number;
    breakY: number;
    breakVertical: number;
    breakVerticalInduced: number;
    breakHorizontal: number;
    spinRate: number;
    spinDirection: number;
  };
  zone: number;
  typeConfidence: number;
  plateTime: number;
  extension: number;
}

// --- Action (non‐pitch) ---
export interface ActionEvent extends BasePlayEvent<ActionDetails> {
  isPitch: false;
  isSubstitution?: false;
  player?: PersonRef;
}

export interface ActionDetails {
  description: string;
  event?: string;
  eventType?: string;
  awayScore?: number;
  homeScore?: number;
  isScoringPlay: boolean;
  isOut: boolean;
  hasReview: boolean;
}

/**
 * Linescore
 * liveData.linescore
 */
export interface Linescore {
  currentInning: number;
  currentInningOrdinal: string;
  inningState: string;
  inningHalf: string;
  isTopInning: boolean;
  scheduledInnings: number;
  innings: Array<Inning>;
  teams: {
    home: TeamTotals;
    away: TeamTotals;
  };
  defense: DefensiveAlignment;
  offense: OffensiveAlignment;
  balls: number;
  strikes: number;
  outs: number;
}

export interface Inning {
  num: number;
  ordinalNum: string;
  home: InningLineStats;
  away: InningLineStats;
}

export interface InningLineStats {
  runs?: number;
  hits: number;
  errors: number;
  leftOnBase: number;
}

export interface TeamTotals {
  runs: number;
  hits: number;
  errors: number;
  leftOnBase: number;
}

export interface DefensiveAlignment {
  pitcher: PersonRef;
  catcher: PersonRef;
  first: PersonRef;
  second: PersonRef;
  third: PersonRef;
  shortstop: PersonRef;
  left: PersonRef;
  center: PersonRef;
  right: PersonRef;
  batter: PersonRef;
  onDeck: PersonRef;
  inHole: PersonRef;
  battingOrder: number;
  team: TeamRef;
}

export interface OffensiveAlignment {
  batter: PersonRef;
  onDeck: PersonRef;
  inHole: PersonRef;
  pitcher: PersonRef;
  battingOrder: number;
  team: TeamRef;
  second: PersonRef;
  third: PersonRef;
  first: PersonRef;
}

export interface PersonRef {
  id: number;
  fullName: string;
  link: string;
}

export interface TeamRef {
  id: number;
  name: string;
  link: string;
}

/**
 * Boxscore
 * liveData.boxscore
 */
export interface Boxscore {
  teams: {
    away: TeamBox;
    home: TeamBox;
  };
  officials: Array<Official>;
  info: Array<LabelValue>;
  topPerformers: Array<Performer>;
}

export interface TeamBox {
  team: TeamInfo;
  teamStats: {
    batting: BattingRecord;
    pitching: PitchingRecord;
    fielding: FieldingRecord;
  };
  players: Record<string, Player>;
  batters: Array<number>;
  pitchers: Array<number>;
  bench: Array<number>;
  bullpen: Array<number>;
  battingOrder: Array<number>;
  info: Array<InfoSection>;
  note: Array<Note>;
}

export interface TeamInfo {
  springLeague: League;
  allStarStatus: string;
  id: number;
  name: string;
  link: string;
}

export interface League {
  id: number;
  name: string;
  link: string;
  abbreviation: string;
}

export type FieldingRecord = {
  caughtStealing: number;
  stolenBases: number;
  stolenBasePercentage: string;
  assists: number;
  putOuts: number;
  errors: number;
  chances: number;
  fielding: string;
  passedBall: number;
  pickoffs: number;
  summary?: string;
};

export type PitchingRecord = {
  gamesPlayed: number;
  gamesStarted: number;
  flyOuts: number;
  groundOuts: number;
  airOuts: number;
  runs: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  strikeOuts: number;
  baseOnBalls: number;
  intentionalWalks: number;
  hits: number;
  hitByPitch: number;
  atBats: number;
  obp: string;
  caughtStealing: number;
  stolenBases: number;
  stolenBasePercentage: string;
  numberOfPitches: number;
  era: string;
  inningsPitched: string;
  wins: number;
  losses: number;
  saves: number;
  saveOpportunities: number;
  holds: number;
  blownSaves: number;
  earnedRuns: number;
  whip: string;
  battersFaced: number;
  outs: number;
  gamesPitched: number;
  completeGames: number;
  shutouts: number;
  pitchesThrown: number;
  balls: number;
  strikes: number;
  strikePercentage: string;
  hitBatsmen: number;
  balks: number;
  wildPitches: number;
  pickoffs: number;
  groundOutsToAirouts: string;
  rbi: number;
  winPercentage: string;
  pitchesPerInning: string;
  gamesFinished: number;
  strikeoutWalkRatio: string;
  strikeoutsPer9Inn: string;
  walksPer9Inn: string;
  hitsPer9Inn: string;
  runsScoredPer9: string;
  homeRunsPer9: string;
  inheritedRunners: number;
  inheritedRunnersScored: number;
  catchersInterference: number;
  sacBunts: number;
  sacFlies: number;
  passedBall: number;
  popOuts: number;
  lineOuts: number;
  summary?: string;
  note?: string;
};

export type BattingRecord = {
  gamesPlayed: number;
  flyOuts: number;
  groundOuts: number;
  airOuts: number;
  runs: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  strikeOuts: number;
  baseOnBalls: number;
  intentionalWalks: number;
  hits: number;
  hitByPitch: number;
  avg: string;
  atBats: number;
  obp: string;
  slg: string;
  ops: string;
  caughtStealing: number;
  stolenBases: number;
  stolenBasePercentage: string;
  groundIntoDoublePlay: number;
  groundIntoTriplePlay: number;
  plateAppearances: number;
  totalBases: number;
  rbi: number;
  leftOnBase: number;
  sacBunts: number;
  sacFlies: number;
  babip: string;
  groundOutsToAirouts: string;
  catchersInterference: number;
  pickoffs: number;
  atBatsPerHomeRun: string;
  popOuts: number;
  lineOuts: number;
  summary?: string;
};

export interface Player {
  person: Person;
  jerseyNumber: string;
  position: Position;
  status: Status;
  parentTeamId: number;
  stats: {
    batting: BattingRecord;
    pitching: PitchingRecord;
    fielding: FieldingRecord;
  };
  seasonStats: {
    batting: BattingRecord;
    pitching: PitchingRecord;
    fielding: FieldingRecord;
  };
  gameStatus: {
    isCurrentBatter: boolean;
    isCurrentPitcher: boolean;
    isOnBench: boolean;
    isSubstitute: boolean;
  };
  allPositions?: Array<Position>;
  battingOrder?: string;
}

export interface Person {
  id: number;
  fullName: string;
  link: string;
  boxscoreName?: string;
}

export interface Position {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}

export interface Status {
  code: string;
  description: string;
}

export interface InfoSection {
  title: string;
  fieldList: Array<FieldListItem>;
}

export interface FieldListItem {
  label: string;
  value: string;
}

export interface Note {
  label: string;
  value?: string;
}

export interface Official {
  official: Person;
  officialType: string;
}

export interface LabelValue {
  label: string;
  value?: string;
}

export interface Performer {
  player: PerformerPlayer;
  type: string;
  gameScore: number;
  hittingGameScore?: number;
}

export interface PerformerPlayer extends Player {
  person: Person & { boxscoreName: string };
}

/**
 * Decisions
 * liveData.decisions
 */
export interface Decisions {
  winner: PersonRef;
  loser: PersonRef;
  save?: PersonRef;
}

export type ScoringPlays = Array<number>;

export interface PlayerProfile {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;
  primaryPosition: Position;
  useName: string;
  useLastName: string;
  middleName: string;
  boxscoreName: string;
  nickName: string;
  gender: string;
  isPlayer: boolean;
  isVerified: boolean;
  draftYear: number;
  stats: Array<StatsEntry>;
  mlbDebutDate: string;
  batSide: Side;
  pitchHand: Side;
  nameFirstLast: string;
  nameSlug: string;
  firstLastName: string;
  lastFirstName: string;
  lastInitName: string;
  initLastName: string;
  fullFMLName: string;
  fullLFMName: string;
  strikeZoneTop: number;
  strikeZoneBottom: number;
}

export interface Side {
  code: string;
  description: string;
}

export interface StatsEntry {
  type: DisplayName;
  group: DisplayName;
  exemptions: Array<unknown>;
  splits: Array<StatsSplit>;
}

export interface DisplayName {
  displayName: string;
}

export interface StatsSplit {
  season: string;
  stat: PitchingStat;
  team: TeamRef; // reused from previous
  player: PersonRef;
  league: TeamRef; // same shape as TeamRef
  sport: SportRef;
  gameType: string;
}

export interface PitchingStat {
  gamesPlayed: number;
  gamesStarted: number;
  groundOuts: number;
  airOuts: number;
  runs: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  strikeOuts: number;
  baseOnBalls: number;
  intentionalWalks: number;
  hits: number;
  hitByPitch: number;
  avg: string;
  atBats: number;
  obp: string;
  slg: string;
  ops: string;
  caughtStealing: number;
  stolenBases: number;
  stolenBasePercentage: string;
  groundIntoDoublePlay: number;
  numberOfPitches: number;
  era: string;
  inningsPitched: string;
  wins: number;
  losses: number;
  saves: number;
  saveOpportunities: number;
  holds: number;
  blownSaves: number;
  earnedRuns: number;
  whip: string;
  battersFaced: number;
  outs: number;
  gamesPitched: number;
  completeGames: number;
  shutouts: number;
  strikes: number;
  strikePercentage: string;
  hitBatsmen: number;
  balks: number;
  wildPitches: number;
  pickoffs: number;
  totalBases: number;
  groundOutsToAirouts: string;
  winPercentage: string;
  pitchesPerInning: string;
  gamesFinished: number;
  strikeoutWalkRatio: string;
  strikeoutsPer9Inn: string;
  walksPer9Inn: string;
  hitsPer9Inn: string;
  runsScoredPer9: string;
  homeRunsPer9: string;
  inheritedRunners: number;
  inheritedRunnersScored: number;
  catchersInterference: number;
  sacBunts: number;
  sacFlies: number;
}
