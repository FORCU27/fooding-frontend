'use client';

import { reviewApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { CardForm } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { ReviewCard } from './components/ReviewCard';
import ReviewReply from './components/ReviewReply';
import { useGetSelf } from '@/hooks/auth/useGetSelf';
import { formatDotDate } from '@/utils/date';

const ReviewPage = () => {
  const { data: me } = useGetSelf();
  const { data: reviewResponse } = useQuery({
    queryKey: [queryKeys.ceo.review],
    queryFn: () => reviewApi.getReviews({ pageNum: 1, pageSize: 20, storeId: 23, ceoId: me.id }),
  });
  const mockReviews = [
    {
      id: 1,
      storeId: 1,
      writerName: '홍길동',
      visitPurposeType: 'MEETING',
      parentId: 1,
      writerId: 1,
      writerReviewCount: 100,
      createdAt: '2025-01-01',
      totalScore: 4.5,
      content: '잘먹었습니다.',
      replies: [
        {
          id: 1,
          content: '감사합니다. 또 방문해주세요',
        },
      ],
    },
    {
      id: 2,
      storeId: 2,
      writerName: '임꺽정',
      visitPurposeType: 'MEETING',
      parentId: 2,
      writerId: 2,
      writerReviewCount: 100,
      createdAt: '2025-01-01',
      totalScore: 4.5,
      content:
        '잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...',
    },
  ];
  const reviews = mockReviews;
  console.log('reviewResponse', reviewResponse);

  return (
    <CardForm className='mb-[180px]'>
      <div className='headline-2'>리뷰</div>
      {reviews?.map((review) => (
        <div key={review.id} className='flex flex-col gap-[20px]'>
          <ReviewCard
            author={review.writerName}
            date={formatDotDate(review.createdAt)}
            rating={review.totalScore}
            content={review.content}
          />
          <ReviewReply initialReply={review.replies?.[0]} />
        </div>
      ))}
    </CardForm>
  );
};

export default ReviewPage;
