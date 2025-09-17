import Image from 'next/image';
import { useRef, useState } from 'react';

import { Store, STORE_CATEOGORY_LABELS } from '@repo/api/user';
import { BottomSheet, Button, ChipFilter, SearchInput } from '@repo/design-system/components/b2c';
import { ChevronDownIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { AutoComplete } from '../search/components/AutoComplete';
import { IntersectionObserver } from '@/components/IntersectionObserver';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { useSearchInfiniteStoreList } from '@/hooks/store/useSearchInfiniteStoreList';
import { isNonEmptyArray } from '@/utils/array';

export type SearchResultScreenParams = {
  keyword: string;
  regions: {
    id: string;
    name: string;
  }[];
};

const SORT_OPTIONS = [
  'recent',
  'recommend',
  'averageRating',
  'review',
  'priceDesc',
  'priceAsc',
] as const;

const SORT_OPTION_PARAMS = {
  recent: { type: 'RECENT', direction: 'DESCENDING', label: '최신순' },
  recommend: { type: 'RECOMMENDED', direction: undefined, label: '추천순' },
  averageRating: { type: 'AVERAGE_RATING', direction: 'DESCENDING', label: '별점 순' },
  review: { type: 'REVIEW', direction: 'DESCENDING', label: '리뷰 많은 순' },
  priceDesc: { type: 'PRICE', direction: 'DESCENDING', label: '가격 높은 순' },
  priceAsc: { type: 'PRICE', direction: 'ASCENDING', label: '가격 낮은 순' },
} as const;

export const SearchResultScreen: ActivityComponentType<'SearchResultScreen'> = ({ params }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<{ id: string; name: string }[]>(
    params.regions,
  );
  const [searchInputValue, setSearchInputValue] = useState(params.keyword);
  const [searchKeyword, setSearchKeyword] = useState(params.keyword);
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>(SORT_OPTIONS[0]);

  const filterLabel = (() => {
    if (isNonEmptyArray(selectedRegions)) {
      if (selectedRegions.length > 1) {
        return `${selectedRegions[0].name}..외 ${selectedRegions.length - 1}개`;
      }

      return selectedRegions[0].name;
    }

    return '지역';
  })();

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
            ref={searchInputRef}
            onFocus={() => setSearchInputFocused(true)}
            className='ml-4'
            value={searchInputValue}
            onChange={setSearchInputValue}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                search(searchInputValue);
                searchInputRef.current?.blur();
                setSearchInputFocused(false);
              }
            }}
          />
        </Header>
      }
    >
      {searchInputValue && searchInputFocused && (
        <AutoComplete
          className='absolute inset-0 z-10'
          keyword={searchInputValue}
          onSelect={search}
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
      <div className='relative flex flex-col h-full'>
        <BottomSheet>
          <BottomSheet.Trigger className='flex items-center gap-1 absolute right-grid-margin top-4'>
            <span className='text-gray-5 body-5'>{SORT_OPTION_PARAMS[sort].label}</span>
            <ChevronDownIcon className='text-gray-5 size-5' />
          </BottomSheet.Trigger>
          <BottomSheet.Content>
            <BottomSheet.Header>
              <BottomSheet.Title className='font-bold text-[24px]'>정렬 기준</BottomSheet.Title>
            </BottomSheet.Header>
            <BottomSheet.Body>
              <BottomSheet.SelectGroup value={sort} onChange={setSort as (value: string) => void}>
                {SORT_OPTIONS.map((option) => (
                  <BottomSheet.SelectItem key={option} value={option}>
                    {SORT_OPTION_PARAMS[option].label}
                  </BottomSheet.SelectItem>
                ))}
              </BottomSheet.SelectGroup>
            </BottomSheet.Body>
          </BottomSheet.Content>
        </BottomSheet>
        <DefaultErrorBoundary>
          <Suspense>
            <SearchResult
              sort={sort}
              keyword={searchKeyword}
              regionIds={selectedRegions.map((region) => region.id)}
            />
          </Suspense>
        </DefaultErrorBoundary>
      </div>
    </Screen>
  );
};

type SearchResultProps = {
  sort: (typeof SORT_OPTIONS)[number];
  keyword: string;
  regionIds: string[];
};

const SearchResult = ({ sort, keyword, regionIds }: SearchResultProps) => {
  const { stores, fetchNextPage, totalCount } = useSearchInfiniteStoreList({
    keyword,
    regionIds,
    sortType: SORT_OPTION_PARAMS[sort].type,
    sortDirection: SORT_OPTION_PARAMS[sort].direction,
  });

  return (
    <>
      <div className='px-grid-margin py-5 flex justify-between border-b border-gray-2'>
        <span className='text-gray-5 body-6'>{totalCount}개의 매장</span>
      </div>
      {stores.length === 0 && <EmptyState />}
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={{
            id: store.id,
            name: store.name,
            category: store.category,
            averageRating: store.averageRating,
            reviewCount: store.reviewCount,
            estimatedWaitingTimeMinutes: store.estimatedWaitingTimeMinutes,
            address: store.address,
            imageUrls: store.images.map((image) => image.imageUrl),
          }}
        />
      ))}
      <IntersectionObserver onIntersect={fetchNextPage} />
    </>
  );
};

type StoreCardProps = {
  store: {
    id: Store['id'];
    name: Store['name'];
    category: Store['category'];
    averageRating: Store['averageRating'];
    reviewCount: Store['reviewCount'];
    estimatedWaitingTimeMinutes: Store['estimatedWaitingTimeMinutes'];
    address: string;
    imageUrls: string[];
  };
};

const StoreCard = ({ store }: StoreCardProps) => {
  const flow = useFlow();

  return (
    <div
      className='flex flex-col p-grid-margin'
      onClick={() => flow.push('StoreDetailScreen', { storeId: store.id })}
    >
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
          {store.estimatedWaitingTimeMinutes
            ? '예상 대기시간 ' + store.estimatedWaitingTimeMinutes + '분'
            : '바로 입장가능'}
        </span>
      </div>
      <div className='flex mt-2 items-center'>
        <span className='text-gray-5 body-6'>{store.address}</span>
      </div>
      {store.imageUrls.length > 0 && (
        <div className='-mx-grid-margin'>
          <div className='mt-4 flex overflow-x-auto w-full scrollbar-hide px-grid-margin gap-2'>
            {store.imageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                width={128}
                height={128}
                src={imageUrl}
                alt='가게 이미지'
                className='size-[128px] rounded-[12px]'
              />
            ))}
          </div>
        </div>
      )}
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
      {/* TODO: 신규 업체 등록 기능 추가 */}
      <Button variant='outlined' className='mt-6 w-[200px]'>
        신규 업체 등록
      </Button>
    </div>
  );
};
