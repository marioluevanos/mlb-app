import "./Header.css";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { BaseSyntheticEvent, FC, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { RefreshIcon } from "../Icon";
import { Button } from "../Button/Button";

export const Header: FC<{
  children?: ReactNode;
  className?: string;
  onLogoClick?: (event: BaseSyntheticEvent) => void;
}> & { Nav: FC<HeaderNavProps> } = (props) => {
  const { className, children, onLogoClick } = props;

  return (
    <header id="header" className={className}>
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
      {children}
    </header>
  );
};

type HeaderNavProps = {
  isLoading?: boolean;
  date?: string;
  onRefresh?: (event: BaseSyntheticEvent) => void;
};

const Nav: FC<HeaderNavProps> = (props) => {
  const { isLoading, onRefresh, date } = props;
  const [day, today] = date ? formatDate(date).split(",") : [];

  return (
    <nav className="ctas">
      {day && today && (
        <span className="today">
          {day}, {today}
        </span>
      )}
      {/* <button
      id="previous-date"
      className={cn("button", isLoading && "loading")}
      title="Previous date"
      onClick={onRefresh}
      data-day={previousDay(data.date)}
    >
      <LeftIcon />
    </button> */}
      <Button
        id="refresh"
        className={cn("button", isLoading && "loading")}
        title="Refresh content"
        onClick={onRefresh}
        data-date={date}
      >
        <RefreshIcon />
      </Button>
      {/* <button
      id="next-date"
      className={cn("button", isLoading && "loading")}
      title="Next date"
      onClick={onRefresh}
      data-day={nextDay(data.date)}
    >
      <RightIcon />
    </button> */}
    </nav>
  );
};

Header.Nav = Nav;
