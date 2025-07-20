import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

type CeoCardProps = {
  children?: ReactNode;
  className?: string;
};

const CeoCard = ({ children, className }: CeoCardProps) => {
  return (
    <div
      className={cn('rounded-[20px] bg-white pt-[32px] pb-[40px] px-[32px] shadow-sm', className)}
    >
      {children}
    </div>
  );
};

export { CeoCard };
