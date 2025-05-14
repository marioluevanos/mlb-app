"use client";

import { cn } from "@/utils/cn";
import "./GamePreviews.css";
import { FC, useCallback, useEffect } from "react";
import { useMLB } from "../ui/MLBProvider";
import { GamePreview } from "../GamePreview/GamePreview";
import { formatDateInput } from "@/utils/date";
import { fetchTodaysGames } from "@/utils/games";

type GamePreviewProps = {
  className?: string;
};

export const GamePreviews: FC<GamePreviewProps> = (props) => {
  const { className } = props;
  const { gamePreviews, date, setGamePreviews } = useMLB();

  /**
   * Iniitalize game previews
   */
  const getGamePreviews = useCallback(
    async function main() {
      const [year, month, day] = formatDateInput(date);
      const gamePreviews = await fetchTodaysGames(year, month, day);
      setGamePreviews(gamePreviews);
    },
    [setGamePreviews, date]
  );

  useEffect(() => {
    getGamePreviews();
  }, [getGamePreviews]);

  return (
    <section className={cn("game-previews", className)}>
      {gamePreviews?.games.map((g) => (
        <GamePreview gamePreview={g} key={g.id} />
      ))}
    </section>
  );
};
