import {
  AtBat,
  Decisions,
  HighlightItem,
  Matchup,
  MLBLive,
  Performer,
  Player,
  Linescore,
  MLBGames,
  PersonRef,
  MLBGamePreview,
} from "../types.mlb";
import {
  CurrentMatchup,
  GamePlayer,
  GameStatus,
  GameToday,
  InningPlay,
  ScoringPlay,
  TeamClub,
  GamePreview,
  GamePreviews,
  TeamScore,
} from "../types";

export const MLB_API = "https://statsapi.mlb.com";

/**
 * Fetch scheduled games
 */
export async function fetchScheduledGames(
  yyyy: string | number,
  mm: string | number,
  dd: string | number
) {
  const api =
    MLB_API + `/api/v1/schedule/games/?sportId=1&date=${yyyy}-${mm}-${dd}`;

  try {
    const response = await fetch(api);
    if (response.ok) {
      const json: MLBGames = await response.json();
      const previews = createGamePreviews(json);
      return mergePreviewWithLive(previews);
    }
  } catch (error) {
    console.error(error);
  }

  /**
   * Fetch live game data and append to sheduled games
   */
  function createGamePreviews(json: MLBGames): GamePreviews {
    return json.dates.reduce<{ games: GamePreview[]; date: string }>(
      (acc, date) => {
        acc.date = date.date;
        acc.games = date.games.map(mapToGamePreview);

        return acc;
      },
      { games: [], date: "" }
    );
  }
}

export function mapToGamePreview(g: MLBGamePreview) {
  const { away, home } = g.teams;

  return {
    id: g.gamePk,
    feed: MLB_API + g.link,
    content: MLB_API + g.content.link,
    status: g.status.detailedState,
    gameNumber: g.gameNumber,
    doubleHeader: g.doubleHeader,
    venue: g.venue.name,
    away: {
      logo: logo(away.team.id),
      record: away.leagueRecord,
      name: away.team.name,
      id: away.team.id,
      isWinner: away.isWinner,
    },
    home: {
      logo: logo(home.team.id),
      record: home.leagueRecord,
      name: home.team.name,
      id: home.team.id,
      isWinner: home.isWinner,
    },
  };
}

/**
 * Take scheduled games and append live game data
 */
async function mergePreviewWithLive(
  previews: GamePreviews
): Promise<GamePreviews> {
  const out = await Promise.all(
    (
      await Promise.all(
        previews.games.map(async (game) => {
          const response = await fetch(game.feed);
          const live: MLBLive = await response.json();
          return { live, game };
        })
      )
    ).map(({ live, game }) => {
      const { teams, datetime } = live.gameData;
      const { linescore } = live.liveData;
      const { currentPlay } = live.liveData.plays;

      return {
        ...game,
        time: `${datetime.time} ${datetime.ampm}`,
        currentInning: mapCurrentInning(linescore),
        count: currentPlay?.count,
        runners: {
          first: linescore.offense.first,
          second: linescore.offense.second,
          third: linescore.offense.third,
        },
        home: {
          ...game.home,
          name: teams?.home.abbreviation,
          logo: logo(game.home.id),
          score: linescore.teams.home,
        },
        away: {
          ...game.away,
          name: teams?.away.abbreviation,
          logo: logo(game.away.id),
          score: linescore.teams.away,
        },
      };
    })
  );

  return {
    games: out,
    date: previews.date,
  };
}

/**
 * Get the current inning from the linescore
 */
export function mapCurrentInning(linescore: Linescore) {
  return `${linescore?.inningHalf?.slice(0, 3).toUpperCase() || ""} ${
    linescore?.currentInningOrdinal || 0
  }`;
}

/**
 * Maps the starting pitcher
 */
function mapStartingPitcher(
  probablePitchers: PersonRef | undefined,
  players: GamePlayer[]
): GamePlayer {
  const pitcher = players.find((p) => p.id === probablePitchers?.id);
  const pitching = pitcher?.season?.pitching;

  return {
    fullName: probablePitchers?.fullName,
    id: probablePitchers?.id,
    avatar: probablePitchers ? avatar(probablePitchers?.id) : undefined,
    position: pitching ? `${pitching?.wins} — ${pitching?.losses}` : "0-0",
    summary: pitching ? `${pitching?.era} ERA, ${pitching?.whip} WHIP` : "",
  };
}

/**
 * Maps to a generic player
 */
export function toGamePlayer(p: Player): GamePlayer {
  return {
    game: {
      batting: p.stats.batting,
      pitching: p.stats.pitching,
    },
    season: {
      batting: p.seasonStats.batting,
      pitching: p.seasonStats.pitching,
    },
    jerseyNumber: p.jerseyNumber,
    battingOrder: p.battingOrder ? Number(p.battingOrder) : undefined,
    position: p.position.abbreviation,
    fullName: p.person.fullName,
    id: p.person.id,
    avatar: avatar(p.person.id),
  };
}

