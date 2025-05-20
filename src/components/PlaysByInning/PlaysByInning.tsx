import './PlaysByInning.css';
import { Player } from '../Player/Player';
import type { BaseSyntheticEvent, FC } from 'react';
import type { InningPlay } from '@/types';
import { cn } from '@/utils/cn';

type PlaysByInningProps = {
  playsByInning?: Array<InningPlay>;
  className?: string;
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const PlaysByInning: FC<PlaysByInningProps> = (props) => {
  const { className, playsByInning = [], onPlayerClick } = props;

  const filtered = playsByInning.filter((p) => {
    return (
      p.result?.description &&
      !['game_advisory'].includes(String(p?.result?.eventType))
    );
  });

  return filtered.length > 0 ? (
    <section className={cn('plays-by-inning', className)}>
      <ol>
        {filtered.map((event, i) => (
          <li
            className={cn(
              'play-event-by-inning',
              event?.result?.isOut && 'is-out',
              !event.result?.isOut && event.result?.rbi && 'is-rbi',
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
                summary: event.result?.rbi ? `(${event.result?.rbi} RBI)` : '',
              }}
            />

            <span className="description">{event.result?.description}</span>
          </li>
        ))}
      </ol>
    </section>
  ) : (
    <p className="plays-by-inning-no-plays">No Plays Recorded</p>
  );
};
