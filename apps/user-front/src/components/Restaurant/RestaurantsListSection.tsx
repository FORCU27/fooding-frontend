import { Store } from '@repo/api/user';
import { ChevronRightIcon } from '@repo/design-system/icons';

import { RestaurantCardSection } from './ResraurantCardSection';

interface RestaurantsListSectionProps {
  subtitle: string;
  onClickTotalBtn: () => void;
  items: Store[];
}

export const RestaurantsListSection = ({
  subtitle,
  items,
  onClickTotalBtn,
}: RestaurantsListSectionProps) => {
  return (
    <div className='flex flex-col py-grid-margin bg-white/80'>
      <div className='flex justify-between mb-4 px-grid-margin'>
        <div className='subtitle-3'>{subtitle}</div>
        <button
          className='flex justify-center items-center body-5 text-gray-5 cursor-pointer hover:text-black'
          onClick={onClickTotalBtn}
        >
          <span>전체보기</span>
          <ChevronRightIcon size={14} />
        </button>
      </div>
      <RestaurantCardSection items={items} />
    </div>
  );
};
