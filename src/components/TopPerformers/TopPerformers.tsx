import "./TopPerformers.css";
import { GamePlayer } from "@/types";
import { BaseSyntheticEvent, FC } from "react";
import { Player } from "../Player/Player";

export type TopPerformersProps = {
  topPerformers?: GamePlayer[];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { topPerformers, onPlayerClick } = props;
  return (
    <section className="top-performers">
      <h3>Top Performers</h3>
      {topPerformers?.map((player) => (
        <Player player={player} key={player.fullName} onClick={onPlayerClick} />
      ))}
    </section>
  );
};
