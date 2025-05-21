import './Header.css';
import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import type { BaseSyntheticEvent, FC, ReactNode, RefObject } from 'react';

import { cn } from '@/utils/cn';

type HeaderProps = {
  children?: ReactNode;
  navChildren?: ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
};

export const Header: FC<HeaderProps> = (props) => {
  const { children, className, navChildren, ref } = props;
  const router = useRouter();

  const goHome = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      router.navigate({ href: '/' });
      return false;
    },
    [router],
  );

  return (
    <>
      <header id="header" className={cn(className)} ref={ref}>
        <div className="header-inner">
          <h1>
            <button className="logo-button" onClick={goHome}>
              <img
                className="logo"
                width={256}
                height={256}
                src="/icon.png"
                alt="logo"
              />
              MLB
            </button>
          </h1>
          <nav className={cn('header-nav')}>{navChildren}</nav>
        </div>
        {children}
      </header>
    </>
  );
};
