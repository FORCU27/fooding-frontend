'use client';

import { reviewApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { CardForm } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { ReviewCard } from './components/ReviewCard';
import { useGetSelf } from '@/hooks/auth/useGetSelf';
import { formatDotDate } from '@/utils/date';

const ReviewPage = () => {
  const { data: me } = useGetSelf();
  const { data: reviewResponse } = useQuery({
    queryKey: [queryKeys.ceo.review],
    queryFn: () => reviewApi.getReviews({ pageNum: 1, pageSize: 20, storeId: 23, ceoId: me.id }),
  });
  const reviews = reviewResponse?.data.list;

  return (
    <CardForm className=''>
      <div className='headline-2'>리뷰</div>
      {reviews?.map((review) => (
        <ReviewCard
          key={review.id}
          author={review.writerName}
          date={formatDotDate(review.createdAt)}
          rating={review.totalScore}
          content={review.content}
        />
      ))}
    </CardForm>
  );
};

export default ReviewPage;
