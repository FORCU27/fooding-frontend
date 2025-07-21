import { ChevronLeftIcon } from '@repo/design-system/icons';

import { Pop } from '@/libs/stackflow/Pop';

type HeaderProps = {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
};

export const Header = ({ left, title, right, children }: HeaderProps) => {
  return (
    <header className='h-[60px] fixed top-0 left-0 right-0 bg-white flex items-end z-10'>
      <div className='px-3 h-[60px] w-full relative flex items-center justify-between'>
        <div>{left}</div>
        {title && (
          <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 subtitle-1'>
            {title}
          </span>
        )}
        {children && children}
        {right && <div>{right}</div>}
      </div>
    </header>
  );
};

const Back = () => {
  return (
    <Pop className='flex items-center justify-center'>
      <ChevronLeftIcon size={30} />
    </Pop>
  );
};

Header.Back = Back;
