import { useId } from 'react';

import { ChevronDownIcon } from '../../icons';
import { cn } from '../../utils';

type SelectProps<TValue extends string> = Omit<
  React.ComponentPropsWithRef<'select'>,
  'onChange' | 'value'
> & {
  label?: React.ReactNode;
  placeholder?: string;
  value?: TValue;
  onChange?: (value: TValue) => void;
};

const Select = <TValue extends string>({
  className,
  children,
  placeholder,
  value,
  label,
  onChange = noop,
  ...props
}: SelectProps<TValue>) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value as TValue);
  };
  const selectId = useId();

  return (
    <div className='relative w-full'>
      {label && (
        <label htmlFor={selectId} className={cn('mb-3 flex items-center subtitle-6', className)}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'peer has-[option[disabled]:checked]:text-gray-4 w-full flex h-[56px] justify-between border border-gray-2 rounded-[12px] appearance-none pl-5 pr-13 outline-hidden',
          'focus-visible:border-gray-5',
          'aria-invalid:border-error-red',
          className,
        )}
        value={value}
        onChange={onSelectChange}
        {...props}
      >
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDownIcon className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-5 peer-disabled:opacity-50' />
    </div>
  );
};

type SelectOptionProps = React.ComponentPropsWithRef<'option'>;

const SelectOption = ({ className, children, ...props }: SelectOptionProps) => {
  return (
    <option className={cn('', className)} {...props}>
      {children}
    </option>
  );
};

Select.Option = SelectOption;

export { Select };

const noop = () => {};
