import { type ComponentProps } from 'react';

import { Slot } from 'radix-ui';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils';

const buttonVariants = tv({
  base: cn(
    'min-w-[96px] h-[43px] inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-[8px] font-semibold px-5',
    'disabled:pointer-events-none disabled:bg-gray-2 disabled:text-gray-4',
  ),
  variants: {
    variant: {
      primary: 'bg-fooding-purple text-white hover:bg-fooding-purple-press',
      outlined: 'border border-gray-2 bg-white hover:bg-gray-1',
      primaryOutlined:
        'border border-fooding-purple bg-white text-fooding-purple hover:bg-fooding-purple/10',
      ghost: 'hover:bg-gray-1',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = ({ className, children, variant, asChild = false, ...props }: ButtonProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      className={cn(buttonVariants({ variant }), className)}
      type={asChild ? undefined : 'button'}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Button, buttonVariants };
