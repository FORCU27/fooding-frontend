import { Review } from '@repo/api/user';

import { ReviewCard } from './ReviewCard';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <>
      {reviews.map((review) => (
        <li key={review.reviewId} className='flex bg-white/80'>
          {<ReviewCard review={review} />}
        </li>
      ))}
    </>
  );
};
