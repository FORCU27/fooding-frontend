import Image from 'next/image';

import { Store } from '@repo/api/user';
import { BookmarkIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

interface StoreCardProps {
  store: Store;
}

export const StoreCard = ({ store }: StoreCardProps) => {
  const flow = useFlow();

  return (
    <li
      key={store.id}
      className='flex flex-col min-h-[240px] relative cursor-pointer'
      onClick={() => flow.push('StoreDetailScreen', { storeId: store.id })}
    >
      <div className='h-full w-[140px]'>
        <div className='relative h-[140px] mb-2 rounded-xl overflow-hidden'>
          {store.mainImage !== null ? (
            <Image
              width={140}
              height={140}
              src={`/${store.mainImage}`}
              alt={store.name || 'store image'}
              className='rounded-xl mb-4 object-center'
            />
          ) : (
            <div className='flex justify-center items-center w-full h-full bg-gray-1'>
              <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
            </div>
          )}
          {store.isFinished && (
            <div className='absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl'>
              <p className='subtitle-3 text-white'>영업 종료</p>
            </div>
          )}
          <div className='absolute top-2 right-2 z-10'>
            {store.isBookmarked ? (
              <BookmarkIcon
                color='var(--color-primary-pink)'
                fill='var(--color-primary-pink)'
                size={24}
                cursor='pointer'
              />
            ) : (
              <BookmarkIcon color='white' size={24} cursor='pointer' />
            )}
          </div>
        </div>
        <div className='break-words line-clamp-2 subtitle-5 w-[144px]'>{store.name}</div>
        <div className='flex flex-col gap-1'>
          <div className='subtitle-5 flex items-center gap-1 h-[17px]'>
            <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
            <span className='text-[#FFD83D] subtitle-6'>{store.averageRating}</span>
            <span className='body-6 text-gray-5'>({store.reviewCount})</span>
          </div>
          <p className='body-8 text-gray-5'>
            {store.city.length >= 3 ? store.city.slice(0, 2) : store.city} •{' '}
            {store.estimatedWaitingTimeMinutes
              ? `예상 대기시간 ${store.estimatedWaitingTimeMinutes}분`
              : '바로 입장가능'}
          </p>
        </div>
      </div>
    </li>
  );
};
