'use client';

import { CreateStoreReviewBody, mockStoreReviewListResponse, VisitPurpose } from '@repo/api/user';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewForm } from './components/ReviewForm';
import { ReviewStoreInfoCard } from './components/StoreInfoCard';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';
import { useCreateStoreReview } from '@/hooks/store/useCreateStoreReview';

export const ReviewCreateScreen: ActivityComponentType<'ReviewCreateScreen'> = () => {
  const { data: reviews } = mockStoreReviewListResponse;
  const { data: plans } = useGetPlanList();
  const { user } = useAuth();
  const flow = useFlow();

  const { mutate: createReview } = useCreateStoreReview();

  const handleFormSubmit = (formData: CreateStoreReviewBody) => {
    try {
      createReview({
        ...formData,
        userId: user?.id || 1,
        storeId: 1,
        visitPurpose: reviews.list[0]?.purpose as VisitPurpose,
      });
    } catch (error) {
      console.log(error);
    }

    return flow.pop();
  };

  const firstPlan = plans?.list?.[0]; //TODO: 예약상세 API 나오면 수정

  return (
    <Screen
      header={<Header title='리뷰쓰기' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='plan' />}
    >
      <div className='flex flex-col justify-baseline items-center mx-grid-margin my-grid-margin'>
        {firstPlan && <ReviewStoreInfoCard planInfo={firstPlan} />}
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