/**
 * Maps to a team
 */
function mapToTeam(team: "home" | "away", data: MLBLive): TeamClub {
  const { gameData, liveData } = data;
  const { linescore, boxscore } = liveData;
  const { teams, probablePitchers } = gameData;
  const players = Object.values(boxscore.teams[team].players).map(toGamePlayer);
  const startingPitcher: GamePlayer = mapStartingPitcher(
    probablePitchers[team],
    players
  );

  return {
    record: teams[team].record.leagueRecord,
    name: teams[team].abbreviation,
    id: teams[team].id,
    score: linescore.teams[team],
    startingPitcher,
    abbreviation: teams?.[team].abbreviation,
    logo: logo(teams[team].id),
    ...boxscore.teams[team].teamStats,
    players,
  };
}

/**
 * Maps to live game data
 */
export function mapToLiveGame(data: MLBLive): GameToday {
  const { gameData, liveData } = data;
  const { linescore, boxscore, plays, decisions } = liveData;
  const { currentPlay, scoringPlays, allPlays, playsByInning } = plays;
  const { offense } = linescore;
  const awayTeam = mapToTeam("away", data);
  const homeTeam = mapToTeam("home", data);
  const status = gameData.status.detailedState;
  const allPlayers = [
    ...(awayTeam?.players || []),
    ...(homeTeam.players || []),
  ];
  const matchup = getCurrentMatchup({
    players: allPlayers,
    matchup: currentPlay?.matchup,
  });

  const [currentInning] = playsByInning.reverse();
  const currentPlays =
    (linescore.isTopInning ? currentInning?.top : currentInning?.bottom) || [];

  return {
    id: data.gamePk,
    feed: data.link,
    time: `${data.gameData.datetime.time} ${data.gameData.datetime.ampm}`,
    status,
    away: awayTeam,
    home: homeTeam,
    innings: linescore.innings,
    playsByInning: currentPlays.reduce<InningPlay[]>(
      playByInning.bind(null, {
        allPlays,
        allPlayers,
        teamAbbreviation: [awayTeam.abbreviation, homeTeam.abbreviation],
      }),
      []
    ),
    topPerformers: boxscore.topPerformers.map(topPerformers) || [],
    scoringPlays: scoringPlays.reduce<ScoringPlay[]>(
      scoringPlay.bind(null, {
        allPlays,
        allPlayers,
        teamAbbreviation: [awayTeam.abbreviation, homeTeam.abbreviation],
      }),
      []
    ),
    currentPlay: {
      count: currentPlay?.count,
      events: currentPlay?.playEvents,
      result: currentPlay?.result,
      runners: {
        second: offense.second,
        third: offense.third,
        first: offense.first,
      },
      matchup: {
        batter: matchup?.batter,
        pitcher: matchup?.pitcher,
      },
    },
    currentInning: mapCurrentInning(linescore),
    decisions: getDecision(status, decisions, awayTeam, homeTeam),
  };
}

function playByInning(
  args: {
    allPlays: AtBat[];
    allPlayers: GamePlayer[];
    teamAbbreviation: string[];
  },
  acc: InningPlay[],
  playIndex: number
) {
  const { allPlayers, allPlays, teamAbbreviation } = args;
  const play = allPlays[playIndex];

  if (play) {
    const matchup = getCurrentMatchup({
      players: allPlayers,
      matchup: play.matchup,
    });

    acc.push({
      teamAbbreviation: play.about.isTopInning
        ? teamAbbreviation[0]
        : teamAbbreviation[1],
      result: play?.result,
      matchup: {
        batter: mapToBatter(matchup?.batter, play?.result, { bats: "" }),
        pitcher: mapToBatter(matchup?.pitcher, play?.result, { throws: "" }),
      },
    });
  }

  return acc;

  function mapToBatter(
    player?: GamePlayer,
    result?: AtBat["result"],
    arm?: { bats?: string; throws?: string }
  ) {
    const bats = arm?.bats || "";
    const throws = arm?.throws || "";

    return {
      id: player?.id,
      avatar: player?.avatar,
      fullName: player?.fullName,
      position: player?.position,
      summary: result?.rbi ? `(${result?.rbi} RBI)` : "",
      bats,
      throws,
    };
  }
}

function scoringPlay(
  args: {
    allPlays: AtBat[];
    allPlayers: GamePlayer[];
    teamAbbreviation: string[];
  },
  acc: ScoringPlay[],
  playIndex: number
) {
  const { allPlayers, allPlays, teamAbbreviation = [] } = args;
  const play = allPlays.find((b) => b.atBatIndex === playIndex);

  if (play) {
    const matchup = getCurrentMatchup({
      players: allPlayers,
      matchup: play.matchup,
    });

    acc.push({
      inning: `${play.about.isTopInning ? "TOP" : "BOT"} ${play.about.inning}`,
      teamAbbreviation: play.about.isTopInning
        ? teamAbbreviation[0]
        : teamAbbreviation[1],
      result: play?.result,
      matchup: {
        batter: matchup?.batter,
        pitcher: matchup?.pitcher,
      },
    });
  }

  return acc;
}

