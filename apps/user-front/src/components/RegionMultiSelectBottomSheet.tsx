import { useState, useEffect } from 'react';

import { BottomSheet, Button, DismissibleChipButton } from '@repo/design-system/components/b2c';
import { CheckIcon } from '@repo/design-system/icons';

import { useGetRegionList } from '@/hooks/regions/useGetRegionList';
import { cn } from '@/utils/cn';
import { formatProvinces } from '@/utils/region';

type Province = {
  label: string;
  id: string;
  districts: string[];
};

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

const Content = ({ value: initialValue, onChange }: RegionMultiSelectBottomSheetProps) => {
  const [value, setValue] = useState<string[]>(initialValue);

  // 시/도 리스트
  const { data: provinceData } = useGetRegionList({ level: 1 });
  const provinces = formatProvinces(provinceData?.list);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  // 선택된 시/도 하위 구 리스트
  const { data: districtData } = useGetRegionList({
    level: 2,
    parentRegionId: selectedProvince?.id,
  });

  const districts = districtData?.list.map((d) => d.name.replace(/^.*\s/, '')) ?? [];

  // 시/도 리스트 초기 선택
  useEffect(() => {
    if (!selectedProvince && provinces.length > 0) {
      if (!provinces[0]) return;
      setSelectedProvince(provinces[0]);
    }
  }, [provinces, selectedProvince]);

  const toggleDistrict = (district: string) => {
    setValue((prev) =>
      prev.includes(district) ? prev.filter((v) => v !== district) : [...prev, district],
    );
  };

  const removeDistrict = (district: string) => {
    setValue((prev) => prev.filter((v) => v !== district));
  };

  const onResetButtonClick = () => setValue([]);
  const onConfirmButtonClick = () => onChange(value);

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
              key={province.id}
              className={cn(
                'h-[47px] px-5 flex items-center text-gray-5 shrink-0 cursor-pointer',
                selectedProvince?.id === province.id && 'bg-white font-semibold text-black',
              )}
              onClick={() => setSelectedProvince(province)}
            >
              {province.label}
            </button>
          ))}
        </div>

        <div className='flex flex-col overflow-y-auto scrollbar-hide flex-1'>
          {districts.map((district) => (
            <button
              key={district}
              className={cn(
                'h-[47px] px-4 flex items-center shrink-0 text-gray-5 cursor-pointer',
                value.includes(district) && 'bg-primary-pink/10 text-primary-pink font-semibold',
              )}
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
