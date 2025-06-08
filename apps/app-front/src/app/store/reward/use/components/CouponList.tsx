interface CouponListProps {
  subTab: string; // 'available' | 'used';
}

const GiftIcon = () => (
  <svg
    width='110'
    height='110'
    viewBox='0 0 110 110'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M55 25V105M55 25H72.6786C75.2834 25 77.7815 23.9464 79.6234 22.0711C81.4652 20.1957 82.5 17.6522 82.5 15C82.5 12.3478 81.4652 9.8043 79.6234 7.92893C77.7815 6.05357 75.2834 5 72.6786 5C58.9286 5 55 25 55 25ZM55 25H37.3214C34.7166 25 32.2185 23.9464 30.3766 22.0711C28.5348 20.1957 27.5 17.6522 27.5 15C27.5 12.3478 28.5348 9.8043 30.3766 7.92893C32.2185 6.05357 34.7166 5 37.3214 5C51.0714 5 55 25 55 25ZM15 50V89C15 94.6005 15 97.4008 16.0899 99.5399C17.0487 101.422 18.5785 102.951 20.4601 103.91C22.5992 105 25.3995 105 31 105L79 105C84.6005 105 87.4008 105 89.5399 103.91C91.4215 102.951 92.9513 101.422 93.9101 99.5399C95 97.4008 95 94.6005 95 89V50M105 33L105 42C105 44.8003 105 46.2004 104.455 47.2699C103.976 48.2108 103.211 48.9757 102.27 49.455C101.2 50 99.8003 50 97 50L13 50C10.1997 50 8.7996 50 7.73005 49.455C6.78923 48.9757 6.02433 48.2108 5.54497 47.27C5 46.2004 5 44.8003 5 42V33C5 30.1997 5 28.7996 5.54497 27.7301C6.02433 26.7892 6.78923 26.0243 7.73005 25.545C8.7996 25 10.1997 25 13 25L97 25C99.8003 25 101.2 25 102.27 25.545C103.211 26.0243 103.976 26.7892 104.455 27.73C105 28.7996 105 30.1997 105 33Z'
      stroke='#EDEDED'
      stroke-width='10'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

const Coupon = () => {
  return (
    <div className='flex flex-col px-[29px] py-[30px] w-[274px] rounded-2xl border-2 border-gray-2 items-center'>
      <p className='body-1 text-gray-6 pb-[30px]'>계란김밥 제공</p>
      <GiftIcon />
      <div className='pb-[30px]' />
      <div className='flex flex-col text-gray-5 pb-[16px]'>
        {/* TODO gap 수치 수정 필요 */}
        <div className='flex gap-[3px]'>
          <div className='body-4-1'>발급</div>
          <div className='body-4-1'>2025-04-01 23:23:12</div>
        </div>
        <div className='flex gap-[3px'>
          <div className='body-4-1'>만료</div>
          <div className='body-4-1'>2025-04-30 23:23:12</div>
        </div>
      </div>
      <button className='body-1 bg-primary-pink rounded-full w-full py-[14px] text-white'>
        사용하기
      </button>
    </div>
  );
};

const CouponList = ({ subTab }: CouponListProps) => {
  return (
    <div>
      <Coupon />
    </div>
  );
};

export default CouponList;
