import { TeamClub } from "../types";

export function isWinner(
  away: TeamClub | undefined,
  home: TeamClub | undefined
) {
  if (home?.score && away?.score) {
    if ((home.score.runs || 0) > (away.score.runs || 0)) {
      return "home";
    }

    if ((home.score.runs || 0) < (away.score.runs || 0)) {
      return "away";
    }
  }
}
