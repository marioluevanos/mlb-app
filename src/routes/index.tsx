import './index.css';
import { createFileRoute } from '@tanstack/react-router';

import { useCallback, useEffect, useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import type { GamePreview as GamePreviewType } from '@/types';
import type { MLBLive } from '@/types.mlb';
import { cn } from '@/utils/cn';
import {
  DateNavigator,
  formatDateInput,
  getLocalDate,
  toLegibleDate,
} from '@/utils/date';
import { fetchScheduledGames, mapCurrentInning } from '@/utils/mlb';
import { Header } from '@/components/ui/Header/Header';
import { Button } from '@/components/ui/Button/Button';
import { LeftIcon, RightIcon } from '@/components/ui/Icon';
import { GamePreview } from '@/components/GamePreview/GamePreview';

const dateNavigator = new DateNavigator();

export const Route = createFileRoute('/')({
  async loader() {
    const date = getLocalDate();
    const [year, month, day] = formatDateInput(date);
    const gamePreviews = await fetchScheduledGames(year, month, day);

    return {
      gamePreviews: gamePreviews?.games || [],
      date,
    };
  },
  component: function GamePreviews() {
    const data = Route.useLoaderData();
    const [date, setDate] = useState<string>(data.date);
    const isToday = date?.split('T')[0] === getLocalDate();
    const [gamePreviews, setGamePreviews] = useState<Array<GamePreviewType>>(
      data.gamePreviews,
    );
    const gamesInProgress = gamePreviews.map((game) => {
      if (game.status === 'In Progress') {
        return game;
      }
    });

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

    const getGamePreviews = useCallback(async (date: string) => {
      const [year, month, day] = formatDateInput(date);
      const gamePreviews = await fetchScheduledGames(year, month, day);

      if (gamePreviews?.games) {
        setGamePreviews(gamePreviews.games);
      }
    }, []);

    /**
     * Map live game data for preview UI
     */
    const mapLiveGamePreview = useCallback(
      (game: GamePreviewType, live: MLBLive, id: number) => {
        const { linescore, plays } = live.liveData;
        if (game.id === id) {
          game.home.score = linescore.teams.home;
          game.away.score = linescore.teams.away;
          game.currentInning = mapCurrentInning(linescore);
          game.count = plays.currentPlay.count;
          game.runners = {
            first: linescore.offense.first,
            second: linescore.offense.second,
            third: linescore.offense.third,
          };
        }
        return game;
      },
      [],
    );

    /**
     * Fetch and update the game in progress
     */
    const updateGameInProgress = useCallback(
      async (feed: string) => {
        const response = await fetch(feed);
        const live: MLBLive = await response.json();
        const games = gamePreviews || [];
        const updated = games.map((g) => mapLiveGamePreview(g, live, g.id));

        setGamePreviews(updated);
      },
      [mapLiveGamePreview, gamePreviews],
    );

    /**
     * Check if game is in progress and update
     */
    useEffect(() => {
      if (gamesInProgress.length) {
        const intervalIds = gamesInProgress.reduce<Array<number>>(
          (acc, game) => {
            if (game) {
              const intervalId = setInterval(
                updateGameInProgress.bind(null, game.feed),
                15000,
              );
              acc.push(intervalId);
            }
            return acc;
          },
          [],
        );

        return () => intervalIds.forEach((id) => clearInterval(id));
      }
    }, [gamesInProgress, updateGameInProgress]);

    /**
     * Update game previews
     */
    useEffect(() => {
      getGamePreviews(date);
    }, [date, getGamePreviews]);

    return (
      <main>
        <Header
          navChildren={
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
          }
        />
        <section className={cn('game-previews')}>
          {gamePreviews?.map((g) => <GamePreview gamePreview={g} key={g.id} />)}
        </section>
      </main>
    );
  },
});
