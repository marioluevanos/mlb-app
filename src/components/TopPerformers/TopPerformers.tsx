import "./TopPerformers.css";
import { GamePlayer } from "@/types";
import { FC } from "react";
import { Player, PlayerProps } from "../Player/Player";

type TopPerformersProps = {
  players?: GamePlayer[];
  onPlayerClick?: PlayerProps["onClick"];
};

export const TopPerformers: FC<TopPerformersProps> = (props) => {
  const { players, onPlayerClick } = props;
  return (
    <section className="top-performers">
      <h3>Top Performers</h3>
      {players?.map((player) => (
        <Player player={player} key={player.fullName} onClick={onPlayerClick} />
      ))}
    </section>
  );
};
