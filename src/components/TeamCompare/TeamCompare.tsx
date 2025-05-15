import { TeamClub } from "@/types";
import "./TeamCompare.css";
import { FC, ReactNode } from "react";
import { Team } from "../Team/Team";
import { cn } from "@/utils/cn";

export type TeamCompareProps = {
  className?: string;
  home: TeamClub;
  away: TeamClub;
};

export const TeamCompare: FC<TeamCompareProps> = (props) => {
  const { home, away } = props;

  return (
    <section className="team-compare">
      <h3>Team Comparison</h3>
      <CompareRow {...props}>
        <span
          className={cn(
            "val teams",
            isMore(away.score?.runs, home.score?.runs)
          )}
        >
          <Team team={away} />
          <Team team={home} />
        </span>
      </CompareRow>
    </section>
  );
};

const CompareRow: FC<TeamCompareProps & { children?: ReactNode }> = (props) => {
  const { home, away, children } = props;

  return (
    <section className="cols">
      {children}
      <span
        data-label="R"
        className={cn("val", isMore(away.score?.runs, home.score?.runs))}
      >
        <span>{away.score?.runs || 0}</span>
        <span>{home.score?.runs || 0}</span>
      </span>
      <span
        data-label="H"
        className={cn("val", isMore(away.score?.hits, home.score?.hits))}
      >
        <span>{away.score?.hits || 0}</span>
        <span>{home.score?.hits || 0}</span>
      </span>
      <span
        data-label="HR"
        className={cn(
          "val",
          isMore(away.batting?.homeRuns, home.batting?.homeRuns)
        )}
      >
        <span>{away.batting?.homeRuns}</span>
        <span>{home.batting?.homeRuns}</span>
      </span>
      <span
        data-label="TB"
        className={cn(
          "val",
          isMore(away.batting?.totalBases, home.batting?.totalBases)
        )}
      >
        <span>{away.batting?.totalBases}</span>
        <span>{home.batting?.totalBases}</span>
      </span>
      <span
        data-label="LOB"
        className={cn(
          "val",
          isMore(away.batting?.leftOnBase, home.batting?.leftOnBase)
        )}
      >
        <span>{away.batting?.leftOnBase}</span>
        <span>{home.batting?.leftOnBase}</span>
      </span>
      <span
        data-label="E"
        className={cn(
          "val",
          isMore(away.fielding?.errors, home.fielding?.errors)
        )}
      >
        <span>{away.fielding?.errors}</span>
        <span>{home.fielding?.errors}</span>
      </span>
    </section>
  );
};

function isMore(away: number | undefined, home: number | undefined) {
  if (typeof home === "number" && typeof away === "number") {
    if (home > away) {
      return "home";
    }

    if (home < away) {
      return "away";
    }
  }
}
