import './GameStreams.css';
import { Button } from '../ui/Button/Button';
import type { GameStream } from '@/types';
import type { FC, RefObject } from 'react';
import { cn } from '@/utils/cn';

type GameStreamsProps = {
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
  streams?: Array<GameStream>;
};

export const GameStreams: FC<GameStreamsProps> = (props) => {
  const { className, streams = [], ref } = props;

  return (
    <section className={cn('game-streams', className)} ref={ref}>
      <h3>Game Links</h3>
      {streams?.map((link) => (
        <Button
          key={link.name}
          className="game-link"
          href={link.url}
          target="_blank"
          rel="noopener"
        >
          {link.name}
        </Button>
      ))}
    </section>
  );
};
6;
