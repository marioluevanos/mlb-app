import './CurrentInning.css';

import { TriangleDown, TriangleUp } from '../ui/Icon';
import type { LiveGame } from '@/types';
import type { FC } from 'react';
import { cn } from '@/utils/cn';

export type CurrentInningProps = {
  className?: string;
  currentInning: LiveGame['currentInning'];
};

export const CurrentInning: FC<CurrentInningProps> = (props) => {
  const { currentInning = '', className } = props;
  const [pos, inning] = currentInning.split(' ');

  return (
    <span className={cn('current-inning', className)}>
      {pos === 'TOP' ? <TriangleUp /> : <TriangleDown />}
      {inning}
    </span>
  );
};
