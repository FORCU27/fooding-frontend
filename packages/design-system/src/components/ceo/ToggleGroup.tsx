'use client';

import { type ComponentProps, createContext, forwardRef, useContext } from 'react';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils/cn';

const toggleGroupItemVariants = tv({
  base: cn(
    'inline-flex py-[18px] px-5 items-center justify-center border border-2 border-gray-3 transition-colors rounded-lg body-2',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=on]:border-fooding-purple data-[state=on]:bg-[rgba(99,102,241,0.05)]',
  ),
  variants: {
    variant: {
      default: '',
      selectedChip: 'border-fooding-purple bg-[rgba(99,102,241,0.05)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const ToggleGroupContext = createContext<VariantProps<typeof toggleGroupItemVariants>>({
  variant: 'default',
});

type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleGroupItemVariants>;

const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-wrap items-center justify-start gap-2', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant: variant ?? 'default' }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = 'ToggleGroup';

type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item>;

const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, value, ...props }, ref) => {
  const { variant } = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(toggleGroupItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';

export { ToggleGroup, ToggleGroupItem };
