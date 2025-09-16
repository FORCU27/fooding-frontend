import { AppScreen } from '@stackflow/plugin-basic-ui';

import { cn } from '@/utils/cn';

type ScreenProps = React.ComponentPropsWithRef<'main'> & {
  header?: React.ReactNode;
  bottomTab?: React.ReactNode;
};

export const Screen = ({ header, bottomTab, className, children, ...props }: ScreenProps) => {
  return (
    <AppScreen>
      {header}
      <main
        className={cn(
          'flex flex-col overflow-y-auto scrollbar-hide relative',
          header && 'mt-[calc(60px+env(safe-area-inset-top))]',
          !header && 'mt-[env(safe-area-inset-top)]',
          header && !bottomTab && 'h-[calc(100dvh-60px-env(safe-area-inset-top))]',
          header && bottomTab && 'h-[calc(100dvh-124px-env(safe-area-inset-top))]',
          !header && bottomTab && 'h-[calc(100dvh-64px-env(safe-area-inset-bottom))]',
          !header &&
            !bottomTab &&
            `h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]`,
          className,
        )}
        {...props}
      >
        {children}
      </main>
      {bottomTab}
    </AppScreen>
  );
};
