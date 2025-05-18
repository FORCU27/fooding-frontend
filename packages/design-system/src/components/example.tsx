import React from 'react';

import { cn } from '../utils/cn';

export const Button = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'button'>) => {
  return (
    <button className={cn('flex items-center', className)} {...props}>
      {children}
    </button>
  );
};
