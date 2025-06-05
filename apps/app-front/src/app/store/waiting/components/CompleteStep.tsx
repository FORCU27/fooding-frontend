import Image from 'next/image';

import { GetWaitingDetailResponse } from '@repo/api/app';

type CompleteStepProps = {
  onClose: () => void;
  waitingList: GetWaitingDetailResponse[];
  currentWaiting?: {
    callNumber: number;
  };
};

export const CompleteStep = ({ onClose, waitingList, currentWaiting }: CompleteStepProps) => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-screen flex flex-col items-center z-50 bg-white'
      onClick={onClose}
    >
      {/* 상단 5/8 영역 */}
      <div className='w-full h-[62.5vh] bg-primary-pink flex items-center justify-center'>
        <div className='text-center flex flex-col items-center'>
          <h1 className='headline-2-2 mb-4 text-white'>지금 나는 몇번째..?</h1>
          <div className='w-[320px] h-[240px] flex items-center justify-center '>
            <h1 className='text-[200px] font-bold text-white'>{currentWaiting?.callNumber}</h1>
          </div>
          <div className='flex flex-row items-center gap-2.5'>
            <Image
              src='/images/kakao-talk-icon-x3.png'
              alt='complete-step'
              width={42}
              height={42}
              className=''
            />
            <p className='subtitle-4-2'>카카오톡으로 순서를 알려드려요!</p>
          </div>
        </div>
      </div>

      {/* 하단 3/8 영역 */}
      <div className='w-full h-[37.5vh] flex items-center justify-center'>
        <div className='text-center'>
          <div className='flex flex-row mt-12'>
            <div className='w-[250px] flex flex-col items-center'>
              <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>현재 웨이팅</h3>
              <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
                {waitingList.length}
                <span className='text-3xl ml-2'>팀</span>
              </p>
            </div>
            <div className='w-[250px] border-l border-dark flex flex-col items-center'>
              <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>예상시간</h3>
              <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
                {waitingList.length * 10}
                <span className='text-3xl ml-2'>분</span>
              </p>
            </div>
            <div className='w-[250px] border-l border-dark flex flex-col items-center'>
              <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>최근입장</h3>
              <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
                5<span className='text-3xl ml-2'>분</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
