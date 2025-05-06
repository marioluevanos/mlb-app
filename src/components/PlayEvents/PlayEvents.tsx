import "./PlayEvents.css";
import { FC } from "react";
import { PlayEvent, PlayResult } from "@/types.mlb";
import { cn } from "@/utils/cn";
import { AtBatIcon, CapIcon, HourglassIcon, SwitchIcon } from "../ui/Icon";

type PlayEventsProps = {
  events?: Partial<PlayEvent>[];
  result?: Partial<PlayResult>;
  className?: string;
};

export const PlayEvents: FC<PlayEventsProps> = (props) => {
  const { className, events = [], result } = props;

  const isSub = (event: Partial<PlayEvent>) => {
    return (
      event.type === "action" &&
      "isSubstitution" in event &&
      event.isSubstitution
    );
  };

  const isInPlay = (event: Partial<PlayEvent>) => {
    return event.isPitch && event.details?.isInPlay;
  };

  return events.length > 0 ? (
    <div className={cn("play-events", className)}>
      <ol>
        {events
          .slice()
          .reverse()
          .map((event, i) => (
            <li
              className={cn(
                "play-event",
                event.isPitch && event.details?.isStrike && "is-strike",
                isInPlay(event) && "is-in-play",
                event.isPitch && event.details?.isBall && "is-ball",
                event.details?.isOut && "is-out",
                isSub(event) && "is-sub"
              )}
              key={i}
              data-type={event.type}
            >
              <span className="status-icon">
                {isInPlay(event) ? (
                  <AtBatIcon />
                ) : event.isPitch ? (
                  event.pitchNumber
                ) : isSub(event) ? (
                  <SwitchIcon />
                ) : event.details &&
                  "eventType" in event.details &&
                  event.details.eventType === "mound_visit" ? (
                  <CapIcon />
                ) : (
                  <HourglassIcon />
                )}
              </span>

              <span className="description">
                {isInPlay(event)
                  ? result?.description
                  : event.details?.description}
                {event.isPitch && (
                  <span className="pitch">
                    <span className="mph">
                      {event.pitchData?.startSpeed} mph{" "}
                    </span>
                    <span className="type">
                      {event.details?.type?.description}
                    </span>
                  </span>
                )}
              </span>
              {event.isPitch && !isInPlay(event) && (
                <span className="count">
                  {event.count?.balls}&ndash;{event.count?.strikes}
                </span>
              )}
            </li>
          ))}
      </ol>
    </div>
  ) : null;
};
