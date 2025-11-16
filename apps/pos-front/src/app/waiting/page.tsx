'use client';

import { useState } from 'react';

type TabType = 'waiting' | 'seated' | 'cancelled';

interface WaitingItem {
  id: number;
  number: number;
  type: '현장';
  totalPeople: number;
  adults: number;
  children: number;
  childSeats: number;
  name: string;
  phone: string;
  visitCount: number;
  waitTime: number; // 분 단위
  callTimer?: string; // 호출 타이머 (예: "01:04")
  registeredTime?: string; // 등록 시간 (예: "16시 00분")
  cancelReason?: string; // 취소 사유 (예: "고객요청(매장)")
}

const tabs: { id: TabType; label: string; info?: string }[] = [
  { id: 'waiting', label: '웨이팅 중', info: '1팀 · 4명' },
  { id: 'seated', label: '착석', info: '1팀 · 4명' },
  { id: 'cancelled', label: '취소', info: '1팀 · 4명' },
];

const waitingData: WaitingItem[] = [
  {
    id: 1,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
    callTimer: '01:04',
  },
  {
    id: 2,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
  },
  {
    id: 3,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
  },
  {
    id: 4,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
  },
  {
    id: 5,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
  },
];

const seatedData: WaitingItem[] = [
  {
    id: 1,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
    registeredTime: '16시 00분',
  },
];

const cancelledData: WaitingItem[] = [
  {
    id: 1,
    number: 1,
    type: '현장',
    totalPeople: 4,
    adults: 3,
    children: 1,
    childSeats: 1,
    name: '홍길동',
    phone: '010-7112-0493',
    visitCount: 5,
    waitTime: 4,
    cancelReason: '고객요청(매장)',
  },
];

const WaitingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('waiting');
  const [isWaitingActive] = useState(true);

  return (
    <div className='min-h-[calc(100vh-60px)] w-full bg-[#F1F3F5]'>
      {/* 탭 메뉴 */}
      <div className='flex items-center gap-0 bg-white'>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-[63px] py-[22px] text-base font-medium transition-colors ${
                isActive
                  ? 'text-[#6366F1] border-b-[5px] border-[#6366F1]'
                  : 'text-[#767676] border-b-[5px] border-transparent'
              }`}
            >
              {tab.label}
              {tab.info && <span className='ml-2'>{tab.info}</span>}
            </button>
          );
        })}
      </div>

      <div className='mx-auto w-full max-w-[1280px]'>
        {/* 웨이팅 카드 리스트 */}
        <div className='px-10 py-6 space-y-3'>
          {activeTab === 'waiting' &&
            waitingData.map((item) => (
              <div
                key={item.id}
                className='bg-white rounded-[12px] p-4 flex items-center gap-4'
                style={{ width: '1200px', height: '132px' }}
              >
                {/* 왼쪽: 번호와 현장 */}
                <div className='flex flex-col items-center gap-1 px-[30px] py-[17px] bg-white rounded-[12px] min-w-[91px]'>
                  <span className='text-[36px] font-semibold leading-[1.2] text-black'>{item.number}</span>
                  <span className='text-lg font-bold leading-[1.2] text-black'>{item.type}</span>
                </div>

                {/* 구분선 */}
                <div className='w-[1px] h-full bg-[#E2DFDF]' />

                {/* 중간: 정보 영역 */}
                <div className='flex-1 flex flex-col gap-2 min-w-[269px]'>
                  {/* 첫 번째 줄: 총 인원, 성인/유아 정보 */}
                  <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold leading-[1.2] text-black'>
                      총 {item.totalPeople}명
                    </span>
                    <div className='w-[1px] h-4 bg-[#E2DFDF]' />
                    <span className='text-lg font-bold leading-[1.2] text-black'>
                      성인 {item.adults} · 유아 {item.children} - 유아용 의자 {item.childSeats}
                    </span>
                  </div>

                  {/* 두 번째 줄: 이름, 전화번호, 방문 횟수 */}
                  <div className='flex items-center gap-[6px]'>
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>{item.name}</span>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#767676]' />
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>{item.phone}</span>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#767676]' />
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>
                      {item.visitCount}회 방문
                    </span>
                  </div>

                  {/* 세 번째 줄: 대기 시간 */}
                  <span className='text-lg font-medium leading-[1.2] text-[#767676]'>
                    {item.waitTime}분 대기
                  </span>
                </div>

                {/* 오른쪽: 버튼들 */}
                <div className='flex items-center gap-3'>
                  {/* 착석 버튼 */}
                  <button
                    type='button'
                    className='w-[154px] h-[100px] rounded-[12px] bg-[#6366F1] text-white text-xl font-medium flex items-center justify-center'
                  >
                    착석
                  </button>

                  {/* 취소 버튼 */}
                  <button
                    type='button'
                    className='w-[154px] h-[100px] rounded-[12px] bg-[#F1F3F5] text-black text-xl font-medium flex items-center justify-center'
                  >
                    취소
                  </button>

                  {/* 호출 버튼 */}
                  <button
                    type='button'
                    className='w-[154px] h-[100px] rounded-[12px] bg-[rgba(99,102,241,0.1)] text-[#6366F1] text-xl font-medium flex flex-col items-center justify-center gap-1'
                  >
                    <span>호출</span>
                    {item.callTimer && <span className='text-xl font-medium'>{item.callTimer}</span>}
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'seated' &&
            seatedData.map((item) => (
              <div
                key={item.id}
                className='bg-white rounded-[12px] p-4 flex items-center gap-4'
                style={{ width: '1200px', height: '132px' }}
              >
                {/* 왼쪽: 번호와 현장 */}
                <div className='flex flex-col items-center gap-1 px-[30px] py-[17px] bg-white rounded-[12px] min-w-[91px]'>
                  <span className='text-[36px] font-semibold leading-[1.2] text-black'>{item.number}</span>
                  <span className='text-lg font-bold leading-[1.2] text-black'>{item.type}</span>
                </div>

                {/* 구분선 */}
                <div className='w-[1px] h-full bg-[#E2DFDF]' />

                {/* 중간: 정보 영역 */}
                <div className='flex-1 flex flex-col gap-2 min-w-[269px]'>
                  {/* 첫 번째 줄: 총 인원, 성인/유아 정보 */}
                  <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold leading-[1.2] text-black'>
                      총 {item.totalPeople}명
                    </span>
                    <div className='w-[1px] h-4 bg-[#E2DFDF]' />
                    <span className='text-lg font-bold leading-[1.2] text-black'>
                      성인 {item.adults} · 유아 {item.children} - 유아용 의자 {item.childSeats}
                    </span>
                  </div>

                  {/* 두 번째 줄: 이름, 전화번호, 방문 횟수 */}
                  <div className='flex items-center gap-[6px]'>
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>{item.name}</span>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#767676]' />
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>{item.phone}</span>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#767676]' />
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>
                      {item.visitCount}회 방문
                    </span>
                  </div>

                  {/* 세 번째 줄: 등록 시간과 대기 시간 */}
                  <span className='text-lg font-medium leading-[1.2] text-[#767676]'>
                    {item.registeredTime} 등록 {item.waitTime}분 대기
                  </span>
                </div>

                {/* 오른쪽: 버튼들 */}
                <div className='flex items-center gap-3'>
                  {/* 웨이팅 되돌리기 버튼 */}
                  <button
                    type='button'
                    className='w-[199px] h-[100px] rounded-[12px] bg-[#6366F1] text-white text-xl font-medium flex items-center justify-center'
                  >
                    웨이팅 되돌리기
                  </button>

                  {/* 아이콘 버튼 */}
                  <button
                    type='button'
                    className='w-[52px] h-[54px] rounded-[12px] border border-[#E2DFDF] bg-white flex items-center justify-center'
                    aria-label='더보기'
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 8V16M8 12H16'
                        stroke='#767676'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'cancelled' &&
            cancelledData.map((item) => (
              <div
                key={item.id}
                className='bg-white rounded-[12px] p-4 flex items-center gap-4'
                style={{ width: '1200px', height: '132px' }}
              >
                {/* 왼쪽: 번호와 현장 */}
                <div className='flex flex-col items-center gap-1 px-[30px] py-[17px] bg-white rounded-[12px] min-w-[91px]'>
                  <span className='text-[36px] font-semibold leading-[1.2] text-black'>{item.number}</span>
                  <span className='text-lg font-bold leading-[1.2] text-black'>{item.type}</span>
                </div>

                {/* 구분선 */}
                <div className='w-[1px] h-full bg-[#E2DFDF]' />

                {/* 중간: 정보 영역 */}
                <div className='flex-1 flex flex-col gap-2 min-w-[269px]'>
                  {/* 첫 번째 줄: 총 인원, 성인/유아 정보 */}
                  <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold leading-[1.2] text-black'>
                      총 {item.totalPeople}명
                    </span>
                    <div className='w-[1px] h-4 bg-[#E2DFDF]' />
                    <span className='text-lg font-bold leading-[1.2] text-black'>
                      성인 {item.adults} · 유아 {item.children} - 유아용 의자 {item.childSeats}
                    </span>
                  </div>

                  {/* 두 번째 줄: 이름, 전화번호, 방문 횟수 */}
                  <div className='flex items-center gap-[6px]'>
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>{item.name}</span>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#767676]' />
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>{item.phone}</span>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#767676]' />
                    <span className='text-lg font-medium leading-[1.2] text-[#767676]'>
                      {item.visitCount}회 방문
                    </span>
                  </div>

                  {/* 세 번째 줄: 취소 사유 */}
                  <span className='text-lg font-medium leading-[1.2] text-[#767676]'>
                    취소사유: {item.cancelReason}
                  </span>
                </div>

                {/* 오른쪽: 버튼들 */}
                <div className='flex items-center gap-3'>
                  {/* 웨이팅 되돌리기 버튼 */}
                  <button
                    type='button'
                    className='w-[199px] h-[100px] rounded-[12px] bg-[#6366F1] text-white text-xl font-medium flex items-center justify-center'
                  >
                    웨이팅 되돌리기
                  </button>

                  {/* 아이콘 버튼 */}
                  <button
                    type='button'
                    className='w-[52px] h-[54px] rounded-[12px] border border-[#E2DFDF] bg-white flex items-center justify-center'
                    aria-label='더보기'
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 8V16M8 12H16'
                        stroke='#767676'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* 하단 고정 영역 */}
        <div className='fixed bottom-0 left-0 right-0 h-[108px] bg-[#292929] px-10 flex items-center justify-between'>
          {/* 왼쪽: 웨이팅 접수중 드롭다운 */}
          {activeTab === 'waiting' && (
            <div
              className={`flex items-center gap-2 px-8 py-[18px] rounded-[12px] ${
                isWaitingActive
                  ? 'bg-[rgba(11,183,109,0.1)] border-2 border-[#0BB76D]'
                  : 'bg-[rgba(43,158,30,0.1)] border-2 border-[#2B9E1E]'
              }`}
            >
              <div
                className={`w-[10px] h-[10px] rounded-full ${
                  isWaitingActive ? 'bg-[#0BB76D]' : 'bg-[#2B9E1E]'
                }`}
              />
              <span className='text-lg font-medium text-white'>웨이팅 접수중</span>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='ml-8'
              >
                <path
                  d='M5 7.5L10 12.5L15 7.5'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          )}

          {activeTab === 'seated' && (
            <div className='flex items-center gap-2 px-8 py-[18px] rounded-[12px] bg-[rgba(247,199,22,0.1)] border-2 border-[#F7C716]'>
              <div className='w-[10px] h-[10px] rounded-full bg-[#F7C716]' />
              <span className='text-lg font-medium text-white'>웨이팅 접수중</span>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='ml-8'
              >
                <path
                  d='M5 7.5L10 12.5L15 7.5'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          )}

          {activeTab === 'cancelled' && (
            <div className='flex items-center gap-2 px-8 py-[18px] rounded-[12px] bg-[rgba(225,19,0,0.1)] border-2 border-[#E11300]'>
              <div className='w-[10px] h-[10px] rounded-full bg-[#E11300]' />
              <span className='text-lg font-medium text-white'>웨이팅 접수중</span>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='ml-8'
              >
                <path
                  d='M5 7.5L10 12.5L15 7.5'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          )}

          {/* 오른쪽: 웨이팅 예상 시간과 등록 버튼 */}
          <div className='flex items-center gap-3'>
            {/* 웨이팅 예상 시간 */}
            <div className='flex items-center gap-[10px] px-8 py-[18px] bg-[#292929] rounded-[12px]'>
              <span className='text-lg font-medium text-white'>웨이팅 예상 시간</span>
              <span className='text-xl font-medium text-[#0BB76D]'>10분</span>
            </div>

            {/* 웨이팅 등록 버튼 */}
            <button
              type='button'
              className='flex items-center gap-[10px] px-7 py-[18px] bg-white rounded-[12px] text-black text-xl font-medium'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 5V19M5 12H19'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>웨이팅 등록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;
