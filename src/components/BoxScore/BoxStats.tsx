import { Fragment } from 'react';
import type { FC } from 'react';
import type { BoxPlayersProps } from './BoxPlayers';
import type { GamePlayer } from '@/types';
import { cn } from '@/utils/cn';

export const BoxStats: FC<
  Pick<BoxPlayersProps, 'splits' | 'statType' | 'onPlayerClick' | 'matchup'> & {
    currentPlayers: Array<GamePlayer>;
  }
> = (props) => {
  const { statType, splits, onPlayerClick, matchup, currentPlayers } = props;
  const statKey: keyof GamePlayer = splits === 'Game' ? 'game' : 'season';

  return [
    <Fragment key={statType}>
      {statType === 'Batting' ? (
        <div className="box-stats box-heading-labels">
          <span>AB</span>
          <span>R</span>
          <span>H</span>
          <span>RBI</span>
          <span>BB</span>
          <span>K</span>
          <span className="season">AVG</span>
          <span className="season">OPS</span>
          <span className="season">HR</span>
        </div>
      ) : statType === 'Pitching' ? (
        <div className="box-stats box-heading-labels">
          {statKey === 'season' && <span>G</span>}
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
    currentPlayers.map((player, index) => {
      return (
        <div
          key={`${player.id}-${index}`}
          data-player-id={player.id}
          onClick={onPlayerClick}
          className={cn(
            'box-stats',
            matchup?.batterId === player.id && 'active',
            matchup?.pitcherId === player.id && 'active',
            statType.toLowerCase(),
            statKey,
          )}
        >
          {player[statKey] &&
            (statType === 'Batting' ? (
              <>
                <span>{player[statKey].batting?.atBats}</span>
                <span>{player[statKey].batting?.runs}</span>
                <span>{player[statKey].batting?.hits}</span>
                <span>{player[statKey].batting?.rbi}</span>
                <span>{player[statKey].batting?.baseOnBalls}</span>
                <span>{player[statKey].batting?.strikeOuts}</span>
                <span className="season">
                  {player.season?.batting?.avg?.slice(0, 4)}
                </span>
                <span className="season">
                  {player.season?.batting?.ops?.slice(0, 4)}
                </span>
                <span className="season">
                  {player.season?.batting?.homeRuns}
                </span>
              </>
            ) : (
              <>
                {statKey === 'season' && (
                  <span className="season">
                    {player.season?.pitching?.gamesPlayed}
                  </span>
                )}
                <span>{player[statKey].pitching?.inningsPitched}</span>
                <span>{player[statKey].pitching?.hits}</span>
                <span>{player[statKey].pitching?.runs}</span>
                <span>{player[statKey].pitching?.earnedRuns}</span>
                <span>{player[statKey].pitching?.baseOnBalls}</span>
                <span>{player[statKey].pitching?.strikeOuts}</span>
                <span className="season">{player.season?.pitching?.era}</span>
                <span className="season">{player.season?.pitching?.whip}</span>
                <span className="season">{player.season?.pitching?.wins}</span>
                <span className="season">
                  {player.season?.pitching?.losses}
                </span>
              </>
            ))}
        </div>
      );
    }),
  ];
};
