'use client';

interface WaitingItem {
  id: number;
  callNumber: number;
  totalCount: number;
  waitingMinutes: number;
  registeredTime: string;
}

interface WaitingListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  waitingList: WaitingItem[];
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
            {waitingList.map((item, index) => (
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
                    <span className=''>총 {item.totalCount}명</span>
                  </div>

                  {/* 대기시간 */}
                  <div className='flex-1 text-center'>
                    <div className='text-primary-pink body-1 font-bold'>
                      {item.waitingMinutes}분 웨이팅
                    </div>
                    <div className='text-gray-400 body-3'>
                      {item.registeredTime} 등록
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 하단 그라디언트 */}
          <div className='absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white to-transparent z-10 pointer-events-none' />
        </div>
      </div>
    </div>
  );
};

// 목데이터 생성 함수 (10개)
export const getMockWaitingList = (): WaitingItem[] => [
  { id: 1, callNumber: 25, totalCount: 2, waitingMinutes: 45, registeredTime: '02:47' },
  { id: 2, callNumber: 26, totalCount: 8, waitingMinutes: 20, registeredTime: '02:47' },
  { id: 3, callNumber: 27, totalCount: 7, waitingMinutes: 14, registeredTime: '02:47' },
  { id: 4, callNumber: 28, totalCount: 2, waitingMinutes: 3, registeredTime: '02:47' },
  { id: 5, callNumber: 29, totalCount: 3, waitingMinutes: 1, registeredTime: '02:47' },
  { id: 6, callNumber: 30, totalCount: 4, waitingMinutes: 0, registeredTime: '02:50' },
  { id: 7, callNumber: 31, totalCount: 5, waitingMinutes: 0, registeredTime: '02:52' },
  { id: 8, callNumber: 32, totalCount: 2, waitingMinutes: 0, registeredTime: '02:55' },
  { id: 9, callNumber: 33, totalCount: 6, waitingMinutes: 0, registeredTime: '02:58' },
  { id: 10, callNumber: 34, totalCount: 3, waitingMinutes: 0, registeredTime: '03:00' },
];
