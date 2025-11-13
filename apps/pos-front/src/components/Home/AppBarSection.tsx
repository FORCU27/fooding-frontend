'use client';

import { useState } from 'react';

interface AppBarSectionProps {
  handleDrawerToggle: () => void;
}

type TabType = '주문' | '리워드' | '웨이팅';

const AppBarSection = ({ handleDrawerToggle }: AppBarSectionProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('주문');

  return (
    <header
      className='fixed top-0 left-0 w-full h-[60px] border-b border-gray-2 bg-white text-black z-50'
    >
      <div className='h-full px-6 flex items-center max-w-[1280px] mx-auto'>
        {/* 왼쪽: 메뉴 아이콘 (모바일 및 데스크톱 모두) */}
        <button
          type='button'
          onClick={handleDrawerToggle}
          className='w-6 h-6 flex items-center justify-center flex-shrink-0'
          aria-label='메뉴 토글'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3 6H21M3 12H21M3 18H21'
              stroke='#111111'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* 중앙: 탭 네비게이션 */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='flex items-center gap-1 bg-[rgba(99,102,241,0.1)] rounded-lg p-0.5 relative'>
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-md bg-white shadow-sm transition-all duration-200 ${
                activeTab === '주문' ? 'left-0.5 w-[70px]' : activeTab === '리워드' ? 'left-[72px] w-[70px]' : 'left-[143px] w-[70px]'
              }`}
            />
            <button
              onClick={() => setActiveTab('주문')}
              className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors z-10 ${
                activeTab === '주문' ? 'text-black' : 'text-gray-5'
              }`}
            >
              주문
            </button>
            <button
              onClick={() => setActiveTab('리워드')}
              className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors z-10 ${
                activeTab === '리워드' ? 'text-black' : 'text-gray-5'
              }`}
            >
              리워드
            </button>
            <button
              onClick={() => setActiveTab('웨이팅')}
              className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors z-10 ${
                activeTab === '웨이팅' ? 'text-black' : 'text-gray-5'
              }`}
            >
              웨이팅
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBarSection;
