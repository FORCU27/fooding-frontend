'use client';

import React, { useId } from 'react';

import { RadioGroup as RadioGroupPrimitives } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { cn, createContext } from '../../utils';

const radioGroupVariants = tv({
  slots: {
    root: 'flex gap-5',
    item: cn(
      'aspect-sqaure border-gray-3 size-6 shrink-0 rounded-full border outline-hidden cursor-pointer',
      'focus-visible:ring-fooding-purple focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ),
    indicator: 'rounded-full size-[14px] text-fooding-purple',
    label: 'w-full body-2',
    option: 'flex items-center gap-2',
  },
});

type RadioGroupProps<TValue extends string> = Omit<
  RadioGroupPrimitives.RadioGroupProps,
  'value' | 'onValueChange' | 'onChange'
> &
  VariantProps<typeof radioGroupVariants> & {
    value?: TValue;
    onChange?: (value: TValue) => void;
  };

const RadioGroup = <TValue extends string>({
  className,
  children,
  'aria-invalid': ariaInvalid,
  onChange,
  orientation = 'horizontal',
  ...props
}: RadioGroupProps<TValue>) => {
  return (
    <RadioGroupContext value={{ ariaInvalid }}>
      <RadioGroupPrimitives.Root
        className={cn(
          radioGroupVariants().root(),
          orientation === 'vertical' && 'flex-col gap-3',
          className,
        )}
        onValueChange={onChange}
        orientation={orientation}
        {...props}
      >
        {children}
      </RadioGroupPrimitives.Root>
    </RadioGroupContext>
  );
};

type RadioGroupItemProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitives.Item>;

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => {
  const id = useId();
  const { ariaInvalid } = useRadioGroupContext();

  return (
    <RadioGroupPrimitives.Item
      id={id}
      className={cn(
        radioGroupVariants().item(),
        ariaInvalid &&
          'border-error-red focus-visible:ring-error-red data-[state=checked]:border-error-red',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitives.Indicator className='flex items-center justify-center'>
        <svg
          className={cn(radioGroupVariants().indicator(), ariaInvalid && 'text-error-red')}
          viewBox='0 0 6 6'
          fill='currentcolor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='3' cy='3' r='3' />
        </svg>
      </RadioGroupPrimitives.Indicator>
    </RadioGroupPrimitives.Item>
  );
};

const RadioGroupLabel = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'label'>) => {
  return (
    <label className={radioGroupVariants({ className }).label()} {...props}>
      {children}
    </label>
  );
};

type RadioGroupOptionProps = RadioGroupItemProps;

const RadioGroupOption = ({ className, children, ...props }: RadioGroupOptionProps) => {
  const id = useId();

  return (
    <div className={cn(radioGroupVariants().option(), className)}>
      <RadioGroupItem id={id} {...props} />
      <RadioGroupLabel htmlFor={id}>{children}</RadioGroupLabel>
    </div>
  );
};

RadioGroup.Item = RadioGroupItem;
RadioGroup.Option = RadioGroupOption;

type RadioGroupContextValue = {
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined;
};

const [RadioGroupContext, useRadioGroupContext] =
  createContext<RadioGroupContextValue>('RadioGroup');

export { RadioGroup };
