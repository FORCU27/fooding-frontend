'use client';

import { ModifyStoreReviewBody } from '@repo/api/user';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewForm } from './components/ReviewForm';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useModifyStoreReview } from '@/hooks/store/useModifyStoreReview';

export const ReviewModifyScreen: ActivityComponentType<'ReviewModifyScreen'> = ({ params }) => {
  const flow = useFlow();

  const { mutate: modifyReview } = useModifyStoreReview(params.review.reviewId);

  const handleFormSubmit = (formData: ModifyStoreReviewBody) => {
    try {
      modifyReview(formData);
    } catch (error) {
      console.log(error);
    }

    return flow.pop();
  };

  return (
    <Screen header={<Header title='리뷰수정' left={<Header.Back />} />}>
      <div className='flex flex-col justify-baseline items-center mx-grid-margin my-grid-margin'>
        <div className='flex flex-col w-full'>
          <div className='flex flex-col items-center gap-2 my-10'>
            <p className='subtitle-1'>식당은 어떠셨나요?</p>
            <p className='body-8 text-gray-5'>별점을 매겨주세요</p>
          </div>

          <ReviewForm handleSubmit={handleFormSubmit} review={params.review} />
        </div>
      </div>
    </Screen>
  );
};