function getCurrentMatchup(args: {
  players: GamePlayer[];
  matchup: Omit<Matchup, "batterHotColdZoneStats">;
}): CurrentMatchup {
  const { players, matchup } = args;

  const { batter, pitcher } = players.reduce<{
    batter?: GamePlayer;
    pitcher?: GamePlayer;
  }>((acc, player) => {
    if (matchup?.batter && player.id === matchup.batter.id) {
      acc.batter = player;
    }

    if (matchup?.pitcher && player.id === matchup.pitcher.id) {
      acc.pitcher = player;
    }

    return acc;
  }, {});

  return {
    batter: {
      ...batter,
      bats: matchup?.batSide?.code,
      summary: `${batter?.game?.batting.summary}`,
      note: `${batter?.season?.batting.avg} AVG, ${batter?.season?.batting.homeRuns} HR, ${batter?.season?.batting.rbi} RBI`,
      avatar: avatar(matchup?.batter.id),
    },
    pitcher: {
      ...pitcher,
      throws: matchup?.pitchHand?.code,
      summary: `${pitcher?.game?.pitching.summary}`,
      note: `${pitcher?.season?.pitching.era} ERA, ${pitcher?.season?.pitching.whip} WHIP`,
      avatar: avatar(matchup?.pitcher.id),
    },
  };
}

function getDecision(
  state: GameStatus,
  decisions: Decisions,
  away: TeamClub,
  home: TeamClub
):
  | {
      winner: GamePlayer;
      loser: GamePlayer;
      save?: GamePlayer;
    }
  | undefined {
  const final = state === "Final" || state === "Game Over";

  if (!final) return;

  const winner =
    away.score &&
    home.score &&
    Number(away.score.runs) > Number(home.score.runs)
      ? "away"
      : "home";

  const looser =
    away.score &&
    home.score &&
    Number(away.score.runs) < Number(home.score.runs)
      ? "away"
      : "home";
  const teams = { home, away };

  const wp = teams[winner]?.players?.find((p) => p.id === decisions.winner.id);
  const lp = teams[looser]?.players?.find((p) => p.id === decisions.loser.id);
  const sv = teams[winner]?.players?.find((p) => p.id === decisions.save?.id);

  return {
    winner: {
      ...(wp || decisions.winner),
      summary: wp?.game?.pitching.summary,
      note: wp?.game?.pitching.note,
    },
    loser: {
      ...(lp || decisions.loser),
      summary: lp?.game?.pitching.summary,
      note: lp?.game?.pitching.note,
    },
    save: {
      ...(sv || decisions.save),
      summary: sv?.game?.pitching.summary,
      note: sv?.game?.pitching.note,
    },
  };
}

function topPerformers(payload: Performer): GamePlayer {
  const { type, player } = payload;
  const { stats, person, position, seasonStats } = player;

  let summary = "";
  if (type === "hitter" && stats.batting.summary) {
    summary = stats.batting.summary;
  }

  if (type === "starter" && stats.pitching.summary) {
    summary = stats.pitching.summary;
  }
  const seasonBatting = `${seasonStats.batting.hits} H, ${seasonStats.batting.baseOnBalls} BB, ${seasonStats.batting.homeRuns} HR`;
  const seasonPitching = `${seasonStats.pitching.era} ERA`;

  return {
    avatar: avatar(person.id),
    jerseyNumber: player.jerseyNumber,
    id: person.id,
    fullName: person.fullName,
    position: position.abbreviation,
    summary,
    note: type === "hitter" ? seasonBatting : seasonPitching,
  };
}

export function mapHighlight(item: HighlightItem) {
  const [_, m, s] = item.duration.split(":");

  return {
    type: item.type,
    title: item.title,
    description: item.description,
    duration: `${parseFloat(m)}:${s}`,
    placeholder: {
      sm: item.image?.cuts.find((img) => img.width < 400),
      lg: item.image?.cuts.find((img) => img.width < 1400),
    },
    video:
      item.playbacks.find((vid) => vid.name === "mp4Avc") || item.playbacks[0],
  };
}

export function isWinner(
  away: TeamScore | undefined,
  home: TeamScore | undefined
) {
  if (home && away) {
    if ((home.runs || 0) > (away.runs || 0)) {
      return "home";
    }

    if ((home.runs || 0) < (away.runs || 0)) {
      return "away";
    }
  }
}

export function avatar(id: string | number) {
  return `https://midfield.mlbstatic.com/v1/people/${id}/spots/64`;
}

export function logo(teamId: string | number) {
  return `https://midfield.mlbstatic.com/v1/team/${teamId}/spots/64`;
}

export function headshot(id?: string | number) {
  if (!id) return;

  return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${id}/headshot/67/current`;
}
