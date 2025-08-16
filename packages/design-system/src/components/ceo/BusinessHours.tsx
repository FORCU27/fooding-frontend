'use client';

import { useState } from 'react';

import { CheckBox } from './CheckBox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

type OperatingMode = 'same_everyday' | 'different_by_day' | 'open_24h';
type DayHours = { start: string; end: string; isClosed: boolean };
type HoursByDay = { [day: string]: DayHours };

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const BusinessHours = () => {
  const [mode, setMode] = useState<OperatingMode>('same_everyday');
  const [everydayHours, setEverydayHours] = useState({ start: '09:00', end: '22:00' });
  const [bydayHours, setBydayHours] = useState<HoursByDay>(() =>
    Object.fromEntries(
      daysOfWeek.map((day) => [day, { start: '09:00', end: '22:00', isClosed: false }]),
    ),
  );

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
                  <div className=' border-gray-3 border p-5 rounded-lg'>{day}</div>
                  <CheckBox
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

export { BusinessHours };
