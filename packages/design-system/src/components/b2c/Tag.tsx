import React from 'react';

import { tv, VariantProps } from 'tailwind-variants';

const tagVariants = tv({
  base: 'inline-flex justify-center items-center font-medium whitespace-nowrap text-xs px-[6px] h-[22px] rounded-[4px]',
  variants: {
    variant: {
      primary: 'bg-primary-pink text-white',
      gray: 'bg-gray-1 text-gray-5',
      red: 'bg-primary-pink/10 text-primary-pink',
      green: 'bg-fooding-green/10 text-fooding-green',
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
});

type TagProps = React.ComponentPropsWithRef<'span'> & VariantProps<typeof tagVariants>;

export const Tag = ({ className, children, variant, ...props }: TagProps) => {
  return (
    <span className={tagVariants({ variant, className })} {...props}>
      {children}
    </span>
  );
};
