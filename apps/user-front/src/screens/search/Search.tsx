import { useState } from 'react';

import { Button, ChipFilter, SearchInput } from '@repo/design-system/components/b2c';
import { CloseIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { AutoComplete } from './components/AutoComplete';
import { CTAContainer } from '@/components/CTAContainer';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { isNonEmptyArray } from '@/utils/array';

export const SearchScreen: ActivityComponentType<'SearchScreen'> = () => {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recentSearchKeywords, setRecentSearchKeywords] =
    useState<readonly string[]>(RECENT_SEARCHES);

  const { push } = useFlow();

  const removeRecentSearchKeyword = (keyword: string) => {
    setRecentSearchKeywords((prev) => prev.filter((item) => item !== keyword));
  };

  const search = (keyword: string) => {
    push('SearchResultScreen', {
      keyword,
      regionIds: selectedRegions,
    });
  };

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
          <SearchInput
            className='ml-4'
            value={searchInputValue}
            onChange={setSearchInputValue}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
          />
        </Header>
      }
    >
      {searchInputValue && searchInputFocused && (
        <AutoComplete keyword={searchInputValue} onSelect={search} />
      )}
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
      {recentSearchKeywords.length > 0 && (
        <>
          <div className='mt-5 px-grid-margin'>
            <span className='text-sm text-gray-5'>최근 검색어</span>
          </div>
          <ul className='mt-3 flex flex-col'>
            {recentSearchKeywords.map((keyword) => (
              <li key={keyword} className='w-full relative'>
                <button
                  className='h-[55px] flex justify-between items-center px-grid-margin active:bg-gray-1 w-full'
                  onClick={() => search(keyword)}
                >
                  <span>{keyword}</span>
                </button>
                <button
                  className='absolute right-grid-margin top-1/2 -translate-y-1/2'
                  aria-label='삭제'
                  onClick={() => removeRecentSearchKeyword(keyword)}
                >
                  <CloseIcon className='text-gray-5' />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <CTAContainer>
        <Button onClick={() => search(searchInputValue)} disabled={searchInputValue.length === 0}>
          검색
        </Button>
      </CTAContainer>
    </Screen>
  );
};

const RECENT_SEARCHES = ['고기 맛집', '오마카세', '이자카야', '치킨', '피자'] as const;
