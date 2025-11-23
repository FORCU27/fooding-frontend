'use client';

import Image from 'next/image';
import { useState } from 'react';

import { reviewApi, ReviewReply as Reply } from '@repo/api/ceo';
import { Button } from '@repo/design-system/components/ceo';
import { ClockIcon } from '@repo/design-system/icons';

import { ProfileImage } from './ReviewCard';
import { formatDotDate } from '@/utils/date';

interface ReviewReplyProps {
  reviewId: number;
  initialReply?: Reply;
  currentUser: {
    id: number;
    nickname: string | null;
  };
}

const ReviewReply = ({ reviewId, currentUser, initialReply }: ReviewReplyProps) => {
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState(initialReply?.content ?? '');
  const [localReply, setLocalReply] = useState<Partial<Reply> | null>(initialReply ?? null);

  const handleSubmit = async () => {
    if (!replyText.trim()) return;

    try {
      // 답글 처음 작성하는 경우 -> 답글 생성 API POST
      if (!localReply) {
        await reviewApi.createReply(reviewId, {
          userId: currentUser?.id,
          content: replyText,
        });

        // optimistic update
        const newReply = {
          writerName: '푸딩 사장님',
          content: replyText,
          createdAt: new Date().toISOString(),
        };
        setLocalReply(newReply);
      }

      // 기존 답글 수정 -> 답글 수정 API PATCH
      else {
        if (!initialReply?.id) return;

        await reviewApi.editReply(initialReply.id, {
          content: replyText,
        });

        // optimistic update
        setLocalReply({
          ...localReply,
          content: replyText,
        });
      }

      setReplyText('');
      setShowInput(false);
    } catch (err) {
      console.error('❗ 답글 등록/수정 실패:', err);
    }
  };

  const handleEdit = () => setShowInput(true);

  const hasReply = !!localReply;

  return (
    <div>
      {/* 답글이 존재하는 경우 */}
      {hasReply && !showInput && (
        <div className=''>
          <div className='flex flex-col gap-[20px] rounded-[20px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)] px-[32px] pt-[32px] pb-[40px] bg-white'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-[12px] items-center'>
                <div className='w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200'>
                  {initialReply?.writerProfileImage ? (
                    <Image
                      src={initialReply.writerProfileImage}
                      width={40}
                      height={40}
                      alt='profile image'
                      draggable={false}
                      className='object-cover w-[40px] h-[40px]'
                    />
                  ) : (
                    <ProfileImage size={40} />
                  )}
                </div>
                <span className='subtitle-2 leading-[24px]'>{localReply?.writerName} 사장님</span>
              </div>
              <span className='body-5 text-gray-5'>
                {new Date(localReply?.createdAt || '').toLocaleDateString('ko-KR')}
              </span>
            </div>
            <span className='body-2 whitespace-pre-line'>{localReply?.content}</span>
          </div>
          <div className='flex justify-center mt-[20px]'>
            <Button className='subtitle-5' variant='primaryOutlined' onClick={handleEdit}>
              답글 수정
            </Button>
          </div>
        </div>
      )}

      {/* 답글이 없거나 작성 모드일 때 */}
      {!hasReply && !showInput && (
        <div className='flex justify-center'>
          <Button className='subtitle-5' variant='primary' onClick={() => setShowInput(true)}>
            답글 달기
          </Button>
        </div>
      )}

      {/* 입력 모드 */}
      {showInput && (
        <div className='flex flex-col gap-[20px]'>
          <div className='flex flex-col rounded-[20px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)] px-[32px] pt-[32px] pb-[40px] bg-white'>
            <div className='flex justify-between items-center pb-[20px]'>
              <div className='flex gap-[12px] items-center'>
                {initialReply?.writerProfileImage ? (
                  <Image
                    src={initialReply.writerProfileImage}
                    width={40}
                    height={40}
                    alt='profile image'
                    draggable={false}
                    className='object-cover w-[40px] h-[40px]'
                  />
                ) : (
                  <ProfileImage size={40} />
                )}
                <span className='subtitle-2 leading-[24px]'>
                  {localReply?.writerName ?? currentUser.nickname} 사장님
                </span>
              </div>
              <span className='body-5 text-gray-5'>
                {localReply?.createdAt
                  ? new Date(localReply.createdAt).toLocaleDateString('ko-KR')
                  : formatDotDate(new Date().toISOString())}
              </span>
            </div>
            <textarea
              placeholder={
                '욕설, 비방, 명예를 훼손하는 표현은 삼가주시고, 리뷰 작성자의 이름이나 전화번호 등 개인정보를 포함하지 않도록 유의해 주세요.\n해당 기준에 맞지 않는 내용은 별도 안내 없이 숨김 처리될 수 있습니다.\n사장님의 따뜻한 소통을 응원합니다!'
              }
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className='flex-1 min-h-[200px] px-[20px] py-[12px] border border-gray-3 rounded-[8px] resize-none outline-none focus:border-fooding-purple body-2 placeholder:text-gray-4'
            />
            <div className='flex justify-between pt-[8px]'>
              <div className='flex gap-[4px] items-center'>
                <ClockIcon size={14} color='#007df8' />
                <span className='subtitle-7 text-info-blue'>답글 작성 유의사항</span>
              </div>
              <div className='flex gap-[4px] subtitle-7'>
                <span>{replyText.length}</span>
                <span className='text-gray-5'>/</span>
                <span className='text-gray-5'>500자</span>
                <span className='text-gray-5'>(최소 15자)</span>
              </div>
            </div>
          </div>
          <div className='flex justify-center gap-[18px]'>
            <Button variant='outlined' onClick={() => setShowInput(false)}>
              취소
            </Button>
            <Button variant='primary' onClick={handleSubmit}>
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewReply;
