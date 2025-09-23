import { useEffect, useRef, useState } from 'react';

import { ChipFilter, SearchInput } from '@repo/design-system/components/b2c';
import { CloseIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { AutoComplete } from './components/AutoComplete';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { SCREEN_TRANSITION_DURATION } from '@/libs/stackflow/configs';
import { isNonEmptyArray } from '@/utils/array';

export const SearchTab: ActivityComponentType<'SearchTab'> = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<{ id: string; name: string }[]>([]);
  const [recentSearchKeywords, setRecentSearchKeywords] =
    useState<readonly string[]>(RECENT_SEARCHES);

  const flow = useFlow();

  const removeRecentSearchKeyword = (keyword: string) => {
    setRecentSearchKeywords((prev) => prev.filter((item) => item !== keyword));
  };

  const search = (keyword: string) => {
    setSearchInputValue('');
    flow.push('SearchResultScreen', {
      keyword,
      regions: selectedRegions,
    });
  };

  const filterLabel = (() => {
    if (isNonEmptyArray(selectedRegions)) {
      if (selectedRegions.length > 1) {
        return `${selectedRegions[0].name}..외 ${selectedRegions.length - 1}개`;
      }

      return selectedRegions[0].name;
    }

    return '지역';
  })();

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchInputRef.current?.focus();
    }, SCREEN_TRANSITION_DURATION + 150);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Screen
      header={
        <Header>
          <SearchInput
            ref={searchInputRef}
            value={searchInputValue}
            onChange={setSearchInputValue}
            onFocus={() => setSearchInputFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                searchInputRef.current?.blur();
                setSearchInputFocused(false);

                if (searchInputValue.trim() !== '') {
                  search(searchInputValue);
                }
              }
            }}
          />
        </Header>
      }
      bottomTab={<BottomTab currentTab='search' />}
    >
      {searchInputValue && searchInputFocused && (
        <AutoComplete
          className='absolute inset-0 z-10'
          keyword={searchInputValue}
          onSelect={search}
          onSwipeStart={() => {
            searchInputRef.current?.blur();
          }}
        />
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
    </Screen>
  );
};

const RECENT_SEARCHES = ['홍가네', '고기 맛집', '오마카세', '이자카야', '치킨', '피자'] as const;
