import { ChipTabs } from '@repo/design-system/components/b2c';

interface CategoryTabsProps {
  categories: string[];
}

export const CategoryTabs = ({ categories }: CategoryTabsProps) => (
  <div className='flex flex-col justify-between p-grid-margin gap-4'>
    <div className='subtitle-1'>오늘은 어디에서 식사할까요?</div>
    <ChipTabs defaultValue={`${1}`} scrollable>
      <ChipTabs.List>
        {categories.map((category, i) => (
          <ChipTabs.Trigger key={i} value={`${i + 1}`}>
            {category}
          </ChipTabs.Trigger>
        ))}
      </ChipTabs.List>
    </ChipTabs>
  </div>
);
