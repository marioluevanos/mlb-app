import './AllPlays.css';

import { Player } from '../Player/Player';
import { EventHeader } from '../EventHeader/EventHeader';
import type { BaseSyntheticEvent, FC } from 'react';
import type { LiveGame } from '@/types';
import { cn } from '@/utils/cn';
import { getOrdinal } from '@/utils/mlb';

type AllPlaysProps = {
  allPlays?: LiveGame['allPlays'];
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const AllPlays: FC<AllPlaysProps> = (props) => {
  const { className, allPlays = [], onPlayerClick } = props;

  return Object.keys(allPlays).length > 0 ? (
    <section className={cn('all-plays', className)}>
      <ol>
        {Object.entries(allPlays).map(([inning, events], i) => (
          <li className={cn('all-event-inning')} key={i}>
            <h3>{getOrdinal(inning)}</h3>
            <div className="all-events">
              {events.map((event, index) => (
                <div
                  className={cn(
                    'all-event',
                    event.result?.isOut && 'is-out',
                    event.result?.rbi && 'is-rbi',
                  )}
                  key={`${event.teamAbbreviation}-${index}`}
                >
                  <EventHeader event={event} />
                  <Player
                    onClick={onPlayerClick}
                    player={{
                      id: event.matchup.batter.id,
                      avatar: event.matchup.batter.avatar,
                      fullName: event.matchup.batter.fullName,
                      position: event.matchup.batter.position,
                      summary: event.result?.rbi
                        ? `(${event.result?.rbi} RBI)`
                        : '',
                    }}
                  />
                  <span className="description">
                    {event.result?.description}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  ) : (
    <p className="all-plays-no-plays">No Plays Recorded</p>
  );
};
