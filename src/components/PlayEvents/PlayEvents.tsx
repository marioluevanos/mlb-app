import './PlayEvents.css';
import { AtBatIcon, CapIcon, HourglassIcon, SwitchIcon } from '../ui/Icon';
import type { FC } from 'react';
import type { PlayEvent, PlayResult } from '@/types.mlb';
import type { GameStatus } from '@/types';
import { cn } from '@/utils/cn';

type PlayEventsProps = {
  events?: Array<Partial<PlayEvent>>;
  result?: Partial<PlayResult>;
  status?: GameStatus;
  className?: string;
};

export const PlayEvents: FC<PlayEventsProps> = (props) => {
  const { status = '', className, events = [], result } = props;
  const isFinal = ['Final', 'Game Over'].includes(status);

  const isSub = (event: Partial<PlayEvent>) => {
    return (
      event.type === 'action' &&
      'isSubstitution' in event &&
      event.isSubstitution
    );
  };

  const isInPlay = (event: Partial<PlayEvent>) => {
    return event.isPitch && event.details?.isInPlay;
  };

  return events.length > 0 && !isFinal ? (
    <div className={cn('play-events', className)}>
      <ol>
        {events
          .slice()
          .reverse()
          .map((event, i) => (
            <li
              className={cn(
                'play-event',
                event.isPitch && event.details?.isStrike && 'is-strike',
                isInPlay(event) && 'is-in-play',
                event.isPitch && event.details?.isBall && 'is-ball',
                event.details?.isOut && 'is-out',
                isSub(event) && 'is-sub',
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
                  'eventType' in event.details &&
                  event.details.eventType === 'mound_visit' ? (
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
                      {event.pitchData?.startSpeed} mph{' '}
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
