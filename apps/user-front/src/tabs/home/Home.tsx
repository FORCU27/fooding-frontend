'use client';

import { Suspense, useState } from 'react';

import { StoreCategory } from '@repo/api/user';
import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';

import { Banner } from './components/Banner';
import { CategoryTabs } from './components/CategoryTabs';
import { HomeLoadingFallback } from './components/HomeLoadingFallback';
import { MainStoreList } from './components/MainStoreList';
import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import BottomTab from '@/components/Layout/BottomTab';
import { Divider } from '@/components/Layout/Divider';
import { Screen } from '@/components/Layout/Screen';
import { StoresList } from '@/components/Store/StoresList';
import { usePreferredRegions } from '@/hooks/regions/usePreferredRegions';
import { useGetStoreImmediateEntryList } from '@/hooks/store/useGetStoreImmediateEntryList';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { Header } from '@/tabs/home/components/Header';
import { Toolbar } from '@/tabs/home/components/Toolbar';

export const HomeTab: ActivityComponentType<'HomeTab'> = () => {
  return (
    <Screen header={<Header />} bottomTab={<BottomTab currentTab='home' />}>
      <Content />
    </Screen>
  );
};

const Content = () => {
  return (
    <ErrorBoundary
      fallback={({ reset }: ErrorBoundaryFallbackProps) => (
        <ErrorFallback className='flex-1'>
          <ErrorFallback.Title>알 수 없는 에러가 발생했습니다</ErrorFallback.Title>
          <ErrorFallback.Description>잠시 후 다시 시도해 주세요</ErrorFallback.Description>
          <ErrorFallback.Actions>
            <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
          </ErrorFallback.Actions>
        </ErrorFallback>
      )}
    >
      <LoadingToggle fallback={<HomeLoadingFallback />}>
        <Suspense fallback={<HomeLoadingFallback />}>
          <ContentBody />
        </Suspense>
      </LoadingToggle>
    </ErrorBoundary>
  );
};

const ContentBody = () => {
  const { preferredRegions, changePreferredRegions } = usePreferredRegions();
  const [category, setCategory] = useState<StoreCategory | null>(null);

  return (
    <div className='flex flex-col w-full'>
      <Toolbar
        selectedRegions={preferredRegions}
        onSelectedRegionsChange={changePreferredRegions}
      />
      <div className='bg-white mb-3'>
        <Banner />
        <CategoryTabs category={category} onCategoryChange={setCategory} />
        <Suspense>
          <StoreSection selectedRegions={preferredRegions} category={category} />
        </Suspense>
      </div>
    </div>
  );
};

type StoreSectionProps = {
  selectedRegions: { id: string; name: string }[];
  category: StoreCategory | null;
};

const StoreSection = ({ selectedRegions, category }: StoreSectionProps) => {
  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
    regionIds: selectedRegions.map((region) => region.id),
    category: category ?? undefined,
  });

  const { data: popularStores } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'REVIEW',
    sortDirection: 'DESCENDING',
    regionIds: selectedRegions.map((region) => region.id),
    category: category ?? undefined,
  });

  const { data: immediateEntryStores } = useGetStoreImmediateEntryList({
    pageNum: 1,
    pageSize: 10,
    regionIds: selectedRegions.map((region) => region.id),
    category: category ?? undefined,
  });

  const flow = useFlow();

  return (
    <>
      {stores.list.length > 0 && <MainStoreList stores={stores.list} />}
      <Divider />
      <StoresList
        subtitle='푸딩에서 인기 많은 식당이에요'
        stores={popularStores.list}
        onClickTotalBtn={() => flow.push('SearchResultScreen', { keyword: '', regions: [] })}
      />
      <StoresList
        className='pt-0'
        subtitle='새로 오픈했어요!'
        stores={stores.list}
        onClickTotalBtn={() => flow.push('SearchResultScreen', { keyword: '', regions: [] })}
      />
      <StoresList
        className='pt-0'
        subtitle='지금 바로 입장하실 수 있어요!'
        stores={immediateEntryStores.list}
        onClickTotalBtn={() => flow.push('SearchResultScreen', { keyword: '', regions: [] })}
      />
    </>
  );
};

export default Content;
