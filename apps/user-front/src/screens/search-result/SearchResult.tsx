import { useState } from 'react';

import { Store, STORE_CATEOGORY_LABELS } from '@repo/api/user';
import { BottomSheet, Button, ChipFilter, SearchInput } from '@repo/design-system/components/b2c';
import { ChevronDownIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { AutoComplete } from '../search/components/AutoComplete';
import { IntersectionObserver } from '@/components/IntersectionObserver';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { useSearchInfiniteStoreList } from '@/hooks/store/useSearchInfiniteStoreList';
import { isNonEmptyArray } from '@/utils/array';

// TODO: 장소 추가
const DUMMY_LOCATION = '제주 제주시 서해안로 654';

export type SearchResultScreenParams = {
  keyword: string;
  regionIds: string[];
};

const SORT_OPTIONS = [
  // 'recommend',
  'average_rating',
  'review',
  // 'price-desc',
  // 'price-asc',
  // 'distance',
] as const;

const SORT_OPTION_PARAMS = {
  // recommend: { type: 'RECOMMEND', direction: 'DESCENDING' },
  average_rating: { type: 'AVERAGE_RATING', direction: 'DESCENDING', label: '별점 순' },
  review: { type: 'REVIEW', direction: 'DESCENDING', label: '리뷰 많은 순' },
  // price-desc: { type: 'PRICE', direction: 'DESCENDING' },
  // price-asc: { type: 'PRICE', direction: 'DESCENDING' },
  // distance: { type: 'DISTANCE', direction: 'ASCENDING' },
} as const;

export const SearchResultScreen: ActivityComponentType<'SearchResultScreen'> = ({ params }) => {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(params.regionIds);
  const [searchInputValue, setSearchInputValue] = useState(params.keyword);
  const [searchKeyword, setSearchKeyword] = useState(params.keyword);
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>(SORT_OPTIONS[0]);

  const filterLabel =
    selectedRegions.length > 1
      ? `${selectedRegions[0]}..외 ${selectedRegions.length - 1}개`
      : isNonEmptyArray(selectedRegions)
        ? selectedRegions[0]
        : '지역';

  const search = (keyword: string) => {
    if (keyword.trim() === '') {
      setSearchInputFocused(false);
      return;
    }

    setSearchInputValue(keyword);
    setSearchKeyword(keyword);
    setSearchInputFocused(false);
  };

  return (
    <Screen
      header={
        <Header left={<Header.Back />}>
          <SearchInput
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
            className='ml-4'
            value={searchInputValue}
            onChange={setSearchInputValue}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search(searchInputValue);
              }
            }}
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
      <Suspense>
        <SearchResult sort={sort} onSortChange={setSort} keyword={searchKeyword} />
      </Suspense>
    </Screen>
  );
};

type SearchResultProps = {
  sort: (typeof SORT_OPTIONS)[number];
  onSortChange: (value: (typeof SORT_OPTIONS)[number]) => void;
  keyword: string;
};

const SearchResult = ({ sort, onSortChange, keyword }: SearchResultProps) => {
  const { stores, fetchNextPage, totalCount } = useSearchInfiniteStoreList({
    keyword,
    sortDirection: SORT_OPTION_PARAMS[sort].direction,
    sortType: SORT_OPTION_PARAMS[sort].type,
  });

  return (
    <>
      <div className='px-grid-margin py-5 flex justify-between border-b border-gray-2'>
        <span className='text-gray-5 body-6'>{totalCount}개의 매장</span>
        <BottomSheet>
          <BottomSheet.Trigger className='flex items-center gap-1'>
            <span className='text-gray-5 body-5'>{SORT_OPTION_PARAMS[sort].label}</span>
            <ChevronDownIcon className='text-gray-5 size-5' />
          </BottomSheet.Trigger>
          <BottomSheet.Content>
            <BottomSheet.Header>
              <BottomSheet.Title className='font-bold text-[24px]'>정렬 기준</BottomSheet.Title>
            </BottomSheet.Header>
            <BottomSheet.Body>
              <BottomSheet.SelectGroup
                value={sort}
                onChange={onSortChange as (value: string) => void}
              >
                {SORT_OPTIONS.map((option) => (
                  <BottomSheet.SelectItem key={option} value={option}>
                    {SORT_OPTION_PARAMS[option].label}
                  </BottomSheet.SelectItem>
                ))}
              </BottomSheet.SelectGroup>
            </BottomSheet.Body>
          </BottomSheet.Content>
        </BottomSheet>
      </div>
      {stores.length === 0 && <EmptyState />}
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
      <IntersectionObserver onIntersect={fetchNextPage} />
    </>
  );
};

type StoreCardProps = {
  store: Store;
};

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <div className='flex flex-col p-grid-margin'>
      <div className='flex items-center'>
        <span className='subtitle-2'>{store.name}</span>
        <span className='ml-2 text-gray-5 body-6'>{STORE_CATEOGORY_LABELS[store.category]}</span>
      </div>
      <div className='flex mt-2 items-center'>
        <StarIcon className='size-[18px] fill-fooding-yellow text-fooding-yellow' />
        <span className='ml-1 subtitle-6'>{store.averageRating}</span>
        <span className='ml-1 text-gray-5 body-6'>({store.reviewCount})</span>
        <span className='size-[2px] bg-gray-5 rounded-full mx-2' />
        <span className='text-gray-5 body-6'>
          예상 대기시간{' '}
          {store.estimatedWaitingTimeMinutes ? store.estimatedWaitingTimeMinutes + '분' : '없음'}
        </span>
      </div>
      <div className='flex mt-2 items-center'>
        <span className='text-gray-5 body-6'>{DUMMY_LOCATION}</span>
      </div>
      <div className='mt-4 flex overflow-x-auto w-full scrollbar-hide px-grid-margin -mx-grid-margin gap-2'>
        <div className='size-[128px] rounded-[12px] bg-gray-100' />
        <div className='size-[128px] rounded-[12px] bg-gray-100' />
        <div className='size-[128px] rounded-[12px] bg-gray-100' />
        <div className='size-[128px] rounded-[12px] bg-gray-100' />
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <FoodingIcon className='text-[#111111]/10 w-[82px] h-[102px]' />
      <h2 className='mt-6 subtitle-3'>앗! 조건에 맞는 매장이 없어요.</h2>
      <ol className='mt-4 text-gray-4 body-4 flex flex-col list-disc ml-6'>
        <li>더 일반적인 검색어로 검색해 보세요.</li>
        <li>문장이 아닌 단어로 검색해 보세요.</li>
        <li>설정된 필터를 확인하고 변경해 보세요.</li>
      </ol>
      <Button variant='outlined' className='mt-6 w-[200px]'>
        신규 업체 등록
      </Button>
    </div>
  );
};
