import { useState } from 'react';

import { BottomSheet, Button, DismissibleChipButton } from '@repo/design-system/components/b2c';
import { CheckIcon } from '@repo/design-system/icons';
import { createContext } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';

import { useGetRegionList } from '@/hooks/regions/useGetRegionList';
import { cn } from '@/utils/cn';
import { formatProvinces } from '@/utils/region';

type Province = {
  label: string;
  id: string;
  districts: string[];
};

type Region = {
  id: string;
  name: string;
};

type RegionMultiSelectBottomSheetProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  value: Region[];
  onChange: (value: Region[]) => void;
  trigger?: React.ReactNode;
};

const RegionMultiSelectBottomSheet = (props: RegionMultiSelectBottomSheetProps) => {
  const [value, setValue] = useState<Region[]>(props.value);

  const { isOpen, onOpenChange, trigger, onChange } = props;

  const removeDistrict = (district: Region) => {
    setValue((prev) => prev.filter((v) => v.id !== district.id));
  };

  const onResetButtonClick = () => setValue([]);
  const onConfirmButtonClick = () => onChange(value);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger && <BottomSheet.Trigger asChild>{trigger}</BottomSheet.Trigger>}
      <BottomSheet.Content>
        <BottomSheet.Header>
          <BottomSheet.Title className='font-bold text-[24px]'>관심지역 설정</BottomSheet.Title>
          <div className='mt-5 flex flex-wrap gap-2'>
            {value.map((v) => (
              <DismissibleChipButton key={v.id} onClick={() => removeDistrict(v)}>
                {v.name}
              </DismissibleChipButton>
            ))}
          </div>
        </BottomSheet.Header>
        <Suspense fallback={<div className='h-[452px]' />}>
          <RegionMultiSelectBottomSheetContext value={{ value, setValue }}>
            <Content />
          </RegionMultiSelectBottomSheetContext>
        </Suspense>
        <BottomSheet.Footer className='gap-[10px]'>
          <Button className='w-[136px]' variant='outlined' onClick={onResetButtonClick}>
            초기화
          </Button>
          <BottomSheet.Close asChild>
            <Button onClick={onConfirmButtonClick}>설정 완료</Button>
          </BottomSheet.Close>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const Content = () => {
  // 시/도 리스트
  const { data: provinceData } = useGetRegionList({ level: 1 });
  const provinces = formatProvinces(provinceData.list);

  const { value, setValue } = useRegionMultiSelectBottomSheetContext();

  const [selectedProvince, setSelectedProvince] = useState<Province>(provinces[0]);

  const toggleDistrict = (district: Region) => {
    setValue((prev) =>
      prev.find((v) => v.id === district.id)
        ? prev.filter((v) => v.id !== district.id)
        : [...prev, district],
    );
  };

  return (
    <div className='border-y border-gray-3 overflow-hidden max-h-[452px] flex'>
      <div className='w-[162px] flex flex-col overflow-y-auto scrollbar-hide bg-gray-1'>
        {provinces.map((province) => (
          <button
            key={province.id}
            className={cn(
              'h-[47px] px-5 flex items-center text-gray-5 shrink-0 cursor-pointer',
              selectedProvince.id === province.id && 'bg-white font-semibold text-black',
            )}
            onClick={() => setSelectedProvince(province)}
          >
            {province.label}
          </button>
        ))}
      </div>
      <Suspense>
        <DistrictSection
          value={value}
          provinceId={selectedProvince.id}
          onToggleDistrict={toggleDistrict}
        />
      </Suspense>
    </div>
  );
};

type DistrictSectionProps = {
  value: Region[];
  provinceId: string;
  onToggleDistrict: (district: Region) => void;
};

const DistrictSection = ({ value, provinceId, onToggleDistrict }: DistrictSectionProps) => {
  // 선택된 시/도 하위 구 리스트
  const {
    data: { list: districts },
  } = useGetRegionList({
    level: 2,
    parentRegionId: provinceId,
  });

  return (
    <div className='flex flex-col overflow-y-auto scrollbar-hide flex-1'>
      {districts.map((district) => (
        <button
          key={district.id}
          className={cn(
            'h-[47px] px-4 flex items-center shrink-0 text-gray-5 cursor-pointer',
            value.some((v) => v.id === district.id) &&
              'bg-primary-pink/10 text-primary-pink font-semibold',
          )}
          onClick={() => onToggleDistrict(district)}
        >
          <span className='flex-1 text-start'>{district.name.replace(/^.*\s/, '')}</span>
          {value.some((v) => v.id === district.id) && <CheckIcon size={17} />}
        </button>
      ))}
    </div>
  );
};

RegionMultiSelectBottomSheet.Trigger = BottomSheet.Trigger;

type RegionMultiSelectBottomSheetContextValue = {
  value: Region[];
  setValue: React.Dispatch<React.SetStateAction<Region[]>>;
};

const [RegionMultiSelectBottomSheetContext, useRegionMultiSelectBottomSheetContext] =
  createContext<RegionMultiSelectBottomSheetContextValue>('RegionMultiSelectBottomSheet');

export { RegionMultiSelectBottomSheet };
