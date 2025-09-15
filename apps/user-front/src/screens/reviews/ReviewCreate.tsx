'use client';

import { CreateStoreReviewBody } from '@repo/api/user';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewForm } from './components/ReviewForm';
import { ReviewStoreInfoCard } from './components/ReviewStoreInfoCard';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useGetPlanDetail } from '@/hooks/plan/useGetPlanDetail';
import { useCreateStoreReview } from '@/hooks/store/useCreateStoreReview';
import { useGetStoreWaitingDetail } from '@/hooks/store-waiting/useGetStoreWaitingDetail';

export const ReviewCreateScreen: ActivityComponentType<'ReviewCreateScreen'> = ({ params }) => {
  const { data: planInfo } = useGetPlanDetail(params.planId);
  const { data: waitingInfo } = useGetStoreWaitingDetail(planInfo.originId);
  const { user } = useAuth();
  const flow = useFlow();

  const { mutate: createReview } = useCreateStoreReview();

  const handleFormSubmit = (formData: CreateStoreReviewBody) => {
    try {
      createReview({
        ...formData,
        userId: user?.id || waitingInfo.userId,
        storeId: planInfo.storeId,
      });
    } catch (error) {
      console.log(error);
    }

    return flow.pop();
  };

  return (
    <Screen
      header={<Header title='리뷰 쓰기' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='plan' />}
    >
      <div className='flex flex-col justify-baseline items-center mx-grid-margin my-grid-margin'>
        {planInfo && <ReviewStoreInfoCard planInfo={planInfo} />}
        <div className='flex flex-col w-full'>
          <div className='flex flex-col items-center gap-2 my-10'>
            <p className='subtitle-1'>식당은 어떠셨나요?</p>
            <p className='body-8 text-gray-5'>별점을 매겨주세요</p>
          </div>

          <ReviewForm handleSubmit={handleFormSubmit} />
        </div>
      </div>
    </Screen>
  );
};
