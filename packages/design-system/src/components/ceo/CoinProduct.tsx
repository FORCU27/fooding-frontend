import { cn } from '../../utils/cn';

type CoinProductProps = {
  image: string;
  imageAlt?: string;
  status: '발급중' | string;
  title: string;
  registrationDate: string;
  exchangePoint: number;
  receivedCount: number;
  purchaseCount: number;
  usedCount: number;
  canceledCount: number;
  onOrderClick?: () => void;
  isActive?: boolean;
  className?: string;
};

const CoinProduct = ({
  image,
  imageAlt = '',
  status,
  title,
  registrationDate,
  exchangePoint,
  receivedCount,
  purchaseCount,
  usedCount,
  canceledCount,
  onOrderClick,
  isActive = false,
  className,
}: CoinProductProps) => {
  const statusColors: Record<string, string> = {
    발급중: 'bg-[#0080F81A] text-[#0080F8]',
  };

  return (
    <div
      className={cn(
        'rounded-[20px] border bg-white p-8 shadow-sm min-w-[704px] max-w-[1080px]',
        isActive ? 'border-2 border-fooding-purple' : 'border-gray-200',
        className,
      )}
    >
      <div className='flex items-start gap-6'>
        <img
          src={image}
          alt={imageAlt}
          className='h-[180px] w-[180px] rounded-[12px] object-cover'
        />
        <div className='flex flex-1 flex-col'>
          <div className='mb-2'>
            <span
              className={cn(
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap',
                statusColors[status] || 'bg-gray-100 text-gray-700',
              )}
            >
              {status}
            </span>
          </div>
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='mb-1 text-xl font-semibold text-gray-900'>{title}</h3>
              <p className='text-sm text-gray-5 whitespace-nowrap'>등록일 {registrationDate}</p>
            </div>
            <div className='ml-6 grid grid-cols-4 gap-6 text-center'>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>총 발급수</p>
                <p className='mt-1 text-xl font-semibold text-black'>{receivedCount}</p>
              </div>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>구매 수량</p>
                <p className='mt-1 text-xl font-semibold text-black'>{purchaseCount}</p>
              </div>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>사용 수량</p>
                <p className='mt-1 text-xl font-semibold text-black'>{usedCount}</p>
              </div>
              <div>
                <p className='text-base text-gray-5 whitespace-nowrap'>남은 수량</p>
                <p className='mt-1 text-xl font-semibold text-black'>{canceledCount}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-row mt-[18px] justify-between bg-[#6366F10D] rounded-[16px] p-4 w-full'>
            <p className='text-base text-gray-5'>교환 포인트 {exchangePoint} P</p>
            {onOrderClick && (
              <button
                onClick={onOrderClick}
                className='h-[48px] rounded-[8px] bg-fooding-purple px-6 text-base font-medium text-white transition-colors hover:bg-fooding-purple/90 active:bg-fooding-purple/80'
              >
                수정하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CoinProduct };
export type { CoinProductProps };
