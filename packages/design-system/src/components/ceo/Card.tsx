import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

type CardProps = {
  children?: ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-[20px] bg-white pt-[32px] pb-[40px] px-[32px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Card };
