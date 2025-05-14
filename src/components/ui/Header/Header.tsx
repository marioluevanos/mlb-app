"use client";

import "./Header.css";
import Image from "next/image";
import { BaseSyntheticEvent, FC, useCallback } from "react";
import { LeftIcon, RightIcon } from "../Icon";
import { Button } from "../Button/Button";
import { useMLB } from "@/components/ui/MLBProvider";
import { DateNavigator, getLocalDate, toLegibleDate } from "@/utils/date";

const dateNavigator = new DateNavigator();

export const Header: FC = () => {
  const { date, setDate } = useMLB();

  /**
   * Handle logo click
   */
  const onLogoClick = useCallback((event: BaseSyntheticEvent) => {
    event.preventDefault();
    //
  }, []);

  /**
   * Previous Day click
   */
  const onPrevDayClick = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      dateNavigator.goBackOneDay();
      setDate(dateNavigator.getCurrentDate().toISOString());
    },
    [setDate]
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
    [setDate]
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
    [setDate]
  );

  return (
    <header id="header">
      <h1 onClick={onLogoClick}>
        <Image
          priority
          className="logo"
          width={256}
          height={256}
          src="/icon.png"
          alt="logo"
        />
        MLB
      </h1>
      <nav className="header-nav">
        <Button title="Previous date" onClick={onPrevDayClick}>
          <LeftIcon />
        </Button>
        <Button
          title={dateNavigator.getCurrentDate().toISOString()}
          onClick={onTodayClick}
        >
          {toLegibleDate(date)}
        </Button>
        <Button title="Next date" onClick={onNextDayClick}>
          <RightIcon />
        </Button>
      </nav>
    </header>
  );
};
