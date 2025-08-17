'use client';

import { Tabs as TabsPrimitives } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { IconProps } from '../../icons';
import { cn } from '../../utils/cn';
import { createContext } from '../../utils/create-context';

const filterChipGroupVariants = tv({
  base: cn(
    'flex p-2 items-center justify-center rounded-full shadow-[0_0_4px_rgba(0,0,0.1)] shadow-gray-4 body-2 whitespace-nowrap cursor-pointer',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-gray-6 data-[state=active]:text-white',
  ),
  variants: {
    size: {
      medium: 'h-10 px-[18px]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type FilterChipGroupProps = Omit<
  TabsPrimitives.TabsProps,
  'onChange' | 'onValueChange' | 'value' | 'defaultValue'
> & {
  value: string;
  onChange?: (value: string) => void;
  filterParam?: 'ASCENDING' | 'DESCENDING';
  onFilterChange?: (value: 'ASCENDING' | 'DESCENDING') => void;
  scrollable?: boolean;
};

const FilterChipGroup = ({
  className,
  children,
  value,
  onChange,
  scrollable = false,
  ...props
}: FilterChipGroupProps) => {
  return (
    <FilterChipGroupContext value={{ scrollable }}>
      <TabsPrimitives.Root
        className={cn('w-full flex flex-col', scrollable && '-mx-grid-margin w-auto', className)}
        value={value}
        onValueChange={(val: string) => {
          onChange?.(val);
        }}
        {...props}
      >
        {children}
      </TabsPrimitives.Root>
    </FilterChipGroupContext>
  );
};

type FilterChipGroupListProps = React.ComponentPropsWithRef<typeof TabsPrimitives.List> &
  VariantProps<typeof filterChipGroupVariants> & {
    filterParam: 'ASCENDING' | 'DESCENDING';
    onFilterChange: (value: 'ASCENDING' | 'DESCENDING') => void;
  };

const FilterChipGroupList = ({
  className,
  children,
  size,
  filterParam = 'DESCENDING',
  onFilterChange,
  ...props
}: FilterChipGroupListProps) => {
  const { scrollable } = useFilterChipGroupContext();

  const toggleFilter = () => {
    onFilterChange(filterParam === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING');
  };

  return (
    <FilterChipGroupListContext value={{ size }}>
      <TabsPrimitives.List
        className={cn(
          'bg-white inline-flex items-center gap-2',
          scrollable && 'overflow-x-auto w-full scrollbar-hide px-grid-margin ',
          className,
        )}
        {...props}
      >
        {children}

        <button
          className={cn(
            'ml-5 w-10 h-10 rounded-full shadow-[0_0_4px_rgba(0,0,0.1)] shadow-gray-4 flex items-center justify-center',
            'hover:bg-gray-6 hover:text-white cursor-pointer',
          )}
          onClick={toggleFilter}
        >
          <SwitchVerticalIcon />
        </button>
      </TabsPrimitives.List>
    </FilterChipGroupListContext>
  );
};

type FilterChipGroupTriggerProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Trigger>;

const FilterChipGroupTrigger = ({ className, children, ...props }: FilterChipGroupTriggerProps) => {
  const { size } = useFilterChipGroupListContext();

  return (
    <TabsPrimitives.Trigger
      className={cn('px-10', filterChipGroupVariants({ size, className }))}
      {...props}
    >
      {children}
    </TabsPrimitives.Trigger>
  );
};

type FilterChipGroupContentProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Content>;

const FilterChipGroupContent = ({ className, children, ...props }: FilterChipGroupContentProps) => {
  return (
    <TabsPrimitives.Content tabIndex={-1} className={className} {...props}>
      {children}
    </TabsPrimitives.Content>
  );
};

type FilterChipGroupContextValue = {
  scrollable: boolean;
};

type FilterChipGroupListContextValue = {
  size: VariantProps<typeof filterChipGroupVariants>['size'];
};

const [FilterChipGroupListContext, useFilterChipGroupListContext] =
  createContext<FilterChipGroupListContextValue>('FilterChipGroupList');

const [FilterChipGroupContext, useFilterChipGroupContext] =
  createContext<FilterChipGroupContextValue>('FilterChipGroup');

FilterChipGroup.List = FilterChipGroupList;
FilterChipGroup.Trigger = FilterChipGroupTrigger;
FilterChipGroup.Content = FilterChipGroupContent;

export { FilterChipGroup };

const SwitchVerticalIcon = ({ size = 24, color = 'currentColor', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color={color}
      {...props}
    >
      <path
        d='M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
