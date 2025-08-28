import Image from 'next/image';
import React from 'react';

import { BookmarkIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';

import { useDeleteBookmark } from '@/hooks/bookmark/useDeleteBookmark';
import { useGetBookmarkList } from '@/hooks/bookmark/useGetBookmarkList';

export const BookmarkList = () => {
  const { data: bookmarks } = useGetBookmarkList();
  const deleteBookMark = useDeleteBookmark();
  const handleDeleteBookmarkClick = (bookmarkId: number) => {
    deleteBookMark.mutate(bookmarkId);
  };
  return (
    <div className='p-grid-margin flex flex-col gap-5'>
      {bookmarks.list.map((bookmark, idx) => (
        <React.Fragment key={bookmark.id}>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='subtitle-2 max-w-[300px] truncate'>{bookmark.name}</div>
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
            <div className='flex items-center gap-2'>
              <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
              <span className='subtitle-6'>{bookmark.averageRating}</span>
              <span className='body-6 text-gray-5'>({bookmark.reviewCount})</span>
              <span className='body-6 text-gray-5'>
                {bookmark.estimatedWaitingTimeMinutes
                  ? `• 예상 대기시간 ${bookmark.estimatedWaitingTimeMinutes}분`
                  : '• 바로 입장가능'}
              </span>
            </div>
            <div>
              <div>
                {bookmark.images.length > 0 ? (
                  <div className='flex gap-2'>
                    {bookmark.images.map((image, i) => (
                      <Image
                        key={i}
                        width={128}
                        height={128}
                        src={image}
                        alt={bookmark.name || 'store image'}
                        className='rounded-xl mb-4 object-center'
                      />
                    ))}
                  </div>
                ) : (
                  <div className='flex gap-2 justify-around'>
                    <div className='flex justify-center items-center bg-gray-1 w-[128px] h-[128px] rounded-xl'>
                      <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {idx < bookmarks.list.length - 1 ? (
            <hr className='text-gray-2 my-3' />
          ) : (
            <div className='mb-6' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
