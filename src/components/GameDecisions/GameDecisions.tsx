import "./GameDecisions.css";
import { GameDecision } from "@/types";
import { FC, ReactNode } from "react";
import { Player, PlayerProps } from "../Player/Player";

export type GameDecisionsProps = {
  className?: string;
  decisions?: GameDecision;
  children?: ReactNode;
  onPlayerClick?: PlayerProps["onClick"];
};

export const GameDecisions: FC<GameDecisionsProps> = (props) => {
  const { decisions, onPlayerClick } = props;

  return (
    decisions?.winner && (
      <section className="game-decisions">
        <h3>Decision</h3>
        {decisions.winner && (
          <Player
            onClick={onPlayerClick}
            className="winner"
            player={decisions.winner}
          />
        )}
        {decisions.loser && (
          <Player
            onClick={onPlayerClick}
            className="loser"
            player={decisions.loser}
          />
        )}
        {decisions.save?.fullName && (
          <Player
            onClick={onPlayerClick}
            className="save"
            player={decisions.save}
          />
        )}
      </section>
    )
  );
};
