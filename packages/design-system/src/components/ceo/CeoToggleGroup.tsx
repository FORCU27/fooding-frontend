'use client';

import { type ComponentProps, createContext, useContext } from 'react';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils/cn';

const toggleGroupItemVariants = tv({
  base: 'inline-flex items-center justify-center border transition-colors hover:bg-gray-100 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default:
        'rounded-lg border-gray-300 bg-white px-8 py-4 text-base font-medium text-gray-700 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600',
      chip: 'rounded-md border-gray-300 bg-white px-4 py-2 text-sm font-normal text-gray-600 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const ToggleGroupContext = createContext<VariantProps<typeof toggleGroupItemVariants>>({
  variant: 'default',
});

type CeoToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & 
  VariantProps<typeof toggleGroupItemVariants> & {
  ref?: React.Ref<React.ElementRef<typeof ToggleGroupPrimitive.Root>>;
};

const CeoToggleGroup = ({ className, variant, children, ref, ...props }: CeoToggleGroupProps) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-wrap items-center justify-start gap-2', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
);

type CeoToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  ref?: React.Ref<React.ElementRef<typeof ToggleGroupPrimitive.Item>>;
};

const CeoToggleGroupItem = ({ className, children, ref, ...props }: CeoToggleGroupItemProps) => {
  const { variant } = useContext(ToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleGroupItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
};

export { CeoToggleGroup, CeoToggleGroupItem };
