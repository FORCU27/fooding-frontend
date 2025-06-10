import { AppScreen } from '@stackflow/plugin-basic-ui';

import { cn } from '@/utils/cn';

type ScreenProps = React.ComponentPropsWithRef<'main'> & {
  header?: React.ReactNode;
  bottomTab?: React.ReactNode;
};

export const Screen = ({ header, bottomTab, className, children }: ScreenProps) => {
  return (
    <AppScreen>
      {header}
      <main
        className={cn(
          header && `mt-[100px]`, // 헤더 60px + Safe Area 40px
          bottomTab && `mb-[88px]`, // 하단 Safe Area 24px + 하단탭 64px
          `h-[calc(100dvh-188px)]`, // 헤더 + 상하단 Safe Area + 하단탭
          'px-grid-margin flex flex-col overflow-y-auto scrollbar-hide',
          className,
        )}
      >
        {children}
      </main>
      {bottomTab}
    </AppScreen>
  );
};
