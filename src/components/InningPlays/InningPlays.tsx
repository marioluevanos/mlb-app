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
  const isFinal = status === "Final" || status === "Game Over";
  const isPreGame = status === "Pre-Game";
  const isScheduled = status === "Scheduled";
  const isWarmup = status === "Warmup";

  if (isFinal || isPreGame || isScheduled || isWarmup) {
    return null;
  }

  const tabs = [<>{currentInning.toLowerCase()} Plays</>, <>Scoring Plays</>];

  return (
    <Tabs className={cn("inning-plays", className)} tabs={tabs}>
      <PlaysByInning
        playsByInning={playsByInning}
        onPlayerClick={onPlayerClick}
      />
      <ScoringPlays scoringPlays={scoringPlays} onPlayerClick={onPlayerClick} />
    </Tabs>
  );
};
