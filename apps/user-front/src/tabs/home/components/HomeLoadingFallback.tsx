import { Skeleton } from '@repo/design-system/components/b2c';

export const HomeLoadingFallback = () => {
  return (
    <div className='px-grid-margin'>
      <Skeleton shape='text' className='mt-1' width={160} height={28} />
      <Skeleton shape='square' className='mt-3 -mx-grid-margin' height={200} />
      <Skeleton shape='text' className='mt-4' width={240} height={32} />
      <Skeleton shape='text' className='mt-3' width={320} height={36} />
      <div className='mt-4 flex gap-3 overflow-hidden -mx-grid-margin px-grid-margin'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <Skeleton width={220} height={140} />
            <Skeleton shape='text' width={160} height={20} />
            <Skeleton shape='text' width={120} height={16} />
          </div>
        ))}
      </div>
      <Skeleton shape='text' className='mt-19' width={220} height={24} />
      <div className='mt-4 flex gap-3 overflow-hidden -mx-grid-margin px-grid-margin'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <Skeleton width={140} height={140} />
            <Skeleton shape='text' width={120} height={20} />
            <Skeleton shape='text' width={80} height={16} />
          </div>
        ))}
      </div>
    </div>
  );
};
