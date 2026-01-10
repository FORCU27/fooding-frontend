import { PropsWithoutRef, useEffect, useMemo, useState } from 'react';

import { DayOfWeek, RegularHolidayType, StoreOperatingHourBody } from '@repo/api/ceo';
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
  EverydayBreak,
} from '@repo/design-system/components/ceo';
import { ClockIcon } from '@repo/design-system/icons';
import { Controller, useForm } from 'react-hook-form';

import { BusinessHourForm } from './BusinessHourForm';
import { normalizeDailyOperatingTimes } from '../utils/normalizeDailyOperatingTimes';

export interface FormDailyOperatingTime {
  id?: number;
  dayOfWeek: DayOfWeek;
  openTime: string | null;
  closeTime: string | null;
}
export interface FormDailyBreakTime {
  id?: number;
  dayOfWeek: DayOfWeek;
  breakStartTime: string | null;
  breakEndTime: string | null;
}

export interface OperatingHoursFormValues {
  hasHoliday: boolean;
  regularHolidayType: RegularHolidayType | null;
  regularHoliday: DayOfWeek | null;
  closedNationalHolidays: string[];
  customHolidays: string[];
  operatingNotes: string;
  dailyOperatingTimes: FormDailyOperatingTime[];
  dailyBreakTimes: FormDailyBreakTime[];
  everydayBreaks?: EverydayBreak[];
}

