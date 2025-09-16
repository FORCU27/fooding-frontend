import Image from 'next/image';
import { useState } from 'react';

import { Review, StoreInfo } from '@repo/api/user';
import { BottomSheet, Button, Dialog, toast } from '@repo/design-system/components/b2c';
import { FoodingIcon, HeartIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { StarRating } from './StarRating';
import { useAuth } from '../Provider/AuthProvider';
import { useDeleteStoreReview } from '@/hooks/store/useDeleteStoreReview';
import { formatDotDate } from '@/utils/date';

interface ReviewCardProps {
  review: Review;
  store: StoreInfo;
}

export const ReviewDetailCard = ({ review, store }: ReviewCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { user } = useAuth();
  const flow = useFlow();

  const { imageUrls } = review;
  const isMine = user?.nickname === review.nickname;

  const deleteStoreReview = useDeleteStoreReview();

  const onDeleteButtonClick = () => {
    if (deleteStoreReview.isPending) return;

    deleteStoreReview.mutate(review.reviewId, {
      onSuccess: () => {
        setIsDialogOpen(false);
        flow.pop();
        toast.success('삭제가 완료되었습니다.');
      },
      onError: () => {
        toast.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between'>
        <div className='flex'>
          <div className='mr-3'>
            {review.profileUrl ? (
              <Image
                src={review.profileUrl}
                alt='프로필 이미지'
                width={40}
                height={40}
                className='w-10 h-10 object-cover rounded-full'
              />
            ) : (
              <div className='flex justify-center items-center w-10 h-10 rounded-full bg-gray-1'>
                <FoodingIcon width={25} height={28} color='rgba(17, 17, 17, 0.1)' />
              </div>
            )}
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center'>
              <p className='subtitle-5 mr-2'>{review.nickname}</p>
              <p className='body-7 text-gray-5'>리뷰 {review.userReviewCount}</p>
            </div>
            <div className='flex gap-2'>
              <StarRating score={review.score.total} />
              <p className='body-8 text-gray-5'>{formatDotDate(review.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center w-[42px] h-[22px] rounded-[4px] bg-[rgba(255,43,61,0.1)]'>
          <span className='body-7 text-primary-pink'>BEST</span>
        </div>
      </div>

      <div className='flex flex-col'>
        <p className='my-4 body-8 text-gray-5'>{review.content}</p>
        {imageUrls.length > 0 && (
          <div className='flex h-[140px] overflow-x-auto scrollbar-hide gap-3'>
            {imageUrls.map((url, idx) => (
              <Image
                key={idx}
                width={140}
                height={140}
                src={url}
                alt={`리뷰이미지_${idx}`}
                className='rounded-2xl shrink-0 object-cover'
              />
            ))}
          </div>
        )}
      </div>

      <div className='flex justify-between items-center mt-3 gap-5'>
        <div className='flex gap-2'>
          <HeartIcon size={12} />
          <span className='body-7 text-gray-6'>{review.likeCount}</span>
        </div>
        <button
          type='button'
          onClick={() => setIsBottomSheetOpen(true)}
          className='w-6 h-6 hover:bg-gray-1 rounded-xl'
        >
          <DotsHorizontalIcon />
        </button>
      </div>

      <BottomSheet isOpen={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title className='headline-3'>리뷰관리</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <div className='p-5 gap-3 rounded-xl bg-gray-1'>
              <StoreCard store={store} review={review} />
            </div>
            <div className='flex flex-col gap-4 px-5 mt-4 mb-5'>
              {isMine ? (
                <>
                  <button
                    className='text-left'
                    type='button'
                    onClick={() => {
                      flow.push('ReviewModifyScreen', { review });
                      setIsBottomSheetOpen(false);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className='text-error-red text-left'
                    type='button'
                    onClick={() => setIsDialogOpen(true)}
                  >
                    삭제
                  </button>

                  <Dialog isOpen={isDialogOpen}>
                    <Dialog.Content className='p-5'>
                      <Dialog.Title className='text-center'>리뷰 삭제</Dialog.Title>
                      <Dialog.Body className='flex flex-col text-center py-10'>
                        <p className='subtitle-1'>리뷰를 삭제하시겠습니까?</p>
                        <p className='body-6 text-gray-5'>한번 삭제하면 복구할 수 없어요!</p>
                        <div className='p-5 gap-3 rounded-xl bg-gray-1 mt-10'>
                          <StoreCard review={review} store={store} />
                        </div>
                      </Dialog.Body>
                      <Dialog.Footer className='gap-4'>
                        <Dialog.Close asChild>
                          <Button
                            className='w-[136px]'
                            variant='outlined'
                            onClick={() => setIsDialogOpen(false)}
                          >
                            취소
                          </Button>
                        </Dialog.Close>
                        <Button type='button' onClick={onDeleteButtonClick}>
                          삭제하기
                        </Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog>
                </>
              ) : (
                <button
                  type='button'
                  className='text-error-red text-left'
                  onClick={() => {
                    flow.push('ReviewReportCreateScreen', { review, store, type: 'REVIEW' });
                    setIsBottomSheetOpen(false);
                  }}
                >
                  신고
                </button>
              )}
            </div>
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};

export const StoreCard = ({ review, store }: { review: Review; store: StoreInfo }) => {
  return (
    <div className='flex gap-3 items-center'>
      {store.images[0]?.imageUrl ? (
        <div className='flex justify-center items-center w-[48px] h-[48px]'>
          <Image
            src={store.images[0].imageUrl}
            alt='스토어 이미지'
            width={56}
            height={56}
            className='w-full h-full object-cover rounded-lg'
          />
        </div>
      ) : (
        <div className='flex justify-center items-center w-[48px] h-[48px] rounded-lg bg-white'>
          <FoodingIcon className='text-gray-2' />
        </div>
      )}
      <div className='flex flex-col'>
        <p className='subtitle-4 text-left'>{store.name}</p>
        <div className='flex items-center gap-2'>
          <StarRating score={review.score.total} />
          <p className='body-8 text-gray-5'>{formatDotDate(review.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export const DotsHorizontalIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    {[12, 19, 5].map((cx, i) => (
      <circle
        key={i}
        cx={cx}
        cy='12'
        r='1'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    ))}
  </svg>
);
