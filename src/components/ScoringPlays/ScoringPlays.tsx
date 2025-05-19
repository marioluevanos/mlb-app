import './ScoringPlays.css';
import { Player } from '../Player/Player';
import { CurrentInning } from '../CurrentInning/CurrentInning';
import type { GameToday } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cn } from '@/utils/cn';
import { getOrdinal } from '@/utils/mlb';

type PlayEventsProps = {
  title?: string;
  scoringPlays?: GameToday['scoringPlays'];
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const ScoringPlays: FC<PlayEventsProps> = (props) => {
  const { title, className, scoringPlays = {}, onPlayerClick } = props;

  return Object.keys(scoringPlays).length > 0 ? (
    <section className={cn('scoring-plays', className)}>
      {title && <h3 className="scoring-plays-title">{title}</h3>}
      <ol>
        {Object.entries(scoringPlays).map(([inning, events], i) => (
          <li className={cn('scoring-event-inning')} key={i}>
            <h3>{getOrdinal(inning)}</h3>
            <div className="scoring-events">
              {events.map((event, index) => (
                <div className="scoring-event" key={`${event.inning}-${index}`}>
                  <span className="header">
                    <CurrentInning currentInning={event.inning} />
                    {event.teamAbbreviation && (
                      <span className="abbreviation">
                        {event.teamAbbreviation}
                      </span>
                    )}{' '}
                    <span className="event">{event.result?.event}</span>
                  </span>
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
