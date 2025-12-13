'use client';

import { CreateReviewBody } from '@repo/api/user';
import { toast } from '@repo/design-system/components/b2c';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewForm } from './components/ReviewForm';
import { ReviewStoreInfoCard } from './components/ReviewStoreInfoCard';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useGetPlanDetail } from '@/hooks/plan/useGetPlanDetail';
import { useCreateReview } from '@/hooks/review/useCreateReview';

export type ReviewCreateScreenParams = { planId: string };

export const ReviewCreateScreen: ActivityComponentType<'ReviewCreateScreen'> = ({ params }) => {
  const { data: planInfo } = useGetPlanDetail(params.planId);

  const { user } = useAuth();

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  const flow = useFlow();

  const createReview = useCreateReview();

  const handleFormSubmit = (formData: CreateReviewBody) => {
    if (createReview.isPending) return;

    createReview.mutate(
      {
        ...formData,
        userId: user.id,
        storeId: planInfo.storeId,
      },
      {
        onSuccess: () => {
          flow.pop();
        },
        onError: () => {
          toast.error('리뷰 작성에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <Screen
      header={<Header title='리뷰 쓰기' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='plan' />}
    >
      <div className='flex flex-col justify-baseline items-center mx-grid-margin my-grid-margin'>
        <ReviewStoreInfoCard planInfo={planInfo} />
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
