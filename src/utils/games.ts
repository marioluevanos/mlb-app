import { GamePreview } from "@/types";
import { MLBGames } from "@/types.mlb";
import { logo } from "./mlbAssets";

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

      return mapToGamePreview(json);
    }
  } catch (error) {
    console.error(error);
  }

  function mapToGamePreview(json: MLBGames): {
    games: GamePreview[];
    date: string;
  } {
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
