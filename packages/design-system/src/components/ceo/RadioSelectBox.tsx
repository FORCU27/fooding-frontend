'use client';

import { useId } from 'react';

import { RadioGroup as RadioGroupPrimitives } from 'radix-ui';

import { cn, createContext } from '../../utils';

type RadioSelectBoxProps<TValue extends string> = Omit<
  React.ComponentPropsWithRef<typeof RadioGroupPrimitives.Root>,
  'value' | 'onValueChange' | 'onChange'
> & {
  value?: TValue;
  onChange?: (value: TValue) => void;
};

const RadioSelectBox = <TValue extends string>({
  className,
  children,
  'aria-invalid': ariaInvalid,
  onChange,
  orientation = 'horizontal',
  ...props
}: RadioSelectBoxProps<TValue>) => {
  return (
    <RadioSelectBoxContext value={{ ariaInvalid }}>
      <RadioGroupPrimitives.Root
        className={cn('flex gap-5', orientation === 'vertical' && 'flex-col', className)}
        onValueChange={onChange as (value: unknown) => void}
        {...props}
      >
        {children}
      </RadioGroupPrimitives.Root>
    </RadioSelectBoxContext>
  );
};

type RadioSelectBoxOptionProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitives.Item>;

const RadioSelectBoxOption = ({ className, children, ...props }: RadioSelectBoxOptionProps) => {
  const id = useId();
  const { ariaInvalid } = useRadioSelectBoxContext();

  return (
    <RadioGroupPrimitives.Item
      id={id}
      className={cn(
        'flex flex-col gap-2 border border-gray-3 cursor-pointer w-full',
        'rounded-[8px] p-5',
        'data-[state=checked]:bg-fooding-purple/5 data-[state=checked]:border-fooding-purple data-[state=checked]:outline-1 outline-offset-0 outline-fooding-purple',
        'focus-visible:ring-2 focus-visible:ring-fooding-purple ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        ariaInvalid &&
          'border-error-red data-[state=checked]:border-error-red data-[state=checked]:bg-error-red/5 data-[state=checked]:outline-error-red focus-visible:ring-error-red',
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitives.Item>
  );
};

RadioSelectBox.Item = RadioSelectBoxOption;

type RadioSelectBoxLabelProps = React.ComponentPropsWithRef<'span'>;

const RadioSelectBoxLabel = ({ className, children, ...props }: RadioSelectBoxLabelProps) => {
  return (
    <span className={cn('font-bold text-start', className)} {...props}>
      {children}
    </span>
  );
};

type RadioSelectBoxDescriptionProps = React.ComponentPropsWithRef<'span'>;

const RadioSelectBoxDescription = ({
  className,
  children,
  ...props
}: RadioSelectBoxDescriptionProps) => {
  return (
    <span className={cn('text-start text-gray-5 body-2', className)} {...props}>
      {children}
    </span>
  );
};

type RadioSelectBoxContextValue = {
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined;
};

const [RadioSelectBoxContext, useRadioSelectBoxContext] =
  createContext<RadioSelectBoxContextValue>('RadioSelectBox');

RadioSelectBox.Option = RadioSelectBoxOption;
RadioSelectBox.Label = RadioSelectBoxLabel;
RadioSelectBox.Description = RadioSelectBoxDescription;

export { RadioSelectBox };
