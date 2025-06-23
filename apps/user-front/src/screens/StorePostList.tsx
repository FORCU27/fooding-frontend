import { StoreTagList } from '@/components/Store/StoreTagList';
import { useGetStorePostList } from '@/hooks/store-post/useGetStorePostList';

type StorePostListProps = {
  storeId: number;
};

export const StorePostList = ({ storeId }: StorePostListProps) => {
  const { data: storePosts } = useGetStorePostList({
    storeId,
  });

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
  return (
    <li className='flex flex-col'>
      {storePost.tags.length > 0 && <StoreTagList tags={storePost.tags} />}
      <div className='mt-3 bg-gray-1 rounded-[12px] size-[180px]' />
      <p className='mt-3 body-5'>{storePost.title}</p>
      <p className='mt-2 body-8 text-gray-5 whitespace-pre-wrap'>{storePost.content}</p>
      <span className='mt-4 body-8 text-gray-5'>{storePost.createdAt}</span>
    </li>
  );
};
