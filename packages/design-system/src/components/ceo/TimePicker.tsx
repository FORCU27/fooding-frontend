'use client';

import { useState, useRef, useEffect } from 'react';

import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 2 }, (_, i) => (i * 30).toString().padStart(2, '0'));

type TimePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const TimePicker = ({
  value: controlledValue,
  onChange,
  className,
  disabled,
  ref,
}: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(controlledValue || '09:00');

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const hourButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const minuteButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [hour, minute] = internalValue.split(':');

  useEffect(() => {
    if (controlledValue) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (isOpen && hour && minute) {
      const selectedHourButton = hourButtonRefs.current.get(hour);
      selectedHourButton?.scrollIntoView({ block: 'center' });

      const selectedMinuteButton = minuteButtonRefs.current.get(minute);
      selectedMinuteButton?.scrollIntoView({ block: 'center' });
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
            'relative flex h-14 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 text-base font-medium cursor-pointer',
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
                ref={(el) => {
                  if (el) hourButtonRefs.current.set(h, el);
                }}
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
                ref={(el) => {
                  if (el) minuteButtonRefs.current.set(m, el);
                }}
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
};

export { TimePicker };
