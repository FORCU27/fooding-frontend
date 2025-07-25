'use client';

import { Tabs as TabsPrimitives } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '../../utils/cn';
import { createContext } from '../../utils/create-context';

const chipTabsVariants = tv({
  base: cn(
    'inline-flex items-center justify-center rounded-full border font-medium text-gray-5 border border-gray-2 whitespace-nowrap cursor-pointer',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-gray-6 data-[state=active]:text-white data-[state=active]:border-transparent',
  ),
  variants: {
    size: {
      medium: 'h-[33px] px-3 text-sm',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type ChipTabsProps = Omit<TabsPrimitives.TabsProps, 'onChange' | 'onValueChange'> & {
  onChange?: (value: string) => void;
  scrollable?: boolean;
};

const ChipTabs = ({
  className,
  children,
  onChange,
  scrollable = false,
  ...props
}: ChipTabsProps) => {
  return (
    <ChipTabsContext value={{ scrollable }}>
      <TabsPrimitives.Root
        className={cn('w-full', scrollable && '-mx-grid-margin w-auto', className)}
        onValueChange={onChange}
        {...props}
      >
        {children}
      </TabsPrimitives.Root>
    </ChipTabsContext>
  );
};

type ChipTabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitives.List> &
  VariantProps<typeof chipTabsVariants>;

const ChipTabsList = ({ className, children, size, ...props }: ChipTabsListProps) => {
  const { scrollable } = useChipTabsContext();

  return (
    <ChipTabsListContext value={{ size }}>
      <TabsPrimitives.List
        className={cn(
          'bg-white inline-flex items-center gap-2',
          scrollable && 'overflow-x-auto w-full scrollbar-hide px-grid-margin',
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitives.List>
    </ChipTabsListContext>
  );
};

type ChipTabsTriggerProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Trigger>;

const ChipTabsTrigger = ({ className, children, ...props }: ChipTabsTriggerProps) => {
  const { size } = useChipTabsListContext();

  return (
    <TabsPrimitives.Trigger className={cn(chipTabsVariants({ size, className }))} {...props}>
      {children}
    </TabsPrimitives.Trigger>
  );
};

type ChipTabsContentProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Content>;

const ChipTabsContent = ({ className, children, ...props }: ChipTabsContentProps) => {
  return (
    <TabsPrimitives.Content tabIndex={-1} className={className} {...props}>
      {children}
    </TabsPrimitives.Content>
  );
};

type ChipTabsContextValue = {
  scrollable: boolean;
};

type ChipTabsListContextValue = {
  size: VariantProps<typeof chipTabsVariants>['size'];
};

const [ChipTabsListContext, useChipTabsListContext] =
  createContext<ChipTabsListContextValue>('ChipTabsList');

const [ChipTabsContext, useChipTabsContext] = createContext<ChipTabsContextValue>('ChipTabs');

ChipTabs.List = ChipTabsList;
ChipTabs.Trigger = ChipTabsTrigger;
ChipTabs.Content = ChipTabsContent;

export { ChipTabs };
