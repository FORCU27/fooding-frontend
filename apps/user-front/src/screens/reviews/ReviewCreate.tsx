'use client';

import { UploadFile } from '@repo/api/file';
import { CreateStoreReviewBody, mockReservationDetailResponse } from '@repo/api/user';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewForm } from './components/ReviewForm';
import { ReviewStoreInfoCard } from './components/StoreInfoCard';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useUploadFile } from '@/hooks/file/useUploadFile';
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
  console.log(reservationId);
  const { user } = useAuth();
  const flow = useFlow();

  const { mutateAsync: createReview } = useCreateStoreReview();
  const { mutateAsync: uploadImageFile } = useUploadFile();

  if (!user) return;

  const handleFormSubmit = async (formData: CreateStoreReviewBody & { imageFiles: File[] }) => {
    try {
      let uploadedImageIds: string[] = [];

      if (formData.imageFiles && formData.imageFiles.length > 0) {
        const formDataToUpload = new FormData();
        formData.imageFiles.forEach((file) => {
          formDataToUpload.append('files', file);
        });

        const uploadResult = await uploadImageFile(formDataToUpload);
        uploadedImageIds = uploadResult.data.map((item: UploadFile) => item.url);
      }

      const totalScore = Math.round((formData.taste + formData.mood + formData.service) / 3);

      // 리뷰 생성 API 호출 예시
      await createReview({
        content: formData.content,
        taste: formData.taste,
        mood: formData.mood,
        service: formData.service,
        userId: user.id,
        storeId: 17, //TODO: 추후 수정
        visitPurpose: 'DATE', //TODO: 추후 수정
        imageUrls: uploadedImageIds,
        total: totalScore,
      });

      flow.pop();
    } catch (error) {
      console.error(error);
    }
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

          <ReviewForm handleSubmit={handleFormSubmit} />
        </div>
      </div>
    </Screen>
  );
};
