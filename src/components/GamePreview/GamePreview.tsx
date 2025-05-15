import "./GamePreview.css";
import { GamePreview as GamePreviewType } from "@/types";
import { FC, useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import { Team } from "../Team/Team";
import { toKebabCase } from "@/utils/toKebabCase";
import { GamePreviewDetails } from "./GamePreviewDetails";
import { TeamScore } from "../TeamScore/TeamScore";
import { MLBLive } from "@/types.mlb";
import { useMLB } from "../ui/MLBProvider";
import { isWinner, mapCurrentInning } from "@/utils/mlb";

type GamePreviewProps = {
  className?: string;
  gamePreview: GamePreviewType;
};

export const GamePreview: FC<GamePreviewProps> = (props) => {
  const { className, gamePreview } = props;
  const { away, home, status, id, feed } = gamePreview;
  const isScheduled = status === "Scheduled";
  const isPregame = status === "Pre-Game";
  const isPostponed = status === "Postponed";
  const isWarmup = status === "Warmup";
  const isPre = isScheduled || isPregame || isPostponed || isWarmup;
  const winner = isWinner(away.score, home.score);
  const { setGamePreviews, gamePreviews } = useMLB();

  /**
   * Map live game data for preview UI
   */
  const mapLiveGamePreview = useCallback(
    (game: GamePreviewType, live: MLBLive, id: number) => {
      const { linescore, plays } = live.liveData;
      if (game.id === id) {
        game.home.score = linescore.teams.home;
        game.away.score = linescore.teams.away;
        game.currentInning = mapCurrentInning(linescore);
        game.count = plays.currentPlay.count;
        game.runners = {
          first: linescore.offense.first,
          second: linescore.offense.second,
          third: linescore.offense.third,
        };
      }
      return game;
    },
    []
  );

  /**
   * Fetch and update the game in progress
   */
  const updateGameInProgress = useCallback(async () => {
    const response = await fetch(feed);
    const live: MLBLive = await response.json();
    const games = gamePreviews?.games || [];
    const updated = games.map((g) => mapLiveGamePreview(g, live, id));

    setGamePreviews({ date: gamePreviews?.date, games: updated });
  }, [feed, id, setGamePreviews, mapLiveGamePreview, gamePreviews]);

  /**
   * Check if game is in progress and update
   */
  useEffect(() => {
    if (status === "In Progress") {
      const intervalId = setInterval(updateGameInProgress, 15000);
      return () => clearInterval(intervalId);
    }
  }, [status, updateGameInProgress]);

  return (
    <section
      id={id.toString()}
      data-status={toKebabCase(status)}
      className={cn(
        "game-preview",
        toKebabCase(status),
        isPre && "is-pre",
        className
      )}
    >
      <div className="game-preview-teams">
        <Team
          key={away.id}
          team={away}
          className={cn("game-preview-away", winner === "away" && "winner")}
        >
          <span className="game-preview-record">
            ({away.record.wins} &ndash; {away.record.losses})
          </span>
          {!isPre && <TeamScore score={away.score} />}
        </Team>
        <Team
          key={home.id}
          team={home}
          className={cn("game-preview-home", winner === "home" && "winner")}
        >
          <span className="game-preview-record">
            ({home.record.wins} &ndash; {home.record.losses})
          </span>
          {!isPre && <TeamScore score={home.score} />}
        </Team>
      </div>
      <GamePreviewDetails gamePreview={gamePreview} />
    </section>
  );
};
