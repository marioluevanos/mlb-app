import "./PlaysByInning.css";
import { InningPlay } from "@/types";
import { BaseSyntheticEvent, FC } from "react";
import { cn } from "@/utils/cn";
import { Player } from "../Player/Player";

type PlaysByInningProps = {
  playsByInning?: InningPlay[];
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const PlaysByInning: FC<PlaysByInningProps> = (props) => {
  const { className, playsByInning = [], onPlayerClick } = props;

  return playsByInning.length > 0 ? (
    <section className={cn("plays-by-inning", className)}>
      <ol>
        {playsByInning.map(
          (event, i) =>
            event.result?.description &&
            !["game_advisory"].includes(event.result.eventType) && (
              <li
                className={cn(
                  "play-event-by-inning",
                  event.result.isOut && "is-out",
                  !event.result.isOut && event.result.rbi && "is-rbi"
                )}
                key={i}
              >
                {event.result?.event && (
                  <span className="header">
                    <span className="event">{event.result?.event}</span>
                  </span>
                )}

                <Player
                  onClick={onPlayerClick}
                  player={{
                    id: event.matchup.batter.id,
                    avatar: event.matchup.batter.avatar,
                    fullName: event.matchup.batter.fullName,
                    position: event.matchup.batter.position,
                    summary: event.result?.rbi
                      ? `(${event.result?.rbi} RBI)`
                      : "",
                  }}
                />

                <span className="description">{event.result?.description}</span>
              </li>
            )
        )}
      </ol>
    </section>
  ) : null;
};
