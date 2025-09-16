import { cn } from '@repo/design-system/utils';
import { Switch as SwitchPrimitives } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

type SwitchProps = Omit<SwitchPrimitives.SwitchProps, 'onChange' | 'onCheckedChange'> &
  VariantProps<typeof switchVariants> & {
    onChange?: (checked: boolean) => void;
  };

const switchVariants = tv({
  slots: {
    root: cn(
      'inline-flex shrink-0 cursor-pointer items-center rounded-full border-[2px] border-transparent transition-colors duration-100',
      'data-[state=unchecked]:bg-gray-3',
      'data-[state=checked]:border-fooding-purple data-[state=checked]:bg-fooding-purple',
      'disabled:pointer-events-none disabled:opacity-50',
    ),
    thumb: cn(
      'pointer-events-none block rounded-full bg-white shadow-xs',
      'data-[state=unchecked]:translate-x-0',
      'transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
      'shadow-[0_1px_2px_0_rgba(0,0,0,0.1),0_1px_1px_0_rgba(0,0,0,0.06)]',
    ),
  },
  variants: {
    size: {
      medium: {
        root: 'h-[22px] w-[40px]',
        thumb: cn('size-[18px] data-[state=checked]:translate-x-[18px]'),
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const Switch = ({ className, onChange, size, ...props }: SwitchProps) => {
  const variants = switchVariants({ size, className });

  return (
    <SwitchPrimitives.Root className={variants.root()} onCheckedChange={onChange} {...props}>
      <SwitchPrimitives.Thumb className={variants.thumb()} />
    </SwitchPrimitives.Root>
  );
};

export { Switch };
