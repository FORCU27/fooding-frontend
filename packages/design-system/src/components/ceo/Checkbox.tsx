'use client';

import { type ComponentPropsWithRef, useState, useId } from 'react';

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
  onChange,
  ...props
}: CheckboxProps) => {
  const id = useId();
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
    <div className='flex items-center gap-2'>
      <div className='relative'>
        <input
          type='checkbox'
          id={id}
          checked={isChecked}
          onChange={handleChange}
          className='sr-only'
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-[4px] cursor-pointer transition-colors disabled:pointer-events-none',
            isChecked ? 'bg-[#6366F1]' : 'bg-gray-200',
            className,
          )}
        >
          <Check className={cn('h-3 w-3 text-white', !isChecked && 'opacity-50')} strokeWidth={5} />
        </label>
      </div>
      <label htmlFor={id} className='text-base font-medium text-gray-900 cursor-pointer'>
        {labelText}
      </label>
    </div>
  );
};

export { Checkbox };
