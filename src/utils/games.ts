import { GamePreview, GamePreviews } from "@/types";
import { MLBGames } from "@/types.mlb";
import { avatar, logo } from "./mlbAssets";

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
              score: away.score,
            },
            home: {
              logo: logo(home.team.id),
              record: home.leagueRecord,
              name: home.team.name,
              id: home.team.id,
              isWinner: home.isWinner,
              score: home.score,
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
          const live = await response.json();
          return { live, game };
        })
      )
    ).map(({ live, game }) => {
      const { teams, datetime, probablePitchers } = live.gameData;

      return {
        ...game,
        time: `${datetime.time} ${datetime.ampm}`,
        home: {
          ...game.home,
          startingPitcher: {
            fullName: probablePitchers?.home?.fullName,
            id: probablePitchers?.home?.id,
            avatar: avatar(probablePitchers?.home?.id),
          },
          name: teams?.home.abbreviation,
          logo: logo(game.home.id),
        },
        away: {
          ...game.away,
          startingPitcher: {
            fullName: probablePitchers.away?.fullName,
            id: probablePitchers.away?.id,
            avatar: avatar(probablePitchers.away?.id),
          },
          name: teams?.away.abbreviation,
          logo: logo(game.away.id),
        },
      };
    })
  );

  return {
    games: out,
    date: previews.date,
  };
}
