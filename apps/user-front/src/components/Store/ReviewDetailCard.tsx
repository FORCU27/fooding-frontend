import Image from 'next/image';

import { Review } from '@repo/api/user';
import { FoodingIcon } from '@repo/design-system/icons';

import { StarRating } from './StarRating';
import { formatDotDate } from '@/utils/date';

interface ReviewCardProps {
  review: Review;
}

export const ReviewDetailCard = ({ review }: ReviewCardProps) => {
  const { imageUrls = [] } = review;

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between'>
        <div className='flex'>
          <div className='flex mr-3'>
            {review.profileUrl ? (
              <div className='flex justify-center items-center w-10 h-10'>
                <Image
                  src={review.profileUrl}
                  alt='프로필 이미지'
                  width={40}
                  height={40}
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
            ) : (
              <div className='flex bg-gray-1 justify-center items-center rounded-full w-10 h-10'>
                <FoodingIcon width={25} height={28} color='rgba(17, 17, 17, 0.1)' />
              </div>
            )}
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center'>
              <p className='subtitle-5 mr-2'>{review.nickname}</p>
              <p className='body-7 text-gray-5 '>리뷰 10</p>
            </div>
            <div className='flex gap-2'>
              <StarRating score={review.score.total} />
              <div>
                <p className='body-8 text-gray-5'> {formatDotDate(review.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center w-[42px] h-[22px] rounded-[4px] bg-[rgba(255,43,61,0.1)]'>
          <div className='flex text-primary-pink body-7'>BEST</div>
        </div>
      </div>

      <div className='flex flex-col'>
        <p className='text-gray-5 body-8 my-4'>{review.content}</p>
        {imageUrls.length > 0 && (
          <div className='flex h-[140px] overflow-x-auto scrollbar-hide gap-3'>
            {imageUrls.map((url, idx) => (
              <Image
                key={idx}
                width={140}
                height={140}
                src={url}
                alt={`리뷰이미지_${idx}`}
                className='rounded-2xl shrink-0'
                style={{ objectFit: 'cover' }}
              />
            ))}
          </div>
        )}
      </div>
      {/* <div className='flex mt-2 gap-5'>
        <div className='flex gap-2'>
          <HeartIcon size={12} />
          <span className='body-7 color-gray-6'>3</span>
        </div>
        <div className='flex gap-2'>
          <MessageSquareIcon size={12} />
          <span className='body-7 color-gray-6'>1</span>
        </div>
      </div> */}

      {/* TODO: 추후 수정 */}
    </div>
  );
};
