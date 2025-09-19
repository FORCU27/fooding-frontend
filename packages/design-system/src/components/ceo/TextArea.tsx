'use client';

import { type ComponentPropsWithRef, ChangeEvent } from 'react';

import { cn } from '../../utils/cn';

type TextAreaProps = ComponentPropsWithRef<'textarea'>;

const TextArea = ({ className, maxLength, value, onChange, ...props }: TextAreaProps) => {
  const currentValue = value ?? props.defaultValue ?? '';
  const currentLength = currentValue.toString().length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      <textarea
        className={cn(
          'flex w-full rounded-[8px] border border-gray-3 bg-white px-[20px] py-[18px] font-medium placeholder:text-gray-5',
          'outline-hidden focus-visible:border-fooding-purple',
          'resize-none field-sizing-content',
          className,
        )}
        maxLength={maxLength}
        onChange={handleChange}
        value={value}
        {...props}
      />
      {maxLength && (
        <p className='text-right text-sm text-gray-5'>
          <span className='text-black'>{currentLength}</span> /{' '}
          <span className='text-gray-5'>{maxLength}</span>자
        </p>
      )}
    </div>
  );
};

export { TextArea };
