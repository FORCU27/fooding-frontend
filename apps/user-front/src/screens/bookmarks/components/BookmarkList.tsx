import Image from 'next/image';
import React from 'react';

import { BookmarkIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';

import { useDeleteBookmark } from '@/hooks/bookmark/useDeleteBookmark';
import { useGetBookmarkList } from '@/hooks/bookmark/useGetBookmarkList';

export const BookmarkList = () => {
  const {
    data: { list: bookmarks },
  } = useGetBookmarkList();
  const deleteBookMark = useDeleteBookmark();

  const handleDeleteBookmarkClick = (bookmarkId: number) => {
    deleteBookMark.mutate(bookmarkId);
  };

  return (
    <ul className='px-grid-margin flex flex-col divide-y divide-gray-2'>
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id} className='flex flex-col w-full py-5'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div className='subtitle-2 max-w-[300px] truncate'>{bookmark.name}</div>
              {/* TODO: 하드코딩 수정 */}
              <div className='body-6 text-gray-5'>고깃집</div>
            </div>
            <BookmarkIcon
              size={30}
              color={'var(--color-primary-pink)'}
              fill={'var(--color-primary-pink)'}
              cursor='pointer'
              onClick={() => handleDeleteBookmarkClick(bookmark.storeId)}
            />
          </div>
          <div className='flex items-center mt-2'>
            <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
            <span className='ml-1 subtitle-6'>{bookmark.averageRating}</span>
            <span className='ml-1 body-6 text-gray-5'>({bookmark.reviewCount})</span>
            <span className='size-[2px] rounded-full bg-gray-5 flex mx-2' />
            <span className='body-6 text-gray-5'>
              {bookmark.estimatedWaitingTimeMinutes
                ? `예상 대기시간 ${bookmark.estimatedWaitingTimeMinutes}분`
                : '바로 입장가능'}
            </span>
          </div>
          {/* TODO: 하드코딩 수정 */}
          <span className='mt-2 text-gray-5 text-[14px]'>제주 제주시 서해안로 654</span>
          <div className='-mx-grid-margin mt-4'>
            <div className='flex gap-2 overflow-x-auto w-full scrollbar-hide px-grid-margin'>
              {bookmark.images && bookmark.images.length > 0 ? (
                <div className='rounded-[12px] shrink-0 size-[128px] relative overflow-hidden'>
                  {bookmark.images.map((image) => (
                    <Image key={image.id} src={image.imageUrl} alt={bookmark.name} fill />
                  ))}
                </div>
              ) : (
                <div className='flex justify-center items-center bg-gray-1 w-[128px] h-[128px] rounded-[12px] shrink-0'>
                  <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
