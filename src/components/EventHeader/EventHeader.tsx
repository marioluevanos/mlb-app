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
    <span className={cn('event-header', className)}>
      {event.teamAbbreviation && (
        <span className="abbreviation">{event.teamAbbreviation}</span>
      )}{' '}
      {event.result?.event && (
        <span className="event">{event.result?.event}</span>
      )}
    </span>
  );
};
