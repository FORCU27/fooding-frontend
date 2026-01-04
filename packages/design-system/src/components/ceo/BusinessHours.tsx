'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';

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
  originValues?: StoreOperatingHourBody;
  onModeChange?: Dispatch<SetStateAction<OperatingMode>>;
  onBreakModeChange?: Dispatch<SetStateAction<BreakMode>>;
  onEverydayHoursChange?: Dispatch<
    SetStateAction<{ start: string[]; end: string[]; isClosed?: boolean }>
  >;
  onBydayHoursChange?: Dispatch<SetStateAction<HoursByDay>>;
}

export const BusinessHours = ({
  mode: externalMode,
  breakMode: externalBreakMode,
  name,
  type = 'operating',
  hasAddButton = false,
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
  const [everydayHoursList, setEverydayHoursList] = useState<{ start: string; end: string }[]>(
    everydayHours.start.map((s, i) => ({
      start: s,
      end: everydayHours.end[i] ?? '22:00',
    })),
  );

  const handleAddHours = () => {
    // 리스트 상태 먼저 업데이트
    const newList = [...everydayHoursList, { start: '', end: '' }];
    setEverydayHoursList(newList);

    // form용 상태도 같이 업데이트
    const newEverydayHours = {
      start: newList.map((h) => h.start),
      end: newList.map((h) => h.end),
    };
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
    setEverydayHours(newEverydayHours);
  };

  useEffect(() => {
    if (type !== 'breakTime') return;

    if (!originValues || !originValues.dailyBreakTimes?.length) {
      // 휴게시간 데이터 없음 → 'none'
      setDefaultBreakMode('none');
      if (onBreakModeChange) onBreakModeChange('none');

      setEverydayHours({ start: [''], end: [''] });

      if (setBydayHours) {
        const emptyByDay: HoursByDay = {};
        daysOfWeek.forEach((day) => {
          emptyByDay[day] = { start: [''], end: [''], isClosed: false };
        });
        setBydayHours(emptyByDay);
      }
      return;
    }

    const breakTimes = originValues.dailyBreakTimes;
    const firstBreak = breakTimes[0];

    // 모든 휴게시간이 동일한지 (null 포함)
    const allSame = breakTimes.every(
      (b) =>
        b.breakStartTime === firstBreak?.breakStartTime &&
        b.breakEndTime === firstBreak?.breakEndTime,
    );

    // 모든 휴게시간이 null인지 → 'none'
    const allNone = breakTimes.every((b) => b.breakStartTime === null && b.breakEndTime === null);

    let initialMode: BreakMode;

    if (allNone) {
      initialMode = 'none';
    } else if (allSame) {
      initialMode = 'same_everyday';
    } else {
      initialMode = 'different_by_day';
    }

    // 여기서 setModeFn 대신 직접 분기 호출
    setDefaultBreakMode(initialMode);
    if (onBreakModeChange) {
      onBreakModeChange(initialMode);
    }

    // 나머지 로직...
    if (initialMode === 'same_everyday') {
      const start = firstBreak?.breakStartTime ?? '';
      const end = firstBreak?.breakEndTime ?? '';
      setDefaultEverydayHours({ start: [start], end: [end] });
      setEverydayHoursList([{ start, end }]);
    } else if (initialMode === 'different_by_day') {
      const newBydayHours: HoursByDay = {};
      daysOfWeek.forEach((day) => {
        const engDay = dayMapping[day];
        const operating = originValues.dailyOperatingTimes?.find((d) => d.dayOfWeek === engDay);
        const breakTime = breakTimes.find((d) => d.dayOfWeek === engDay);

        const isShopClosed =
          !operating || operating.openTime === null || operating.closeTime === null;

        newBydayHours[day] = {
          start: [breakTime?.breakStartTime ?? ''],
          end: [breakTime?.breakEndTime ?? ''],
          isClosed: isShopClosed, // 영업 휴무일 때만 휴게시간도 휴무 체크
        };
      });
      setDefaultBydayHours(newBydayHours);
      setBydayHours?.(newBydayHours);
    }
  }, [originValues, type, onBreakModeChange, setEverydayHours, setBydayHours]);

  useEffect(() => {
    if (mode === 'none') {
      // UI용 리스트 초기화
      setEverydayHoursList((prev) => prev.map(() => ({ start: '', end: '' })));

      // form용 bydayHours 초기화 (요일별 브레이크타임)
      if (setBydayHours) {
        const emptyByDay: HoursByDay = {};
        daysOfWeek.forEach((day) => {
          emptyByDay[day] = { start: [''], end: [''], isClosed: false };
        });
        setBydayHours(emptyByDay);
      }

      // form용 everydayHours도 초기화
      setEverydayHours({ start: [''], end: [''] });
    }
  }, [mode, setBydayHours, setEverydayHours]);

  // same_everyday 모드일 때 휴게시간 byday 동기화
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

  // originValues로 초기값 세팅
  useEffect(() => {
    if (!originValues) return;

    if (mode === 'same_everyday') {
      const firstBreak = originValues.dailyBreakTimes?.[0];
      const start = firstBreak?.breakStartTime ?? '09:00';
      const end = firstBreak?.breakEndTime ?? '22:00';
      setDefaultEverydayHours({ start: [start], end: [end] });
      setEverydayHoursList([{ start, end }]);
    } else if (mode === 'different_by_day') {
      const newBydayHours: HoursByDay = {};
      daysOfWeek.forEach((day) => {
        const korDay = mapKorDay(day);
        const operating = originValues.dailyOperatingTimes?.find((d) => d.dayOfWeek === korDay);
        const breakTime = originValues.dailyBreakTimes?.find((d) => d.dayOfWeek === korDay);

        // 영업시간이 없으면 휴무
        const isClosed = !operating || operating.openTime === null || operating.closeTime === null;
        newBydayHours[day] = {
          start: isClosed ? [''] : [breakTime?.breakStartTime ?? operating.openTime ?? '09:00'],
          end: isClosed ? [''] : [breakTime?.breakEndTime ?? operating.closeTime ?? '22:00'],
          isClosed,
        };
      });
      setDefaultBydayHours(newBydayHours);
    }
  }, [originValues, mode]);

  useEffect(() => {
    if (mode === 'none') {
      //  UI용 리스트 초기화 (렌더링용, hidden일 수 있음)
      setEverydayHoursList(
        Array(1).fill({ start: '', end: '' }), // UI에 표시할 리스트, 1개라도 충분
      );

      // form용 everydayHours 초기화
      setEverydayHours({ start: [''], end: [''] });

      // form용 bydayHours 초기화 (요일별 브레이크타임)
      if (setBydayHours) {
        const emptyByDay: HoursByDay = {};
        daysOfWeek.forEach((day) => {
          emptyByDay[day] = { start: [''], end: [''], isClosed: true }; // 휴무 처리
        });
        setBydayHours(emptyByDay);
      }
    }
  }, [mode, setBydayHours, setEverydayHours]);

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
          // 휴무라면 start/end 비우기, 아니면 기존 값 유지
          start: newClosed ? [''] : current.start.length ? current.start : ['09:00'],
          end: newClosed ? [''] : current.end.length ? current.end : ['22:00'],
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

  useEffect(() => {
    if (mode === 'none') {
      setEverydayHoursList((prev) => prev.map(() => ({ start: '', end: '' })));
    }
  }, [mode]);

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
          if (type === 'breakTime' && mode === 'none' && newMode !== 'none') {
            // everydayHours 강제 설정
            const defaultHours = { start: ['15:00'], end: ['17:00'] };
            onEverydayHoursChange?.(defaultHours);

            // bydayHours도 모든 요일에 강제 설정
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
                    onChange={(start) =>
                      setEverydayHoursList((prev) =>
                        prev.map((h, i) => (i === index ? { ...h, start } : h)),
                      )
                    }
                  />
                  <span>~</span>
                  <TimePicker
                    value={hours.end}
                    onChange={(end) =>
                      setEverydayHoursList((prev) =>
                        prev.map((h, i) => (i === index ? { ...h, end } : h)),
                      )
                    }
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
                    onChange={(start) =>
                      setEverydayHoursList((prev) =>
                        prev.map((h, i) => (i === index ? { ...h, start } : h)),
                      )
                    }
                  />
                  <span>~</span>
                  <TimePicker
                    value={hours.end}
                    onChange={(end) =>
                      setEverydayHoursList((prev) =>
                        prev.map((h, i) => (i === index ? { ...h, end } : h)),
                      )
                    }
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
