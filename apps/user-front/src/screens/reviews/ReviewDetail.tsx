import Image from 'next/image';
import { useState } from 'react';

import { CreateReviewCommentBody, Review } from '@repo/api/user';
import { BottomSheet, Button, Input, toast } from '@repo/design-system/components/b2c';
import { CloseIcon, FoodingIcon, HeartIcon, MessageSquareIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';
import { overlay } from 'overlay-kit';
import { useForm } from 'react-hook-form';

import { DotsHorizontalIcon } from '../my-reveiws/components/MyReviewCard';
import { ImageGallery } from '@/components/ImageGallery';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { Section } from '@/components/Layout/Section';
import { StarRating } from '@/components/Store/StarRating';
import { useCreateReviewComment } from '@/hooks/review/useCreateReviewComment';
import { useGetReviewDetail } from '@/hooks/review/useGetReviewDetail';
import { useUpdateReviewLike } from '@/hooks/review/useUpdateReviewLike';
import { formatDotDate } from '@/utils/date';

export type ReviewDetailScreenParams = {
  review: Review;
  storeName: string;
};

export const ReviewDetailScreen: ActivityComponentType<'ReviewDetailScreen'> = ({ params }) => {
  return (
    <Screen
      header={<Header left={<Header.Back />} title={params.storeName} />}
      bottomTab={<ReviewDetailBottom review={params.review} />}
      className='bg-gray-1'
    >
      <DefaultErrorBoundary>
        <Suspense clientOnly>
          <ReviewDetail
            storeName={params.storeName}
            reviewId={params.review.reviewId}
            review={params.review}
          />
        </Suspense>
      </DefaultErrorBoundary>
    </Screen>
  );
};

type ReviewDetailProps = {
  review: Review;
  reviewId: number;
  storeName: string;
};

const ReviewDetail = ({ review, reviewId, storeName }: ReviewDetailProps) => {
  const { data: reviewDetail } = useGetReviewDetail(reviewId);
  const { imageUrls } = review;

  const onImageClick = (imageIndex: number) => {
    overlay.open(({ isOpen, close }) => (
      <ImageGallery
        isOpen={isOpen}
        onClose={close}
        imageUrls={imageUrls ?? []}
        title={storeName ?? ''}
        initialPage={imageIndex + 1}
      />
    ));
  };

  return (
    <Section className='flex flex-col w-full'>
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
              <p className='body-7 text-gray-5'>리뷰 {reviewDetail.writerReviewCount}</p>
            </div>
            <div className='flex gap-2'>
              <StarRating score={review.score?.total ?? 0} />
              <p className='body-8 text-gray-5'>{formatDotDate(review.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center w-[42px] h-[22px] rounded-[4px] bg-[rgba(255,43,61,0.1)]'>
          <span className='body-7 text-primary-pink'>BEST</span>
        </div>
      </div>
      <div className='flex flex-col relative'>
        {imageUrls && imageUrls.length > 0 && (
          <div className='flex flex-col gap-3 py-5'>
            {imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => onImageClick(idx)}
                className='relative w-full aspect-[4/3] overflow-hidden rounded-2xl'
              >
                <Image
                  src={url}
                  fill
                  alt={`리뷰이미지_${idx}`}
                  className='rounded-2xl object-cover'
                  sizes='100vw'
                />
              </button>
            ))}
          </div>
        )}
        <p className='my-4 body-3-2 mb-5'>{review.content}</p>
      </div>
    </Section>
  );
};

type ReviewDetailBottomProps = {
  review: Review;
};

export const ReviewDetailBottom = ({ review }: ReviewDetailBottomProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [replyTargetId, setReplyTargetId] = useState<number>(0);
  const [replyTargetNickname, setReplyTargetNickName] = useState<string | null>(null);
  const flow = useFlow();
  const updateLike = useUpdateReviewLike();

  const { register, setValue, handleSubmit } = useForm<CreateReviewCommentBody>({
    defaultValues: {
      parentId: review.reviewId,
      comment: '',
    },
    mode: 'onSubmit',
  });
  const createReviewComment = useCreateReviewComment();

  const handleFormSubmit = (formData: CreateReviewCommentBody) => {
    if (createReviewComment.isPending) return;
    if (!formData.comment.trim()) return;

    createReviewComment.mutate(
      {
        reviewId: review.reviewId,
        body: {
          ...formData,
          parentId: replyTargetId,
        },
      },
      {
        onSuccess: () => {
          flow.pop();
          setValue('comment', '');
          setReplyTargetId(0);
        },
        onError: () => {
          toast.error('리뷰 코멘트 작성에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div className='flex px-5 h-[64px]'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-4'>
          <div
            className='flex gap-2'
            onClick={() => {
              if (updateLike.isPending) return;
              updateLike.mutate(review.reviewId);
            }}
          >
            <HeartIcon size={24} />
            <span className='body-3 text-gray-6'>{review.likeCount}</span>
          </div>
          <div className='flex gap-2'>
            <MessageSquareIcon size={24} />
            <span className='body-4 text-gray-6'>{review.replies.length}</span>
          </div>
        </div>
        <button
          type='button'
          onClick={() => setIsBottomSheetOpen(true)}
          className='w-6 h-6 hover:bg-gray-1 rounded-xl'
        >
          <DotsHorizontalIcon />
        </button>
      </div>

      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title className='headline-3'>
              댓글 <span className='text-primary-pink'>{review.replies.length}</span>
            </BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                {review.replies.map((r) => (
                  <div key={r.reviewId} className='flex flex-col py-5'>
                    <div className='flex justify-between'>
                      <div className='flex gap-4'>
                        {r.profileUrl ? (
                          <Image
                            src={r.profileUrl}
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
                        <div className='flex flex-col gap-2 items-start'>
                          <div className='flex gap-2 items-center'>
                            <p className='subtitle-5'>{r.nickname}</p>
                            <p className='body-8 text-gray-5'>{formatDotDate(r.createdAt)}</p>
                          </div>
                          <p className='body-6 line-clamp-3'>{r.content}</p>
                          <button
                            className='body-7 text-gray-5 mt-2'
                            onClick={() => {
                              setReplyTargetId(r.reviewId);
                              setReplyTargetNickName(r.nickname);
                            }}
                          >
                            답글달기
                          </button>
                        </div>
                      </div>
                      <div
                        className='flex flex-col items-center'
                        onClick={() => {
                          if (updateLike.isPending) return;
                          updateLike.mutate(r.reviewId);
                        }}
                      >
                        <HeartIcon />
                        <p>{r.likeCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {replyTargetNickname && (
                <div className='flex justify-between items-center bg-gray-1 w-full h-[44px] px-5'>
                  <p className='body-6 text-gray-5'>{replyTargetNickname}님에게 남기는 댓글</p>
                  <button
                    onClick={() => {
                      setReplyTargetId(0);
                      setReplyTargetNickName(null);
                    }}
                    className='text-gray-5'
                  >
                    <CloseIcon size={24} />
                  </button>
                </div>
              )}
              <div className='flex items-center'>
                <Input
                  placeholder='따듯한 댓글을 남겨주세요!'
                  className='border-none text-[14px] text-left'
                  {...register('comment')}
                />

                <Button size='small' type='submit'>
                  등록
                </Button>
              </div>
            </form>
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};
