import React from 'react';

import { CloseIcon } from '../../icons';
import { cn } from '../../utils';

type DismissableChipButtonProps = React.ComponentPropsWithRef<'button'>;

export const DismissableChipButton = ({
  className,
  children,
  ...props
}: DismissableChipButtonProps) => {
  return (
    <button
      className={cn(
        'flex justify-center items-center h-[33px] rounded-full border border-primary-pink text-primary-pink gap-[6px] pl-3 pr-2 text-[14px] font-medium cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
      <CloseIcon className='size-4' />
    </button>
  );
};
