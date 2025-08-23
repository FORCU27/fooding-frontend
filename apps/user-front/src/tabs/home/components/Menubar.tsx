import { useState } from 'react';

import { ChevronDownIcon, MarkPinIcon } from '@repo/design-system/icons';

import { RegionMultiSelectBottomSheet } from '@/components/RegionMultiSelectBottomSheet';
import { isNonEmptyArray } from '@/utils/array';

function Menubar() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
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
                {isNonEmptyArray(selectedRegions) ? selectedRegions[0] : '전체'}
              </div>
              {isNonEmptyArray(selectedRegions) && (
                <span className='flex justify-center items-center px-[5px] rounded-full font-semibold text-xs bg-primary-pink text-white h-[18px]'>
                  {selectedRegions.length}
                </span>
              )}
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
