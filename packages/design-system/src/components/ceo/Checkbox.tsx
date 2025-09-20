'use client';

import { type ComponentPropsWithRef, useState } from 'react';

import { Check } from 'lucide-react';

import { cn } from '../../utils/cn';

type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  labelText: string;
};

const Checkbox = ({
  className,
  labelText,
  checked: controlledChecked,
  defaultChecked,
  'aria-invalid': ariaInvalid,
  onChange,
  ...props
}: CheckboxProps) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked || false);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(e.target.checked);
    }
    onChange?.(e);
  };

  return (
    <label
      className={cn(
        'flex gap-2 items-center cursor-pointer',
        'has-disabled:pointer-events-none has-disabled:opacity-50',
        className,
      )}
    >
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        className='sr-only peer'
        aria-invalid={ariaInvalid}
        {...props}
      />
      <span
        className={cn(
          'flex justify-center items-center size-[18px] rounded-[4px] bg-gray-3',
          'outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-fooding-purple ring-offset-2',
          ariaInvalid && 'ring-error-red border border-error-red',
          isChecked && 'bg-fooding-purple',
          isChecked && ariaInvalid && 'bg-error-red',
        )}
      >
        <Check className='size-3 text-white' strokeWidth={4} />
      </span>
      <span className='shrink-0 body-2 text-gray-900 cursor-pointer'>{labelText}</span>
    </label>
  );
};

export { Checkbox };
