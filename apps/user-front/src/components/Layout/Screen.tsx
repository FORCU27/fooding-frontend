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
        // TODO: Safe Area 영역 추가
        className={cn(
          'flex flex-col overflow-y-auto scrollbar-hide relative',
          header && `mt-[60px]`, // 헤더 60px + Safe Area Top 40px
          bottomTab && `mb-[64px]`, // 하단탭 64px + 하단 Safe Area Bottom 24px
          header && !bottomTab && 'h-[calc(100dvh-60px)]',
          header && bottomTab && `h-[calc(100dvh-124px)]`,
          !header && bottomTab && `h-[calc(100dvh-64px)]`,
          !header && !bottomTab && `h-dvh`,
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
