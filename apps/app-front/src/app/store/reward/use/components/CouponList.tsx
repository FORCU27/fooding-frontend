import { UserCoupon } from '@repo/api/app';
import { GiftIcon } from '@repo/design-system/icons';
import clsx from 'clsx';

import { formatDate } from '@/app/utils/datetime';

interface CouponListProps {
  list: UserCoupon[];
  isLoading: boolean;
  isError: boolean;
}

const Coupon = ({ coupon }: { coupon: UserCoupon }) => {
  return (
    <div className='flex flex-col px-[29px] py-[30px] w-[274px] rounded-2xl border-2 border-gray-2 items-center'>
      <p className='body-1 text-gray-6 pb-[30px]'>{coupon.name}</p>
      <GiftIcon />
      <div className='pb-[30px]' />
      <div className='flex flex-col text-gray-5 pb-[16px]'>
        {/* TODO gap 수치 수정 필요 */}
        <div className='flex gap-[3px]'>
          <div className='body-4-1'>발급</div>
          <div className='body-4-1'>{formatDate(coupon.createdDateAt)}</div>
        </div>
        <div className='flex gap-[3px'>
          <div className='body-4-1'>만료</div>
          <div className='body-4-1'>{formatDate(coupon.expiredOn)}</div>
        </div>
      </div>
      <button
        className={clsx(
          'body-1 rounded-full w-full py-[14px]',
          coupon.used ? 'bg-gray-1 text-gray-4' : 'bg-primary-pink text-white',
        )}
      >
        {coupon.used ? '사용완료' : '사용하기'}
      </button>
    </div>
  );
};

const CouponList = ({ list, isLoading, isError }: CouponListProps) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>쿠폰 데이터를 불러오지 못했습니다.</div>;
  return (
    <div>
      {list.map((coupon) => (
        <Coupon key={coupon.id} coupon={coupon} />
      ))}
    </div>
  );
};

export default CouponList;
