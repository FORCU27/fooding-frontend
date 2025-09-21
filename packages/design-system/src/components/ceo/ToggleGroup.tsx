'use client';

import { ToggleGroup as ToggleGroupPrimitives } from 'radix-ui';

import { createContext } from '../../utils';
import { cn } from '../../utils/cn';

type ToggleGroupProps = React.ComponentPropsWithRef<typeof ToggleGroupPrimitives.Root> & {
  fullWidth?: boolean;
};

const ToggleGroup = ({
  className,
  children,
  'aria-invalid': ariaInvalid,
  fullWidth = false,
  ...props
}: ToggleGroupProps) => (
  <ToggleGroupContext value={{ ariaInvalid: !!ariaInvalid, fullWidth }}>
    <ToggleGroupPrimitives.Root
      className={cn('flex flex-wrap items-center justify-start gap-2', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitives.Root>
  </ToggleGroupContext>
);

type ToggleGroupItemProps = React.ComponentPropsWithRef<typeof ToggleGroupPrimitives.Item>;

const ToggleGroupItem = ({ className, children, ...props }: ToggleGroupItemProps) => {
  const { ariaInvalid, fullWidth } = useToggleGroupContext();

  return (
    <ToggleGroupPrimitives.Item
      className={cn(
        'inline-flex h-[58px] px-5 items-center justify-center border-2 border-gray-3 rounded-[8px] body-2 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fooding-purple focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=on]:border-fooding-purple data-[state=on]:bg-fooding-purple/5',
        ariaInvalid &&
          'border-error-red data-[state=on]:border-error-red data-[state=on]:bg-error-red/5 focus-visible:ring-error-red',

        fullWidth && 'flex-1',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitives.Item>
  );
};

type ToggleGroupContextValue = {
  ariaInvalid: boolean;
  fullWidth: boolean;
};

const [ToggleGroupContext, useToggleGroupContext] =
  createContext<ToggleGroupContextValue>('ToggleGroup');

export { ToggleGroup, ToggleGroupItem };
