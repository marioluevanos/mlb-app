import React, { FC, HTMLAttributes } from 'react';
import './Button.css';
import { cn } from '@/utils/cn';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
}

/** Primary UI component for user interaction */
export const Button: FC<ButtonProps> = (props) => {
  const { children, className } = props;
  return (
    <button {...props} className={cn('button', className)}>
      {children}
    </button>
  );
};
