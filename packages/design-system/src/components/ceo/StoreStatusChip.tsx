import { cn } from '../../utils';

interface StoreStatusChipProps {
  status: '영업중' | '휴게중' | '영업종료';
  className?: string;
}

export const StoreStatusChip = ({ status = '영업중', className }: StoreStatusChipProps) => {
  return (
    <div
      className={cn(
        'rounded-full py-1 px-2 subtitle-7 text-white',
        status === '영업중' && 'bg-gradient-to-r from-[#35FFBF] to-[#6CB8FF]',
        status === '휴게중' && 'bg-gradient-to-r from-[#FFD83D] to-[#FF9500]',
        status === '영업종료' && 'bg-gray-1 text-gray-4',
        className,
      )}
    >
      {status}
    </div>
  );
};
