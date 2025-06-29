import Image from 'next/image';

interface Props {
  className?: string;
}

const AppBarSection = ({ className }: Props) => {
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
    <div className={`flex p-3 justify-between items-center ${className || ''}`}>
      <Image src='/images/fooding-ceo-logo.png' width={162} height={28} alt='ceo-logo' />

      {/*FIXME: 테스트용 로그아웃 버튼입니다 */}
      <button
        type='button'
        onClick={handleLogoutClick}
        className='cursor-pointer border border-gray-8 w-[80px] h-[45px] rounded-[11px]'
      >
        로그아웃
      </button>
    </div>
  );
};

export default AppBarSection;
