'use client';
import Image from 'next/image';

import { reviewApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { CardForm } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { ReviewCard } from './components/ReviewCard';
import ReviewReply from './components/ReviewReply';
import { useStore } from '@/context/StoreContext';
import { useGetSelfQuery } from '@/hooks/auth/useGetSelf';

const ReviewPage = () => {
  const { data: me } = useGetSelfQuery();
  const { storeId } = useStore();
  const { data: reviewResponse } = useQuery({
    queryKey: [queryKeys.ceo.review, storeId, me?.id],
    queryFn: () =>
      reviewApi.getReviews({
        pageNum: 1,
        pageSize: 20,
        storeId: Number(storeId),
        ceoId: Number(me?.id),
      }),
    enabled: !!storeId && !!me?.id,
  });
  const reviews = reviewResponse?.data.list;

  return (
    <CardForm className='mb-[180px]'>
      <div className='headline-2'>리뷰</div>
      {reviews?.length === 0 ? (
        <div className='rounded-[20px] bg-white pt-[32px] pb-[40px] px-[32px] shadow-2xs'>
          <div className='flex flex-col items-center justify-center gap-4 py-[200px]'>
            <Image src='/images/fooding-logo-gray.png' width={199} height={48} alt='gray logo' />
            <p className='text-gray-3 body-2'>아직 리뷰가 없어요</p>
          </div>
        </div>
      ) : (
        <>
          {reviews?.map((review) => (
            <div key={review.id} className='flex flex-col gap-[20px]'>
              <ReviewCard review={review} />
              <ReviewReply
                reviewId={review.id}
                initialReply={review.replies?.[0]}
                currentUser={{ id: me?.id as number, nickname: me?.nickname as string }}
              />
            </div>
          ))}
        </>
      )}
    </CardForm>
  );
};

export default ReviewPage;
