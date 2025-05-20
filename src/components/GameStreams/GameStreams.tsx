import './GameStreams.css';
import type { GameStream } from '@/types';
import type { FC } from 'react';

type GameStreamsProps = {
  streams?: Array<GameStream>;
};

export const GameStreams: FC<GameStreamsProps> = (props) => {
  const { streams = [] } = props;

  return (
    <section className="game-streams">
      <h3>Game Links</h3>
      {streams?.map((link) => (
        <a
          key={link.name}
          className="game-link"
          href={link.url}
          target="_blank"
          rel="noopener"
        >
          {link.name}
        </a>
      ))}
    </section>
  );
};
