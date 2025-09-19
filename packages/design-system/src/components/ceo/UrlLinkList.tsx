'use client';

import { useState } from 'react';

import { Input } from './Input';
import { LinkIcon, TrashIcon } from '../../icons';

type UrlLinkListProps = {
  value?: string[];
  onChange?: (urls: string[]) => void;
  initialUrls?: string[];
  maxLinks?: number;
};

const UrlLinkList = ({ value, onChange, initialUrls = [], maxLinks = 5 }: UrlLinkListProps) => {
  // Use controlled value if provided, otherwise use internal state
  const [internalUrls, setInternalUrls] = useState<string[]>(initialUrls);
  const urls = value !== undefined ? value : internalUrls;
  
  const [inputValue, setInputValue] = useState('');

  const updateUrls = (newUrls: string[]) => {
    if (onChange) {
      onChange(newUrls);
    } else {
      setInternalUrls(newUrls);
    }
  };

  const handleAddUrl = () => {
    if (inputValue && urls.length < maxLinks) {
      try {
        new URL(inputValue); // Validate URL format
        updateUrls([...urls, inputValue]);
        setInputValue('');
      } catch {
        alert('올바른 URL 형식이 아닙니다.');
      }
    }
  };

  const handleRemoveUrl = (indexToRemove: number) => {
    updateUrls(urls.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className='w-full'>
      <div className='relative'>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
          placeholder='https://example.com'
        />
        <button
          className='absolute right-4 top-1/2 -translate-y-1/2 size-8 cursor-pointer rounded-[6px] flex justify-center items-center'
          onClick={handleAddUrl}
        >
          <LinkIcon className='h-5 w-5 text-gray-500' />
        </button>
      </div>

      <div className='mt-2 flex justify-end'>
        <span className='subtitle-7 text-gray-5'>최대 {maxLinks}개</span>
      </div>

      <ul className='mt-5 space-y-2'>
        {urls.map((url, index) => (
          <li
            key={index}
            className='h-[60px] px-5 flex items-center justify-between rounded-[8px] bg-fooding-purple/5 border-fooding-purple border-2'
          >
            <LinkIcon className='mr-2 size-5 text-gray-5' />
            <span className='text-gray-5 body-2 truncate w-full flex-1'>{url}</span>
            <button
              className='pl-3 shrink-0 cursor-pointer'
              aria-label='삭제'
              onClick={() => handleRemoveUrl(index)}
            >
              <TrashIcon className='size-5 text-gray-5' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UrlLinkList };
