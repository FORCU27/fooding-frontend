/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithoutRef, useEffect, useMemo, useState } from 'react';

import { DayOfWeek, StoreOperatingHourBody } from '@repo/api/ceo';
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
import { normalizeDailyOperatingTimes } from '../utils/normalizeDailyOperatingTimes';

export interface OperatingHoursFormProps {
  originValues?: StoreOperatingHourBody;
  handleSubmit: (data: StoreOperatingHourBody) => void;
}

export interface dailyOperatingTimesType {
  id: number;
  dayOfWeek: string;
  openTime: string | null;
  closeTime: string | null;
  breakStartTime: string | null;
  breakEndTime: string | null;
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

export const OperatingHoursForm = ({
  originValues,
  handleSubmit,
}: PropsWithoutRef<OperatingHoursFormProps>) => {
  const getInitialMode = (): OperatingMode => {
    if (!originValues?.dailyOperatingTimes || originValues.dailyOperatingTimes.length === 0) {
      return 'same_everyday';
    }

    const originVal = originValues.dailyOperatingTimes[0];
    const allSame = originValues.dailyOperatingTimes.every(
      (item) =>
        item.openTime === originVal?.openTime &&
        item.closeTime === originVal?.closeTime &&
        item.breakStartTime === originVal?.breakStartTime &&
        item.breakEndTime === originVal?.breakEndTime,
    );

    return allSame ? 'same_everyday' : 'different_by_day';
  };

  const getInitialBreakMode = (): BreakMode => {
    if (!originValues?.dailyOperatingTimes || originValues.dailyOperatingTimes.length === 0) {
      return 'none';
    }

    // 브레이크 타임이 하나라도 있는지 확인
    const hasAnyBreak = originValues.dailyOperatingTimes.some(
      (item) => item.breakStartTime !== null && item.breakEndTime !== null,
    );

    if (!hasAnyBreak) return 'none';

    // 모든 브레이크 타임이 동일한지 확인
    const firstBreak = originValues.dailyOperatingTimes.find(
      (item) => item.breakStartTime && item.breakEndTime,
    );

    if (!firstBreak) return 'none';

    const allSameBreak = originValues.dailyOperatingTimes.every((item) => {
      if (item.breakStartTime === null && item.breakEndTime === null) {
        // 브레이크 없는 요일이 있으면 "different"로 간주
        return false;
      }
      return (
        item.breakStartTime === firstBreak.breakStartTime &&
        item.breakEndTime === firstBreak.breakEndTime
      );
    });

    return allSameBreak ? 'same_everyday' : 'different_by_day';
  };
  const [mode, setMode] = useState<OperatingMode>(getInitialMode());
  const [breakMode, setBreakMode] = useState<BreakMode>(getInitialBreakMode());

  const {
    register,
    handleSubmit: formSubmit,
    watch,
    control,
    reset,
    setValue,
  } = useForm<StoreOperatingHourBody>({
    mode: 'onSubmit',
    defaultValues: {
      hasHoliday: false,
      regularHolidayType: null,
      regularHoliday: null,
      closedNationalHolidays: [],
      customHolidays: [],
      operatingNotes: '',
      dailyOperatingTimes: [],
    },
  });

  const closedHolidays = watch('closedNationalHolidays') || [];
  const customHolidays = watch('customHolidays') as string[];

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
    openTime: string | null;
    closeTime: string | null;
    breakStartTime: string | null;
    breakEndTime: string | null;
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
  const formatTime = (time?: string | null) => (time ? time.slice(0, 5) : '');

  const watchedDailyTimes = watch('dailyOperatingTimes');

  const previewDailyTimes = useMemo(() => {
    if (!watchedDailyTimes) return [];
    return normalizeDailyOperatingTimes(watchedDailyTimes);
  }, [watchedDailyTimes]);

  useEffect(() => {
    if (!originValues) return;

    reset({
      hasHoliday: originValues.hasHoliday ?? false,
      regularHolidayType: originValues.regularHolidayType ?? null,
      regularHoliday: originValues.regularHoliday ?? null,
      closedNationalHolidays: originValues.closedNationalHolidays ?? [],
      customHolidays: originValues.customHolidays ?? [],
      operatingNotes: originValues.operatingNotes ?? '',
      dailyOperatingTimes:
        originValues.dailyOperatingTimes?.map((d) => ({
          id: d.id,
          dayOfWeek: d.dayOfWeek as DayOfWeek,
          openTime: d.openTime,
          closeTime: d.closeTime,
          breakStartTime: d.breakStartTime,
          breakEndTime: d.breakEndTime,
        })) ?? [],
    });
  }, [originValues, reset]);

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
        originValues={originValues}
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
              <StoreStatusChip status={status} />
              {mode === 'same_everyday' && '매일'}
              {watchedDailyTimes?.[0] && (
                <span>
                  {formatTime(watchedDailyTimes[0].openTime)} -{' '}
                  {formatTime(watchedDailyTimes[0].closeTime)}
                </span>
              )}
            </div>

            {previewDailyTimes.map((item) => {
              const isClosed = !item.openTime && !item.closeTime;

              const dayLabelMap: Record<DayOfWeek, string> = {
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
                  <div className='w-6'>{dayLabelMap[item.dayOfWeek]}</div>

                  <div className='flex flex-col'>
                    <div>
                      {isClosed
                        ? '정기휴무'
                        : `${formatTime(item.openTime)} - ${formatTime(item.closeTime)}`}
                    </div>

                    {!isClosed && item.breakStartTime && item.breakEndTime && (
                      <div>
                        {formatTime(item.breakStartTime)} - {formatTime(item.breakEndTime)} 브레이크
                        타임
                      </div>
                    )}
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
