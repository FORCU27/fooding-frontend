import { Review } from '@repo/api/user';

import { ReviewCard } from './ReviewCard';

interface ReviewsListProps {
  items: Review[];
}

export const ReviewsList = ({ items }: ReviewsListProps) => {
  return (
    <>
      {items &&
        items.map((item) => (
          <li key={item.reviewId} className='flex py-grid-margin bg-white/80'>
            <ReviewCard review={item} />
          </li>
        ))}
    </>
  );
};
