import "./CurrentInning.css";
import { GameToday } from "@/types";
import { FC } from "react";
import { TriangleDown, TriangleUp } from "../ui/Icon";
import { cn } from "@/utils/cn";

export type CurrentInningProps = {
  className?: string;
  currentInning: GameToday["currentInning"];
};

export const CurrentInning: FC<CurrentInningProps> = (props) => {
  const { currentInning = "", className } = props;
  const [pos, inning] = currentInning.split(" ");

  return (
    <span className={cn("current-inning", className)}>
      {pos === "TOP" ? <TriangleUp /> : <TriangleDown />}
      {inning}
    </span>
  );
};
