import { ChevronLeftIcon } from '@repo/design-system/icons';

import { Pop } from '@/libs/stackflow/Pop';
import { cn } from '@/utils/cn';

type HeaderProps = {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
};

export const Header = ({ left, title, right }: HeaderProps) => {
  return (
    <header
      className={cn(
        `h-[60px]`,
        'fixed top-0 left-0 right-0',
        'bg-white/70 backdrop-blur-sm flex items-end',
      )}
    >
      <div
        className={cn(
          `px-grid-margin h-[60px] w-full relative`,
          'flex items-center justify-between',
        )}
      >
        <div>{left}</div>
        <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 subtitle-1'>
          {title}
        </span>
        <div>{right}</div>
      </div>
    </header>
  );
};

const Back = () => {
  return (
    <Pop className='size-8 flex items-center justify-center'>
      <ChevronLeftIcon size={28} />
    </Pop>
  );
};

Header.Back = Back;
