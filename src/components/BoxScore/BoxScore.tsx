import { GamePlayer, GameStatus, TeamClub } from "@/types";
import "./BoxScore.css";
import {
  BaseSyntheticEvent,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { cn } from "@/utils/cn";
import { Button } from "../ui/Button/Button";

export type BoxScoreProps = {
  home: TeamClub;
  away: TeamClub;
  className?: string;
  winner?: "home" | "away";
  status?: GameStatus;
  matchup?: {
    batterId?: number;
    pitcherId?: number;
  };
  currentInning?: string;
  onPlayerClick?: BoxPlayersProps["onPlayerClick"];
};

export const BoxScore: FC<BoxScoreProps> = (props) => {
  const { home, away, winner, status, matchup, onPlayerClick } = props;
  const [activeTab, setActiveTab] = useState<number>(0);
  const hasData = (type: "batting" | "pitching", players: GamePlayer[] = []) =>
    players.some((p) => p.game && Object.values(p.game[type] || {}).length > 0);
  const hasAwayBatting = hasData("batting", away.players);
  const hasAwayPitching = hasData("pitching", away.players);
  const hasHomeBatting = hasData("batting", home.players);
  const hasHomePitching = hasData("pitching", home.players);
  const isFinal = status === "Final" || status === "Game Over";
  const boxTabs = [];
  const awayWin = winner === "away";
  const homeWin = winner === "home";

  if (hasAwayBatting || hasAwayPitching) {
    boxTabs.push(
      <>
        <span className="label">{away.abbreviation} (Away)</span>

        {isFinal && (
          <span className={cn(awayWin ? "win" : "loss")}>
            {awayWin ? "W" : "L"} {away.record.wins}&ndash;{away.record.losses}
          </span>
        )}
      </>
    );
  }

  if (hasHomeBatting || hasHomePitching) {
    boxTabs.push(
      <>
        <span className="label">{home.abbreviation} (Home)</span>

        {isFinal && (
          <span className={cn(homeWin ? "win" : "loss")}>
            {homeWin ? "W" : "L"} {home.record.wins}&ndash;{home.record.losses}
          </span>
        )}
      </>
    );
  }

  return (
    <section className={cn("box-score tabs")}>
      {boxTabs.length > 0 ? (
        <div className="box-score-actions">
          {boxTabs?.map((t, i) => (
            <Button
              className={cn(i === activeTab && "active")}
              key={i}
              onClick={() => {
                setActiveTab(i);
              }}
            >
              {t}
            </Button>
          ))}
        </div>
      ) : null}
      <div className="box-score-content">
        {activeTab === 0 && (hasAwayBatting || hasAwayPitching) && (
          <div>
            {hasAwayBatting && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Batting (${away.abbreviation})`}
                players={away.players}
                position="Batting"
                key="batting-away"
                matchup={matchup}
              />
            )}
            {hasAwayPitching && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Pitching (${away.abbreviation})`}
                players={away.players}
                position="Pitching"
                key="pitching-away"
                matchup={matchup}
              />
            )}
          </div>
        )}
        {activeTab === 1 && (hasHomeBatting || hasHomePitching) && (
          <div>
            {hasHomeBatting && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Batting (${home.abbreviation})`}
                players={home.players}
                position="Batting"
                key="batting-home"
                matchup={matchup}
              />
            )}
            {hasHomePitching && (
              <BoxPlayers
                onPlayerClick={onPlayerClick}
                className={cn(isFinal && "final")}
                title={`Pitching (${home.abbreviation})`}
                players={home.players}
                position="Pitching"
                key="pitching-home"
                matchup={matchup}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

type BoxPlayersProps = {
  title?: string;
  players?: GamePlayer[];
  className?: string;
  position: "Batting" | "Pitching";
  header?: ReactNode;
  matchup?: BoxScoreProps["matchup"];
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

const BoxPlayers: FC<BoxPlayersProps> = (props) => {
  const {
    matchup,
    header,
    className,
    players = [],
    title,
    position,
    onPlayerClick,
  } = props;

  /**
   * Modified player name
   */
  const firstName = (name: string = "") => {
    const [last, f] = name?.split(" ").reverse();
    return `${f.charAt(0)}. ${last}`;
  };

  /**
   * Get the batting order
   */
  const getBattingOrder = useCallback((players: GamePlayer[]) => {
    return players
      .reduce<GamePlayer[]>((acc, p) => {
        if (typeof p.battingOrder === "number") {
          acc.push(p);
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (Number(a.battingOrder) > Number(b.battingOrder)) {
          return 1;
        }
        if (Number(a.battingOrder) < Number(b.battingOrder)) {
          return -1;
        }
        return 0;
      });
  }, []);

  /**
   * Get the pitching order
   */
  const getPitchingOrder = useCallback((players: GamePlayer[]) => {
    return players.reduce<GamePlayer[]>((acc, p) => {
      if (p.position === "P" && Object.values(p.game?.pitching || {}).length) {
        acc.unshift(p);
      }
      return acc;
    }, []);
  }, []);

  /**
   * Pinch hitter class
   */
  const ph = (bo?: number | string) => (Number(bo) % 100 > 0 ? "ph" : "");

  /**
   * Get Batters or Pitchers
   */
  const currentPlayers = useMemo(() => {
    return position === "Batting"
      ? getBattingOrder(players)
      : getPitchingOrder(players);
  }, [position, players, getBattingOrder, getPitchingOrder]);

  return players.length > 0 ? (
    <div className={cn("box-players", className)}>
      {header}
      <div className={cn("box-row labels", position.toLowerCase())}>
        <span className="box-name">{title}</span>
        {position === "Batting" ? (
          <span className="box-stats">
            <span>AB</span>
            <span>R</span>
            <span>H</span>
            <span>RBI</span>
            <span>BB</span>
            <span>SO</span>
            <span>AVG</span>
            <span>OPS</span>
          </span>
        ) : (
          <span className="box-stats">
            <span>IP</span>
            <span>H</span>
            <span>R</span>
            <span>ER</span>
            <span>BB</span>
            <span>SO</span>
            <span>ERA</span>
            <span>WHIP</span>
          </span>
        )}
      </div>
      {currentPlayers.map((player) => (
        <div
          key={player.id}
          data-player-id={player.id}
          onClick={onPlayerClick}
          className={cn(
            "box-row players",
            matchup?.batterId === player.id && "active",
            matchup?.pitcherId === player.id && "active",
            position.toLowerCase(),
            ph(player.battingOrder)
          )}
        >
          <span className="box-name" data-pos={player.position}>
            {firstName(player.fullName)}
          </span>
          {player.game &&
            (position === "Batting" ? (
              <span className="box-stats">
                <span>{player.game.batting?.atBats}</span>
                <span>{player.game.batting?.runs}</span>
                <span>{player.game.batting?.hits}</span>
                <span>{player.game.batting?.rbi}</span>
                <span>{player.game.batting?.baseOnBalls}</span>
                <span>{player.game.batting?.strikeOuts}</span>
                <span>{player.season?.batting?.avg?.slice(0, 4)}</span>
                <span>{player.season?.batting?.ops?.slice(0, 4)}</span>
              </span>
            ) : (
              <span className="box-stats">
                <span>{player.game.pitching?.inningsPitched}</span>
                <span>{player.game.pitching?.hits}</span>
                <span>{player.game.pitching?.runs}</span>
                <span>{player.game.pitching?.earnedRuns}</span>
                <span>{player.game.pitching?.baseOnBalls}</span>
                <span>{player.game.pitching?.strikeOuts}</span>
                <span>{player.season?.pitching?.era}</span>
                <span>{player.season?.pitching?.whip}</span>
              </span>
            ))}
        </div>
      ))}
    </div>
  ) : null;
};
