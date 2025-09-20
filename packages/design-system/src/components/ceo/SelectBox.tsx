'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';
import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '../../utils/cn';

const selectVariants = tv({
  slots: {
    trigger: cn(
      'px-5 relative flex h-[58px] w-full items-center justify-between rounded-[8px] border border-gray-3 bg-white font-medium focus-visible:outline-none data-[placeholder]:text-gray-4 cursor-pointer',
      'focus-visible:ring-2 focus-visible:ring-fooding-purple focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ),
    icon: 'text-gray-5',
    item: 'flex cursor-pointer select-none items-center outline-hidden focus:bg-gray-7',
  },
  variants: {
    size: {
      small: {
        trigger: 'h-[40px] text-[14px] px-3',
        icon: 'size-5 ml-2',
        item: 'h-[40px] px-3 text-[14px] font-medium',
      },
      medium: {
        trigger: 'h-[58px]',
        icon: 'size-6 ml-3',
        item: 'h-[46px] px-5 body-2',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type SelectBoxProps = Select.SelectProps &
  VariantProps<typeof selectVariants> & {
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
  size,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectBoxProps) => {
  const variants = selectVariants({ size });

  return (
    <Select.Root {...props}>
      <Select.Trigger
        className={cn(
          variants.trigger(),
          ariaInvalid && 'border-error-red focus:border-error-red focus-visible:ring-error-red',
          className,
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className={variants.icon()} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          sideOffset={5}
          className={cn(
            'z-50 w-[--radix-select-trigger-width] overflow-hidden rounded-[8px] border border-gray-3 bg-white',
            'min-w-[var(--radix-select-trigger-width)]',
            'max-h-[var(--radix-select-content-available-height)]',
          )}
        >
          {label && (
            <div className='flex subtitle-2 items-center subtitle-2 justify-between px-5 py-3 text-sm border-b border-gray-3'>
              {label}
            </div>
          )}
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className={cn(variants.item())}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export { SelectBox };
