import './EventHeader.css';

import type { FC } from 'react';
import type { InningPlay, ScoringPlay } from '@/types';
import { cn } from '@/utils/cn';
import { getDataAttributes } from '@/utils/getDataAttributes';

type EventHeaderProps = {
  event: ScoringPlay | InningPlay;
  className?: string;
};

export const EventHeader: FC<EventHeaderProps> = (props) => {
  const { className, event } = props;

  return (
    <span
      {...getDataAttributes(props)}
      className={cn(
        'event-header',
        !event.result?.event && 'event-in-progress',
        event?.result?.isOut && 'is-out',
        !event.result?.isOut && event.result?.rbi && 'is-rbi',
        !event.result?.isOut && event.result?.description && 'is-on-base',
        className,
      )}
    >
      {event.teamLogo ? (
        <img className="logo" src={event.teamLogo} width={24} height={24} />
      ) : (
        event.teamAbbreviation && (
          <span className="abbreviation">{event.teamAbbreviation}</span>
        )
      )}{' '}
      <span className="event">{event.result?.event}</span>
    </span>
  );
};
