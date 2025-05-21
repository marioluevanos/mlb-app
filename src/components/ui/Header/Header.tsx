import './Header.css';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { LeftIcon, RightIcon, TvIcon } from '../Icon';
import { Button } from '../Button/Button';
import { useOutsideClick } from '../useOutsideClick';
import type { BaseSyntheticEvent, FC } from 'react';
import { useMLB } from '@/components/ui/MLBProvider';
import { DateNavigator, getLocalDate, toLegibleDate } from '@/utils/date';
import { cn } from '@/utils/cn';
import { GameStreams } from '@/components/GameStreams/GameStreams';
import { parseStatus } from '@/utils/mlb';

const dateNavigator = new DateNavigator();

export const Header: FC = () => {
  const { date, setDate, liveGame } = useMLB();
  const isToday = date.split('T')[0] === getLocalDate();
  const router = useRouter();
  const { location } = useRouterState();
  const isLiveGame = location.pathname.startsWith('/live/');
  const { isFinal } = parseStatus(liveGame?.status);
  const [tvPanelOpen, setTvPanelOpen] = useState(false);

  /**
   * Previous Day click
   */
  const onPrevDayClick = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      dateNavigator.goBackOneDay();
      setDate(dateNavigator.getCurrentDate().toISOString());
    },
    [setDate],
  );

  /**
   * Refresh Day click
   */
  const onTodayClick = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      const localDate = getLocalDate();
      const today = new Date(localDate);
      dateNavigator.setCurrentDay(today);
      setDate(localDate);
    },
    [setDate],
  );

  /**
   * Next Day click
   */
  const onNextDayClick = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      dateNavigator.goForwardOneDay();
      setDate(dateNavigator.getCurrentDate().toISOString());
    },
    [setDate],
  );

  const goHome = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      router.navigate({ href: '/' });
      return false;
    },
    [router],
  );

  /**
   * Handle outside click
   */
  const onOutsideClickRef = useOutsideClick<HTMLDivElement>(() =>
    setTvPanelOpen(false),
  );

  /**
   * When the game stream tv panel is open, add an event listender to close it on scroll
   */
  useEffect(() => {
    if (tvPanelOpen) {
      const onScroll = () => setTvPanelOpen(false);
      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, [tvPanelOpen]);

  return (
    <>
      <header id="header" ref={onOutsideClickRef}>
        <div className="header-inner">
          <h1>
            <button className="logo-button" onClick={goHome}>
              <img
                className="logo"
                width={256}
                height={256}
                src="/icon.png"
                alt="logo"
              />
              MLB
            </button>
          </h1>
          <nav className={cn('header-nav', isLiveGame && 'is-live')}>
            {isLiveGame ? (
              <>
                <span className="date" onClick={goHome}>
                  {toLegibleDate(
                    dateNavigator.getCurrentDate().toISOString(),
                    false,
                  )}
                </span>

                {liveGame?.status && (
                  <span className="status">{liveGame?.status}</span>
                )}

                {!isFinal && liveGame?.streams.length ? (
                  <button
                    className="streams"
                    onClick={() => setTvPanelOpen((prev) => !prev)}
                  >
                    <TvIcon />
                  </button>
                ) : null}
              </>
            ) : (
              <>
                <Button
                  key="Previous"
                  title="Previous date"
                  onClick={onPrevDayClick}
                >
                  <LeftIcon />
                </Button>
                <Button
                  title={dateNavigator.getCurrentDate().toISOString()}
                  onClick={onTodayClick}
                  key="Today"
                  className={cn(isToday && 'is-today', 'current-day')}
                >
                  {isToday ? 'Today' : toLegibleDate(date)}
                </Button>
                <Button key="Next" title="Next date" onClick={onNextDayClick}>
                  <RightIcon />
                </Button>
              </>
            )}
          </nav>
        </div>
        {!isFinal && liveGame?.streams.length ? (
          <GameStreams
            className={cn(tvPanelOpen && 'is-tv-open')}
            streams={liveGame?.streams}
          />
        ) : null}
      </header>
    </>
  );
};
