import './BoxScore.css';
import { Fragment, useMemo, useState } from 'react';
import { Button } from '../ui/Button/Button';
import type { GamePlayer, GameStatus, TeamClub } from '@/types';
import type { BaseSyntheticEvent, FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { toKebabCase } from '@/utils/toKebabCase';
import { cssVars } from '@/utils/cssVars';
import { parseStatus } from '@/utils/mlb';

export type BoxScoreProps = {
  home: TeamClub;
  away: TeamClub;
  className?: string;
  winner?: 'home' | 'away';
  status?: GameStatus;
  matchup?: {
    batterId?: number;
    pitcherId?: number;
  };
  currentInning?: string;
  onPlayerClick?: BoxPlayersProps['onPlayerClick'];
};

export const BoxScore: FC<BoxScoreProps> = (props) => {
  const { home, away, winner, status, matchup, onPlayerClick } = props;
  const [activeTab, setActiveTab] = useState<number>(0);
  const hasData = (
    type: 'batting' | 'pitching',
    players: Array<GamePlayer> = [],
  ) =>
    players.some((p) => p.game && Object.values(p.game[type] || {}).length > 0);
  const hasAwayBatting = hasData('batting', away.players);
  const hasAwayPitching = hasData('pitching', away.players);
  const hasHomeBatting = hasData('batting', home.players);
  const hasHomePitching = hasData('pitching', home.players);
  const { isFinal } = parseStatus(status);
  const boxTabs = [];
  const awayWin = winner === 'away';
  const homeWin = winner === 'home';
  const isAwayStats = activeTab === 0 && (hasAwayBatting || hasAwayPitching);
  const isHomeStats = activeTab === 1 && (hasHomeBatting || hasHomePitching);

  if (hasAwayBatting || hasAwayPitching) {
    boxTabs.push(
      <>
        <span className="label">{away.abbreviation} (Away)</span>
        {isFinal && (
          <span className={cn(awayWin ? 'win' : 'loss')}>
            {awayWin ? 'W' : 'L'} {away.record.wins}&ndash;{away.record.losses}
          </span>
        )}
      </>,
    );
  }

  if (hasHomeBatting || hasHomePitching) {
    boxTabs.push(
      <>
        <span className="label">{home.abbreviation} (Home)</span>

        {isFinal && (
          <span className={cn(homeWin ? 'win' : 'loss')}>
            {homeWin ? 'W' : 'L'} {home.record.wins}&ndash;{home.record.losses}
          </span>
        )}
      </>,
    );
  }

  return (
    <section className="box-score">
      {boxTabs.length > 0 ? (
        <div className="box-score-actions">
          {boxTabs.map((t, i) => (
            <Button
              className={cn(i === activeTab && 'active')}
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
        {hasAwayBatting && (
          <BoxPlayers
            onPlayerClick={onPlayerClick}
            className={cn(isFinal && 'final', isAwayStats && 'active')}
            title={`Batting`}
            players={away.players}
            position="Batting"
            key={`batting-away-${away.abbreviation}`}
            matchup={matchup}
          />
        )}
        {hasAwayPitching && (
          <BoxPlayers
            onPlayerClick={onPlayerClick}
            className={cn(isFinal && 'final', isAwayStats && 'active')}
            title={`Pitching`}
            players={away.players}
            position="Pitching"
            key={`pitching-away-${away.abbreviation}`}
            matchup={matchup}
          />
        )}
        {hasHomeBatting && (
          <BoxPlayers
            onPlayerClick={onPlayerClick}
            className={cn(isFinal && 'final', isHomeStats && 'active')}
            title={`Batting`}
            players={home.players}
            position="Batting"
            key={`batting-home-${home.abbreviation}`}
            matchup={matchup}
          />
        )}
        {hasHomePitching && (
          <BoxPlayers
            onPlayerClick={onPlayerClick}
            className={cn(isFinal && 'final', isHomeStats && 'active')}
            title={`Pitching`}
            players={home.players}
            position="Pitching"
            key={`pitching-home-${home.abbreviation}`}
            matchup={matchup}
          />
        )}
      </div>
    </section>
  );
};

type BoxPlayersProps = {
  title?: string;
  players?: Array<GamePlayer>;
  className?: string;
  position: 'Batting' | 'Pitching' | 'Fielding';
  header?: ReactNode;
  matchup?: BoxScoreProps['matchup'];
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
   * Get Batters or Pitchers
   */
  const currentPlayers = useMemo(() => {
    return position === 'Batting'
      ? getBattingOrder(players)
      : getPitchingOrder(players);
  }, [position, players]);

  /**
   * Modified player name
   */
  const firstName = (name: string = '') => {
    const [last, first] = name.split(' ').reverse();
    return `${first.charAt(0)}. ${last}`;
  };

  /**
   * Pinch hitter class
   */
  const ph = (bo?: number | string) => (Number(bo) % 100 > 0 ? 'ph' : '');

  /**
   * Get longest name to set column width
   */
  const longestName = currentPlayers.reduce<string>((acc, player) => {
    const name = firstName(player.fullName);
    if (acc.length < name.length) {
      acc = name;
    }
    return acc;
  }, '');

  return currentPlayers.length > 0 ? (
    <section
      className={cn('box-players', className)}
      style={cssVars({
        '--max': longestName.length,
      })}
    >
      {header}
      <div className="box-players-data">
        <div className="box-player-names">
          <div className="box-heading-labels">
            <span className="box-name">{title}</span>
          </div>
          {currentPlayers.map((player, index) => (
            <span
              className={cn(
                'box-name',
                matchup?.batterId === player.id && 'active',
                matchup?.pitcherId === player.id && 'active',
                ph(player.battingOrder),
              )}
              data-pos={player.position}
              key={`${player.id}-${index}`}
            >
              {firstName(player.fullName)}
            </span>
          ))}
        </div>
        <div className={cn('box-player-stats', toKebabCase(position))}>
          <BoxScorePlayers
            key="box-score-players"
            currentPlayers={currentPlayers}
            position={position}
            onPlayerClick={onPlayerClick}
            matchup={matchup}
          />
        </div>
      </div>
    </section>
  ) : null;
};

const BoxScorePlayers: FC<
  Pick<BoxPlayersProps, 'position' | 'onPlayerClick' | 'matchup'> & {
    currentPlayers: Array<GamePlayer>;
  }
> = (props) => {
  const { position, onPlayerClick, matchup, currentPlayers } = props;

  return [
    <Fragment key={position}>
      {position === 'Batting' ? (
        <div className="box-stats box-heading-labels">
          <span>AB</span>
          <span>R</span>
          <span>H</span>
          <span>RBI</span>
          <span>BB</span>
          <span>K</span>
          <span className="season">AVG</span>
          <span className="season">OPS</span>
          <span className="season">SB</span>
        </div>
      ) : position === 'Pitching' ? (
        <div className="box-stats box-heading-labels">
          <span>IP</span>
          <span>H</span>
          <span>R</span>
          <span>ER</span>
          <span>BB</span>
          <span>K</span>
          <span className="season">ERA</span>
          <span className="season">WHIP</span>
          <span className="season">W</span>
          <span className="season">L</span>
        </div>
      ) : null}
    </Fragment>,
    currentPlayers.map((player, index) => (
      <div
        key={`${player.id}-${index}`}
        data-player-id={player.id}
        onClick={onPlayerClick}
        className={cn(
          'box-stats',
          matchup?.batterId === player.id && 'active',
          matchup?.pitcherId === player.id && 'active',
          position.toLowerCase(),
        )}
      >
        {player.game &&
          (position === 'Batting' ? (
            <>
              <span>{player.game.batting?.atBats}</span>
              <span>{player.game.batting?.runs}</span>
              <span>{player.game.batting?.hits}</span>
              <span>{player.game.batting?.rbi}</span>
              <span>{player.game.batting?.baseOnBalls}</span>
              <span>{player.game.batting?.strikeOuts}</span>
              <span className="season">
                {player.season?.batting?.avg?.slice(0, 4)}
              </span>
              <span className="season">
                {player.season?.batting?.ops?.slice(0, 4)}
              </span>
              <span className="season">
                {player.season?.batting?.stolenBases}
              </span>
            </>
          ) : (
            <>
              <span>{player.game.pitching?.inningsPitched}</span>
              <span>{player.game.pitching?.hits}</span>
              <span>{player.game.pitching?.runs}</span>
              <span>{player.game.pitching?.earnedRuns}</span>
              <span>{player.game.pitching?.baseOnBalls}</span>
              <span>{player.game.pitching?.strikeOuts}</span>
              <span className="season">{player.season?.pitching?.era}</span>
              <span className="season">{player.season?.pitching?.whip}</span>
              <span className="season">{player.season?.pitching?.wins}</span>
              <span className="season">{player.season?.pitching?.losses}</span>
            </>
          ))}
      </div>
    )),
  ];
};

/**
 * Get the batting order
 */
function getBattingOrder(players: Array<GamePlayer>) {
  return players
    .reduce<Array<GamePlayer>>((acc, p) => {
      if (typeof p.battingOrder === 'number') {
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
}

/**
 * Get the pitching order
 */
function getPitchingOrder(players: Array<GamePlayer>) {
  return players.reduce<Array<GamePlayer>>((acc, p) => {
    if (p.position === 'P' && Object.values(p.game?.pitching || {}).length) {
      acc.unshift(p);
    }
    return acc;
  }, []);
}
