import { ActivityComponentType } from '@stackflow/react/future';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { StoreTagList } from '@/components/Store/StoreTagList';
import { useGetStorePostDetail } from '@/hooks/store-post/useGetStorePostDetail';
import { formatDate } from '@/utils/date';

const mock = {
  tags: ['대표', '공지'],
};

export const StorePostDetailScreen: ActivityComponentType<'StorePostDetailScreen'> = () => {
  const params = {
    storeName: '강고기',
    storePostId: 1,
  } as const;

  return (
    <Screen header={<Header left={<Header.Back />} title={params.storeName} />}>
      {/* TODO: 에러 UI 추가 */}
      <ErrorBoundary fallback={null}>
        <Suspense clientOnly fallback={<LoadingFallback />}>
          <StorePostDetail storePostId={params.storePostId} />
        </Suspense>
      </ErrorBoundary>
    </Screen>
  );
};

type StorePostDetailProps = {
  storePostId: number;
};

const StorePostDetail = ({ storePostId }: StorePostDetailProps) => {
  const { data: storePost } = useGetStorePostDetail(storePostId);

  return (
    <div className='flex flex-col px-grid-margin pb-24'>
      <StoreTagList className='mt-5' tags={mock.tags} />
      <h1 className='mt-4 headline-2'>{storePost.title}</h1>
      <span className='mt-4 body-8 text-gray-5'>
        {formatDate(storePost.createdAt, { format: 'dot' })}
      </span>
      <div className='mt-5 h-[1px] w-full bg-gray-2' />
      {/* TODO: 소식 상세 이미지 추가 */}
      <div className='mt-5 bg-gray-1 rounded-[12px] h-[240px]' />
      <p className='mt-5 whitespace-pre-wrap body-3-2'>{storePost.content}</p>
      {/* TODO: 바텀 CTA 추가 */}
    </div>
  );
};

// TODO: 스켈레톤 추가
const LoadingFallback = () => {
  return <div></div>;
};
