import Image from 'next/image';

import { Review } from '@repo/api/user';
import { FoodingIcon, StarIcon } from '@repo/design-system/icons';

import { formatRelativeTime } from '@/utils/date';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const hasImages = review.imageUrls && review.imageUrls.length > 0;
  const firstImageUrl = hasImages ? review.imageUrls[0] : null;

  return (
    <div className='w-[350px] h-[390px] flex flex-col rounded-[12px] shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.05)] bg-white'>
      {firstImageUrl ? (
        <div className='relative w-[350px] h-[200px] rounded-t-[12px] overflow-hidden'>
          <Image fill style={{ objectFit: 'cover' }} src={firstImageUrl} alt='리뷰 이미지' />
        </div>
      ) : (
        <div className='bg-gray-1 flex justify-center items-center h-[200px] rounded-t-[12px]'>
          <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
        </div>
      )}

      <div className='flex flex-col pt-3 px-5 pb-10'>
        <div className='flex mb-3'>
          <div className='flex justify-center items-center size-[56px] bg-gray-1 rounded-full'>
            <FoodingIcon width={25} height={31} color='rgba(17, 17, 17, 0.1)' />
          </div>
          <div className='ml-3 flex flex-col justify-center flex-1'>
            <span className='subtitle-3 text-black'>{review.nickname ?? '닉네임 1'}</span>
          </div>
          <div className='flex flex-col justify-center items-end'>
            <div className='flex items-center gap-1'>
              <StarIcon className='size-[18px] stroke-fooding-yellow fill-fooding-yellow' />
              <span className='subtitle-6 text-fooding-yellow'>{review.score.total}</span>
            </div>
            <span className='mt-[10px] body-7 text-gray-5'>
              {formatRelativeTime(review.createdAt)}
            </span>
          </div>
        </div>
        <p className='body-3 text-black line-clamp-3 h-[70px]'>{review.content}</p>
      </div>
    </div>
  );
};
