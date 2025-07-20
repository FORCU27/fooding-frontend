import React from 'react';

import { cn } from '../../utils';

type InputProps = React.ComponentPropsWithRef<'input'>;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'h-[74px] px-[10px] border border-gray-3 rounded-[12px] outline-none',
        'text-[20px] text-black font-bold placeholder:text-gray-5 placeholder:font-normal',
        className,
      )}
      {...props}
    />
  );
};
