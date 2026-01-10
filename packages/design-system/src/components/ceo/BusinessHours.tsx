'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { Checkbox } from './Checkbox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

export type OperatingMode = 'same_everyday' | 'different_by_day' | 'open_24h';
export type HoursByDay = { [day: string]: { start: string; end: string; isClosed: boolean } };

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
const dayMapping: Record<string, string> = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};

const toHHmm = (time?: string | null): string => (time ? time.slice(0, 5) : '');

export interface BusinessHoursProps {
  mode?: OperatingMode;
  name?: string;
  everydayHours?: { start: string; end: string };
  bydayHours?: HoursByDay;
  originValues?: {
    dailyOperatingTimes?: Array<{
      id?: number;
      dayOfWeek: string;
      openTime: string | null;
      closeTime: string | null;
    }>;
  };
  onModeChange?: Dispatch<SetStateAction<OperatingMode>>;
  onEverydayHoursChange?: Dispatch<SetStateAction<{ start: string; end: string }>>;
  onBydayHoursChange?: Dispatch<SetStateAction<HoursByDay>>;
}

export const BusinessHours = ({
  mode: externalMode,
  name,
  originValues,
  everydayHours: externalEverydayHours,
  bydayHours: externalBydayHours,
  onModeChange,
  onEverydayHoursChange,
  onBydayHoursChange,
}: BusinessHoursProps) => {
  const [internalMode, setInternalMode] = useState<OperatingMode>('same_everyday');

  const [internalEverydayHours, setInternalEverydayHours] = useState<{
    start: string;
    end: string;
  }>({ start: '09:00', end: '22:00' });

  const [internalBydayHours, setInternalBydayHours] = useState<HoursByDay>(() =>
    Object.fromEntries(
      daysOfWeek.map((day) => [day, { start: '09:00', end: '22:00', isClosed: false }]),
    ),
  );

  const mode = externalMode ?? internalMode;
  const everydayHours = externalEverydayHours ?? internalEverydayHours;
  const bydayHours = externalBydayHours ?? internalBydayHours;

  const setEverydayHours = onEverydayHoursChange ?? setInternalEverydayHours;
  const setBydayHours = onBydayHoursChange ?? setInternalBydayHours;

  const handleDayOffToggle = (day: string) => {
    setBydayHours((prev) => {
      const current = prev[day] ?? { start: '09:00', end: '22:00', isClosed: false };
      const newClosed = !current.isClosed;
      return {
        ...prev,
        [day]: {
          ...current,
          isClosed: newClosed,
          start: newClosed ? '' : current.start || '09:00',
          end: newClosed ? '' : current.end || '22:00',
        },
      };
    });
  };

  // 요일별 시간 변경
  const handleTimeChange = (day: string, type: 'start' | 'end', time: string) => {
    setBydayHours((prev) => {
      const current = prev[day] ?? {
        start: '09:00',
        end: '22:00',
        isClosed: false,
      };

      return {
        ...prev,
        [day]: {
          ...current,
          [type]: time,
        },
      };
    });
  };

  // originValues 기반 초기화
  useEffect(() => {
    if (!originValues?.dailyOperatingTimes || originValues.dailyOperatingTimes.length === 0) return;

    const opTimes = originValues.dailyOperatingTimes;

    if (mode === 'same_everyday') {
      // 첫 번째 유효한 값 사용 (모든 요일 동일 가정)
      const firstValid = opTimes.find((t) => t.openTime && t.closeTime);
      const newHours = {
        start: firstValid ? toHHmm(firstValid.openTime) : '09:00',
        end: firstValid ? toHHmm(firstValid.closeTime) : '22:00',
      };
      setInternalEverydayHours(newHours);
      setEverydayHours(newHours);
    } else if (mode === 'different_by_day') {
      const newByday: HoursByDay = {};

      daysOfWeek.forEach((day) => {
        const engDay = dayMapping[day];
        const item = opTimes.find((t) => t.dayOfWeek === engDay);

        const isClosed = !item || !item.openTime || !item.closeTime;

        newByday[day] = {
          start: isClosed ? '' : toHHmm(item?.openTime || '09:00'),
          end: isClosed ? '' : toHHmm(item?.closeTime || '22:00'),
          isClosed,
        };
      });

      setInternalBydayHours(newByday);
      setBydayHours(newByday);
    }
  }, [originValues, mode, setEverydayHours, setBydayHours]);

  const options = [
    { label: '매일 같아요', value: 'same_everyday' },
    { label: '요일마다 달라요', value: 'different_by_day' },
    { label: '24시간 영업', value: 'open_24h' },
  ];

  return (
    <div className='w-full'>
      <RadioButtonGroup
        options={options}
        name={name || 'operating-mode'}
        selectedValue={mode}
        onChange={(val) => {
          const newMode = val as OperatingMode;

          if (!externalMode) {
            setInternalMode(newMode);
          }

          onModeChange?.(newMode);
        }}
      />

      <div className='mt-6'>
        {/* same_everyday - 단일 시간대 */}
        {mode === 'same_everyday' && (
          <div className='flex items-center gap-4'>
            <TimePicker
              value={everydayHours.start}
              onChange={(v) => setEverydayHours({ ...everydayHours, start: v })}
            />
            <span>~</span>
            <TimePicker
              value={everydayHours.end}
              onChange={(v) => setEverydayHours({ ...everydayHours, end: v })}
            />
          </div>
        )}

        {/* different_by_day */}
        {mode === 'different_by_day' && (
          <ul className='space-y-4'>
            {daysOfWeek.map((day) => {
              const dayInfo = bydayHours[day] ?? { start: '', end: '', isClosed: false };

              return (
                <li key={day} className='flex items-center gap-6'>
                  <div className='flex justify-center items-center border border-gray-300 w-14 h-14 rounded-lg font-medium'>
                    {day}
                  </div>

                  <div className='flex flex-1 items-center gap-2'>
                    <TimePicker
                      value={dayInfo.start}
                      onChange={(v) => handleTimeChange(day, 'start', v)}
                      disabled={dayInfo.isClosed}
                    />
                    <span>~</span>
                    <TimePicker
                      value={dayInfo.end}
                      onChange={(v) => handleTimeChange(day, 'end', v)}
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

        {/* 24시간 영업 */}
        {mode === 'open_24h' && (
          <div className='flex items-center gap-4'>
            <TimePicker value='00:00' onChange={() => {}} disabled />
            <span>~</span>
            <TimePicker value='24:00' onChange={() => {}} disabled />
          </div>
        )}
      </div>
    </div>
  );
};
