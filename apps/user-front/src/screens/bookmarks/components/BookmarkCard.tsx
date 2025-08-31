import Image from 'next/image';

import { Bookmark } from '@repo/api/user';
import { BookmarkIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { useDeleteBookmark } from '@/hooks/bookmark/useDeleteBookmark';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const flow = useFlow();
  const deleteBookMark = useDeleteBookmark();

  const handleDeleteBookmarkClick = (bookmarkId: number) => {
    deleteBookMark.mutate(bookmarkId);
  };

  return (
    <li key={bookmark.id} className='flex flex-col min-h-[240px] relative'>
      <div className='h-full w-[140px]'>
        <div className='relative h-[140px] mb-2 rounded-xl overflow-hidden'>
          {bookmark.images.length > 0 ? (
            bookmark.images.map((image, idx) => (
              <Image
                key={`${image}_${idx}}`}
                width={140}
                height={140}
                src={image}
                alt={bookmark.name || 'bookmark image'}
                className='rounded-xl mb-4 object-center'
              />
            ))
          ) : (
            <div className='flex justify-center items-center w-full h-full bg-gray-1'>
              <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
            </div>
          )}
          {bookmark.isFinished && (
            <div className='absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl'>
              <p className='subtitle-3 text-white'>영업 종료</p>
            </div>
          )}
          <div className='absolute top-2 right-2'>
            <BookmarkIcon
              color='var(--color-primary-pink)'
              fill='var(--color-primary-pink)'
              size={24}
              cursor='pointer'
              onClick={() => handleDeleteBookmarkClick(bookmark.id)}
            />
          </div>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => flow.push('StoreDetailScreen', { storeId: bookmark.storeId })}
        >
          <div className='break-words line-clamp-2 subtitle-5 w-[144px]'>{bookmark.name}</div>
          <div className='flex flex-col gap-1'>
            <div className='subtitle-5 flex items-center gap-1 h-[17px]'>
              <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
              <span className='text-[#FFD83D] subtitle-6'>{bookmark.averageRating}</span>
              <span className='body-6 text-gray-5'>({bookmark.reviewCount})</span>
            </div>
            <p className='body-8 text-gray-5'>
              {bookmark.estimatedWaitingTimeMinutes
                ? `예상 대기시간 ${bookmark.estimatedWaitingTimeMinutes}분`
                : '바로 입장가능'}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
