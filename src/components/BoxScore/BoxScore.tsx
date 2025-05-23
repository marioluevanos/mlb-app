import './BoxScore.css';
import { Fragment } from 'react';
import { Tabs } from '../ui/Tabs/Tabs';
import { BoxPlayers } from './BoxPlayers';
import type { GameStatus, TeamClub } from '@/types';
import type { BaseSyntheticEvent, FC } from 'react';
import { cn } from '@/utils/cn';
import { getPlayerFirstName, parseStatus } from '@/utils/mlb';
import { cssVars } from '@/utils/cssVars';

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
  onPlayerClick?: (event: BaseSyntheticEvent) => void;
};

export const BoxScore: FC<BoxScoreProps> = (props) => {
  const { home, away, status, matchup, onPlayerClick } = props;
  const { isFinal, isPre } = parseStatus(status);
  const splits = isPre ? 'Season' : 'Game';

  /**
   * Get longest name to set column width
   */
  const longestName = [
    ...(away.players || []),
    ...(home.players || []),
  ].reduce<string>((acc, player) => {
    const name = getPlayerFirstName(player.fullName);
    if (acc.length < name.length) {
      acc = name;
    }
    return acc;
  }, '');

  return (
    <Tabs
      className="box-score"
      style={cssVars({ '--max-name': longestName.length })}
      tabs={[<>{away.name}</>, <>{home.name}</>]}
    >
      <Fragment key="away">
        <BoxPlayers
          splits={splits}
          onPlayerClick={onPlayerClick}
          className={cn(isFinal && 'final')}
          title={`${away.abbreviation} ${splits} Batting`}
          players={away.players}
          statType="Batting"
          key={`batting-away-${away.abbreviation}`}
          matchup={matchup}
        />
        <BoxPlayers
          splits={splits}
          onPlayerClick={onPlayerClick}
          className={cn(isFinal && 'final')}
          title={`${away.abbreviation} ${splits} Pitching`}
          players={away.players}
          statType="Pitching"
          key={`pitching-away-${away.abbreviation}`}
          matchup={matchup}
        />
      </Fragment>
      <Fragment key="home">
        <BoxPlayers
          splits={splits}
          onPlayerClick={onPlayerClick}
          className={cn(isFinal && 'final')}
          title={`${home.abbreviation} ${splits} Batting`}
          players={home.players}
          statType="Batting"
          key={`batting-home-${home.abbreviation}`}
          matchup={matchup}
        />
        <BoxPlayers
          splits={splits}
          onPlayerClick={onPlayerClick}
          className={cn(isFinal && 'final')}
          title={`${home.abbreviation} ${splits} Pitching`}
          players={home.players}
          statType="Pitching"
          key={`pitching-home-${home.abbreviation}`}
          matchup={matchup}
        />
      </Fragment>
    </Tabs>
  );
};
