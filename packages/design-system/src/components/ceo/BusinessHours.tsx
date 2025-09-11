'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { Checkbox } from './Checkbox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

export type OperatingMode = 'same_everyday' | 'different_by_day' | 'open_24h';
export type DayHours = { start: string; end: string; isClosed: boolean };
export type HoursByDay = { [day: string]: DayHours };

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

export interface BusinessHoursProps {
  mode?: OperatingMode;
  everydayHours?: { start: string; end: string };
  bydayHours?: HoursByDay;
  onModeChange?: Dispatch<SetStateAction<OperatingMode>>;
  onEverydayHoursChange?: Dispatch<SetStateAction<{ start: string; end: string }>>;
  onBydayHoursChange?: Dispatch<SetStateAction<HoursByDay>>;
}

export const BusinessHours = ({
  mode: externalMode,
  everydayHours: externalEverydayHours,
  bydayHours: externalBydayHours,
  onModeChange,
  onEverydayHoursChange,
  onBydayHoursChange,
}: BusinessHoursProps) => {
  // 내부 상태: 외부 prop이 없으면 내부 디폴트 상태 사용
  const [defaultMode, setDefaultMode] = useState<OperatingMode>('same_everyday');
  const [defaultEverydayHours, setDefaultEverydayHours] = useState({
    start: '09:00',
    end: '22:00',
  });
  const [defaultBydayHours, setDefaultBydayHours] = useState<HoursByDay>(() =>
    Object.fromEntries(
      daysOfWeek.map((day) => [day, { start: '09:00', end: '22:00', isClosed: false }]),
    ),
  );

  // 외부 상태 우선, 없으면 내부 디폴트 상태 사용
  const mode = externalMode ?? defaultMode;
  const everydayHours = externalEverydayHours ?? defaultEverydayHours;
  const bydayHours = externalBydayHours ?? defaultBydayHours;
  const setMode = onModeChange ?? setDefaultMode;
  const setEverydayHours = onEverydayHoursChange ?? setDefaultEverydayHours;
  const setBydayHours = onBydayHoursChange ?? setDefaultBydayHours;

  const handleDayOffToggle = (day: string) => {
    setBydayHours((prev) => ({
      ...prev,
      [day]: { ...prev[day]!, isClosed: !prev[day]!.isClosed },
    }));
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', time: string) => {
    setBydayHours((prev) => ({
      ...prev,
      [day]: { ...prev[day]!, [type]: time },
    }));
  };

  const businessHourOption = [
    { label: '매일 같아요', value: 'same_everyday' },
    { label: '요일마다 달라요', value: 'different_by_day' },
    { label: '24시간 영업', value: 'open_24h' },
  ];

  return (
    <div className='w-full'>
      <RadioButtonGroup
        options={businessHourOption}
        name='business-hours'
        selectedValue={mode}
        onChange={(val) => setMode(val as OperatingMode)}
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
      </div>
    </div>
  );
};
