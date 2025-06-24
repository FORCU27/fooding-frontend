import Image from 'next/image';

import { Store } from '@repo/api/user';
import { BookmarkIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';

interface StoresListSectionProps {
  items: Store[];
}

export const BookmarkList = ({ items }: StoresListSectionProps) => {
  return (
    <div className='p-grid-margin flex flex-col gap-5 '>
      {items.map((item) => (
        <div key={item.id} className='flex flex-col gap-2 w-full'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div className='subtitle-2'>{item.name}</div>
              <div className='body-6 text-gray-5'>고깃집</div>
            </div>
            <BookmarkIcon
              size={30}
              fill={'var(--color-primary-pink)'}
              color={'var(--color-primary-pink)'}
            />
          </div>
          <div className='flex items-center gap-2'>
            <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
            <span className='subtitle-6'>{item.averageRating}</span>
            <span className='body-6 text-gray-5'>({item.reviewCount})</span>
            <span className='body-6 text-gray-5'>
              {item.estimatedWaitingTimeMinutes
                ? `• 예상 대기시간 ${item.estimatedWaitingTimeMinutes}분`
                : '• 바로 입장가능'}
            </span>
          </div>
          <div className='body-6 text-gray-5'>{item.city}</div>
          <div>
            {item.mainImage ? (
              <Image
                width={128}
                height={128}
                src={`/${item.mainImage}`}
                alt={item.name || 'store image'}
                className='rounded-xl mb-4 object-center'
              />
            ) : (
              <div className='flex gap-2 justify-around'>
                <div className='flex justify-center items-center bg-gray-1 w-[128px] h-[128px] rounded-xl'>
                  <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                </div>
                <div className='flex justify-center items-center bg-gray-1 w-[128px] h-[128px] rounded-xl'>
                  <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                </div>
                <div className='flex justify-center items-center bg-gray-1 w-[128px] h-[128px] rounded-xl'>
                  <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                </div>
              </div>
            )}
          </div>
          <hr className='text-gray-2 my-3' />
        </div>
      ))}
    </div>
  );
};
