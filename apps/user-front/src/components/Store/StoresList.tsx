import { Store } from '@repo/api/user';
import { EmptyState } from '@repo/design-system/components/b2c';
import { ChevronRightIcon } from '@repo/design-system/icons';

import { StoreCard } from './StoreCard';

interface StoresListProps {
  subtitle: string;
  onClickTotalBtn: () => void;
  stores: Store[];
}

export const StoresList = ({ subtitle, stores, onClickTotalBtn }: StoresListProps) => {
  const handleEmptyStoreList = (stores: Store[]) => {
    if (stores.length === 0) {
      return <EmptyState className='h-[240px]' title='해당하는 가게 목록이 없어요.' />;
    }
  };
  return (
    <div className='flex flex-col py-grid-margin bg-white/80'>
      <div className='flex justify-between mb-4 px-grid-margin'>
        <div className='subtitle-3'>{subtitle}</div>

        {stores.length === 0 ? (
          <button
            className='flex justify-center items-center body-5 text-gray-3'
            onClick={onClickTotalBtn}
            disabled
          >
            <span>전체보기</span>
            <ChevronRightIcon size={14} />
          </button>
        ) : (
          <button
            className='flex justify-center items-center body-5 text-gray-5 cursor-pointer hover:text-black'
            onClick={onClickTotalBtn}
          >
            <span>전체보기</span>
            <ChevronRightIcon size={14} />
          </button>
        )}
      </div>
      {handleEmptyStoreList(stores)}
      <ul className='overflow-x-auto scrollbar-hide px-grid-margin flex gap-3'>
        {stores.map((store) => (
          <StoreCard store={store} key={store.id} />
        ))}
      </ul>
    </div>
  );
};
