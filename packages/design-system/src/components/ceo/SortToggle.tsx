'use client';

import { useState, useEffect } from 'react';

import { IconProps } from '../../icons';
import { cn } from '../../utils/cn';

export type SortOrder = 'RECENT' | 'OLD';

export interface SortToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: SortOrder;
  onSortChange: (value: SortOrder) => void;
  keepSelectedOpen?: boolean;
}

const baseClassName =
  'shadow-[0_0_4px_rgba(0,0,0,0.1)] shadow-gray-4 flex items-center justify-center body-2';
const chipClassName = 'py-2 px-[18px] rounded-full cursor-pointer';
const selectClassName = 'bg-gray-6 text-white';

export const SortToggle = ({
  className,
  value,
  onSortChange,
  keepSelectedOpen = false,
  ...props
}: SortToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortOrder>(
    value ?? (keepSelectedOpen ? 'OLD' : 'RECENT'),
  );

  useEffect(() => {
    if (value) setSelectedValue(value);
  }, [value]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (newValue: SortOrder) => {
    setSelectedValue(newValue);
    onSortChange(newValue);
    if (keepSelectedOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const selectedLabel = selectedValue === 'RECENT' ? '최신순' : '오래된순';

  return (
    <div className='flex items-center gap-5 relative'>
      {keepSelectedOpen && !isOpen && (
        <button
          type='button'
          className={cn(baseClassName, chipClassName, selectClassName)}
          onClick={handleToggle}
        >
          {selectedLabel}
        </button>
      )}

      {isOpen && (
        <div className='flex gap-2'>
          {['OLD', 'RECENT'].map((v) => {
            const val = v as SortOrder;
            return (
              <button
                key={val}
                className={cn(
                  baseClassName,
                  chipClassName,
                  selectedValue === val && selectClassName,
                )}
                onClick={() => handleSelect(val)}
              >
                {val === 'RECENT' ? '최신순' : '오래된순'}
              </button>
            );
          })}
        </div>
      )}

      <button
        type='button'
        className={cn(
          baseClassName,
          'w-10 h-10 rounded-full hover:bg-gray-6 hover:text-white cursor-pointer',
          className,
        )}
        onClick={handleToggle}
        {...props}
      >
        <SwitchVerticalIcon />
      </button>
    </div>
  );
};

const SwitchVerticalIcon = ({ size = 24, color = 'currentColor', ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    color={color}
    {...props}
  >
    <path
      d='M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
