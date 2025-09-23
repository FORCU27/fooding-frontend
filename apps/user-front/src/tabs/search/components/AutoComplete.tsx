import { ArrowUpLeftIcon, SearchIcon } from '@repo/design-system/icons';

import { cn } from '@/utils/cn';

type AutoCompleteProps = {
  className?: string;
  keyword: string;
  onSelect: (value: string) => void;
  onSwipeStart?: () => void;
};

export const AutoComplete = ({ className, keyword, onSelect, onSwipeStart }: AutoCompleteProps) => {
  const suggestions = STORES.filter((store) => store.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <ul className={cn('flex flex-col bg-white pb-10 overflow-y-auto', className)}>
      {suggestions.map((suggestion) => (
        <li key={suggestion} onTouchMove={onSwipeStart}>
          <button
            className='h-[55px] flex justify-between items-center px-grid-margin w-full active:bg-gray-1'
            onClick={() => onSelect(suggestion)}
          >
            <div className='flex gap-4 items-center'>
              <SearchIcon className='text-gray-5' />
              <HighlightedText keyword={keyword} text={suggestion} />
            </div>
            <ArrowUpLeftIcon className='text-gray-5' />
          </button>
        </li>
      ))}
    </ul>
  );
};

type HighlightedTextProps = {
  keyword: string;
  text: string;
};

const HighlightedText = ({ keyword, text }: HighlightedTextProps) => {
  const startIndex = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (startIndex === -1) return <span>{text}</span>;

  const endIndex = startIndex + keyword.length;
  const before = text.slice(0, startIndex);
  const highlighted = text.slice(startIndex, endIndex);
  const after = text.slice(endIndex);

  return (
    <span>
      {before}
      <span className='text-primary-pink'>{highlighted}</span>
      {after}
    </span>
  );
};

const STORES = [
  '홍가네',
  '고기 맛집',
  '고기 집',
  '고기',
  '오마카세',
  '이자카야',
  '치킨',
  '피자',
  '스시',
  '떡볶이',
  '분식',
] as const;