export interface OperatingHoursFormProps {
  originValues?: StoreOperatingHourBody;
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

export const DAY_MAP: DayOfWeek[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

const DAY_LABEL_MAP: Record<DayOfWeek, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

export const OperatingHoursForm = ({
  originValues,
  handleSubmit,
}: PropsWithoutRef<OperatingHoursFormProps>) => {
  const getInitialMode = (): OperatingMode => {
    if (!originValues?.dailyOperatingTimes?.length) return 'same_everyday';

    const base = originValues.dailyOperatingTimes[0];
    return originValues.dailyOperatingTimes.every(
      (d) => d.openTime === base?.openTime && d.closeTime === base.closeTime,
    )
      ? 'same_everyday'
      : 'different_by_day';
  };

  const getInitialBreakMode = (): BreakMode => {
    if (!originValues?.dailyBreakTimes?.length) return 'none';

    const first = originValues.dailyBreakTimes[0];
    return originValues.dailyBreakTimes.every(
      (b) => b.breakStartTime === first?.breakStartTime && b.breakEndTime === first.breakEndTime,
    )
      ? 'same_everyday'
      : 'different_by_day';
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
  } = useForm<OperatingHoursFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      hasHoliday: false,
      regularHolidayType: null,
      regularHoliday: null,
      closedNationalHolidays: [],
      customHolidays: [],
      operatingNotes: '',
      dailyOperatingTimes: [],
      dailyBreakTimes: [],
    },
  });

  const closedHolidays = watch('closedNationalHolidays');
  const customHolidays = watch('customHolidays');
  const dailyOperatingTimes = watch('dailyOperatingTimes');
  const dailyBreakTimes = watch('dailyBreakTimes');

  const customHolidaysArr = useMemo(
    () => customHolidays.map((d) => new Date(d)).filter((d) => !isNaN(d.getTime())),
    [customHolidays],
  );

  const handleTotalSelect = () => {
    const isAllSelected = closedHolidays.length === NationalHolidays.length;
    if (isAllSelected) {
      setValue('closedNationalHolidays', []);
    } else {
      setValue('closedNationalHolidays', NationalHolidays);
    }
  };

  const previewDailyTimes = useMemo(() => {
    const normalizedOps = normalizeDailyOperatingTimes(dailyOperatingTimes);

    return normalizedOps.map((op) => {
      const dayBreaks = dailyBreakTimes.filter(
        (b) => b.dayOfWeek === op.dayOfWeek && b.breakStartTime && b.breakEndTime,
      );

      return {
        ...op,
        breakTimes: dayBreaks.map((b) => ({
          start: b.breakStartTime ?? '',
          end: b.breakEndTime ?? '',
        })),
      };
    });
  }, [dailyOperatingTimes, dailyBreakTimes]);

  const getStoreStatus = (item: FormDailyOperatingTime, breakItem: FormDailyBreakTime) => {
    const now = new Date();
    const toDate = (time: string) => {
      const [hStr, mStr] = time.split(':');
      const h = Number(hStr ?? 0);
      const m = Number(mStr ?? 0);

      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d;
    };

    if (!item.openTime || !item.closeTime) return '영업종료';

    const open = toDate(item.openTime);
    const close = toDate(item.closeTime);

    if (now < open || now > close) return '영업종료';

    if (breakItem.breakStartTime && breakItem.breakEndTime) {
      const bs = toDate(breakItem.breakStartTime);
      const be = toDate(breakItem.breakEndTime);
      if (now >= bs && now <= be) return '휴게중';
    }

    return '영업중';
  };

  const today = DAY_MAP[new Date().getDay()];
  const todayItem = dailyOperatingTimes.find((d) => d.dayOfWeek === today);
  const todayBreakItem = dailyBreakTimes.find((d) => d.dayOfWeek === today);
  const status =
    todayItem && todayBreakItem ? getStoreStatus(todayItem, todayBreakItem) : '영업종료';

  useEffect(() => {
    if (!originValues) return;

    reset({
      hasHoliday: originValues.hasHoliday,
      regularHolidayType: originValues.regularHolidayType,
      regularHoliday: originValues.regularHoliday,
      closedNationalHolidays: originValues.closedNationalHolidays,
      customHolidays: originValues.customHolidays,
      operatingNotes: originValues.operatingNotes ?? '',

      dailyOperatingTimes: originValues.dailyOperatingTimes.map((op) => ({
        id: op.id,
        dayOfWeek: op.dayOfWeek,
        openTime: op.openTime,
        closeTime: op.closeTime,
      })),

      dailyBreakTimes: originValues.dailyBreakTimes.map((bk) => ({
        id: bk.id ?? undefined,
        dayOfWeek: bk.dayOfWeek,
        breakStartTime: bk.breakStartTime,
        breakEndTime: bk.breakEndTime,
      })),
    });
  }, [originValues, reset]);

  const formatTime = (time: string | null | undefined) => {
    if (!time) return '';
    return time.slice(0, 5); // "15:00:00" → "15:00"
  };

  const onSubmit = (form: OperatingHoursFormValues) => {
    const body: StoreOperatingHourBody = {
      hasHoliday: form.hasHoliday,
      regularHolidayType: form.regularHolidayType,
      regularHoliday: form.regularHoliday,
      closedNationalHolidays: form.closedNationalHolidays,
      customHolidays: form.customHolidays,
      operatingNotes: form.operatingNotes,
      dailyOperatingTimes: form.dailyOperatingTimes.map((op) => ({
        id: originValues?.dailyOperatingTimes?.find((d) => d.dayOfWeek === op.dayOfWeek)?.id,
        dayOfWeek: op.dayOfWeek,
        openTime: op.openTime || null,
        closeTime: op.closeTime || null,
      })),

      dailyBreakTimes: form.dailyBreakTimes.map((bk) => ({
        id: bk?.id,
        dayOfWeek: bk.dayOfWeek,
        breakStartTime: bk.breakStartTime || null,
        breakEndTime: bk.breakEndTime || null,
      })),
    };

    handleSubmit(body);
  };

  return (
    <form onSubmit={formSubmit(onSubmit)} className='flex flex-col items-center w-full gap-6 mb-20'>
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
              {mode === 'same_everyday' && (
                <>
                  <span>매일</span>
                  {previewDailyTimes?.[0] && (
                    <span>
                      {formatTime(previewDailyTimes[0].openTime)} -{' '}
                      {formatTime(previewDailyTimes[0].closeTime)}
                    </span>
                  )}
                </>
              )}
            </div>

            {previewDailyTimes.map((item) => {
              const isClosed = !item.openTime || !item.closeTime;

              return (
                <div key={item.dayOfWeek} className='flex gap-4 mb-2'>
                  <div className='w-6'>{DAY_LABEL_MAP[item.dayOfWeek]}</div>

                  <div className='flex flex-col'>
                    <div>
                      {isClosed
                        ? '정기휴무'
                        : `${formatTime(item.openTime)} - ${formatTime(item.closeTime)}`}
                    </div>

                    {!isClosed && item.breakTimes?.length > 0 && (
                      <div className='mt-1'>
                        {item.breakTimes.map((brk, idx) => (
                          <div key={idx}>
                            {formatTime(brk.start)} ~ {formatTime(brk.end)} 브레이크 타임
                          </div>
                        ))}
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
