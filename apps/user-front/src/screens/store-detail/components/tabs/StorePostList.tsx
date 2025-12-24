import Image from 'next/image';

import { StorePost } from '@repo/api/user';
import { EmptyState } from '@repo/design-system/components/b2c';
import { useFlow } from '@stackflow/react/future';

import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { StoreTagList } from '@/components/Store/StoreTagList';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useGetStorePostList } from '@/hooks/store-post/useGetStorePostList';
import { isNonEmptyArray } from '@/utils/array';
import { formatDate } from '@/utils/date';

type StoreDetailPostListTabProps = {
  storeId: number;
};

export const StoreDetailPostListTab = ({ storeId }: StoreDetailPostListTabProps) => {
  const {
    data: storePosts,
    isFetching,
    isPending,
  } = useGetStorePostList({
    storeId,
  });

  const { data: store } = useGetStoreDetail(storeId);

  if (isFetching || isPending) return <LoadingScreen />;

  if (storePosts.list.length === 0) {
    return <EmptyState className='my-16' title='등록된 가게 소식이 없어요.' />;
  }

  return (
    <ul className='pb-[120px] flex flex-col bg-white px-grid-margin divide-y divide-gray-2'>
      {storePosts.list.map((storePost) => (
        <StorePostListItem key={storePost.id} storePost={storePost} storeName={store.name} />
      ))}
    </ul>
  );
};

type StorePostListItemProps = {
  storePost: StorePost;
  storeName: string;
};

const StorePostListItem = ({ storePost, storeName }: StorePostListItemProps) => {
  const flow = useFlow();

  return (
    <li
      className='flex flex-col py-5'
      role='button'
      tabIndex={0}
      onClick={() => flow.push('StorePostDetailScreen', { storePostId: storePost.id, storeName })}
    >
      {storePost.tags && storePost.tags.length > 0 && <StoreTagList tags={storePost.tags} />}
      {storePost.images && isNonEmptyArray(storePost.images) && (
        <Image
          src={
            storePost.images[0].imageUrl.startsWith('http')
              ? storePost.images[0].imageUrl
              : `/${storePost.images[0].imageUrl}`
          }
          alt='가게 소식 이미지'
          width={180}
          height={180}
          className='mt-3 bg-gray-1 rounded-[12px] size-[180px] object-cover'
        />
      )}
      <p className='mt-3 body-5'>{storePost.title}</p>
      <p className='mt-2 body-8 text-gray-5 whitespace-pre-wrap line-clamp-2'>
        {storePost.content}
      </p>
      <span className='mt-4 body-8 text-gray-5'>
        {formatDate(storePost.createdAt, { format: 'dot' })}
      </span>
    </li>
  );
};
