import "./GamePreview.css";
import { GamePreview } from "@/types";
import { cn } from "@/utils/cn";
import { FC } from "react";
import { CurrentInning } from "../CurrentInning/CurrentInning";

export type GamePreviewDetailsProps = {
  className?: string;
  gamePreview: GamePreview;
};

export const GamePreviewDetails: FC<GamePreviewDetailsProps> = (props) => {
  const { gamePreview, className } = props;
  const { status, currentInning = "", time } = gamePreview;
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
      </span>
    );
  }

  return (
    <span className="game-preview-details">
      <CurrentInning currentInning={currentInning} />
    </span>
  );
};
