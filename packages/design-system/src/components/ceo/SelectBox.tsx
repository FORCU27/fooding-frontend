'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

type SelectBoxProps = Select.SelectProps & {
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  className?: string;
  'aria-invalid'?: boolean;
};

const SelectBox = ({
  className,
  options,
  placeholder,
  label,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectBoxProps) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className={cn(
          'px-5 relative flex h-[58px] w-full items-center justify-between rounded-[8px] border border-gray-3 bg-white font-medium focus-visible:outline-none data-[placeholder]:text-gray-4 cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-fooding-purple focus-visible:ring-offset-2',
          ariaInvalid && 'border-error-red focus:border-error-red focus-visible:ring-error-red',
          className,
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className='size-6 text-gray-5' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          sideOffset={5}
          className='z-50 w-[--radix-select-trigger-width] overflow-hidden rounded-[8px] border border-gray-3 bg-white min-w-[440xp]'
        >
          <Select.ScrollUpButton className='flex h-6 cursor-default items-center justify-center bg-white'>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {label && (
              <>
                <div className='flex subtitle-2 items-center subtitle-2 justify-between px-5 py-3 text-sm'>
                  {label}
                </div>
                <hr className='border-gray-3' />
              </>
            )}
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className='flex body-2 cursor-pointer select-none items-center h-[46px] px-5 outline-hidden focus:bg-gray-7 min-w-[440px]'
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className='flex h-6 cursor-default items-center justify-center bg-white'>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export { SelectBox };
