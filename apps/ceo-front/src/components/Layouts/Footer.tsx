export const Footer = () => {
  return (
    <footer className='border-t border-gray-8 h-[180px] w-full flex flex-col justify-center text-[12px]'>
      <div className='flex items-center'>
        <div className='flex flex-col space-y-3 ml-10 mr-10 text-gray-6'>
          <div className='flex items-center space-x-2'>
            <span>이용약관</span>
            <span className='text-gray-8'>|</span>
            <span>개인정보처리방침</span>
          </div>
          <div className=''>
            <span className='text-gray-6 font-bold  '>주식회사 Fooding 대표 홍길동</span>
          </div>
        </div>

        <div className='flex flex-col space-y-3 text-right text-gray-5'>
          <div className='flex items-center'>
            <span>자세히 보기</span>
            <svg className='w-3 h-3 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
          <div className=''>
            <span>사업자 등록번호 555-55-55555</span>
            <span className='mx-2'>|</span>
            <span>서울특별시 강남구 역삼로 555</span>
            <span className='mx-2'>|</span>
            <span>@ Fooding.co.kr</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
