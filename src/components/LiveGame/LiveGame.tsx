"use client";

import "./LiveGame.css";
import { FC, useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { toKebabCase } from "@/utils/toKebabCase";
import { Scoreboard } from "../Scoreboard/Scoreboard";
import { GamePreview } from "../GamePreview/GamePreview";
import { GamePreview as GamePreviewType, GameToday } from "@/types";
import { MLBLive } from "@/types.mlb";
import { mapToLiveGame } from "@/utils/mlb";
import { GameMatchup } from "../GameMatchup/GameMatchup";
import { GameBug } from "../GameBug/GameBug";
import { PlayEvents } from "../PlayEvents/PlayEvents";
import { InningPlays } from "../InningPlays/InningPlays";

type LiveGameProps = {
  className?: string;
  liveGame?: GameToday;
  gamePreview?: GamePreviewType;
};

export const LiveGame: FC<LiveGameProps> = (props) => {
  const { className, gamePreview, liveGame } = props;
  const [game, setGame] = useState<GameToday | undefined>(liveGame);
  const isTopInning = game?.currentInning.split(" ")[0] === "TOP";

  /**
   * Fetch and update the game in progress
   */
  const updateGameInProgress = useCallback(async () => {
    if (!game?.feed) return;
    const response = await fetch(game.feed);
    const live: MLBLive = await response.json();
    const updated = mapToLiveGame(live);

    setGame(updated);
  }, [game]);

  /**
   * Check if game is in progress and update
   */
  useEffect(() => {
    // if (game?.status === "In Progress") {
    //   const intervalId = setInterval(updateGameInProgress, 15000);
    //   return () => clearInterval(intervalId);
    // }
  }, [game?.status, updateGameInProgress]);

  return !game ? (
    gamePreview && <GamePreview gamePreview={gamePreview} />
  ) : (
    <section
      id={game.id.toString()}
      data-status={toKebabCase(game.status)}
      className={cn("live-game", toKebabCase(game.status), className)}
    >
      {game.innings.length > 0 ? (
        <Scoreboard
          innings={game.innings}
          status={game.status}
          teams={[game.away, game.home]}
          isTopInning={isTopInning}
        />
      ) : null}

      <GameMatchup matchup={game.currentPlay?.matchup}>
        <GameBug
          count={game.currentPlay?.count}
          currentInning={game.currentInning}
          runners={game.currentPlay?.runners}
        />
      </GameMatchup>

      <PlayEvents events={game.currentPlay?.events} />

      <InningPlays
        status={game.status}
        currentInning={game.currentInning}
        playsByInning={game.playsByInning}
        scoringPlays={game.scoringPlays}
      />
      {/* <GameDecisions decisions={decisions} />
      {topPerformers?.length > 0 ? (
        <TopPerformers topPerformers={topPerformers} />
      ) : null}
      <TeamCompare away={teams[0]} home={teams[1]} /> */}
    </section>
  );
};
