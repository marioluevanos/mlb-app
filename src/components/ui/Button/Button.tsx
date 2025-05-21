import type { FC, HTMLAttributes } from 'react';
import './Button.css';
import { cn } from '@/utils/cn';

export interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  href?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

/** Primary UI component for user interaction */
export const Button: FC<ButtonProps> = (props) => {
  const { href, children, className } = props;

  if (href) {
    return (
      <a {...props} href={href} className={cn('button', className)}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} className={cn('button', className)}>
      {children}
    </button>
  );
};
