import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

type CouponStatus = '단골 전용' | '발급중';

type CouponProps = {
  title: string;
  period: string;
  statuses: CouponStatus[];
  receivedCount?: number;
  purchaseCount?: number;
  usedCount?: number;
  canceledCount?: number;
  details?: ReactNode;
  isActive?: boolean;
  className?: string;
};

const Coupon = ({
  title,
  period,
  statuses,
  receivedCount,
  purchaseCount,
  usedCount,
  canceledCount,
  details,
  isActive = false,
  className,
}: CouponProps) => {
  const statusColors: Record<CouponStatus, string> = {
    '단골 전용': 'bg-[#FF2B3D1A] text-primary-pink',
    발급중: 'bg-[#0080F81A] text-[#0080F8]',
  };

  const showCounts =
    receivedCount !== undefined ||
    purchaseCount !== undefined ||
    usedCount !== undefined ||
    canceledCount !== undefined;

  return (
    <div
      className={cn(
        'rounded-[20px] border bg-white p-8 shadow-sm min-w-[704px] max-w-[1080px]',
        isActive ? 'border-2 border-fooding-purple' : 'border-gray-200',
        className,
      )}
    >
      <div className='flex flex-col  justify-between'>
        <div className=''>
          <div className='mb-2 flex flex-wrap items-center gap-2'>
            {statuses.map((status, index) => (
              <span
                key={index}
                className={cn(
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap',
                  statusColors[status],
                )}
              >
                {status}
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div>
            <h3 className='mb-1 text-xl font-semibold text-gray-900'>{title}</h3>
            <p className='text-sm text-gray-5'>{period}</p>
          </div>
          {showCounts && (
            <div className='ml-6 grid grid-cols-4 gap-6 text-center'>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>총 발급수</p>
                <p className='mt-1 text-xl font-semibold text-black'>{receivedCount ?? 0}</p>
              </div>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>구매 수량</p>
                <p className='mt-1 text-xl font-semibold text-black'>{purchaseCount ?? 0}</p>
              </div>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>사용 수량</p>
                <p className='mt-1 text-xl font-semibold text-black'>{usedCount ?? 0}</p>
              </div>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>남은 수량</p>
                <p className='mt-1 text-xl font-semibold text-black'>{canceledCount ?? 0}</p>
              </div>
            </div>
          )}
        </div>

        {details && (
          <div className='bg-[#6366F10D] rounded-[16px] p-4 w-full mt-[18px] flex flex-row gap-1'>
            <div className='text-base text-gray-5'>이용안내</div>
            <div className='text-base text-gray-5'>{details}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Coupon };
export type { CouponProps, CouponStatus };
