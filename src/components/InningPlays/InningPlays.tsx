import "./InningPlays.css";

import { GameStatus, GameToday, InningPlay } from "@/types";
import { BaseSyntheticEvent, FC } from "react";
import { Tabs } from "../ui/Tabs/Tabs";
import { cn } from "@/utils/cn";
import { PlaysByInning } from "../PlaysByInning/PlaysByInning";
import { ScoringPlays } from "../ScoringPlays/ScoringPlays";

type InningPlaysProps = {
  status: GameStatus;
  className?: string;
  currentInning?: string;
  playsByInning?: InningPlay[];
  scoringPlays?: GameToday["scoringPlays"];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const InningPlays: FC<InningPlaysProps> = (props) => {
  const {
    className,
    status,
    currentInning = "",
    playsByInning,
    scoringPlays,
    onPlayerClick,
  } = props;
  const isPreGame = status === "Pre-Game";
  const isScheduled = status === "Scheduled";
  const isWarmup = status === "Warmup";
  const isFinal = ["Final", "Game Over"].includes(status);

  if (isPreGame || isScheduled || isWarmup) {
    return null;
  }

  if (isFinal) {
    return (
      <>
        <ScoringPlays
          className="is-final"
          title="Scoring Plays"
          scoringPlays={scoringPlays}
          onPlayerClick={onPlayerClick}
        />
      </>
    );
  }

  return (
    <Tabs
      className={cn("inning-plays", className)}
      tabs={[<>{currentInning.toLowerCase()} Plays</>, <>Scoring Plays</>]}
    >
      <PlaysByInning
        playsByInning={playsByInning}
        onPlayerClick={onPlayerClick}
      />
      <ScoringPlays scoringPlays={scoringPlays} onPlayerClick={onPlayerClick} />
    </Tabs>
  );
};
