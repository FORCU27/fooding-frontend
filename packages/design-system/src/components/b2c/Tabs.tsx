'use client';

import { Tabs as TabsPrimitives } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { cn, createContext } from '../../utils';

const tabsVariants = tv({
  base: cn(
    'relative inline-flex items-center justify-center border-transparent text-gray-5 whitespace-nowrap cursor-pointer',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:after:bg-black after:absolute after:inset-x-0 after:bottom-0 after:h-[2px]',
    'data-[state=active]:text-black data-[state=active]:font-semibold',
  ),
  variants: {
    size: {
      medium: 'h-[59px] px-5',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type TabsProps = Omit<TabsPrimitives.TabsProps, 'onChange' | 'onValueChange'> & {
  onChange?: (value: string) => void;
  scrollable?: boolean;
};

const Tabs = ({ className, children, onChange, scrollable = false, ...props }: TabsProps) => {
  return (
    <TabsContext value={{ scrollable }}>
      <TabsPrimitives.Root
        className={cn('w-full', scrollable && '-mx-grid-margin w-auto', className)}
        onValueChange={onChange}
        {...props}
      >
        {children}
      </TabsPrimitives.Root>
    </TabsContext>
  );
};

type TabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitives.List> &
  VariantProps<typeof tabsVariants> & {
    fullWidth?: boolean;
  };

const TabsList = ({ className, children, fullWidth = false, size, ...props }: TabsListProps) => {
  const { scrollable } = useTabsContext();

  return (
    <TabsListContext value={{ fullWidth, size }}>
      <TabsPrimitives.List
        className={cn(
          'bg-white flex items-center',
          fullWidth && 'w-full',
          scrollable && 'overflow-x-auto w-full scrollbar-hide px-grid-margin',
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitives.List>
    </TabsListContext>
  );
};

type TabsTriggerProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Trigger>;

const TabsTrigger = ({ className, children, ...props }: TabsTriggerProps) => {
  const { fullWidth, size } = useTabsListContext();

  return (
    <TabsPrimitives.Trigger
      className={cn(tabsVariants({ size, className }), fullWidth && 'w-full')}
      {...props}
    >
      {children}
    </TabsPrimitives.Trigger>
  );
};

type TabsContentProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Content>;

const TabsContent = ({ className, children, ...props }: TabsContentProps) => {
  return (
    <TabsPrimitives.Content tabIndex={-1} className={className} {...props}>
      {children}
    </TabsPrimitives.Content>
  );
};

type TabsContextValue = {
  scrollable: boolean;
};

type TabsListContextValue = {
  fullWidth: boolean;
  size: VariantProps<typeof tabsVariants>['size'];
};

const [TabsContext, useTabsContext] = createContext<TabsContextValue>('Tabs');

const [TabsListContext, useTabsListContext] = createContext<TabsListContextValue>('TabsList');

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs };
