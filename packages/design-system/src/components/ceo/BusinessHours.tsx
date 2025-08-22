'use client';

import { useState } from 'react';

import { Checkbox } from './Checkbox';
import { TimePicker } from './TimePicker';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

type OperatingMode = 'everyday' | 'byday';
type DayHours = { start: string; end: string; isClosed: boolean };
type HoursByDay = { [day: string]: DayHours };

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const BusinessHours = () => {
  const [mode, setMode] = useState<OperatingMode>('everyday');
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

  return (
    <div className='w-full'>
      <ToggleGroup
        type='single'
        defaultValue={mode}
        onValueChange={(value: OperatingMode) => value && setMode(value)}
        variant='chip'
        className='w-auto'
      >
        <ToggleGroupItem value='everyday'>매일 같아요</ToggleGroupItem>
        <ToggleGroupItem value='byday'>요일마다 달라요</ToggleGroupItem>
      </ToggleGroup>

      <div className='mt-6'>
        {mode === 'everyday' && (
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
        {mode === 'byday' && (
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
      </div>
    </div>
  );
};

export { BusinessHours };
