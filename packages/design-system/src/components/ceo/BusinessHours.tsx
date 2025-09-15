/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { Checkbox } from './Checkbox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

export type OperatingMode = 'same_everyday' | 'different_by_day' | 'open_24h';
export type BreakMode = 'same_everyday' | 'different_by_day' | 'none';
export type DayHours = { start: string; end: string; isClosed: boolean };
export type HoursByDay = { [day: string]: DayHours };

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

export interface BusinessHoursProps {
  mode?: OperatingMode;
  BreakMode?: BreakMode;
  type?: 'operating' | 'breakTime';
  name?: string;
  everydayHours?: { start: string; end: string };
  bydayHours?: HoursByDay;
  onModeChange?: Dispatch<SetStateAction<OperatingMode>>;
  onBreakModeChange?: Dispatch<SetStateAction<BreakMode>>;
  onEverydayHoursChange?: Dispatch<SetStateAction<{ start: string; end: string }>>;
  onBydayHoursChange?: Dispatch<SetStateAction<HoursByDay>>;
}

export const BusinessHours = ({
  mode: externalMode,
  BreakMode: externalBreakMode,
  name,
  type = 'operating',
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
                  <span className='w-8 font-medium'>{day}</span>
                  <Checkbox
                    labelText='휴무'
                    checked={dayInfo.isClosed}
                    onChange={() => handleDayOffToggle(day)}
                  />
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
