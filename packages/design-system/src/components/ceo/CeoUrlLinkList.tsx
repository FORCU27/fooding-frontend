'use client';

import { useState } from 'react';
import { CeoInput } from './CeoInput';
import { LinkIcon, Trash2Icon } from 'lucide-react';
import { CeoButton } from './CeoButton';

type CeoUrlLinkListProps = {
  initialUrls?: string[];
  maxLinks?: number;
};

const CeoUrlLinkList = ({ initialUrls = [], maxLinks = 5 }: CeoUrlLinkListProps) => {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [inputValue, setInputValue] = useState('');

  const handleAddUrl = () => {
    if (inputValue && urls.length < maxLinks) {
      try {
        new URL(inputValue); // Validate URL format
        setUrls([...urls, inputValue]);
        setInputValue('');
      } catch (error) {
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
        <CeoInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
          placeholder='https://example.com'
        />
        <CeoButton
          size='icon'
          variant='ghost'
          className='absolute right-1 top-1/2 -translate-y-1/2'
          onClick={handleAddUrl}
        >
          <LinkIcon className='h-5 w-5 text-gray-500' />
        </CeoButton>
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
            <CeoButton size='icon' variant='ghost' onClick={() => handleRemoveUrl(index)}>
              <Trash2Icon className='h-5 w-5 text-gray-500' />
            </CeoButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CeoUrlLinkList };
