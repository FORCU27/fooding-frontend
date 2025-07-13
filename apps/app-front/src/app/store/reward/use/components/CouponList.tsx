import { UserCoupon } from '@repo/api/app';

import Coupon from './Coupon';
import EmptyList from './EmptyList';

interface CouponListProps {
  list: UserCoupon[];
  isLoading: boolean;
  setSelectedCouponId: (value: number) => void;
}

const CouponList = ({ list, isLoading, setSelectedCouponId }: CouponListProps) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (list.length === 0) return <EmptyList message='쿠폰함이 비어있어요!' className='h-[480px]' />;
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto'>
      {list.map((coupon) => (
        <Coupon key={coupon.id} coupon={coupon} setSelectedCouponId={setSelectedCouponId} />
      ))}
    </div>
  );
};

export default CouponList;
