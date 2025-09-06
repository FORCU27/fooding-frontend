import { useState } from 'react';

import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from '../../utils';

type CounterProps = {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export const Counter = ({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 0,
  onChange,
}: CounterProps) => {
  const [counterNumber, setCounterNumber] = useState<number>(defaultValue);

  const isControlled = value !== undefined;
  const counterVal = isControlled ? value : counterNumber;

  const setValue = (newValue: number) => {
    if (!isControlled) {
      setCounterNumber(newValue);
    }
    onChange?.(newValue);
  };

  const handleDecrease = () => setValue(Math.max(counterVal - step, min));
  const handleIncrease = () => setValue(Math.min(counterVal + step, max));

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full px-2 py-1',
        'border border-gray-2 rounded-full',
        'subtitle-5 text-black',
        className,
      )}
    >
      <button
        type='button'
        onClick={handleDecrease}
        disabled={counterVal <= min}
        className='p-2 disabled:opacity-30 border-r border-gray-2 cursor-pointer'
      >
        <MinusIcon />
      </button>
      <span className='flex-1 text-center'>{counterVal}</span>
      <button
        type='button'
        onClick={handleIncrease}
        disabled={counterVal >= max}
        className='p-2 disabled:opacity-30 border-l border-gray-2 cursor-pointer'
      >
        <PlusIcon />
      </button>
    </div>
  );
};
