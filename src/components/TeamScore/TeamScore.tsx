import "./TeamScore.css";
import { TeamScore as Score } from "@/types";
import { cn } from "@/utils/cn";
import { FC } from "react";

type TeamScoreProps = {
  score?: Score;
  className?: string;
};

export const TeamScore: FC<TeamScoreProps> = (props) => {
  const { score, className } = props;

  if (!score) return null;

  return (
    <span className={cn("team-score")}>
      <span className={className}>{score.runs}</span>
      <span className={className}>{score.hits}</span>
      <span className={className}>{score.errors}</span>
    </span>
  );
};
