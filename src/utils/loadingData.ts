import { GameData } from "../App";

export function loadingData(cacheKey?: string): GameData {
  if (cacheKey) {
    const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");

    if (cache && Array.isArray(cache.games)) {
      return cache;
    }
  }

  return {
    date: "",
    games: Array.from({ length: 8 }, (_, i) => {
      return {
        id: i,
        feed: "",
        content: "",
        status: "Final",
        innings: [],
        away: {
          id: 1,
          players: [],
          battingOrder: [],
          startingPitcher: {
            fullName: "XXXXXXXXXXXX",
            avatar: "",
            id: i,
          },
          record: { wins: 0, losses: 0, pct: "XXXX" },
          name: "XXX XXXXXXX XXXXXXX",
          score: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
          abbreviation: "XXX",
          logo: "",
        },
        home: {
          id: 0,
          players: [],
          battingOrder: [],
          startingPitcher: {
            fullName: "XXXXXXXXXXXX",
            avatar: "",
            id: i,
          },
          record: { wins: 0, losses: 0, pct: "XXXX" },
          name: "XXXXX XXX XXXXX",
          score: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
          abbreviation: "XXX",
          logo: "",
        },
        time: "XX:XX XX",
        currentInning: "TOP 1st",
        highlights: [],
        topPerformers: [],
        streams: [],
      };
    }),
  };
}
