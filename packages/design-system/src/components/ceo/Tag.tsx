import React from 'react';

import { tv, VariantProps } from 'tailwind-variants';

const tagVariants = tv({
  base: 'inline-flex justify-center items-center font-medium whitespace-nowrap text-xs px-[6px] h-[22px] rounded-[4px]',
  variants: {
    variant: {
      red: 'bg-primary-pink/10 text-primary-pink',
      green: 'bg-fooding-green/10 text-fooding-green',
      blue: 'bg-fooding-blue/10 text-fooding-blue',
    },
  },
});

type TagVariants = VariantProps<typeof tagVariants>;

type TagProps = React.ComponentPropsWithRef<'span'> &
  Omit<TagVariants, 'variant'> &
  Required<Pick<TagVariants, 'variant'>>;

export const Tag = ({ className, children, variant, ...props }: TagProps) => {
  return (
    <span className={tagVariants({ variant, className })} {...props}>
      {children}
    </span>
  );
};
