'use client';

import {
  CreateStoreReviewBody,
  mockReservationDetailResponse,
  mockStoreReviewListResponse,
  VisitPurpose,
} from '@repo/api/user';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewForm } from './components/ReviewForm';
import { ReviewStoreInfoCard } from './components/StoreInfoCard';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { StarRating } from '@/components/Store/StarRating';
import { useCreateStoreReview } from '@/hooks/store/useCreateStoreReview';

type ReviewCreateProps = {
  reservationId: number;
};

export const ReviewCreateScreen: ActivityComponentType<'ReviewCreateScreen'> = ({
  params: { reservationId },
}: {
  params: ReviewCreateProps;
}) => {
  //TODO: 예약 API 나오는대로 수정
  const { data: reservation } = mockReservationDetailResponse;
  const { data: reviews } = mockStoreReviewListResponse;
  const { user } = useAuth();
  console.log(reservationId);
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

  return (
    <Screen
      header={<Header title='리뷰쓰기' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='reservation' />}
    >
      <div className='flex flex-col justify-baseline items-center mx-grid-margin my-grid-margin'>
        <ReviewStoreInfoCard reservationInfo={reservation} />
        <div className='flex flex-col w-full'>
          <div className='flex flex-col items-center gap-2 my-10'>
            <p className='subtitle-1'>식당은 어떠셨나요?</p>
            <p className='body-8 text-gray-5'>별점을 매겨주세요</p>
          </div>

          <div className='flex flex-col gap-10 mb-10 justify-center items-center'>
            <div className='flex subtitle-4 justify-around w-full'>
              <div className='min-w-[45px]'>음식</div>
              <StarRating starSize={24} score={Number(reviews.list[0]?.score.taste.toFixed(1))} />
              {reviews.list[0]?.score.taste.toFixed(1)}
            </div>
            <div className='flex subtitle-4 justify-around w-full'>
              <div className='min-w-[45px]'>분위기</div>
              <StarRating starSize={24} score={Number(reviews.list[0]?.score.mood.toFixed(1))} />
              {reviews.list[0]?.score.mood.toFixed(1)}
            </div>
            <div className='flex subtitle-4 justify-around w-full'>
              <div className='min-w-[45px]'>서비스</div>
              <StarRating starSize={24} score={Number(reviews.list[0]?.score.service.toFixed(1))} />
              {reviews.list[0]?.score.service.toFixed(1)}
            </div>
          </div>
          <ReviewForm handleSubmit={handleFormSubmit} />
        </div>
      </div>
    </Screen>
  );
};
