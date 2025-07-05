'use client';

import Image from 'next/image';

import { ScreenMode } from '../../types/layout';
interface Props {
  className?: string;
  screenMode?: ScreenMode;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const AppBarSection = ({
  className,
  screenMode = 'desktop',
  isSidebarOpen,
  onToggleSidebar,
}: Props) => {
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

  // 로고 크기 결정
  const getLogoSize = () => {
    switch (screenMode) {
      case 'mobile':
        return { width: 100, height: 18 };
      case 'tablet':
        return { width: 140, height: 24 };
      default:
        return { width: 162, height: 28 };
    }
  };

  // 로그아웃 버튼 크기 결정
  const getLogoutButtonSize = () => {
    switch (screenMode) {
      case 'mobile':
        return 'w-[50px] h-[30px] text-xs';
      case 'tablet':
        return 'w-[70px] h-[40px] text-sm';
      default:
        return 'w-[80px] h-[45px]';
    }
  };

  const logoSize = getLogoSize();
  const logoutButtonSize = getLogoutButtonSize();

  return (
    <div className={`flex p-3 justify-between items-center z-50 relative ${className || ''}`}>
      <div className='flex items-center gap-3'>
        {/* 모바일과 태블릿에서만 햄버거 메뉴 표시 */}
        {(screenMode === 'mobile' || screenMode === 'tablet') && (
          <button
            onClick={onToggleSidebar}
            className='p-2 hover:bg-gray-100 rounded-md transition-colors'
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
        )}
        <Image
          src='/images/fooding-ceo-logo.png'
          width={logoSize.width}
          height={logoSize.height}
          alt='ceo-logo'
          className='object-contain'
        />
      </div>

      {/*FIXME: 테스트용 로그아웃 버튼입니다 */}
      <button
        type='button'
        onClick={handleLogoutClick}
        className={`cursor-pointer border border-gray-8 rounded-[11px] transition-all hover:bg-gray-50 ${logoutButtonSize}`}
      >
        로그아웃
      </button>
    </div>
  );
};

export default AppBarSection;
