'use client';

import { useState } from 'react';

const Header = () => {
  return (
    <header className='flex items-center justify-between bg-gray-50 px-4 py-2'>
      <div className='flex items-center gap-2'>
        <button className='flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-lg cursor-pointer bg-white'>
          ☰
        </button>
        <div className='flex items-center gap-2 w-52 h-10 px-4 border border-gray-300 rounded-md cursor-pointer bg-white'>
          <span className='w-2 h-2 rounded-full bg-green-500' />
          <span className='text-sm font-medium text-gray-800'>웨이팅 접수중</span>
          <svg
            className='ml-auto w-4 h-4 text-gray-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='h-10 px-3 flex items-center border border-gray-300 rounded-md text-sm font-medium text-gray-800 bg-white'>
          <span className='text-gray-500 mr-1'>웨이팅 예상 시간</span>
          <strong className='text-black'>10분</strong>
        </div>
        <button className='h-10 px-4 rounded-md border border-gray-300 text-sm font-medium text-gray-800 cursor-pointer bg-white'>
          + 웨이팅 등록
        </button>
      </div>
    </header>
  );
};

// 탭 구성
const tabs = [
  { key: 'waiting', label: '웨이팅 중', info: '1팀 • 4명' },
  { key: 'seated', label: '착석' },
  { key: 'canceled', label: '취소' },
];

const Tab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (key: string) => void;
}) => {
  return (
    <div className='flex gap-8 px-4 border-b border-gray-200 bg-gray-50'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative py-3 text-sm font-medium cursor-pointer transition-colors ${
            activeTab === tab.key
              ? 'text-black font-semibold border-b-2 border-black'
              : 'text-gray-500'
          }`}
        >
          {tab.label}
          {tab.info && tab.key === 'waiting' && (
            <span className='ml-2 text-sm font-semibold'>({tab.info})</span>
          )}
        </button>
      ))}
    </div>
  );
};

// 리스트
const List = ({ activeTab }: { activeTab: string }) => {
  if (activeTab !== 'waiting') return null;

  return (
    <div className='p-4 bg-white'>
      <div className='flex items-center justify-between rounded-md p-4'>
        <div className='flex flex-col items-center mr-4 bg-gray-100 px-2 py-3 rounded'>
          <div className='text-lg font-bold mb-2'>1</div>
          <button className='text-xs font-medium border border-gray-300 px-2 py-0.5 rounded'>
            메모
          </button>
        </div>

        <div className='flex flex-col items-center mr-6'>
          <div className='text-lg font-bold'>2</div>
          <div className='text-sm font-medium text-gray-700'>현장</div>
        </div>

        <div className='flex-1 text-sm text-gray-700'>
          <div className='font-medium mb-1'>
            총 4명 <span className='mx-2'>•</span> 성인 3 <span className='mx-2'>•</span> 유아 1 -
            유아용 의자 1
          </div>
          <div className='mb-1'>
            강주영 <span className='mx-2'>•</span> 010-1234-5678 <span className='mx-2'>•</span> 5회
            방문
          </div>
          <div>4분 대기</div>
        </div>

        <div className='flex items-center gap-3 ml-4 h-24'>
          <button className='bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-md w-30 h-full'>
            호출 (1/2)
            <br />
            <span className='text-xs'>02:59</span>
          </button>
          <button className='bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-md w-30 h-full'>
            착석
          </button>
          <button className='bg-rose-400 text-white text-sm font-semibold px-4 py-2 rounded-md w-30 h-full'>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminWaitingPage() {
  const [activeTab, setActiveTab] = useState<string>('waiting');

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      <List activeTab={activeTab} />
    </div>
  );
}
