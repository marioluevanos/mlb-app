import { TeamClub } from "../types";

export function isWinner(home: TeamClub, away: TeamClub) {
  if (home && away) {
    if (home.score && (home.score.runs || 0) > (away.score.runs || 0)) {
      return "home";
    }

    if (home.score && (home.score.runs || 0) < (away.score.runs || 0)) {
      return "away";
    }
  }
}
