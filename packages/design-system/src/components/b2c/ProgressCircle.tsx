'use client';

import React from 'react';

import { tv, VariantProps } from 'tailwind-variants';

import { ProgressCircleIcon } from '../../icons';
import { cn } from '../../utils';

const progressCircleVariant = tv({
  base: cn('flex items-center justify-center rounded-full'),
  variants: {
    variant: {
      primary: 'text-primary-pink',
      white: 'text-white',
    },
    size: {
      default: 'w-8 h-8',
      small: 'w-6 h-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressCircleVariant> {}

export const ProgressCircle = ({
  variant,
  size = 'default',
  className,
  ...props
}: ProgressCircleProps) => {
  const iconSizeMap = {
    default: 32,
    small: 24,
  } as const;

  return (
    <div className={progressCircleVariant({ variant, size, className })} {...props}>
      <ProgressCircleIcon size={iconSizeMap[size]} />
    </div>
  );
};
