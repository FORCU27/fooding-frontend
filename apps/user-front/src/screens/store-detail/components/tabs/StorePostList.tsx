import { EmptyState } from '@repo/design-system/components/b2c';
import { useFlow } from '@stackflow/react/future';

import { StoreTagList } from '@/components/Store/StoreTagList';
import { useGetStorePostList } from '@/hooks/store-post/useGetStorePostList';
import { formatDate } from '@/utils/date';

type StoreDetailPostListTabProps = {
  storeId: number;
};

export const StoreDetailPostListTab = ({ storeId }: StoreDetailPostListTabProps) => {
  const { data: storePosts } = useGetStorePostList({
    storeId,
  });

  if (storePosts.length === 0) {
    return <EmptyState className='my-[120px]' title='등록된 가게 소식이 없어요.' />;
  }

  return (
    <ul className='py-5 flex flex-col bg-white px-grid-margin divide-y divide-gray-2'>
      {storePosts.map((storePost) => (
        <StorePostListItem key={storePost.id} storePost={storePost} />
      ))}
    </ul>
  );
};

type StorePostListItemProps = {
  storePost: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
  };
};

const StorePostListItem = ({ storePost }: StorePostListItemProps) => {
  const flow = useFlow();

  return (
    <li
      className='flex flex-col w-fit'
      role='button'
      tabIndex={0}
      onClick={() => flow.push('StorePostDetailScreen', { storePostId: storePost.id })}
    >
      {storePost.tags.length > 0 && <StoreTagList tags={storePost.tags} />}
      <div className='mt-3 bg-gray-1 rounded-[12px] size-[180px]' />
      <p className='mt-3 body-5'>{storePost.title}</p>
      <p className='mt-2 body-8 text-gray-5 whitespace-pre-wrap'>{storePost.content}</p>
      <span className='mt-4 body-8 text-gray-5'>
        {formatDate(storePost.createdAt, { format: 'dot' })}
      </span>
    </li>
  );
};
