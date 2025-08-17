import { useState } from 'react';

import { BottomSheet, Button, DismissibleChipButton } from '@repo/design-system/components/b2c';
import { CheckIcon } from '@repo/design-system/icons';

import { useGetRegionList } from '@/hooks/regions/useGetRegionList';
import { cn } from '@/utils/cn';
import { formatProvinces } from '@/utils/region';

type RegionMultiSelectBottomSheetProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  value: string[];
  onChange: (value: string[]) => void;
  trigger?: React.ReactNode;
};

const RegionMultiSelectBottomSheet = (props: RegionMultiSelectBottomSheetProps) => {
  const { isOpen, onOpenChange, trigger } = props;

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger && <BottomSheet.Trigger asChild>{trigger}</BottomSheet.Trigger>}
      <BottomSheet.Content>
        <Content {...props} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

type ContentProps = RegionMultiSelectBottomSheetProps;

const Content = ({ value: initialValue, onChange }: ContentProps) => {
  const [value, setValue] = useState<string[]>(initialValue);
  const { data } = useGetRegionList();

  const provinces = formatProvinces(data.list);
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);

  const onResetButtonClick = () => {
    setValue([]);
  };

  const onConfirmButtonClick = () => {
    onChange(value);
  };

  const toggleDistrict = (district: string) => {
    setValue((prev) => {
      if (prev.includes(district)) {
        return prev.filter((v) => v !== district);
      } else {
        return [...prev, district];
      }
    });
  };

  const removeDistrict = (district: string) => {
    setValue((prev) => prev.filter((v) => v !== district));
  };

  return (
    <>
      <BottomSheet.Header>
        <BottomSheet.Title className='font-bold text-[24px]'>관심지역 설정</BottomSheet.Title>
        <div className='mt-5 flex flex-wrap gap-2'>
          {value.map((v) => (
            <DismissibleChipButton key={v} onClick={() => removeDistrict(v)}>
              {v}
            </DismissibleChipButton>
          ))}
        </div>
      </BottomSheet.Header>
      <div className='border-y border-gray-3 overflow-hidden max-h-[452px] flex'>
        <div className='w-[162px] flex flex-col overflow-y-auto scrollbar-hide bg-gray-1'>
          {provinces.map((province) => (
            <button
              className={cn(
                'h-[47px] px-5 flex items-center text-gray-5 shrink-0 cursor-pointer',
                selectedProvince?.id === province.id && 'bg-white font-semibold text-black',
              )}
              key={province.id}
              onClick={() => setSelectedProvince(province)}
            >
              {province.label}
            </button>
          ))}
        </div>
        <div className='flex flex-col overflow-y-auto scrollbar-hide flex-1'>
          {selectedProvince?.districts.map((district) => (
            <button
              className={cn(
                'h-[47px] px-4 flex items-center shrink-0 text-gray-5 cursor-pointer',
                value.includes(district) && 'bg-primary-pink/10 text-primary-pink font-semibold',
              )}
              key={district}
              onClick={() => toggleDistrict(district)}
            >
              <span className='flex-1 text-start'>{district}</span>
              {value.includes(district) && <CheckIcon size={17} />}
            </button>
          ))}
        </div>
      </div>
      <BottomSheet.Footer className='gap-[10px]'>
        <Button className='w-[136px]' variant='outlined' onClick={onResetButtonClick}>
          초기화
        </Button>
        <BottomSheet.Close asChild>
          <Button onClick={onConfirmButtonClick}>설정 완료</Button>
        </BottomSheet.Close>
      </BottomSheet.Footer>
    </>
  );
};

RegionMultiSelectBottomSheet.Trigger = BottomSheet.Trigger;

export { RegionMultiSelectBottomSheet };
