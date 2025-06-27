'use client';

import { Suspense } from 'react';

import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';

import { Banner } from './components/Banner';
import { CategoryTabs } from './components/CategoryTabs';
import { HomeLoadingFallback } from './components/HomeLoadingFallback';
import { MainStoreList } from './components/MainStoreList';
import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import BottomTab from '@/components/Layout/BottomTab';
import { Screen } from '@/components/Layout/Screen';
import { StoresList } from '@/components/Store/StoresList';
import { useGetStoreImmediateEntryList } from '@/hooks/store/useGetStoreImmediateEntryList';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import Header from '@/tabs/home/components/Header';
import Menubar from '@/tabs/home/components/Menubar';
import { noop } from '@/utils/noop';

const CATEGORY_LIST = ['고깃집', '패스트푸드점', '카페', '레스토랑', '일식', '베이커리', '기타'];

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
  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
  });

  const { data: popularStores } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'REVIEW',
    sortDirection: 'DESCENDING',
  });

  const { data: immediateEntryStores } = useGetStoreImmediateEntryList({
    pageNum: 1,
    pageSize: 10,
  });

  return (
    <div className='flex flex-col w-full'>
      <Menubar />
      <div className='bg-white mb-3'>
        <Banner />
        <div className='flex flex-col  py-grid-margin mb-3'>
          <CategoryTabs categories={CATEGORY_LIST} />
          <MainStoreList stores={stores.list} />
        </div>
      </div>

      <StoresList
        subtitle='푸딩에서 인기 많은 식당이에요'
        stores={popularStores.list}
        onClickTotalBtn={noop}
      />
      <StoresList subtitle='새로 오픈했어요!' stores={stores.list} onClickTotalBtn={noop} />
      <StoresList
        subtitle='지금 바로 입장하실 수 있어요!'
        stores={immediateEntryStores.list}
        onClickTotalBtn={noop}
      />
    </div>
  );
};

export default Content;
