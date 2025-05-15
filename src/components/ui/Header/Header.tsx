"use client";

import "./Header.css";
import Image from "next/image";
import { BaseSyntheticEvent, FC, useCallback } from "react";
import { LeftIcon, RefreshIcon, RightIcon } from "../Icon";
import { Button } from "../Button/Button";
import { useMLB } from "@/components/ui/MLBProvider";
import { DateNavigator, getLocalDate, toLegibleDate } from "@/utils/date";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dateNavigator = new DateNavigator();

export const Header: FC = () => {
  const { date, setDate } = useMLB();
  const isToday = date.split("T")[0] === getLocalDate();
  const pathname = usePathname();
  const isLiveGame = pathname.startsWith("/live/");

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
      <h1>
        <Link href="/">
          <Image
            priority
            className="logo"
            width={256}
            height={256}
            src="/icon.png"
            alt="logo"
          />
          MLB
        </Link>
      </h1>
      <nav className="header-nav">
        {isLiveGame ? (
          <>
            <Button
              title="Refresh"
              key="Refresh"
              onClick={() => {}}
              className="refresh"
            >
              <RefreshIcon />
            </Button>
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
              className={cn(isToday && "is-today", "current-day")}
            >
              {isToday ? "Today" : toLegibleDate(date)}
            </Button>
            <Button key="Next" title="Next date" onClick={onNextDayClick}>
              <RightIcon />
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};
