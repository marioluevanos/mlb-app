import './PlayerProfile.css';

import { Drawer } from 'vaul';
import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import type { GamePlayer } from '@/types';
import { cn } from '@/utils/cn';
import { eventEmitter } from '@/utils/eventEmitter';

type PlayerProfileProps = {};

export const PlayerProfile: FC<PlayerProfileProps> = () => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState<GamePlayer>();

  const onPlayerClick = useCallback((player: GamePlayer) => {
    setPlayer(player);
    setOpen(true);
  }, []);

  const onOpenChange = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    eventEmitter.on('playerclick', onPlayerClick);
  }, [onPlayerClick]);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Title>Player Stats</Drawer.Title>
        <Drawer.Description>Player Stats</Drawer.Description>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <Drawer.Handle className="drawer-handle" />
          <div className="drawer-children">
            {player && <BoxPlayer player={player} />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

type BoxPlayerProps = {
  player?: GamePlayer;
  className?: string;
};

const BoxPlayer: FC<BoxPlayerProps> = (props) => {
  const { className, player } = props;
  const season = player?.season;

  const batting = [
    { label: 'AB', value: season?.batting?.atBats },
    { label: 'R', value: season?.batting?.runs },
    { label: 'H', value: season?.batting?.hits },
    { label: '2B', value: season?.batting?.doubles },
    { label: '3B', value: season?.batting?.triples },
    { label: 'HR', value: season?.batting?.homeRuns },
    { label: 'RBI', value: season?.batting?.rbi },
    { label: 'BB', value: season?.batting?.baseOnBalls },
    { label: 'SO', value: season?.batting?.strikeOuts },
    { label: 'AVG', value: season?.batting?.avg?.slice(0, 4) },
    { label: 'OPS', value: season?.batting?.ops?.slice(0, 4) },
  ];

  const pitching = [
    { label: 'G', value: season?.pitching?.gamesPlayed },
    { label: 'W', value: season?.pitching?.wins },
    { label: 'L', value: season?.pitching?.losses },
    { label: 'ERA', value: season?.pitching?.era?.slice(0, 4) },
    { label: 'IP', value: season?.pitching?.inningsPitched },
    { label: 'H', value: season?.pitching?.hits },
    { label: 'BB', value: season?.pitching?.baseOnBalls },
    { label: 'R', value: season?.pitching?.runs },
    { label: 'ER', value: season?.pitching?.earnedRuns },
    { label: 'SO', value: season?.pitching?.strikeOuts },
    { label: 'WHIP', value: season?.pitching?.whip?.slice(0, 4) },
  ];

  return (
    player && (
      <div
        className={cn('player-profile', className)}
        data-player-id={player.id}
      >
        <header>
          <img src={player.avatar} />
          <div className="text">
            <h3>{player.fullName}</h3>
            <p>Position: {player.position}</p>
            <p>#{player.jerseyNumber}</p>
          </div>
        </header>

        {player.position !== 'P' && (
          <section className="player-profile-section">
            <h3>Season Batting</h3>
            <div key={player.id} className={cn('player-profile-row')}>
              {batting.map((stat, idx) => (
                <span className="player-profile-stats" key={idx}>
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {player.position === 'P' && (
          <section className="player-profile-section">
            <h3>Season Pitching</h3>
            <div key={player.id} className={cn('player-profile-row')}>
              {pitching.map((stat, idx) => (
                <span className="player-profile-stats" key={idx}>
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  );
};
