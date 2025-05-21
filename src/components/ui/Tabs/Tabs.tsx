import './Tabs.css';
import { Fragment, useState } from 'react';
import { Button } from '../Button/Button';
import type { FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type TabsProps = {
  className?: string;
  children?: Array<ReactNode>;
  tabs?: Array<ReactNode>;
};

export const Tabs: FC<TabsProps> = (props) => {
  const { className, children, tabs = [] } = props;
  const [activeTab, setActiveTab] = useState<number>(0);

  return tabs?.length > 0 ? (
    <section className={cn('tabs', className)}>
      <div className="tabs-actions">
        {tabs?.map((t, i) => (
          <Button
            className={cn('button', i === activeTab && 'active')}
            key={i}
            onClick={() => {
              setActiveTab(i);
            }}
          >
            {t}
          </Button>
        ))}
      </div>
      <div className="tabs-content">
        {children
          ?.filter((_, i) => i === activeTab)
          .map((c, i) => <Fragment key={i}>{c}</Fragment>)}
      </div>
    </section>
  ) : null;
};
