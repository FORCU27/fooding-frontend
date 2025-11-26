'use client';

import { cn } from '../../utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

export const Spinner = ({ size = 'md', text, className }: SpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <div className='text-center'>
        <div className='mb-4'>
          <div
            className={cn(
              'inline-block animate-spin rounded-full border-4 border-solid border-primary-pink border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]',
              sizeMap[size]
            )}
          />
        </div>
        {text && <div className='text-gray-600'>{text}</div>}
      </div>
    </div>
  );
};
