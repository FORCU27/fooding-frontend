'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Plus } from 'lucide-react';

import { cn } from '../../utils/cn';

type MenuButtonProps = ComponentProps<'button'> & {
  icon?: ReactNode;
  children: ReactNode;
};

export const MenuButton = ({
  icon = <Plus className='h-5 w-5' />,
  children,
  className,
  ...props
}: MenuButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2',
        'border-1 border-fooding-purple rounded-[50px]',
        'text-fooding-purple font-medium',
        'hover:bg-fooding-purple hover:text-white',
        'transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};
