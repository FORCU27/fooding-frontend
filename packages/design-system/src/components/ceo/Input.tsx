import { type ComponentPropsWithRef } from 'react';

import { SearchIcon, LinkIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

type InputProps = ComponentPropsWithRef<'input'> & {
  inputType?: 'search' | 'url' | 'text';
  disabled?: boolean;
  suffix?: string;
};

const Input = ({
  inputType = 'text',
  className,
  disabled = false,
  suffix,
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) => {
  const renderIcon = () => {
    switch (inputType) {
      case 'search':
        return (
          <SearchIcon className='absolute right-5 top-1/2 size-6 -translate-y-1/2 text-gray-5' />
        );
      case 'url':
        return (
          <LinkIcon className='absolute right-5 top-1/2 size-6 -translate-y-1/2 text-gray-5' />
        );
      default:
        return null;
    }
  };

  return (
    <div className='relative flex w-full items-center'>
      <input
        className={cn(
          'focus-visible:outline-none focus-visible:border-fooding-purple px-[20px] body-2',
          'flex h-[58px] w-full rounded-[8px] border border-gray-3 bg-white placeholder:text-gray-4',
          { 'pr-14': inputType && !suffix },
          { 'pl-6 pr-9': suffix }, // suffix가 있을 때 오른쪽 패딩 추가
          className,
          { 'opacity-50 cursor-pointer bg-gray-1 text-gray-5': disabled },
          ariaInvalid && 'border-error-red focus-visible:border-error-red',
        )}
        {...props}
        disabled={disabled}
      />
      {renderIcon()}
      {suffix && (
        <span className='absolute right-4 top-1/2 -translate-y-1/2 text-[16px] font-medium text-gray-600 pointer-events-none'>
          {suffix}
        </span>
      )}
    </div>
  );
};

export { Input };
