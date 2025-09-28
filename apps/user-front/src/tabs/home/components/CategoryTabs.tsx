import { STORE_CATEGORIES, STORE_CATEOGORY_LABELS, StoreCategory } from '@repo/api/user';
import { ChipTabs } from '@repo/design-system/components/b2c';

interface CategoryTabsProps {
  category: StoreCategory | null;
  onCategoryChange: (category: StoreCategory | null) => void;
}

export const CategoryTabs = ({ category, onCategoryChange }: CategoryTabsProps) => (
  <div className='flex flex-col justify-between px-grid-margin py-grid-margin gap-4'>
    <div className='subtitle-1'>오늘은 어디에서 식사할까요?</div>
    <ChipTabs value={category ?? undefined} onChange={onCategoryChange} scrollable>
      <ChipTabs.List>
        <ChipTabs.Trigger value=''>전체</ChipTabs.Trigger>
        {STORE_CATEGORIES.map((category, i) => (
          <ChipTabs.Trigger key={i} value={category}>
            {STORE_CATEOGORY_LABELS[category]}
          </ChipTabs.Trigger>
        ))}
      </ChipTabs.List>
    </ChipTabs>
  </div>
);
