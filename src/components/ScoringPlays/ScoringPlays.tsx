import './ScoringPlays.css';

import { Player } from '../Player/Player';
import { EventHeader } from '../EventHeader/EventHeader';
import type { LiveGame } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cn } from '@/utils/cn';

type PlayEventsProps = {
  scoringPlays?: LiveGame['scoringPlays'];
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const ScoringPlays: FC<PlayEventsProps> = (props) => {
  const { className, scoringPlays = {}, onPlayerClick } = props;

  return Object.keys(scoringPlays).length > 0 ? (
    <section className={cn('scoring-plays', className)}>
      <ol>
        {Object.entries(scoringPlays).map(([inning, events], i) => (
          <li className={cn('scoring-event-inning')} key={i}>
            <h3>{inning}</h3>
            <div className="scoring-events">
              {events.map((event, index) => (
                <div className="scoring-event" key={`${event.inning}-${index}`}>
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
    <p className="scoring-plays-no-score">No score</p>
  );
};
