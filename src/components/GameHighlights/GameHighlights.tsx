import './GameHighlights.css';
import { useCallback, useId, useRef, useState } from 'react';
import type { GameHighlight } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cssVars } from '@/utils/cssVars';
import { cn } from '@/utils/cn';

type GameHighlightsProps = {
  highlights?: Array<GameHighlight>;
  title?: string;
};

export const GameHighlights: FC<GameHighlightsProps> = (props) => {
  const { title, highlights = [] } = props;
  const id = useId();
  const [media, setMedia] = useState<GameHighlight>(highlights[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * Play video
   */
  const playVideo = useCallback(async () => {
    try {
      if (videoRef?.current) {
        await videoRef.current.play();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**
   * Highlight click handler
   */
  const onHighlightClick = useCallback(
    (highlight: GameHighlight, event: BaseSyntheticEvent) => {
      event.preventDefault();
      setMedia(highlight);
      requestAnimationFrame(playVideo);
    },
    [playVideo],
  );

  return !media ? null : (
    <section className="game-highlight">
      {title && (
        <h3>
          {title} <span>({highlights.length})</span>
        </h3>
      )}
      <div className="current-game-highlight">
        <video
          ref={videoRef}
          poster={media.placeholder?.lg?.src}
          controls
          src={media.video.url}
        ></video>
        <h4>{media.title}</h4>
        {media.description && <p>{media.description}</p>}
      </div>
      <div
        className="game-highlights vertical"
        style={cssVars({
          '--highlights-total': highlights?.length || 0,
        })}
      >
        {highlights?.map((highlight, i) => (
          <figure className="game-highlight-item" key={id + i}>
            <button
              className={cn(
                'game-highlight-btn',
                highlight.title === media.title && 'active',
              )}
              title={highlight.title}
              onClick={onHighlightClick.bind(null, highlight)}
            >
              {highlight.title}
            </button>
            {highlight.placeholder.sm?.src ? (
              <img
                src={highlight.placeholder.sm.src}
                width={highlight.placeholder.sm.width}
                height={highlight.placeholder.sm.height}
              />
            ) : (
              <div id="game-placeholder-box"></div>
            )}
            <figcaption className="caption">
              <span className="title">{highlight.title}</span>
              <span className="duration">{highlight.duration}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
