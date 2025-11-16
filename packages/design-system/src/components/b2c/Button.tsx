import React from 'react';

import { Slot } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { MobileProgressDotIcon } from '../../icons';
import { cn } from '../../utils';

const buttonVariants = tv({
  base: cn(
    'inline-flex justify-center items-center font-semibold whitespace-nowrap cursor-pointer',
    'disabled:bg-gray-1 disabled:text-gray-4 disabled:pointer-events-none',
  ),
  variants: {
    variant: {
      primary: 'bg-primary-pink text-white active:bg-pink-button-press',
      gray: 'bg-gray-1 text-black active:bg-[#D4D8DC]',
      outlined: 'border border-gray-3 text-black bg-white active:bg-gray-1',
      loading: 'bg-primary-pink text-white cursor-not-allowed',
    },
    size: {
      small: 'h-[41px] px-4 rounded-[8px] text-sm',
      banner: 'h-[36px] px-3 rounded-[8px] text-sm',
      large: 'w-full h-[56px] rounded-[12px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'large',
  },
});

type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = ({
  className,
  children,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      className={buttonVariants({ variant, size, className })}
      type={asChild ? undefined : 'button'}
      disabled={props.disabled}
      {...props}
    >
      <>
        {variant === 'loading' && <MobileProgressDotIcon className='w-6 h-6' />}
        {variant !== 'loading' && children}
      </>
    </Component>
  );
};
