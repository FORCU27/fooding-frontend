import { useState } from 'react';

import { ChevronDownIcon, MarkPinIcon } from '@repo/design-system/icons';

import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { isNonEmptyArray } from '@/utils/array';

function Menubar() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['강남구', '강동구']);

  return (
    <div className='flex px-grid-margin pt-2 pb-4 bg-white w-full h-[44px]'>
      <RegionMultiSelectBottomSheet
        value={selectedRegions}
        onChange={setSelectedRegions}
        trigger={
          <button className='flex items-center gap-1'>
            <MarkPinIcon />
            <div className='flex p-1 gap-1 items-center'>
              <div className='subtitle-4'>
                {isNonEmptyArray(selectedRegions) ? selectedRegions[0] : '관심지역을 설정해주세요'}
              </div>
              <div className='flex items-center justify-center'>
                <ChevronDownIcon size={20} color='var(--color-gray-5)' />
              </div>
            </div>
          </button>
        }
      />
    </div>
  );
}

export default Menubar;
