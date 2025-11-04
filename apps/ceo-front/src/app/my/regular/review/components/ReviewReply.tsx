'use client';
import { useState } from 'react';

import { Button } from '@repo/design-system/components/ceo';

import { ProfileImage } from './ReviewCard';

const ReviewReply = ({ reviewId, isReplied }: { reviewId: number; isReplied: boolean }) => {
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = async () => {
    if (!replyText.trim()) return;
    try {
      //   await reviewApi.createReply({ parentId: reviewId, content: replyText });
      setShowInput(false);
      setReplyText('');
    } catch (err) {
      console.error('답글 등록 실패:', err);
    }
  };

  return (
    <div className=''>
      {isReplied ? (
        <div className=''>
          <div className='flex flex-col gap-[20px] rounded-[20px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)] px-[32px] pt-[32px] pb-[40px] bg-white'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-[12px] items-center'>
                <ProfileImage size={40} />
                <span className='subtitle-2 leading-[24px]'>푸딩 사장님</span>
              </div>
              <span className='body-5 text-gray-5'>2025.10.09</span>
            </div>
            <span className='body-2'>잘 먹어주셔서 감사합니다.</span>
          </div>
          <div className='flex justify-center mt-[20px]'>
            <Button className='subtitle-5' variant='primaryOutlined'>
              답글 수정
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center mt-[20px]'>
          <Button className='subtitle-5' variant='primary'>
            답글 달기
          </Button>
        </div>
      )}

      {/* {showInput ? (
        <div className='flex gap-[12px]'>
          <Input
            placeholder='답글을 입력해주세요'
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className='flex-1'
          />
          <Button onClick={handleSubmit}>등록</Button>
          <Button variant='ghost' onClick={() => setShowInput(false)}>
            취소
          </Button>
        </div>
      ) : (
        <Button onClick={() => setShowInput(true)}>답글쓰기22</Button>
      )} */}
    </div>
  );
};

export default ReviewReply;
