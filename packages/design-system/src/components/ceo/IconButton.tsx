import { forwardRef, ReactNode, type ComponentProps } from 'react';

import { PlusIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils';

const baseIconButtonClass = cn(
  'inline-flex justify-center items-center',
  'cursor-pointer rounded-full',
  'px-3 py-2 gap-2',
  'body-2',
  'transition-colors',
  'border border-fooding-purple text-fooding-purple hover:bg-fooding-purple hover:text-white active:bg-fooding-purple/90',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);

const iconButtonVariants = tv({
  base: baseIconButtonClass,
  variants: {
    variant: {
      primary: baseIconButtonClass,
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
    const iconElement = icon ?? <PlusIcon className='h-5 w-5' />;

    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, className }), children ? 'gap-1' : '')}
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
