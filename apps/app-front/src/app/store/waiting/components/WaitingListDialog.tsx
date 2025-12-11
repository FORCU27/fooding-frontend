'use client';

import { GetWaitingDetailResponse } from '@repo/api/app';

interface WaitingListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  waitingList: GetWaitingDetailResponse[];
}

export const WaitingListDialog = ({ isOpen, onClose, waitingList }: WaitingListDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-[32px] w-[760px] h-[90vh] overflow-hidden shadow-xl flex flex-col'>
        {/* Header */}
        <div className='relative p-[30px]'>
          <h2 className='headline-5 text-center mt-[60px]'>
            {waitingList.length}팀이 대기 중이에요!
          </h2>
          <button
            onClick={onClose}
            className='absolute right-[30px] top-[30px] w-10 h-10 flex items-center justify-center cursor-pointer'
          >
            <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.5 2.5L2.5 32.5M2.5 2.5L32.5 32.5" stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* List with gradient fade */}
        <div className='relative flex-1 overflow-hidden'>
          {/* 상단 그라디언트 */}
          <div className='absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-white to-transparent z-10 pointer-events-none' />
          
          {/* 스크롤 영역 */}
          <div className='p-[40px] h-full overflow-y-auto flex flex-col gap-3'>
            {waitingList.map((item, index) => {
              const totalCount = item.adultCount + item.infantCount;
              
              return (
                <div
                  key={item.id}
                  className='flex items-center gap-3'
                >
                  {/* 순번 */}
                  <div className='w-12 h-12 mr-5 rounded-full bg-primary-pink text-white flex items-center justify-center font-bold subtitle-3'>
                    {index + 1}
                  </div>
                  <div
                    className='flex items-center flex-1 py-6 bg-gray-50 rounded-2xl px-8 subtitle-3'
                  >
                    {/* 번호 */}
                    <div className='flex-1 text-center'>
                      <span className=''>{item.callNumber}번</span>
                    </div>

                    {/* 인원 */}
                    <div className='flex-1 text-center subtitle-3'>
                      <span className=''>총 {totalCount}명</span>
                    </div>

                    {/* 채널/상태 */}
                    <div className='flex-1 text-center'>
                      <div className='text-primary-pink body-1 font-bold'>
                        {item.channel === 'IN_PERSON' ? '현장 등록' : '온라인'}
                      </div>
                      <div className='text-gray-400 body-3'>
                        {item.infantChairCount > 0 ? `유아의자 ${item.infantChairCount}개` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {waitingList.length === 0 && (
              <div className='flex-1 flex items-center justify-center text-gray-400'>
                대기 중인 팀이 없습니다.
              </div>
            )}
          </div>
          
          {/* 하단 그라디언트 */}
          <div className='absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white to-transparent z-10 pointer-events-none' />
        </div>
      </div>
    </div>
  );
};
