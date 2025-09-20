import { type ComponentProps } from 'react';

import { Slot } from 'radix-ui';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils';

const buttonVariants = tv({
  base: cn(
    'inline-flex items-center justify-center whitespace-nowrap cursor-pointer font-semibold',
    'disabled:pointer-events-none disabled:bg-gray-2 disabled:text-gray-4',
  ),
  variants: {
    variant: {
      primary: 'bg-fooding-purple text-white hover:bg-fooding-purple-press',
      outlined: 'border border-gray-2 bg-white hover:bg-gray-1',
      primaryOutlined:
        'border border-fooding-purple bg-white text-fooding-purple hover:bg-fooding-purple/10',
      primaryPink: 'bg-primary-pink text-white hover:bg-pink-button-press',
      ghost: 'hover:bg-gray-1',
    },
    size: {
      medium: 'min-w-[96px] h-[43px] rounded-[8px] px-5',
      large: 'min-w-[120px] h-[58px] rounded-[12px] px-6 text-[20px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    rounded?: boolean;
  };

const Button = ({
  className,
  children,
  variant,
  size,
  asChild = false,
  rounded = false,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), rounded && 'rounded-full', className)}
      type={asChild ? undefined : 'button'}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Button, buttonVariants };
