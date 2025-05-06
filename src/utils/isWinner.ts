import { TeamClub } from "../types";

export function isWinner(
  away: TeamClub | undefined,
  home: TeamClub | undefined
) {
  if (home && away) {
    if (
      home.score &&
      away.score &&
      ((home.score && away.score).runs || 0) > (away.score.runs || 0)
    ) {
      return "home";
    }

    if (
      home.score &&
      away.score &&
      (home.score.runs || 0) < (away.score.runs || 0)
    ) {
      return "away";
    }
  }
}
