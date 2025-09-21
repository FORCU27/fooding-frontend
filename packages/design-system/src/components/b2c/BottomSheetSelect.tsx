import { useId, useState } from 'react';

import { BottomSheet } from './BottomSheet';
import { ChevronDownIcon } from '../../icons';
import { cn } from '../../utils';

export interface BottomSheetSelectProps<TValue extends string> {
  options: { value: TValue; label: string }[] | readonly { value: TValue; label: string }[];
  value: TValue;
  onChange: (value: TValue) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const BottomSheetSelect = <TValue extends string>({
  options,
  value,
  onChange,
  placeholder,
  label,
  className,
}: BottomSheetSelectProps<TValue>) => {
  const [isOpen, setIsOpen] = useState(false);

  const titleId = useId();

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div>
      {label && (
        <label className={cn('mb-3 flex items-center subtitle-6', className)}>{label}</label>
      )}

      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className={cn(
          'w-full h-[56px] px-[20px] border border-gray-2 rounded-[12px] flex items-center justify-between text-left',
          'text-black bg-white appearance-none',
          className,
        )}
      >
        <span className={value ? 'text-black' : 'text-gray-4'}>{selectedLabel}</span>
        <ChevronDownIcon className='text-gray-5 size-5' />
      </button>

      <BottomSheet open={isOpen} onOpenChange={setIsOpen}>
        <BottomSheet.Content aria-labelledby={titleId}>
          <BottomSheet.Header>
            <BottomSheet.Title id={titleId} className='font-bold text-[24px]'>
              {label || placeholder}
            </BottomSheet.Title>
          </BottomSheet.Header>

          <BottomSheet.Body>
            <BottomSheet.SelectGroup
              value={value}
              onChange={(val) => {
                onChange(val as TValue);
              }}
            >
              {options.map((opt) => (
                <BottomSheet.SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </BottomSheet.SelectItem>
              ))}
            </BottomSheet.SelectGroup>
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
