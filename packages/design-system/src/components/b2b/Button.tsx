import React from 'react';

import { Slot } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '../../utils';

const buttonVariants = tv({
  base: cn(
    'inline-flex justify-center items-center font-semibold whitespace-nowrap cursor-pointer',
    'disabled:bg-gray-1 disabled:text-gray-4 disabled:pointer-events-none',
  ),

  variants: {
    area: {
      waiting: '',
      app: '',
      reward: '',
    },
    variant: {
      primary: 'bg-primary-pink text-white active:bg-pink-button-press',
      tertiary: 'border border-gray-3 text-gray-5 bg-white active:bg-gray-1 active:text-black ',
      gray: 'bg-gray-1 text-gray-4 active:bg-[#D4D8DC]',
      outlined: 'border border-gray-3 text-black bg-white active:bg-gray-1',
      secondary:
        'border border-1 border-primary-pink text-primary-pink bg-white active:bg-[#FCD6D9]',
      active: '',
      black: 'bg-black text-white',
      none: 'text-gray-4',
      menu: 'text-[26px]',
    },
    action: {
      none: '',
      press: '',
      active: '',
    },
    size: {
      small: 'h-[80px] w-[300px] px-4 rounded-[100px] text-[32px]',
      medium: 'h-[85px] w-[400px] px-3 rounded-[100px] text-[32px]',
      large: 'h-[100px] w-[640px] rounded-[100px] text-[32px]',
      mini: 'h-[80px] w-[220px] rounded-[100px] text-[26px]',
    },
  },
  compoundVariants: [
    {
      area: 'reward',
      size: 'medium',
      variant: 'primary',
      action: 'press',
      className: 'bg-pink-button-press',
    },
    {
      area: 'app',
      variant: 'outlined',
      size: 'medium',
      className: 'text-[40px] border-3 border-gray-3',
    },
    {
      area: 'app',
      variant: 'active',
      size: 'medium',
      className: 'rounded-full bg-gradient-to-r from-[#E8D400] to-[#00D218]',
    },
    {
      area: 'reward',
      size: 'small',
      action: 'press',
      className: 'bg-pink-button-press',
    },
    {
      area: 'reward',
      size: 'small',
      variant: 'secondary',
      action: 'press',
      className: 'bg-[#FCD6D9]',
    },
    {
      area: 'reward',
      size: 'small',
      variant: 'tertiary',
      action: 'press',
      className: 'bg-gray-1 text-black',
    },
    {
      area: 'reward',
      size: 'small',
      variant: 'outlined',
      className: 'text-gray-4',
    },
    {
      area: 'reward',
      size: 'small',
      variant: 'tertiary',
      action: 'press',
      className: 'bg-gray-1',
    },
    {
      area: 'app',
      variant: 'outlined',
      size: 'large',
      className: 'w-[642px] h-[94px]',
    },
    {
      area: 'app',
      variant: 'black',
      size: 'large',
      className: 'w-[642px] h-[94px] bg-black text-white',
    },
    {
      area: 'app',
      variant: 'gray',
      size: 'large',
      className: 'w-[642px] h-[94px]',
    },
    {
      size: 'mini',
      className: 'w-[210px] h-[60px] text-[26px]',
    },
    {
      size: 'mini',
      action: 'press',
      className: 'bg-pink-button-press',
    },
    {
      variant: 'menu',
      className: 'w-[130px] h-[60px] text-[26px] bg-gray-1',
    },
    {
      variant: 'menu',
      action: 'press',
      className: 'w-[130px] h-[60px] text-[26px] text-black bg-white text-gray-4',
    },
  ],
  defaultVariants: {
    area: 'waiting',
    variant: 'primary',
    size: 'large',
  },
});

type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    iconSize?: number;
    iconColor?: string;
    iconBackgroundColor?: string;
    iconBorderRadius?: string;
  };

export const Button = ({
  className,
  children,
  variant,
  size,
  area,
  asChild = false,
  action,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot.Root : 'button';

  // 보더 그라데이션이 필요한 조건
  const isGradientBorder = area === 'app' && variant === 'active' && size === 'medium';

  if (isGradientBorder) {
    return (
      <Component
        className={cn(
          'p-[3px] rounded-full bg-gradient-to-r from-[#E8D400] to-[#00D218]',
          className,
        )}
        type={asChild ? undefined : 'button'}
        {...props}
      >
        <div className='py-[10px] text-center rounded-full text-[40px] bg-white font-bold shadow-md cursor-pointer'>
          <span className='align-middle'>{children}</span>
        </div>
      </Component>
    );
  }

  // 나머지 경우는 기존 방식
  return (
    <Component
      className={buttonVariants({ area, variant, size, action, className })}
      type={asChild ? undefined : 'button'}
      {...props}
    >
      {children}
    </Component>
  );
};
