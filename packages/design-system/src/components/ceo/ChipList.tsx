'use client';

import { CircleX } from 'lucide-react';

import { cn } from '../../utils';

interface Option {
  name: string;
  value: string;
}

type BaseChipListProps = {
  options: Option[];
  hasCloseBtn?: boolean;
  className?: string;
};

type SingleChipListProps = BaseChipListProps & {
  type: 'single';
  value: string;
  onValueChange: (val: string) => void;
};

type MultipleChipListProps = BaseChipListProps & {
  type: 'multiple';
  options: Option[];
  value: string[];
  onValueChange: (val: string[]) => void;
  hasCloseBtn?: boolean;
};

type ChipListProps = SingleChipListProps | MultipleChipListProps;

export function ChipList({
  type,
  value,
  options,
  hasCloseBtn = true,
  onValueChange,
  className,
}: ChipListProps) {
  const handleRemove = (val: string) => {
    if (type === 'single') {
      onValueChange('');
    } else if (Array.isArray(value)) {
      onValueChange((value as string[]).filter((v) => v !== val));
    }
  };

  const selectedOptions =
    type === 'single'
      ? options.filter((opt) => opt.value === value)
      : options.filter((opt) => (value as string[]).includes(opt.value));

  return (
    <div className={cn('flex flex-wrap gap-2', type === 'single' && 'w-full')}>
      {selectedOptions.map((option) => (
        <div
          key={option.value}
          className={cn(
            'flex items-center justify-center gap-1 px-3 py-4 rounded-lg bg-[rgba(99,102,241,0.05)] border-fooding-purple border-2',
            type === 'single' ? 'w-full' : '',
            className,
          )}
        >
          <span className='body-2'>{option.name}</span>
          {hasCloseBtn && (
            <button
              type='button'
              className='cursor-pointer'
              onClick={() => handleRemove(option.value)}
            >
              <CircleX size={16} className='text-error-red' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
