import "./GamePreview.css";
import { GamePreview } from "@/types";
import { cn } from "@/utils/cn";
import { FC } from "react";
import { GameBug } from "../GameBug/GameBug";

export type GamePreviewDetailsProps = {
  className?: string;
  gamePreview: GamePreview;
};

export const GamePreviewDetails: FC<GamePreviewDetailsProps> = (props) => {
  const { gamePreview, className } = props;
  const {
    status,
    currentInning = "",
    time,
    count,
    runners,
    gameNumber,
    doubleHeader,
  } = gamePreview;
  const isFinal = status === "Final" || status === "Game Over";
  const isScheduled = status === "Scheduled";
  const isPregame = status === "Pre-Game";
  const isPostponed = status === "Postponed";
  const isWarmup = status === "Warmup";

  if (isPregame || isScheduled || isWarmup) {
    return (
      <span className="game-preview-details">
        <span className={cn("game-time", className)}>{time}</span>
      </span>
    );
  }

  const totalInnings = parseInt(currentInning?.replace(/\D+/g, ""));
  if (isFinal || isPostponed) {
    const isExtraInnings = totalInnings > 9;
    return (
      <span className="game-preview-details">
        <span className={cn("game-status", className)}>
          {isFinal ? "Final" : gamePreview.status}
        </span>
        {isExtraInnings && (
          <span className={cn("total-innings", className)}>
            /{totalInnings}
          </span>
        )}
        {["Y", "S"].includes(doubleHeader) ? (
          <span className="double-header">/Game {gameNumber}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className="game-preview-details">
      <GameBug currentInning={currentInning} count={count} runners={runners} />
    </span>
  );
};
