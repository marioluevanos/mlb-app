import {
  AtBat,
  Decisions,
  HighlightItem,
  Matchup,
  MLBLive,
  Performer,
  Player,
} from "../types.mlb";
import {
  CurrentMatchup,
  GamePlayer,
  GameStatus,
  GameToday,
  InningPlay,
  ScoringPlay,
  TeamClub,
} from "../types";

function toGamePlayer(p: Player): GamePlayer {
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

const mapToTeam = (team: "home" | "away", data: MLBLive): TeamClub => {
  const { gameData, liveData } = data;
  const { linescore, boxscore } = liveData;
  const { teams, probablePitchers } = gameData;
  const players = Object.values(boxscore.teams[team].players).map(toGamePlayer);
  const pitcher = players.find((p) => p.id === probablePitchers?.[team]?.id);
  const pitching = pitcher?.season?.pitching;
  const pPitchers = probablePitchers?.[team]?.fullName?.split(" ");
  const [first = "", last = ""] = pPitchers || [];
  const startingPitcher: GamePlayer = {
    ...pitcher,
    fullName: pPitchers ? `${first.slice(0, 1)}. ${last}` : "TBD",
    id: probablePitchers?.[team]?.id,
    avatar: avatar(probablePitchers?.[team]?.id),
    position: pitching ? `${pitching?.wins} — ${pitching?.losses}` : "0-0",
    summary: pitching ? `${pitching?.era} ERA, ${pitching?.whip} WHIP` : "",
  };

  return {
    record: teams[team].record.leagueRecord,
    name: teams[team].name,
    id: teams[team].id,
    score: linescore.teams[team],
    startingPitcher,
    abbreviation: teams?.[team].abbreviation,
    logo: logo(teams[team].id),
    ...boxscore.teams[team].teamStats,
    players,
  };
};

export function mapToGame(g: GameToday, data: MLBLive): GameToday {
  const { gameData, liveData } = data;
  const { linescore, boxscore, plays, decisions } = liveData;
  const { currentPlay, scoringPlays, allPlays, playsByInning } = plays;
  const { offense } = linescore;
  const awayTeam = mapToTeam("away", data);
  const homeTeam = mapToTeam("home", data);
  const status = gameData.status.detailedState;
  const allPlayers = [...awayTeam.players, ...homeTeam.players];
  const matchup = getCurrentMatchup({
    players: allPlayers,
    matchup: currentPlay?.matchup,
  });

  const [currentInning] = playsByInning.reverse();
  const currentPlays = linescore.isTopInning
    ? currentInning.top
    : currentInning.bottom;

  return {
    ...g,
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
    currentInning: `${linescore?.inningHalf?.slice(0, 3).toUpperCase() || ""} ${
      linescore?.currentInningOrdinal || 0
    }`,
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
    Number(away.score.runs) > Number(home.score.runs) ? "away" : "home";
  const looser =
    Number(away.score.runs) < Number(home.score.runs) ? "away" : "home";
  const teams = { home, away };

  const wp = teams[winner]?.players.find((p) => p.id === decisions.winner.id);
  const lp = teams[looser]?.players.find((p) => p.id === decisions.loser.id);
  const sv = teams[winner]?.players.find((p) => p.id === decisions.save?.id);

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

function avatar(id?: string | number) {
  if (!id) return;

  return `https://midfield.mlbstatic.com/v1/people/${id}/spots/120`;
}

export function headshot(id?: string | number) {
  if (!id) return;

  return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${id}/headshot/67/current`;
}

function logo(teamId?: number | string) {
  if (!teamId) return "";

  return `https://midfield.mlbstatic.com/v1/team/${teamId}/spots/64`;
}
