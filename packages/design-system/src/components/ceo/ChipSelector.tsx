/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CircleX } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

interface Option {
  name: string;
  value: string;
}

interface ChipSelectorProps {
  options: Option[];
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (val: string | string[]) => void;
  hasCloseBtn?: boolean;
}

export function ChipSelector({
  type,
  value,
  options,
  hasCloseBtn = true,
  onValueChange,
}: ChipSelectorProps) {
  const handleRemove = (val: string) => {
    if (type === 'single') {
      onValueChange('');
    } else if (Array.isArray(value)) {
      onValueChange(value.filter((v) => v !== val));
    }
  };

  return (
    <div>
      {type === 'single' ? (
        <ToggleGroup
          type='single'
          value={value as string}
          onValueChange={onValueChange as any}
          variant='selectedChip'
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className='flex items-center gap-1 w-full'
            >
              <span>{option.name}</span>
              {hasCloseBtn && option.value && (
                <span
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                >
                  <CircleX size={16} className='text-error-red' />
                </span>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type='multiple'
          value={value as string[]}
          onValueChange={onValueChange as any}
          variant='selectedChip'
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className='flex items-center gap-1'
            >
              <span>{option.name}</span>
              {hasCloseBtn && (
                <span
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                >
                  <CircleX size={16} className='text-error-red' />
                </span>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  );
}
