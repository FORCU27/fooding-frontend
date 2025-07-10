import { useState } from 'react';

import { Checkbox as CheckboxPrimitives } from 'radix-ui';

import { CheckIcon } from '../../icons';
import { cn, createContext } from '../../utils';

type CheckSelectBoxGroupProps<TValue extends string> = Omit<
  React.ComponentPropsWithRef<'div'>,
  'onChange' | 'defaultValue'
> & {
  value?: TValue[];
  onChange?: (value: TValue[]) => void;
  defaultValue?: TValue[];
};

const CheckSelectBoxGroup = <TValue extends string>({
  className,
  children,
  value: externalValue,
  onChange: externalOnChange,
  defaultValue,
  ...props
}: CheckSelectBoxGroupProps<TValue>) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? []);

  const value = externalValue ?? internalValue;
  const onChange = (externalOnChange as (value: string[]) => void) ?? setInternalValue;

  return (
    <CheckSelectBoxGroupContext value={{ value, onChange }}>
      <div className={cn('w-full flex flex-col gap-5', className)} role='group' {...props}>
        {children}
      </div>
    </CheckSelectBoxGroupContext>
  );
};

type CheckSelectBoxGroupItemProps = CheckboxPrimitives.CheckboxProps & {
  value: string;
};

const CheckSelectBoxGroupItem = ({
  className,
  children,
  ...props
}: CheckSelectBoxGroupItemProps) => {
  const { value, onChange } = useCheckSelectBoxGroupContext();

  const checked = value.includes(props.value);

  const onCheckedChange = (checked: boolean) => {
    if (checked) {
      onChange([...value, props.value]);
    } else {
      onChange(value.filter((v) => v !== props.value));
    }
  };

  return (
    <CheckboxPrimitives.Root
      className={cn(
        'h-[47px] text-gray-5 flex items-center font-semibold px-4 cursor-pointer',
        'data-[state=checked]:text-primary-pink data-[state=checked]:bg-primary-pink/10',
        className,
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <span className='flex-1 truncate text-start'>{children}</span>
      <CheckboxPrimitives.Indicator asChild>
        <CheckIcon size={17} />
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  );
};

CheckSelectBoxGroup.Item = CheckSelectBoxGroupItem;

type CheckSelectBoxGroupContextValue = {
  value: string[];
  onChange: (value: string[]) => void;
};

const [CheckSelectBoxGroupContext, useCheckSelectBoxGroupContext] =
  createContext<CheckSelectBoxGroupContextValue>('CheckSelectBoxGroup');

export { CheckSelectBoxGroup };
