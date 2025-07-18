import { Slot } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { ChevronDownIcon, IconProps } from '../../icons';
import { cn } from '../../utils';

const chipButtonVariants = tv({
  base: 'h-[33px] flex justify-center items-center px-3 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer border',
  variants: {
    variant: {
      contained: 'bg-gray-6 text-white border-transparent',
      outlined: 'border-gray-2 text-gray-5 bg-white',
    },
  },
});

type ChipButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof chipButtonVariants> & {
    asChild?: boolean;
    suffix?: React.ReactNode;
  };

const ChipButton = ({
  className,
  children,
  variant,
  asChild = false,
  suffix,
  ...props
}: ChipButtonProps) => {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      className={cn(chipButtonVariants({ variant }), suffix && 'pr-2', className)}
      type={asChild ? undefined : 'button'}
      {...props}
    >
      {children}
      {suffix && suffix}
    </Component>
  );
};

type ChipButtonChevronDownIconProps = IconProps;

const ChipButtonChevronDownIcon = ({ className, ...props }: ChipButtonChevronDownIconProps) => {
  return <ChevronDownIcon className={cn('ml-1 size-4', className)} {...props} />;
};

ChipButton.ChevronDownIcon = ChipButtonChevronDownIcon;

export { ChipButton };
