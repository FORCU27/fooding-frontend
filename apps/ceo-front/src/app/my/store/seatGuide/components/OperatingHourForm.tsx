/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithoutRef, useState } from 'react';

import { StoreOperatingHourBody } from '@repo/api/ceo';
import {
  Card,
  CardSubtitle,
  ToggleGroup,
  ToggleGroupItem,
  ToolTip,
  Input,
  Button,
  StoreStatusChip,
  OperatingMode,
  BreakMode,
  DatePickerWithDialog,
  DatePicker,
  type SelectedItem,
  Checkbox,
  ChipList,
} from '@repo/design-system/components/ceo';
import { ClockIcon } from '@repo/design-system/icons';
import { Controller, useForm } from 'react-hook-form';

import { BusinessHourForm } from './BusinessHourForm';

export interface OperatingHoursFormProps {
  handleSubmit: (data: StoreOperatingHourBody) => void;
}

export const NationalHolidays = [
  '새해첫날',
  '삼일절',
  '설날',
  '어린이날',
  '추석',
  '현충일',
  '광복절',
  '개천절',
  '부처님오신날',
  '한글날',
  '성탄절',
];

export const OperatingHoursForm = ({ handleSubmit }: PropsWithoutRef<OperatingHoursFormProps>) => {
  const {
    register,
    handleSubmit: formSubmit,
    watch,
    control,
    setValue,
  } = useForm<StoreOperatingHourBody>({
    mode: 'onSubmit',
    defaultValues: {
      customHolidays: [],
    },
  });

  const [mode, setMode] = useState<OperatingMode>('same_everyday');
  const [breakMode, setBreakMode] = useState<BreakMode>('none');
  const closedHolidays = watch('closedNationalHolidays') || [];
  const customHolidays = watch('customHolidays') as string[] | undefined;

  const customHolidaysArr = (customHolidays ?? [])
    .map((date) => new Date(date))
    .filter((d) => !isNaN(d.getTime()));

  const handleTotalSelect = () => {
    const isAllSelected = closedHolidays.length === NationalHolidays.length;
    if (isAllSelected) {
      setValue('closedNationalHolidays', []);
    } else {
      setValue('closedNationalHolidays', NationalHolidays);
    }
  };

  const getStoreStatus = (item: {
    openTime?: string;
    closeTime?: string;
    breakStartTime?: string;
    breakEndTime?: string;
  }) => {
    const now = new Date();
    const toDate = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours!, minutes, 0, 0);
      return date;
    };

    if (item.openTime && item.closeTime) {
      const open = toDate(item.openTime);
      const close = toDate(item.closeTime);
      if (now >= open && now <= close) {
        if (item.breakStartTime && item.breakEndTime) {
          const breakStart = toDate(item.breakStartTime);
          const breakEnd = toDate(item.breakEndTime);
          if (now >= breakStart && now <= breakEnd) return '휴게중';
        }
        return '영업중';
      }
    }
    return '영업종료';
  };

  const todayIndex = new Date().getDay();
  const dayMap = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  const todayItem = watch('dailyOperatingTimes')?.find(
    (item: any) => item.dayOfWeek === dayMap[todayIndex],
  );
  const status = todayItem ? getStoreStatus(todayItem) : '영업종료';

  return (
    <form
      onSubmit={formSubmit(handleSubmit)}
      className='flex flex-col items-center w-full gap-6 mb-20'
    >
      <BusinessHourForm
        setValue={setValue}
        mode={mode}
        breakMode={breakMode}
        onModeChange={setMode}
        onBreakModeChange={setBreakMode}
      />

      <Card className='w-full'>
        <CardSubtitle label='영업 시간 관련 기타 정보'>
          <Input
            placeholder='예) 연중무휴, 100% 예약제 운영'
            {...register('operatingNotes')}
            className='w-full min-h-[58px]'
          />
        </CardSubtitle>
      </Card>

      {/* 공휴일 휴무 */}
      <Card className='w-full'>
        <CardSubtitle label='공휴일 중 휴무일이 있나요?'>
          <Checkbox
            labelText='전체 선택'
            checked={closedHolidays.length === NationalHolidays.length}
            onClick={handleTotalSelect}
          />
          <Controller
            name='closedNationalHolidays'
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type='multiple'
                value={field.value || []}
                onValueChange={(vals) => field.onChange(vals)}
                className='w-full mt-4'
              >
                {NationalHolidays.map((holiday) => (
                  <ToggleGroupItem key={holiday} value={holiday}>
                    {holiday}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
        </CardSubtitle>
      </Card>

      {/* 그 외 휴무일 */}
      <Card className='w-full'>
        <CardSubtitle label='그 외 휴무일이 있다면?'>
          <ToolTip>임시 휴무일은 영업시간 조회에 표시되지 않습니다. 휴무일을 선택해주세요.</ToolTip>

          <Controller
            name='customHolidays'
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <DatePickerWithDialog
                  title='휴무일'
                  placeholder='휴무일을 선택해주세요'
                  selectionMode='multiple'
                  selectedDates={
                    field.value?.map((date) => ({ date: new Date(date), option: undefined })) || []
                  }
                  onChange={(selected) =>
                    field.onChange(
                      Array.isArray(selected)
                        ? selected.map((item) => item.date.toISOString().substring(0, 10))
                        : selected && typeof selected === 'object' && 'date' in selected
                          ? [(selected as SelectedItem).date.toISOString().substring(0, 10)]
                          : [],
                    )
                  }
                />

                <ChipList
                  value={field.value ?? []}
                  options={(field.value ?? []).map((d: string) => ({ name: d, value: d }))}
                  onValueChange={(vals) => field.onChange(vals)}
                  type='multiple'
                />
              </>
            )}
          />
        </CardSubtitle>
      </Card>

      <div className='w-full flex flex-col'>
        <h1 className='headline-2 px-10'>미리보기</h1>
        <ToolTip className='px-10 py-2'>
          미리보기에서 설정한 정보가 정확히 반영되었는지 다시 확인해 주세요
        </ToolTip>
        <div className='flex items-center gap-5 p-3'>
          <DatePicker selectionMode='multiple' values={customHolidaysArr} />
          <div className='flex flex-col justify-center w-[320px] min-h-[320px] h-full py-3 px-6 bg-white border border-gray-2 rounded-lg body-2'>
            <div className='flex gap-3 mb-6'>
              <ClockIcon />
              {mode === 'same_everyday' && <StoreStatusChip status={status} />}
              {mode === 'same_everyday' ? '매일' : ''}
              {watch('dailyOperatingTimes')?.[0] && (
                <span>
                  {watch('dailyOperatingTimes')[0]!.openTime} -{' '}
                  {watch('dailyOperatingTimes')[0]!.closeTime}
                </span>
              )}
            </div>
            {watch('dailyOperatingTimes')?.map((item: any) => {
              const dayMap: Record<string, string> = {
                MONDAY: '월',
                TUESDAY: '화',
                WEDNESDAY: '수',
                THURSDAY: '목',
                FRIDAY: '금',
                SATURDAY: '토',
                SUNDAY: '일',
              };

              return (
                <div key={item.dayOfWeek} className='flex gap-4 mb-2'>
                  <div>{dayMap[item.dayOfWeek]}</div>
                  <div className='flex flex-col'>
                    <div>
                      {item.openTime && item.closeTime
                        ? `${item.openTime} - ${item.closeTime}`
                        : '정기휴무'}
                    </div>
                    <div>
                      {item.breakStartTime && item.breakEndTime
                        ? `${item.breakStartTime} - ${item.breakEndTime} 브레이크 타임`
                        : breakMode
                          ? ''
                          : '정기휴무'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Button type='submit' className='mt-5'>
        저장
      </Button>
    </form>
  );
};
