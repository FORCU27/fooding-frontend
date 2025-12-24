import Image from 'next/image';

import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { StoreTagList } from '@/components/Store/StoreTagList';
import { useGetStorePostDetail } from '@/hooks/store-post/useGetStorePostDetail';
import { formatDate } from '@/utils/date';

export type StorePostDetailScreenParams = { storePostId: number; storeName: string };

export const StorePostDetailScreen: ActivityComponentType<'StorePostDetailScreen'> = ({
  params,
}) => {
  return (
    <Screen header={<Header left={<Header.Back />} title={params.storeName} />}>
      <DefaultErrorBoundary>
        <Suspense clientOnly>
          <StorePostDetail storePostId={params.storePostId} />
        </Suspense>
      </DefaultErrorBoundary>
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
      {storePost.tags && <StoreTagList className='mt-5' tags={storePost.tags} />}
      <h1 className='mt-4 headline-2'>{storePost.title}</h1>
      <span className='mt-4 body-8 text-gray-5'>
        {formatDate(storePost.createdAt, { format: 'dot' })}
      </span>
      <div className='mt-5 h-[1px] w-full bg-gray-2' />
      {storePost.images && storePost.images.length > 0 && (
        <div className='flex flex-col gap-3 mt-5'>
          {storePost.images.map((image) => (
            <Image
              src={image.imageUrl}
              alt='가게 소식 이미지'
              width={180}
              height={180}
              className='rounded-[12px] w-full object-cover'
              key={image.imageId}
            />
          ))}
        </div>
      )}
      <p className='mt-5 whitespace-pre-wrap body-3-2'>{storePost.content}</p>
    </div>
  );
};
