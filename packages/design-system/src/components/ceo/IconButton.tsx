import { forwardRef, ReactNode, type ComponentProps } from 'react';

import { PlusIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils';

const baseIconButtonClass = cn(
  'inline-flex justify-center items-center h-[38px]',
  'cursor-pointer rounded-full',
  'px-4 gap-2',
  'body-2',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);

const iconButtonVariants = tv({
  base: baseIconButtonClass,
  variants: {
    variant: {
      primary: 'text-fooding-purple hover:bg-fooding-purple/10 border border-fooding-purple',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type IconButtonProps = ComponentProps<'button'> &
  VariantProps<typeof iconButtonVariants> & {
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
  };

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, variant, icon, iconPosition = 'left', ...props }, ref) => {
    const iconElement = icon ?? <PlusIcon className='size-5' />;

    return (
      <button
        ref={ref}
        className={cn(
          iconButtonVariants({ variant, className }),
          iconPosition === 'left' && 'pl-3',
          iconPosition === 'right' && 'pr-3',
          children && 'gap-1',
        )}
        {...props}
      >
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
