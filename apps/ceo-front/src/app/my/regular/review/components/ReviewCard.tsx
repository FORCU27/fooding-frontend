import Image from 'next/image';

import { Review } from '@repo/api/ceo';
import { StarIcon } from '@repo/design-system/icons';

import { formatDotDate } from '@/utils/date';

export interface ReviewCardProps {
  review: Review;
  children?: React.ReactNode;
}

interface ReviewCardHeaderProps {
  author: string;
  authorProfileImage?: string | null;
  reviewCount: number;
  date: string;
  rating: number;
}

interface ReviewCardContentProps {
  content: string;
  imageUrls: string[];
}

export const ProfileImage = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='20' cy='20' r='20' fill='#F1F3F5' />
    <path
      d='M19.9979 23C16.8278 23 14.0087 24.5306 12.2139 26.906C11.8276 27.4172 11.6345 27.6728 11.6408 28.0183C11.6457 28.2852 11.8133 28.6219 12.0233 28.7867C12.2951 29 12.6718 29 13.4251 29H26.5707C27.324 29 27.7007 29 27.9725 28.7867C28.1825 28.6219 28.3501 28.2852 28.355 28.0183C28.3613 27.6728 28.1682 27.4172 27.7819 26.906C25.9871 24.5306 23.168 23 19.9979 23Z'
      stroke='#BEBEBE'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M19.9979 20C22.4832 20 24.4979 17.9853 24.4979 15.5C24.4979 13.0147 22.4832 11 19.9979 11C17.5126 11 15.4979 13.0147 15.4979 15.5C15.4979 17.9853 17.5126 20 19.9979 20Z'
      stroke='#BEBEBE'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ReviewCard = ({ review, children }: ReviewCardProps) => {
  return (
    <div className='flex flex-col items-center gap-[20px]'>
      <div className='rounded-[20px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)] pt-[32px] px-[32px] pb-[40px] bg-white w-full'>
        <ReviewCard.Header
          author={review.writerName}
          authorProfileImage={review.writerProfileImage}
          reviewCount={review.reviewCount}
          date={formatDotDate(review.createdAt)}
          rating={review.totalScore ?? 0}
        />
        <ReviewCard.Content content={review.content} imageUrls={review.imageUrls ?? []} />
        {children}
      </div>
    </div>
  );
};

const ReviewCardHeader = ({
  author,
  authorProfileImage,
  reviewCount, 
  date,
  rating,
}: ReviewCardHeaderProps) => (
  <div className='flex justify-between items-center mb-[20px]'>
    <div className='flex gap-[12px]'>
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200'>
        {authorProfileImage ? (
          <Image
            src={authorProfileImage}
            width={40}
            height={40}
            alt='profile image'
            draggable={false}
            className='object-cover w-[40px] h-[40px]'
          />
        ) : (
          <ProfileImage size={40} />
        )}
      </div>
      <div className='flex flex-col gap-[2px]'>
        <span className='subtitle-2 leading-[24px]'>{author}</span>
        <span className='text-gray-5 body-5 leading-[16px]'>리뷰 {reviewCount}</span>
      </div>
    </div>
    <div className='flex flex-col items-end gap-[2px] py-[3px]'>
      <span className='body-5 text-gray-5 leading-[17px]'>{date}</span>
      <div className='flex gap-[2px]'>
        {Array.from({ length: 5 }).map((_, index) => {
          const isActive = index < rating;
          return (
            <StarIcon
              key={index}
              size={15}
              color={isActive ? '#FFD83D' : '#E2DFDF'} // 노란색 / 회색
              fill={isActive ? '#FFD83D' : '#E2DFDF'}
              stroke={isActive ? '#FFD83D' : '#E2DFDF'}
            />
          );
        })}
      </div>
    </div>
  </div>
);

const ReviewCardContent = ({ content, imageUrls }: ReviewCardContentProps) => (
  <div className=''>
    <p className='body-2 font-normal whitespace-pre-line'>{content}</p>
    {imageUrls.length > 0 ? (
      <div className='mt-[20px] flex gap-[12px] overflow-x-auto whitespace-nowrap touch-pan-x'>
        {imageUrls?.map((imageUrl) => (
          <Image
            key={imageUrl}
            alt='image'
            src={imageUrl}
            width={239}
            height={239}
            className='rounded-md object-cover w-[239px] h-[239px] shrink-0'
          />
        ))}
      </div>
    ) : null}
  </div>
);

ReviewCard.Header = ReviewCardHeader;
ReviewCard.Content = ReviewCardContent;

export { ReviewCard };
