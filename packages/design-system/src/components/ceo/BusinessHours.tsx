'use client';

import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { MinusCircle, PlusIcon } from 'lucide-react';

import { Checkbox } from './Checkbox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

export type OperatingMode = 'same_everyday' | 'different_by_day' | 'open_24h';
export type BreakMode = 'same_everyday' | 'different_by_day' | 'none';
export type DayHours = { start: string[]; end: string[]; isClosed: boolean };
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
  dailyBreakTimes?: DailyOperatingTime[];
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
  hasAddButton?: boolean;
  everydayHours?: { start: string[]; end: string[] };
  bydayHours?: HoursByDay;
  onModeChange?: Dispatch<SetStateAction<OperatingMode>>;
  onBreakModeChange?: Dispatch<SetStateAction<BreakMode>>;
  onEverydayHoursChange?: Dispatch<SetStateAction<{ start: string[]; end: string[] }>>;
  onBydayHoursChange?: Dispatch<SetStateAction<HoursByDay>>;
}

export const BusinessHours = ({
  mode: externalMode,
  breakMode: externalBreakMode,
  name,
  type = 'operating',
  hasAddButton = false,
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
  const [defaultEverydayHours, setDefaultEverydayHours] = useState<{
    start: string[];
    end: string[];
  }>({
    start: ['09:00'],
    end: ['22:00'],
  });
  const [defaultBydayHours, setDefaultBydayHours] = useState<HoursByDay>(() =>
    Object.fromEntries(
      daysOfWeek.map((day) => [day, { start: ['09:00'], end: ['22:00'], isClosed: false }]),
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

  // UI용 리스트 상태
  const [everydayHoursList, setEverydayHoursList] = useState<{ start: string; end: string }[]>(() => {
    // 최소 1개의 데이터 보장
    if (!everydayHours.start || everydayHours.start.length === 0) {
      return [{ start: '09:00', end: '22:00' }];
    }
    return everydayHours.start.map((s, i) => ({
      start: s || '09:00',
      end: everydayHours.end[i] || '22:00',
    }));
  });

  // 외부 everydayHours 변경시 everydayHoursList 동기화 (useRef로 무한루프 방지)
  const prevPropsEverydayHoursRef = useRef(everydayHours);
  
  useEffect(() => {
    // 외부 프로퍼티가 실제로 변경된 경우에만 동기화
    const prevStart = prevPropsEverydayHoursRef.current.start?.join(',') || '';
    const prevEnd = prevPropsEverydayHoursRef.current.end?.join(',') || '';
    const newStart = everydayHours.start?.join(',') || '';
    const newEnd = everydayHours.end?.join(',') || '';
    
    if (prevStart !== newStart || prevEnd !== newEnd) {
      const newList = (everydayHours.start || []).map((s, i) => ({
        start: s || '09:00',
        end: everydayHours.end?.[i] || '22:00',
      }));
      setEverydayHoursList(newList.length > 0 ? newList : [{ start: '09:00', end: '22:00' }]);
      prevPropsEverydayHoursRef.current = everydayHours;
    }
  }, [everydayHours]);

  // TimePicker 값 변경 핸들러 (내부 상태 + 상위 상태 동시 업데이트)
  const handleTimePickerChange = (index: number, type: 'start' | 'end', value: string) => {
    const newList = everydayHoursList.map((h, i) => 
      i === index ? { ...h, [type]: value } : h
    );
    setEverydayHoursList(newList);
    
    // 상위 상태도 즉시 업데이트
    const updatedValue = {
      start: newList.map((h) => h.start),
      end: newList.map((h) => h.end),
    };
    
    // 내부 업데이트임을 알 수 있게 Ref 최신화
    prevPropsEverydayHoursRef.current = updatedValue;
    setEverydayHours(updatedValue);
  };

  const handleAddHours = () => {
    // 리스트 상태 먼저 업데이트 (브레이크 타임일 경우의 기본값 고려)
    const lastItem = everydayHoursList[everydayHoursList.length - 1];
    const newStart = lastItem ? lastItem.end : (type === 'breakTime' ? '15:00' : '09:00');
    const newEnd = lastItem ? lastItem.end : (type === 'breakTime' ? '17:00' : '22:00');

    const newList = [...everydayHoursList, { start: newStart, end: newEnd }];
    setEverydayHoursList(newList);

    const newEverydayHours = {
      start: newList.map((h) => h.start),
      end: newList.map((h) => h.end),
    };
    prevPropsEverydayHoursRef.current = newEverydayHours;
    setEverydayHours(newEverydayHours);
  };

  const handleRemoveHours = (index: number) => {
    // UI 리스트 상태 먼저 업데이트
    const newList = everydayHoursList.filter((_, i) => i !== index);
    setEverydayHoursList(newList);

    // form용 상태도 같이 업데이트
    const newEverydayHours = {
      start: newList.map((h) => h.start),
      end: newList.map((h) => h.end),
    };
    prevPropsEverydayHoursRef.current = newEverydayHours;
    setEverydayHours(newEverydayHours);
  };

  // 브레이크 타임일 때 매일 같아요 모드면 요일별 데이터로 동기화
  useEffect(() => {
    if (type !== 'breakTime' || mode !== 'same_everyday' || !setBydayHours) return;
    const newBydayHours = Object.fromEntries(
      daysOfWeek.map((day) => {
        const starts = everydayHoursList.map((h) => h.start);
        const ends = everydayHoursList.map((h) => h.end);
        const allClosed = starts.every((s, i) => s === '' || s === ends[i]);
        return [day, { start: starts, end: ends, isClosed: allClosed }];
      }),
    );
    setBydayHours(newBydayHours);
  }, [everydayHoursList, mode, type, setBydayHours]);

  // 요일 휴무 토글
  const handleDayOffToggle = (day: string) => {
    setBydayHours((prev) => {
      const current = prev[day]!;
      const newClosed = !current.isClosed;
      return {
        ...prev,
        [day]: {
          ...current,
          isClosed: newClosed,
          start: newClosed ? [''] : current.start.length && current.start[0] !== '' ? current.start : ['09:00'],
          end: newClosed ? [''] : current.end.length && current.end[0] !== '' ? current.end : ['22:00'],
        },
      };
    });
  };

  // 요일 시간 변경
  const handleTimeChange = (day: string, index: number, type: 'start' | 'end', time: string) => {
    setBydayHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day]!,
        [type]: prev[day]![type].map((t, i) => (i === index ? time : t)),
      },
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
        onChange={(val) => {
          const newMode = val as any;

          // 핵심: breakTime이고 none에서 다른 모드로 바꿀 때 강제로 15:00 ~ 17:00 주입
          // 단, 이미 값이 있는 경우에는(API 데이터 등) 덮어쓰지 않음
          if (type === 'breakTime' && mode === 'none' && newMode !== 'none') {
            const hasExistingData = everydayHours.start.some((s) => s && s !== '') || 
                                   (bydayHours && Object.values(bydayHours).some(day => day.start.some(s => s && s !== '')));

            if (!hasExistingData) {
              const defaultHours = { start: ['15:00'], end: ['17:00'] };
              
              // UI 리스트와 Ref, 상위 상태를 모두 동기화
              setEverydayHoursList([{ start: '15:00', end: '17:00' }]);
              prevPropsEverydayHoursRef.current = defaultHours;
              onEverydayHoursChange?.(defaultHours);

              if (onBydayHoursChange) {
                const filledByDay: HoursByDay = {};
                daysOfWeek.forEach((day) => {
                  filledByDay[day] = {
                    start: ['15:00'],
                    end: ['17:00'],
                    isClosed: false,
                  };
                });
                onBydayHoursChange(filledByDay);
              }
            }
          }

          // 모드 변경 (타입 안전하게 분기)
          if (type === 'operating') {
            if (['same_everyday', 'different_by_day', 'open_24h'].includes(newMode)) {
              onModeChange?.(newMode);
            }
          } else {
            if (['same_everyday', 'different_by_day', 'none'].includes(newMode)) {
              onBreakModeChange?.(newMode);
            }
          }
        }}
      />

      <div className='mt-6'>
        {mode === 'same_everyday' &&
          (hasAddButton ? (
            /* 여러 시간대 */
            <div className='flex flex-col gap-2 w-full items-center'>
              {everydayHoursList.map((hours, index) => (
                <div key={index} className='flex items-center gap-4 w-full'>
                  <TimePicker
                    value={hours.start}
                    onChange={(start) => handleTimePickerChange(index, 'start', start)}
                  />
                  <span>~</span>
                  <TimePicker
                    value={hours.end}
                    onChange={(end) => handleTimePickerChange(index, 'end', end)}
                  />

                  <button
                    type='button'
                    onClick={() => handleRemoveHours(index)}
                    className='min-w-[100px] flex text-gray-5 hover:text-red-500 hover:cursor-pointer gap-2'
                  >
                    <MinusCircle /> <span>삭제</span>
                  </button>
                </div>
              ))}

              <button
                type='button'
                onClick={handleAddHours}
                className='body-2 text-fooding-purple flex items-center gap-1 mt-2'
              >
                <div className='w-5 h-5 bg-[#6366F1]/5 flex justify-center items-center rounded-full'>
                  <PlusIcon />
                </div>
                <span>추가</span>
              </button>
            </div>
          ) : (
            /* 단일 시간 */
            <div className='flex items-center gap-4'>
              {everydayHoursList.map((hours, index) => (
                <div key={index} className='flex items-center gap-4 w-full'>
                  <TimePicker
                    value={hours.start}
                    onChange={(start) => handleTimePickerChange(index, 'start', start)}
                  />
                  <span>~</span>
                  <TimePicker
                    value={hours.end}
                    onChange={(end) => handleTimePickerChange(index, 'end', end)}
                  />
                </div>
              ))}
            </div>
          ))}

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

                  <div className='flex flex-1 items-center gap-2'>
                    <TimePicker
                      value={dayInfo.start[0]}
                      onChange={(newStart) => handleTimeChange(day, 0, 'start', newStart)}
                      disabled={dayInfo.isClosed}
                    />
                    <span>~</span>
                    <TimePicker
                      value={dayInfo.end[0]}
                      onChange={(newEnd) => handleTimeChange(day, 0, 'end', newEnd)}
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
