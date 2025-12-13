import Image from 'next/image';

import { FoodingIcon } from '@repo/design-system/icons';

import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { isNonEmptyArray } from '@/utils/array';

interface ReviewDetailCardProps {
  storeId: number;
  reviewId: number;
}

export const ReviewDetailCard = ({ storeId, reviewId }: ReviewDetailCardProps) => {
  const { data: storeInfo } = useGetStoreDetail(storeId);

  return (
    <div className='flex bg-gray-1 items-center w-full h-[100px] p-5 rounded-xl'>
      {storeInfo.images && isNonEmptyArray(storeInfo.images) ? (
        <div className='relative w-[60px] h-[60px] rounded-lg overflow-hidden'>
          <Image
            fill
            style={{ objectFit: 'cover' }}
            src={storeInfo.images[0].imageUrl}
            alt='가게 이미지'
          />
        </div>
      ) : (
        <div className='bg-gray-1 flex justify-center items-center w-[60px] h-[60px] rounded-lg'>
          <FoodingIcon width={40} height={55} color='rgba(17, 17, 17, 0.1)' />
        </div>
      )}
      <div className='flex flex-col p-4 gap-1'>
        <p className='subtitle-4'>{storeInfo.name}</p>
      </div>
    </div>
  );
};
