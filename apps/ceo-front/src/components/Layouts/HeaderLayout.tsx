'use client';

import Image from 'next/image';

interface Props {
  className?: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const AppBarSection = ({ className, isSidebarOpen, onToggleSidebar }: Props) => {
  const handleLogoutClick = async () => {
    try {
      // 로그아웃 요청 보내기
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div
      className={`flex px-[32px] py-[25px] justify-between bg-white items-center z-50 relative ${className || ''}`}
    >
      <div className='flex items-center gap-3'>
        {/* 모바일과 태블릿에서만 햄버거 메뉴 표시 */}
        <button
          onClick={onToggleSidebar}
          className='p-2 hover:bg-gray-100 rounded-md transition-colors lg:hidden'
          aria-label='메뉴 토글'
        >
          {isSidebarOpen ? (
            // X 아이콘 (사이드바가 열려있을 때)
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-700'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          ) : (
            // 햄버거 아이콘 (사이드바가 닫혀있을 때)
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-700'
            >
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <line x1='3' y1='12' x2='21' y2='12'></line>
              <line x1='3' y1='18' x2='21' y2='18'></line>
            </svg>
          )}
        </button>

        <Image
          src='/images/fooding-ceo-logo.svg'
          width={162}
          height={28}
          alt='ceo-logo'
          className='object-contain'
        />
      </div>

      {/*FIXME: 테스트용 로그아웃 버튼입니다 */}
      <button
        type='button'
        onClick={handleLogoutClick}
        className={`cursor-pointer border border-gray-8 rounded-[11px] px-[16px] py-[10px] transition-all hover:bg-gray-50`}
      >
        로그아웃
      </button>
    </div>
  );
};

export default AppBarSection;
