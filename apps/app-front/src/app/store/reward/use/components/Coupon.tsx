import { UserCoupon } from '@repo/api/app';
import { GiftIcon } from '@repo/design-system/icons';
import clsx from 'clsx';

import { formatDate } from '@/app/utils/datetime';

interface CouponProps {
  coupon: UserCoupon;
  setSelectedCouponId: (value: number) => void;
}

const Coupon = ({ coupon, setSelectedCouponId }: CouponProps) => {
  return (
    <div className='flex flex-col px-[28px] py-[30px] max-w-[274px] rounded-2xl border-2 border-gray-2 items-center'>
      <p className='self-start body-1 text-gray-6 pb-[30px]'>{coupon.name}</p>
      <GiftIcon size={120} className='text-gray-2' />
      <div className='pb-[30px]' />
      <div className='flex flex-col text-gray-5 pb-[16px]'>
        <div className='flex gap-[8px]'>
          <div className='body-4-1'>발급</div>
          <div className='body-4-1'>{formatDate(coupon.createdDateAt)}</div>
        </div>
        <div className='flex gap-[8px]'>
          <div className='body-4-1'>만료</div>
          <div className='body-4-1'>{formatDate(coupon.expiredOn)}</div>
        </div>
      </div>
      <button
        className={clsx(
          'body-1 rounded-full w-full py-[14px]',
          coupon.used ? 'bg-gray-1 text-gray-4' : 'bg-primary-pink text-white',
        )}
        onClick={() => setSelectedCouponId(coupon.id)}
      >
        {coupon.used ? '사용완료' : '사용하기'}
      </button>
    </div>
  );
};

export default Coupon;
