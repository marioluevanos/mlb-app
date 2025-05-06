import "./Team.css";
import { TeamClub } from "@/types";
import { FC, ReactNode } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

export type TeamProps = {
  className?: string;
  children?: ReactNode;
  team: Pick<TeamClub, "abbreviation" | "id" | "logo" | "name" | "record">;
};

export const Team: FC<TeamProps> = (props) => {
  const { team, className, children } = props;

  return (
    <div className={cn("team", className)} data-team-id={team.id}>
      <span className="team-logo">
        {team.logo && (
          <Image src={team.logo} width={32} height={32} alt={team.name} />
        )}
      </span>
      <span className="team-name">{team.abbreviation}</span>
      <span className="team-record">
        ({team.record.wins} &ndash; {team.record.losses})
      </span>
      {children}
    </div>
  );
};
