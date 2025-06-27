import { UserCoupon } from '@repo/api/app';

import Coupon from './Coupon';

interface CouponListProps {
  list: UserCoupon[];
  isLoading: boolean;
  isError: boolean;
  setSelectedCouponId: (value: number) => void;
}

const CouponList = ({ list, isLoading, isError, setSelectedCouponId }: CouponListProps) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>쿠폰 데이터를 불러오지 못했습니다.</div>;
  if (list.length === 0) return <div>보유 쿠폰이 존재하지 않습니다.</div>;
  return (
    <div className='grid grid-cols-4 gap-4 max-w-[1280px] mx-auto'>
      {list.map((coupon) => (
        <Coupon key={coupon.id} coupon={coupon} setSelectedCouponId={setSelectedCouponId} />
      ))}
    </div>
  );
};

export default CouponList;
