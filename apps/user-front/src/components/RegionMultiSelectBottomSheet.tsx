import { useState } from 'react';

import { BottomSheet, Button, DismissibleChipButton } from '@repo/design-system/components/b2c';
import { CheckIcon } from '@repo/design-system/icons';

import { cn } from '@/utils/cn';

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
  const initialProvince = PROVINCES[0];
  const [selectedProvince, setSelectedProvince] = useState<Province>(initialProvince);
  const [value, setValue] = useState<string[]>(initialValue);

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
          {PROVINCES.map((province, key) => (
            <button
              className={cn(
                'h-[47px] px-5 flex items-center text-gray-5 shrink-0 cursor-pointer',
                selectedProvince.label === province.label && 'bg-white font-semibold text-black',
              )}
              key={key}
              onClick={() => setSelectedProvince(province)}
            >
              {province.label}
            </button>
          ))}
        </div>
        <div className='flex flex-col overflow-y-auto scrollbar-hide flex-1'>
          {selectedProvince.districts.map((district) => (
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

type Province = {
  label: string;
  districts: string[];
};

type NonEmptyArray<T> = [T, ...T[]];

export const PROVINCES: NonEmptyArray<Province> = [
  {
    label: '서울',
    districts: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
  },
  {
    label: '경기',
    districts: [
      '수원시',
      '성남시',
      '안양시',
      '안산시',
      '용인시',
      '광명시',
      '평택시',
      '과천시',
      '오산시',
      '시흥시',
      '군포시',
      '의왕시',
      '하남시',
      '이천시',
      '안성시',
      '김포시',
      '화성시',
      '광주시',
      '양주시',
      '포천시',
      '여주시',
      '연천군',
      '가평군',
      '양평군',
      '고양시',
      '남양주시',
      '의정부시',
      '구리시',
      '파주시',
    ],
  },
  {
    label: '인천',
    districts: [
      '중구',
      '동구',
      '미추홀구',
      '연수구',
      '남동구',
      '부평구',
      '계양구',
      '서구',
      '강화군',
      '옹진군',
    ],
  },
  {
    label: '부산',
    districts: [
      '중구',
      '서구',
      '동구',
      '영도구',
      '부산진구',
      '동래구',
      '남구',
      '북구',
      '해운대구',
      '사하구',
      '금정구',
      '강서구',
      '연제구',
      '수영구',
      '사상구',
      '기장군',
    ],
  },
];
