import { GameInnings, GameStatus, TeamClub, TeamScore } from "@/types";
import "./Scoreboard.css";
import { FC } from "react";
import { cn } from "@/utils/cn";
import { Team } from "../Team/Team";
import { toKebabCase } from "@/utils/toKebabCase";
import { isWinner } from "@/utils/isWinner";

type ScoreboardTeam = Omit<
  TeamClub,
  "players" | "batting" | "fielding" | "pitching"
>;

type ScoreboardProps = {
  className?: string;
  status: GameStatus;
  innings: GameInnings[];
  teams: [ScoreboardTeam, ScoreboardTeam];
};

export const Scoreboard: FC<ScoreboardProps> = (props) => {
  const { className, teams = [], innings = [], status } = props;
  const winner = isWinner(teams[0], teams[1]);

  return (
    <section className={cn("scoreboard", cn(toKebabCase(status)), className)}>
      <div className="scoreboard-teams">
        {teams.map((team, index) => (
          <Team
            key={team.id}
            team={team}
            className={cn(
              winner === "away" && index === 0 && "winner",
              winner === "home" && index === 1 && "winner"
            )}
          />
        ))}
      </div>
      <div className="scoreboard-data">
        <div className="scoreboard-innings">
          {innings.map((inning) => (
            <span
              className="scoreboard-inning"
              key={inning.num}
              data-inning={inning.num}
            >
              <span className={cn((inning.away.runs || 0) > 0 ? "scored" : "")}>
                {inning.away.runs}
              </span>
              <span className={cn((inning.home.runs || 0) > 0 ? "scored" : "")}>
                {inning.home.runs}
              </span>
            </span>
          ))}
        </div>
        <div className="scoreboard-score">
          {(["runs", "hits", "errors"] as const).map((key) => (
            <span className={cn("scoreboard-score-column", key)} key={key}>
              <span className={cn("away", winner === "away" && "winner")}>
                {getTeamScore(teams[0], key)}
              </span>
              <span className={cn("home", winner === "home" && "winner")}>
                {getTeamScore(teams[1], key)}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

function getTeamScore(team: ScoreboardTeam | undefined, key: keyof TeamScore) {
  return team?.score ? team?.score[key] : "0";
}
