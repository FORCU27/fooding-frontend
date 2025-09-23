import Image from 'next/image';

import { Store } from '@repo/api/user';
import { FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { isNonEmptyArray } from '@/utils/array';


interface MainStoreListProps {
  stores: Store[];
}

export const MainStoreList = ({ stores }: MainStoreListProps) => {
  const flow = useFlow();

  return (
    <div className='flex flex-col px-grid-margin bg-white/80'>
      <ul className='flex gap-3 overflow-x-auto scrollbar-hide -mx-grid-margin px-grid-margin'>
        {stores.map((store) => (
          <li key={store.id} className='flex flex-col relative'>
            <div
              className='relative mb-2 rounded-xl overflow-hidden w-[220px] h-[140px]'
              onClick={() => flow.push('StoreDetailScreen', { storeId: store.id })}
            >
              {store.images && isNonEmptyArray(store.images) ? (
                <Image
                  width={220}
                  height={140}
                  src={store.images[0].imageUrl}
                  alt={store.name}
                  className='rounded-xl object-cover w-[220px] h-[140px]'
                />
              ) : (
                <div className='flex justify-center items-center bg-gray-1 w-[220px] h-[140px]'>
                  <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                </div>
              )}
              {store.isFinished && (
                <div className='absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl'>
                  <p className='subtitle-3 text-white'>영업 종료</p>
                </div>
              )}
            </div>
            <div className='flex flex-col p-1'>
              <div className='subtitle-5 flex items-center gap-1'>
                <p className='subtitle-5 max-w-[125px] truncate'>{store.name}</p>
                <div className='flex justify-center items-center'>
                  <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
                  <span className='text-[#FFD83D] subtitle-6'>{store.averageRating}</span>
                </div>
                <span className='flex body-6 text-gray-5'>({store.reviewCount})</span>
              </div>
              <p className='body-8 text-gray-5'>
                {store.estimatedWaitingTimeMinutes
                  ? `예상 대기시간 ${store.estimatedWaitingTimeMinutes}분`
                  : '바로 입장가능'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
