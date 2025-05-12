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
  const { away, home, status, id } = gamePreview;

  return (
    <section
      id={id.toString()}
      className={cn("game-preview", cn(toKebabCase(status)), className)}
    >
      <div className="game-preview-teams">
        <Team key={away.id} team={away} className={cn()} />
        <Team key={home.id} team={home} className={cn()} />
      </div>
    </section>
  );
};
