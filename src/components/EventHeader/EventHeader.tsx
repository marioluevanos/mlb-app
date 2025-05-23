import './EventHeader.css';

import type { FC } from 'react';
import type { InningPlay, ScoringPlay } from '@/types';
import { cn } from '@/utils/cn';

type EventHeaderProps = {
  event: ScoringPlay | InningPlay;
  className?: string;
};

export const EventHeader: FC<EventHeaderProps> = (props) => {
  const { className, event } = props;

  return (
    <span
      className={cn('event-header', event.teamLogo && 'has-logo', className)}
    >
      {event.teamLogo ? (
        <img className="logo" src={event.teamLogo} width={24} height={24} />
      ) : (
        event.teamAbbreviation && (
          <span className="abbreviation">{event.teamAbbreviation}</span>
        )
      )}{' '}
      {event.result?.event && (
        <span className="event">{event.result?.event}</span>
      )}
    </span>
  );
};
