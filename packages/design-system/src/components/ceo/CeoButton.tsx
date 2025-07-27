import { type ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-md subtitle-5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary:
        'bg-fooding-purple text-white hover:bg-fooding-purple/80 active:bg-fooding-purple/90',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
      outline: 'border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900',
      ghost: 'hover:bg-gray-100 hover:text-gray-900',
      link: 'text-blue-600 underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-14 px-10 py-3',
      sm: 'h-10 rounded-md px-3',
      lg: 'h-16 rounded-md px-8',
      icon: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

const CeoButton = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
};

export { CeoButton, buttonVariants };
