'use client';

const AppBarSection = () => {
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
    <header className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white text-black z-50 sm:ml-[240px]'>
      <div className='h-16 px-4 flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <span className='ml-4 text-lg font-medium'>강고기 홍대점</span>
          {/*FIXME: 테스트용 로그아웃 버튼입니다 */}
          <button
            type='button'
            onClick={handleLogoutClick}
            className='cursor-pointer border border-gray-3 w-[80px] h-[45px] rounded-[11px]'
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppBarSection;
