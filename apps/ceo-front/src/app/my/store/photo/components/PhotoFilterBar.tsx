'use client';

import { ImageTag, ImagesSortType } from '@repo/api/ceo';
import { ChipTabs } from '@repo/design-system/components/b2c';
import { SortToggle } from '@repo/design-system/components/ceo';

type PhotoFilterBarProps = {
  sortType: ImagesSortType;
  tag: ImageTag | null;
  onChangeSort: (sort: ImagesSortType) => void;
  onChangeTag: (tag: ImageTag | null) => void;
};

const PhotoFilterBar = ({ sortType, tag, onChangeSort, onChangeTag }: PhotoFilterBarProps) => (
  <ChipTabs
    value={tag ?? 'ALL'}
    onChange={(value) => onChangeTag(value === 'ALL' ? null : (value as ImageTag))}
  >
    <ChipTabs.List className='gap-[8px]'>
      <ChipTabs.Trigger value='ALL' className='h-[38px] px-[18px] body-2'>
        전체
      </ChipTabs.Trigger>
      <ChipTabs.Trigger value='EXTERIOR' className='h-[38px] px-[18px] body-2'>
        외부
      </ChipTabs.Trigger>
      <ChipTabs.Trigger value='FOOD' className='h-[38px] px-[18px] body-2'>
        음식
      </ChipTabs.Trigger>
      <SortToggle
        keepSelectedOpen
        value={sortType}
        onSortChange={(v) => onChangeSort(v as ImagesSortType)}
      />
    </ChipTabs.List>
  </ChipTabs>
);

export default PhotoFilterBar;
