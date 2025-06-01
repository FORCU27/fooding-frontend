import Image from 'next/image';

import { BookmarkIcon, ChevronRightIcon, StarIcon } from '@repo/design-system/icons';

export interface RestaurantItem {
  id: number;
  name: string;
  image: string;
  city: string;
  reviewScore: number;
  reviewCount: number;
  estimatedWaitingTimeMinutes: number;
  bookMarded: boolean;
  finished: boolean;
}

interface RestaurantsListSectionProps {
  subtitle: string;
  items: RestaurantItem[];
}

const RestaurantsListSection = ({ subtitle, items }: RestaurantsListSectionProps) => {
  return (
    <div className='flex flex-col p-5 bg-white/80'>
      <div className='flex justify-between mb-4'>
        <div className='subtitle-3'>{subtitle}</div>
        <button className='flex justify-center items-center body-5 text-gray-5 cursor-pointer hover:text-black'>
          <span>전체보기</span>
          <ChevronRightIcon size={14} />
        </button>
      </div>

      <div className='overflow-x-auto scrollbar-hide'>
        <div className='flex flex-col justify-between'>
          <div className='flex gap-3 w-max'>
            {items.map((item) => (
              <div key={item.id} className='flex flex-col min-h-[240px] relative'>
                <div className='h-full w-[140px]'>
                  <div className='relative h-[140px] mb-2 rounded-xl overflow-hidden'>
                    <Image
                      width={140}
                      height={140}
                      src={`/${item.image}`}
                      alt={item.name || 'restaurant image'}
                      className='rounded-xl mb-4 object-center'
                    />
                    {item.finished && (
                      <div className='absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl'>
                        <p className='subtitle-3 text-white'>영업 종료</p>
                      </div>
                    )}
                    {item.bookMarded ? (
                      <BookmarkIcon
                        className='absolute top-2 right-2'
                        color='var(--color-primary-pink)'
                        fill='var(--color-primary-pink)'
                        size={24}
                        cursor='pointer'
                      />
                    ) : (
                      <BookmarkIcon
                        className='absolute top-2 right-2'
                        color='white'
                        size={24}
                        cursor='pointer'
                      />
                    )}
                  </div>
                  <div className='break-words line-clamp-2 subtitle-5 h-[45px] w-[144px]'>
                    {item.name}
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='subtitle-5 flex items-center gap-1 h-[17px]'>
                    <StarIcon fill='#FFD83D' color='#FFD83D' />
                    <span className='text-[#FFD83D] subtitle-6'>{item.reviewScore}</span>
                    <span className='body-6 text-gray-5'>({item.reviewCount})</span>
                  </div>
                  <p className='body-8 text-gray-5'>
                    {item.city} • 예상 대기시간 {item.estimatedWaitingTimeMinutes}분
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsListSection;
