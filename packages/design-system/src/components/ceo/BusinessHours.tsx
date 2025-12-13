/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { Checkbox } from './Checkbox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

export type OperatingMode = 'same_everyday' | 'different_by_day' | 'open_24h';
export type BreakMode = 'same_everyday' | 'different_by_day' | 'none';
export type DayHours = { start: string; end: string; isClosed: boolean };
export type HoursByDay = { [day: string]: DayHours };

export interface DailyOperatingTime {
  id: number;
  dayOfWeek: string;
  openTime: string | null;
  closeTime: string | null;
  breakStartTime: string | null;
  breakEndTime: string | null;
}

export interface StoreOperatingHourBody {
  regularHolidayType: string | null;
  regularHoliday: string | null;
  closedNationalHolidays: string[];
  hasHoliday: boolean;
  customHolidays: string[];
  operatingNotes: string;
  dailyOperatingTimes: DailyOperatingTime[];
}

const dayMapping: Record<string, string> = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};

const mapKorDay = (korDay: string) => dayMapping[korDay];

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

export interface BusinessHoursProps {
  mode?: OperatingMode;
  breakMode?: BreakMode;
  type?: 'operating' | 'breakTime';
  name?: string;
  everydayHours?: { start: string; end: string };
  bydayHours?: HoursByDay;
  originValues?: StoreOperatingHourBody;
  onModeChange?: Dispatch<SetStateAction<OperatingMode>>;
  onBreakModeChange?: Dispatch<SetStateAction<BreakMode>>;
  onEverydayHoursChange?: Dispatch<SetStateAction<{ start: string; end: string }>>;
  onBydayHoursChange?: Dispatch<SetStateAction<HoursByDay>>;
}

export const BusinessHours = ({
  mode: externalMode,
  breakMode: externalBreakMode,
  name,
  type = 'operating',
  originValues,
  everydayHours: externalEverydayHours,
  bydayHours: externalBydayHours,
  onModeChange,
  onBreakModeChange,
  onEverydayHoursChange,
  onBydayHoursChange,
}: BusinessHoursProps) => {
  // 내부 상태
  const [defaultMode, setDefaultMode] = useState<OperatingMode>('same_everyday');
  const [defaultBreakMode, setDefaultBreakMode] = useState<BreakMode>('none');
  const [defaultEverydayHours, setDefaultEverydayHours] = useState({
    start: '09:00',
    end: '22:00',
  });
  const [defaultBydayHours, setDefaultBydayHours] = useState<HoursByDay>(() =>
    Object.fromEntries(
      daysOfWeek.map((day) => [day, { start: '09:00', end: '22:00', isClosed: false }]),
    ),
  );

  // 외부 prop 우선
  const mode =
    type === 'operating' ? (externalMode ?? defaultMode) : (externalBreakMode ?? defaultBreakMode);
  const setModeFn =
    type === 'operating'
      ? (onModeChange ?? setDefaultMode)
      : (onBreakModeChange ?? setDefaultBreakMode);
  const everydayHours = externalEverydayHours ?? defaultEverydayHours;
  const bydayHours = externalBydayHours ?? defaultBydayHours;
  const setEverydayHours = onEverydayHoursChange ?? setDefaultEverydayHours;
  const setBydayHours = onBydayHoursChange ?? setDefaultBydayHours;

  useEffect(() => {
    if (!originValues) return;

    // 영업시간 초기값
    if (mode === 'same_everyday') {
      setDefaultEverydayHours({
        start: originValues.dailyOperatingTimes[0]?.openTime ?? '09:00',
        end: originValues.dailyOperatingTimes[0]?.closeTime ?? '22:00',
      });
    } else if (mode === 'different_by_day') {
      const newBydayHours: HoursByDay = {};
      daysOfWeek.forEach((day) => {
        const item = originValues.dailyOperatingTimes.find((d) => mapKorDay(day) === d.dayOfWeek);
        newBydayHours[day] = {
          start: item?.openTime ?? '09:00',
          end: item?.closeTime ?? '22:00',
          isClosed: item?.openTime === null || item?.closeTime === null,
        };
      });
      setDefaultBydayHours(newBydayHours);
    }
  }, [originValues, mode]);

  const handleDayOffToggle = (day: string) => {
    setBydayHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day]!,
        isClosed: !prev[day]!.isClosed,
        start: prev[day]!.isClosed ? prev[day]!.start : '',
        end: prev[day]!.isClosed ? prev[day]!.end : '',
      },
    }));
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', time: string) => {
    setBydayHours((prev) => ({
      ...prev,
      [day]: { ...prev[day]!, [type]: time },
    }));
  };

  const options =
    type === 'operating'
      ? [
          { label: '매일 같아요', value: 'same_everyday' },
          { label: '요일마다 달라요', value: 'different_by_day' },
          { label: '24시간 영업', value: 'open_24h' },
        ]
      : [
          { label: '매일 같아요', value: 'same_everyday' },
          { label: '요일마다 달라요', value: 'different_by_day' },
          { label: '없어요', value: 'none' },
        ];

  return (
    <div className='w-full'>
      <RadioButtonGroup
        options={options}
        name={name || 'business-hours'}
        selectedValue={mode}
        onChange={(val) => setModeFn(val as any)}
      />

      <div className='mt-6'>
        {mode === 'same_everyday' && (
          <div className='flex items-center gap-4'>
            <TimePicker
              value={everydayHours.start}
              onChange={(start) => setEverydayHours((prev) => ({ ...prev, start }))}
            />
            <span>~</span>
            <TimePicker
              value={everydayHours.end}
              onChange={(end) => setEverydayHours((prev) => ({ ...prev, end }))}
            />
          </div>
        )}

        {mode === 'different_by_day' && (
          <ul className='space-y-4'>
            {daysOfWeek.map((day) => {
              const dayInfo = bydayHours[day];
              if (!dayInfo) return null;
              return (
                <li key={day} className='flex items-center gap-6'>
                  <div className='flex justify-center items-center border border-gray-3 w-[54px] h-[58px] rounded-lg font-medium'>
                    {day}
                  </div>
                  <div className='flex flex-1 items-center gap-4'>
                    <TimePicker
                      value={dayInfo.start}
                      onChange={(newStart) => handleTimeChange(day, 'start', newStart)}
                      disabled={dayInfo.isClosed}
                    />
                    <span>~</span>
                    <TimePicker
                      value={dayInfo.end}
                      onChange={(newEnd) => handleTimeChange(day, 'end', newEnd)}
                      disabled={dayInfo.isClosed}
                    />
                  </div>
                  <Checkbox
                    labelText='휴무'
                    checked={dayInfo.isClosed}
                    onChange={() => handleDayOffToggle(day)}
                  />
                </li>
              );
            })}
          </ul>
        )}

        {mode === 'open_24h' && (
          <div className='flex items-center gap-4'>
            <TimePicker value='00:00' onChange={() => {}} />
            <span>~</span>
            <TimePicker value='24:00' onChange={() => {}} />
          </div>
        )}

        {mode === 'none' && <div className='text-gray-400'>휴게시간 없음</div>}
      </div>
    </div>
  );
};
