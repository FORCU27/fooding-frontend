'use client';

import { type ComponentPropsWithRef, useState, useId } from 'react';

import { cn } from '../../utils/cn';

type CeoCheckBoxProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  labelText: string;
};

const CeoCheckBox = ({
  className,
  labelText,
  checked: controlledChecked,
  defaultChecked,
  onChange,
  ...props
}: CeoCheckBoxProps) => {
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
      <input
        type='checkbox'
        id={id}
        checked={isChecked}
        onChange={handleChange}
        className={cn('h-5 w-5 rounded border-gray-3 text-blue-600 focus:ring-blue-500', className)}
        {...props}
      />
      <label htmlFor={id} className='text-base font-medium text-gray-900'>
        {labelText}
      </label>
    </div>
  );
};

export { CeoCheckBox };
