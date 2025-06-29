import Image from 'next/image';
import { useEffect, useState } from 'react';

export function RewardComplete({ onClose }: { onClose: () => void }) {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds === 0) {
      onClose();
      return;
    }
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, onClose]);

  return (
    <div
      className='fixed top-0 left-0 w-full h-screen flex flex-col items-center z-50 bg-white'
      onClick={onClose}
    >
      {/* 상단 5/8 영역 */}
      <div className='w-full h-[512px] bg-primary-pink flex items-center justify-center'>
        <div className='text-center flex flex-col items-center'>
          <div>
            <div className='w-[290] h-[287px] bg-blue-400'></div>
          </div>
          <div className='mt-[21px] flex flex-col items-center'>
            <h1 className='headline-1 mb-4 text-white'>리워드 적립완료!</h1>
            <div className='flex flex-row items-center gap-2.5'>
              <p className='subtitle-4 text-white'>적립된 포인트는 리워드 상점에서 사용 가능해요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 3/8 영역 */}
      <div className='w-full flex items-center justify-center'>
        <div className='text-center flex flex-col items-center'>
          <div className='flex flex-row mt-12'>
            <div className='flex flex-row items-center gap-2.5'>
              <Image
                src='/images/kakao-talk-icon-x3.png'
                alt='complete-step'
                width={42}
                height={42}
                className=''
              />
              <p className='subtitle-4 text-gray-5'>카카오톡을 확인해주세요!</p>
            </div>
          </div>
          <div className='body-1 text-primary-pink mt-[125px]'>
            {seconds}초 후 메인화면으로 이동합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
