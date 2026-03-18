import Image from 'next/image';

import { Store, STORE_CATEOGORY_LABELS } from '@repo/api/user';
import { Skeleton } from '@repo/design-system/components/b2c';
import { BookmarkIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { useAddBookmark } from '@/hooks/bookmark/useAddBookmark';
import { useDeleteBookmark } from '@/hooks/bookmark/useDeleteBookmark';
import { cn } from '@/utils/cn';

interface StoreListItemProps {
  hasBookMarkButton?: boolean;
  store: Pick<
    Store,
    | 'id'
    | 'images'
    | 'isFinished'
    | 'name'
    | 'averageRating'
    | 'reviewCount'
    | 'estimatedWaitingTimeMinutes'
    | 'isBookmarked'
    | 'category'
  > & {
    address: string;
  };
}

export const StoreListItem = ({ store, hasBookMarkButton = true }: StoreListItemProps) => {
  const flow = useFlow();

  return (
    <li
      className='flex flex-col w-full py-5'
      onClick={() => flow.push('StoreDetailScreen', { storeId: store.id })}
    >
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <div className='subtitle-2 max-w-[300px] truncate'>{store.name}</div>
          <div className='body-6 text-gray-5'>{STORE_CATEOGORY_LABELS[store.category]}</div>
        </div>
        {hasBookMarkButton && (
          <BookmarkToggleButton isBookmarked={store.isBookmarked} storeId={store.id} />
        )}
      </div>
      <div className='flex items-center mt-2'>
        <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
        <span className='ml-1 subtitle-6'>{store.averageRating}</span>
        <span className='ml-1 body-6 text-gray-5'>({store.reviewCount})</span>
        <span className='size-[2px] rounded-full bg-gray-5 flex mx-2' />
        <span className='body-6 text-gray-5'>
          {store.estimatedWaitingTimeMinutes
            ? `예상 대기시간 ${store.estimatedWaitingTimeMinutes}분`
            : '바로 입장가능'}
        </span>
      </div>
      <span className='mt-2 text-gray-5 text-[14px]'>{store.address}</span>
      <div className='-mx-grid-margin mt-4'>
        <div className='flex gap-2 overflow-x-auto w-full scrollbar-hide px-grid-margin'>
          {store.images && store.images.length > 0 ? (
            store.images.slice(0, 3).map((image) => (
              <div
                key={image.id}
                className='rounded-[12px] flex-shrink-0 w-[128px] h-[128px] overflow-hidden relative'
              >
                <Image src={image.imageUrl} alt={store.name} fill className='object-cover' />
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center bg-gray-1 w-[128px] h-[128px] rounded-[12px] shrink-0'>
              <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

type BookmarkToggleButtonProps = {
  storeId: number;
  isBookmarked: boolean;
};

const BookmarkToggleButton = ({ storeId, isBookmarked }: BookmarkToggleButtonProps) => {
  const addBookmark = useAddBookmark();
  const deleteBookMark = useDeleteBookmark();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    if (deleteBookMark.isPending || addBookmark.isPending) {
      return;
    }

    if (isBookmarked) {
      deleteBookMark.mutate(storeId);
    } else {
      addBookmark.mutate(storeId);
    }
  };

  return (
    <button onClick={onClick}>
      <BookmarkIcon
        className={cn('text-gray-5', isBookmarked && 'text-primary-pink fill-primary-pink')}
        size={30}
      />
    </button>
  );
};

const StoreListItemSkeleton = () => {
  return (
    <div>
      <div className='flex gap-2 items-center pt-5'>
        <Skeleton shape='text' width={100} height={32} />
        <Skeleton shape='text' width={80} height={16} />
      </div>
      <div className='flex gap-2 items-center mt-2'>
        <Skeleton shape='text' width={60} height={14} />
        <Skeleton shape='text' width={60} height={14} />
      </div>
      <Skeleton shape='text' className='mt-3' width={140} height={18} />
      <div className='mt-4 flex gap-2 -mx-grid-margin px-grid-margin'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <Skeleton width={128} height={128} />
          </div>
        ))}
      </div>
    </div>
  );
};

StoreListItem.Skeleton = StoreListItemSkeleton;
