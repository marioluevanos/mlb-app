import { ScoringPlay } from "@/types";
import "./ScoringPlays.css";
import { BaseSyntheticEvent, FC } from "react";
import { Player } from "../Player/Player";
import { cn } from "@/utils/cn";
import { CurrentInning } from "../CurrentInning/CurrentInning";

type PlayEventsProps = {
  title?: string;
  scoringPlays?: ScoringPlay[];
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const ScoringPlays: FC<PlayEventsProps> = (props) => {
  const { title, className, scoringPlays = [], onPlayerClick } = props;

  return scoringPlays.length > 0 ? (
    <section className={cn("scoring-plays", className)}>
      {title && <h3>{title}</h3>}
      <ol>
        {scoringPlays.map((event, i) => (
          <li className={cn("scoring-event")} key={i}>
            <span className="header">
              <CurrentInning currentInning={event.inning} />
              {event.teamAbbreviation && (
                <span className="abbreviation">{event.teamAbbreviation}</span>
              )}{" "}
              <span className="event">{event.result?.event}</span>
            </span>
            <Player
              onClick={onPlayerClick}
              player={{
                id: event.matchup.batter.id,
                avatar: event.matchup.batter.avatar,
                fullName: event.matchup.batter.fullName,
                position: event.matchup.batter.position,
                summary: event.result?.rbi ? `(${event.result?.rbi} RBI)` : "",
              }}
            />
            <span className="description">{event.result?.description}</span>
          </li>
        ))}
      </ol>
    </section>
  ) : null;
};
