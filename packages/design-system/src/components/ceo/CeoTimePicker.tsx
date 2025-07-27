'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 2 }, (_, i) => (i * 30).toString().padStart(2, '0'));

type CeoTimePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

const CeoTimePicker = forwardRef<HTMLButtonElement, CeoTimePickerProps>(
  ({ value: controlledValue, onChange, className, disabled }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(controlledValue || '09:00');

    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);

    const [hour, minute] = internalValue.split(':');

    useEffect(() => {
      if (controlledValue) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    useEffect(() => {
      if (isOpen) {
        const selectedHour = hourRef.current?.querySelector<HTMLButtonElement>(
          `[data-hour="${hour}"]`,
        );
        selectedHour?.scrollIntoView({ block: 'center' });

        const selectedMinute = minuteRef.current?.querySelector<HTMLButtonElement>(
          `[data-minute="${minute}"]`,
        );
        selectedMinute?.scrollIntoView({ block: 'center' });
      }
    }, [isOpen, hour, minute]);

    const handleTimeChange = (type: 'hour' | 'minute', val: string) => {
      const newTime = type === 'hour' ? `${val}:${minute}` : `${hour}:${val}`;
      setInternalValue(newTime);
      onChange?.(newTime);
    };

    return (
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            disabled={disabled}
            className={cn(
              'relative flex h-14 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 text-base font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
              className,
            )}
          >
            {internalValue}
            <ChevronDownIcon className='h-5 w-5 text-gray-500' />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={5}
            align='start'
            className='z-50 flex h-60 w-[200px] rounded-md border bg-white p-2 shadow-md'
          >
            <div ref={hourRef} className='flex-1 overflow-y-auto pr-1'>
              {hours.map((h) => (
                <button
                  key={h}
                  data-hour={h}
                  onClick={() => handleTimeChange('hour', h)}
                  className={cn(
                    'w-full rounded-md p-2 text-center text-sm hover:bg-gray-100',
                    h === hour && 'bg-blue-100 font-bold text-blue-600',
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
            <div ref={minuteRef} className='flex-1 overflow-y-auto pl-1'>
              {minutes.map((m) => (
                <button
                  key={m}
                  data-minute={m}
                  onClick={() => handleTimeChange('minute', m)}
                  className={cn(
                    'w-full rounded-md p-2 text-center text-sm hover:bg-gray-100',
                    m === minute && 'bg-blue-100 font-bold text-blue-600',
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

CeoTimePicker.displayName = 'CeoTimePicker';

export { CeoTimePicker };
