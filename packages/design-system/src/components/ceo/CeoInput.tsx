import { type ComponentPropsWithRef } from 'react';

import { SearchIcon, LinkIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

type CeoInputProps = ComponentPropsWithRef<'input'> & {
  inputType?: 'search' | 'url' | 'text';
  disabled?: boolean;
};

const CeoInput = ({ inputType = 'text', className, disabled = false, ...props }: CeoInputProps) => {
  const renderIcon = () => {
    switch (inputType) {
      case 'search':
        return (
          <SearchIcon className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
        );
      case 'url':
        return (
          <LinkIcon className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
        );
      default:
        return null;
    }
  };

  return (
    <div className='relative flex w-full items-center'>
      <input
        className={cn(
          'flex h-[58px] w-full rounded-[8px] border border-gray-3 bg-white px-[10px] py-[16px] text-[20px] font-bold text-black placeholder:text-gray-5 placeholder:font-normal',
          { 'pr-10': inputType },
          className,
          { 'opacity-50 cursor-pointer bg-gray-1 text-gray-5': disabled },
        )}
        {...props}
        disabled={disabled}
      />
      {renderIcon()}
    </div>
  );
};

export { CeoInput };
