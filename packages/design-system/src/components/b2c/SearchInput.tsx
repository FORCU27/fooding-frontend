import { useState } from 'react';

import { CloseIcon, SearchIcon } from '../../icons';
import { cn } from '../../utils';

type SearchInputProps = Omit<
  React.ComponentPropsWithRef<'input'>,
  'onChange' | 'value' | 'defaultValue'
> & {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

const SearchInput = ({
  className,
  value: externalValue,
  onChange: externalOnChange,
  defaultValue,
  ...props
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const value = externalValue ?? internalValue;
  const onChange = externalOnChange ?? setInternalValue;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  const clearInput = () => {
    onChange('');
  };

  return (
    <div className={cn('relative w-full h-fit', className)}>
      <SearchIcon className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-5' />
      <input
        className={cn(
          'w-full h-[44px] bg-gray-1 rounded-[8px] pl-11 pr-10 outline-none',
          'text-[14px] text-black font-medium placeholder:text-gray-5 plcaceholder:font-normal',
        )}
        value={value}
        onChange={onInputChange}
        {...props}
      />
      {value.length > 0 && (
        <button
          className='absolute top-1/2 right-3 -translate-y-1/2 size-5 rounded-full text-gray-1 bg-gray-5 flex justify-center items-center'
          onClick={clearInput}
        >
          <CloseIcon size={12} strokeWidth={4} />
        </button>
      )}
    </div>
  );
};

export { SearchInput };
