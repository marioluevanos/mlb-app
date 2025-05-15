import { GamePreview, GamePreviews } from "@/types";
import { Linescore, MLBGames, MLBLive, PersonRef, TeamBox } from "@/types.mlb";
import { avatar, logo } from "./mlbAssets";
import { toGamePlayer } from "./mapToGame";

export async function fetchTodaysGames(
  yyyy: string | number,
  mm: string | number,
  dd: string | number
) {
  const url = "https://statsapi.mlb.com";
  const api =
    url + `/api/v1/schedule/games/?sportId=1&date=${yyyy}-${mm}-${dd}`;

  try {
    const response = await fetch(api);
    if (response.ok) {
      const json: MLBGames = await response.json();
      const preview = mapToGamePreview(json);
      return getLiveGamePreview(preview);
    }
  } catch (error) {
    console.error(error);
  }

  function mapToGamePreview(json: MLBGames): GamePreviews {
    return json.dates.reduce<{ games: GamePreview[]; date: string }>(
      (acc, date) => {
        acc.date = date.date;
        acc.games = date.games.map((g) => {
          const { away, home } = g.teams;

          return {
            id: g.gamePk,
            feed: url + g.link,
            content: url + g.content.link,
            status: g.status.detailedState,
            gameNumber: g.gameNumber,
            gamesInSeries: g.gamesInSeries,
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
        });

        return acc;
      },
      { games: [], date: "" }
    );
  }
}

async function getLiveGamePreview(
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

      return {
        ...game,
        time: `${datetime.time} ${datetime.ampm}`,
        currentInning: mapCurrentInning(linescore),
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

export function mapCurrentInning(linescore: Linescore) {
  return `${linescore?.inningHalf?.slice(0, 3).toUpperCase() || ""} ${
    linescore?.currentInningOrdinal || 0
  }`;
}

function _mapStartingPitcher(
  probablePitchers: PersonRef | undefined,
  players: TeamBox["players"]
) {
  const playaz = Object.values(players).map(toGamePlayer);
  const pitcher = playaz.find((p) => p.id === probablePitchers?.id);
  const pitching = pitcher?.season?.pitching;

  return {
    fullName: probablePitchers?.fullName,
    id: probablePitchers?.id,
    avatar: probablePitchers ? avatar(probablePitchers?.id) : undefined,
    position: pitching ? `${pitching?.wins} — ${pitching?.losses}` : "0-0",
    summary: pitching ? `${pitching?.era} ERA, ${pitching?.whip} WHIP` : "",
  };
}
