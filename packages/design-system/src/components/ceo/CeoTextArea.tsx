'use client';

import { type ComponentPropsWithRef, useState, useEffect, ChangeEvent } from 'react';
import { cn } from '../../utils/cn';

type CeoTextAreaProps = ComponentPropsWithRef<'textarea'>;

const CeoTextArea = ({ className, maxLength, value, onChange, ...props }: CeoTextAreaProps) => {
  const [count, setCount] = useState((value || props.defaultValue || '').toString().length);

  useEffect(() => {
    if (value !== undefined) {
      setCount(value.toString().length);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      <textarea
        className={cn(
          'flex w-full rounded-[8px] border border-gray-3 bg-white px-[10px] py-[16px] text-[20px] font-bold text-black placeholder:text-gray-5 placeholder:font-normal',
          'h-[120px] resize-none',
          { 'pb-8': maxLength },
          className,
        )}
        maxLength={maxLength}
        onChange={handleChange}
        value={value}
        {...props}
      />
      {maxLength && (
        <p className='text-right text-sm text-gray-5'>
          <span className='text-black'>{count}</span> /{' '}
          <span className='text-gray-5'>{maxLength}</span>자
        </p>
      )}
    </div>
  );
};

export { CeoTextArea };
