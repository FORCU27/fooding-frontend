'use client';

import { useState } from 'react';

import { LinkIcon, Trash2Icon } from 'lucide-react';

import { Input } from './Input';

type UrlLinkListProps = {
  initialUrls?: string[];
  maxLinks?: number;
};

const UrlLinkList = ({ initialUrls = [], maxLinks = 5 }: UrlLinkListProps) => {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [inputValue, setInputValue] = useState('');

  const handleAddUrl = () => {
    if (inputValue && urls.length < maxLinks) {
      try {
        new URL(inputValue); // Validate URL format
        setUrls([...urls, inputValue]);
        setInputValue('');
      } catch {
        alert('올바른 URL 형식이 아닙니다.');
      }
    }
  };

  const handleRemoveUrl = (indexToRemove: number) => {
    setUrls(urls.filter((_, index) => index !== indexToRemove));
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
        <span className='text-sm text-gray-500'>최대 {maxLinks}개</span>
      </div>

      <ul className='mt-2 space-y-2'>
        {urls.map((url, index) => (
          <li
            key={index}
            className='flex items-center justify-between rounded-lg border border-blue-600 bg-blue-50 p-4'
          >
            <div className='flex items-center gap-2'>
              <LinkIcon className='h-5 w-5 text-gray-700' />
              <span className='text-base text-gray-900'>{url}</span>
            </div>
            <button
              className='size-8 cursor-pointer rounded-[6px] flex justify-center items-center'
              onClick={() => handleRemoveUrl(index)}
            >
              <Trash2Icon className='h-5 w-5 text-gray-500' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UrlLinkList };
