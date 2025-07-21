import { useState } from 'react';

import { Button, ChipFilter, SearchInput } from '@repo/design-system/components/b2c';
import { CloseIcon, SearchIcon } from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';

import { CTAContainer } from '@/components/CTAContainer';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { isNonEmptyArray } from '@/utils/array';

export const SearchScreen: ActivityComponentType<'SearchScreen'> = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<readonly string[]>(RECENT_SEARCHES);

  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== search));
  };

  console.log('searchValue', searchValue);

  const filterLabel =
    selectedRegions.length > 1
      ? `${selectedRegions[0]}..외 ${selectedRegions.length - 1}개`
      : isNonEmptyArray(selectedRegions)
        ? selectedRegions[0]
        : '지역';

  return (
    <Screen
      header={
        <Header left={<Header.Back />}>
          <SearchInput className='ml-4' value={searchInputValue} onChange={setSearchInputValue} />
        </Header>
      }
    >
      {searchInputValue && <AutoComplete keyword={searchInputValue} onSelect={setSearchValue} />}
      <div className='px-grid-margin py-[14px]'>
        <ChipFilter.List scrollable>
          <RegionMultiSelectBottomSheet
            value={selectedRegions}
            onChange={setSelectedRegions}
            trigger={
              <ChipFilter active={isNonEmptyArray(selectedRegions)}>{filterLabel}</ChipFilter>
            }
          />
        </ChipFilter.List>
      </div>
      <div className='bg-gray-1 h-[10px]' />
      {recentSearches.length > 0 && (
        <>
          <div className='mt-5 px-grid-margin'>
            <span className='text-sm text-gray-5'>최근 검색어</span>
          </div>
          <ul className='mt-3 flex flex-col'>
            {recentSearches.map((search) => (
              <li key={search} className='w-full'>
                <button className='h-[55px] flex justify-between items-center px-grid-margin active:bg-gray-1 w-full'>
                  <span>{search}</span>
                  <button aria-label='삭제' onClick={() => removeRecentSearch(search)}>
                    <CloseIcon className='text-gray-5' />
                  </button>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <CTAContainer>
        <Button>검색</Button>
      </CTAContainer>
    </Screen>
  );
};

const RECENT_SEARCHES = ['고기 맛집', '오마카세', '이자카야', '치킨', '피자'] as const;

type AutoCompleteProps = {
  keyword: string;
  onSelect: (value: string) => void;
};

const STORES = [
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

const AutoComplete = ({ keyword, onSelect }: AutoCompleteProps) => {
  const suggestions = STORES.filter((store) => store.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <ul className='flex flex-col'>
      {suggestions.map((suggestion) => (
        <li key={suggestion}>
          <button
            className='h-[55px] flex justify-between items-center px-grid-margin w-full active:bg-gray-1'
            onClick={() => onSelect(suggestion)}
          >
            <div className='flex gap-4 items-center'>
              <SearchIcon className='text-gray-5' />
              <HighlightedText keyword={keyword} text={suggestion} />
            </div>
            <CloseIcon className='text-gray-5' />
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
