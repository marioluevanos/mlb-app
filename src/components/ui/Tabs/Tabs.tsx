import './Tabs.css';
import { cn } from '@/utils/cn';
import { FC, Fragment, ReactNode, useState } from 'react';

export type TabsProps = {
  className?: string;
  children?: ReactNode[];
  tabs?: ReactNode[];
};

export const Tabs: FC<TabsProps> = (props) => {
  const { className, children, tabs = [] } = props;
  const [activeTab, setActiveTab] = useState<number>(0);

  return tabs?.length > 0 ? (
    <section className={cn('tabs', className)}>
      <div className="tabs-actions">
        {tabs?.map((t, i) => (
          <button
            className={cn('button', i === activeTab && 'active')}
            key={i}
            onClick={() => {
              setActiveTab(i);
            }}
          >
            {t}
          </button>
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
