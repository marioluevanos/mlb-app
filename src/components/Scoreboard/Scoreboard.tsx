import { GameInnings, GameStatus, ScoreboardTeam, TeamScore } from "@/types";
import "./Scoreboard.css";
import { FC } from "react";
import { cn } from "@/utils/cn";
import { Team } from "../Team/Team";
import { toKebabCase } from "@/utils/toKebabCase";
import { isWinner } from "@/utils/mlb";

export type ScoreboardProps = {
  className?: string;
  status: GameStatus;
  innings: GameInnings[];
  isTopInning?: boolean;
  teams: [ScoreboardTeam, ScoreboardTeam];
};

export const Scoreboard: FC<ScoreboardProps> = (props) => {
  const { className, teams = [], isTopInning, innings = [], status } = props;
  const winner = isWinner(teams[0]?.score, teams[1]?.score);
  const inProgress = status === "In Progress";

  return (
    <section
      className={cn(
        "scoreboard",
        cn(toKebabCase(status)),
        inProgress ? (isTopInning ? "is-top" : "is-bottom") : undefined,
        !innings.length && "no-innings",
        className
      )}
    >
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
              <span
                className={cn(
                  "away runs",
                  (inning.away.runs || 0) > 0 ? "scored" : ""
                )}
              >
                {inning.away.runs}
              </span>
              <span
                className={cn(
                  "home runs",
                  (inning.home.runs || 0) > 0 ? "scored" : ""
                )}
              >
                {inning.home.runs}
              </span>
            </span>
          ))}
        </div>
        {innings.length > 0 ? (
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
        ) : null}
      </div>
    </section>
  );
};

function getTeamScore(team: ScoreboardTeam | undefined, key: keyof TeamScore) {
  return team?.score ? team?.score[key] : "0";
}
