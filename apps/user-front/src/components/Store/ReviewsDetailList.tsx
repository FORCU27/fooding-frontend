import React from 'react';

import { Review, StoreInfo } from '@repo/api/user';

import { ReviewDetailCard } from './ReviewDetailCard';

interface ReviewsListProps {
  reviews: Review[];
  store: StoreInfo;
}

export const ReviewsDetailList = ({ reviews, store }: ReviewsListProps) => {
  return (
    <>
      {reviews.map((review, idx) => (
        <React.Fragment key={review.reviewId}>
          <li className='flex py-grid-margin'>
            <ReviewDetailCard review={review} store={store} />
          </li>
          {idx < reviews.length - 1 && <hr className='w-full text-gray-2' />}
        </React.Fragment>
      ))}
    </>
  );
};
