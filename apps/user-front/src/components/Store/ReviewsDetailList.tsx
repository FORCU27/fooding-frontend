import React from 'react';

import { Review } from '@repo/api/user';

import { ReviewDetailCard } from './ReviewDetailCard';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsDetailList = ({ reviews }: ReviewsListProps) => {
  return (
    <>
      {reviews.map((review, idx) => (
        <React.Fragment key={review.reviewId}>
          <li className='flex py-grid-margin'>{<ReviewDetailCard review={review} />}</li>
          {idx < reviews.length - 1 && <hr className='w-full text-gray-2' />}
        </React.Fragment>
      ))}
    </>
  );
};
