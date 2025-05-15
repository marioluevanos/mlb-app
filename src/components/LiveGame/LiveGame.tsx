"use client";

import "./LiveGame.css";
import { FC } from "react";
import { cn } from "@/utils/cn";
import { toKebabCase } from "@/utils/toKebabCase";
import { Scoreboard, ScoreboardProps } from "../Scoreboard/Scoreboard";
import {
  GameDecisions,
  GameDecisionsProps,
} from "../GameDecisions/GameDecisions";
import { TeamCompare } from "../TeamCompare/TeamCompare";
import {
  TopPerformers,
  TopPerformersProps,
} from "../TopPerformers/TopPerformers";
import { GamePreview } from "../GamePreview/GamePreview";
import { useMLB } from "../ui/MLBProvider";

type LiveGameProps = {
  className?: string;
  id: number | string;
} & ScoreboardProps &
  GameDecisionsProps &
  TopPerformersProps;

export const LiveGame: FC<LiveGameProps> = (props) => {
  const {
    id,
    className,
    innings,
    decisions,
    status,
    teams,
    isTopInning,
    topPerformers = [],
  } = props;
  const { gamePreviews } = useMLB();
  const gamePreview = gamePreviews?.games.find((g) => g.id === Number(id));

  return (
    <section
      id={id.toString()}
      data-status={toKebabCase(status)}
      className={cn("live-game", toKebabCase(status), className)}
    >
      {innings.length > 0 ? (
        <Scoreboard
          innings={innings}
          status={status}
          teams={teams}
          isTopInning={isTopInning}
        />
      ) : (
        gamePreview && <GamePreview gamePreview={gamePreview} />
      )}
      <GameDecisions decisions={decisions} />
      {topPerformers?.length > 0 ? (
        <TopPerformers topPerformers={topPerformers} />
      ) : null}
      <TeamCompare away={teams[0]} home={teams[1]} />
    </section>
  );
};
