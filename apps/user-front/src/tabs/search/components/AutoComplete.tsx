import { ArrowUpLeftIcon, SearchIcon } from '@repo/design-system/icons';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { useGetRecommendedKeywords } from '@/hooks/keywords/useGetRecommendedKeywords';
import { cn } from '@/utils/cn';

type AutoCompleteProps = {
  className?: string;
  keyword: string;
  onSelect: (value: string) => void;
  onSwipeStart?: () => void;
};

export const AutoComplete = ({ className, keyword, onSelect, onSwipeStart }: AutoCompleteProps) => {
  if (keyword.length === 0) {
    return null;
  }

  return (
    <ErrorBoundary fallback={null}>
      <Suspense>
        <Content
          className={className}
          keyword={keyword}
          onSelect={onSelect}
          onSwipeStart={onSwipeStart}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

type ContentProps = {
  className?: string;
  keyword: string;
  onSelect: (value: string) => void;
  onSwipeStart?: () => void;
};

const Content = ({ className, keyword, onSelect, onSwipeStart }: ContentProps) => {
  const { data: recommendedKeywords } = useGetRecommendedKeywords({ keyword });

  return (
    <ul className={cn('flex flex-col bg-white pb-10 overflow-y-auto', className)}>
      {recommendedKeywords.map((recommendedKeyword) => (
        <li key={recommendedKeyword} onTouchMove={onSwipeStart}>
          <button
            className='h-[55px] flex justify-between items-center px-grid-margin w-full active:bg-gray-1'
            onClick={() => onSelect(recommendedKeyword)}
          >
            <div className='flex gap-4 items-center'>
              <SearchIcon className='text-gray-5' />
              <HighlightedText keyword={keyword} text={recommendedKeyword} />
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
