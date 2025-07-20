'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

type CeoSelectBoxProps = Select.SelectProps & {
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  className?: string;
};

const CeoSelectBox = ({ className, options, placeholder, label, ...props }: CeoSelectBoxProps) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className={cn(
          'relative flex h-14 w-full items-center justify-between rounded-lg border border-gray-3 bg-white px-4 text-base font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 data-[placeholder]:text-gray-500',
          className,
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className='h-5 w-5 text-gray-500' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          sideOffset={5}
          className='z-50 w-[--radix-select-trigger-width] overflow-hidden rounded-md border border-gray-3 bg-white shadow-md'
        >
          <Select.ScrollUpButton className='flex h-6 cursor-default items-center justify-center bg-white'>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className=''>
            <div className='flex subtitle-2 items-center subtitle-2 justify-between px-5 py-3 text-sm'>
              {label}
            </div>
            <hr className='border-gray-3' />
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className='flex body-2 cursor-pointer select-none items-center  px-5 py-3 text-base outline-none hover:bg-gray-100 data-[state=checked]:bg-gray-7'
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

export { CeoSelectBox };
