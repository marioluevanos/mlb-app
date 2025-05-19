import './Team.css';
import type { FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type TeamProps = {
  className?: string;
  children?: ReactNode;
  team: {
    name: string;
    logo: string;
    id: number;
  };
};

export const Team: FC<TeamProps> = (props) => {
  const { team, className, children } = props;

  return (
    <div className={cn('team', className)} data-team-id={team.id}>
      <span className="team-logo">
        {team.logo && (
          <img src={team.logo} width={32} height={32} alt={team.name} />
        )}
      </span>
      <span className="team-name">{team.name}</span>
      {children}
    </div>
  );
};
