import { TeamScore } from "../types";

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
