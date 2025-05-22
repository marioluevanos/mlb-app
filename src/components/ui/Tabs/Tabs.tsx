import './Tabs.css';
import { Fragment, useCallback, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import type { BaseSyntheticEvent, FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type TabsProps = {
  className?: string;
  children?: Array<ReactNode>;
  tabs?: Array<ReactNode>;
};

export const Tabs: FC<TabsProps> = (props) => {
  const { className, children, tabs = [] } = props;
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabsContentRef = useRef<HTMLDivElement>(null);

  /**
   * Set active tab and scroll to top of content
   */
  const onTabClick = useCallback((i: number, event: BaseSyntheticEvent) => {
    setActiveTab(i);
    const parent = event.target.parentElement?.parentElement;
    if (parent) {
      window.scrollTo({ top: parent.offsetTop + 1, behavior: 'smooth' });
    }
  }, []);

  return tabs?.length > 0 ? (
    <section className={cn('tabs', className)}>
      <div className="tabs-actions">
        {tabs?.map((tab, i) => (
          <Button
            className={cn(i === activeTab && 'active')}
            key={i}
            onClick={onTabClick.bind(null, i)}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className="tabs-content" ref={tabsContentRef}>
        {children
          ?.filter((_, i) => i === activeTab)
          .map((c, i) => <Fragment key={i}>{c}</Fragment>)}
      </div>
    </section>
  ) : null;
};
