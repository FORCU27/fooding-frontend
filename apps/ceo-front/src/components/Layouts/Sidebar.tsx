import { cn } from '@repo/design-system/utils';

import { Navigation } from './Navigation';

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 w-sidebar-width bg-white overflow-y-auto scrollbar-hide',
        className,
      )}
    >
      <Navigation className='mt-header-height' />
    </aside>
  );
};
