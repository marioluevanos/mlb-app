import { GamePreview as _GamePreview } from "@/types";
import "./GamePreview.css";
import { FC } from "react";
import { cn } from "@/utils/cn";
import { Team } from "../Team/Team";
import { toKebabCase } from "@/utils/toKebabCase";

type GamePreviewProps = {
  className?: string;
  gamePreview: _GamePreview;
};

export const GamePreview: FC<GamePreviewProps> = (props) => {
  const { className, gamePreview } = props;
  const { away, home, status, id, time } = gamePreview;

  return (
    <section
      id={id.toString()}
      className={cn("game-preview", cn(toKebabCase(status)), className)}
    >
      <div className="game-preview-teams">
        <Team key={away.id} team={away} className={cn()}>
          <span className="game-preview-record">
            ({away.record.wins} &ndash; {away.record.losses})
          </span>
          <span className="game-preview-details">
            <span className="game-preview-score">{away.score}</span>
          </span>
        </Team>
        <Team key={home.id} team={home} className={cn()}>
          <span className="game-preview-record">
            ({home.record.wins} &ndash; {home.record.losses})
          </span>
          <span className="game-preview-details">
            <span className="game-preview-score">{home.score}</span>
          </span>
        </Team>
      </div>
      <span className="game-preview-aside">
        <span className="game-preview-status">{time || status}</span>
      </span>
    </section>
  );
};
