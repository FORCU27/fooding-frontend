'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { MinusCircle, PlusIcon } from 'lucide-react';

import { Checkbox } from './Checkbox';
import RadioButtonGroup from './RadioButtonGroup';
import { TimePicker } from './TimePicker';

export type BreakMode = 'same_everyday' | 'different_by_day' | 'none';
export type EverydayBreak = { start: string; end: string };
export type BreakHoursByDay = {
  [day: string]: {
    start: string;
    end: string;
    isClosed: boolean;
  };
};

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

const toHHmm = (time?: string | null) => (time ? time.slice(0, 5) : '');

export interface BreakHoursProps {
  breakMode?: BreakMode;
  name?: string;
  hasAddButton?: boolean;
  everydayBreaks?: EverydayBreak[];
  bydayBreaks?: BreakHoursByDay;
  originValues?: {
    dailyOperatingTimes?: Array<{
      dayOfWeek: string;
      openTime: string | null;
      closeTime: string | null;
    }>;
    dailyBreakTimes?: Array<{
      dayOfWeek: string;
      breakStartTime: string | null;
      breakEndTime: string | null;
    }>;
  };
  onBreakModeChange?: Dispatch<SetStateAction<BreakMode>>;
  onEverydayBreaksChange?: Dispatch<SetStateAction<EverydayBreak[]>>;
  onBydayBreaksChange?: Dispatch<SetStateAction<BreakHoursByDay>>;
}

export const BreakHours = ({
  breakMode: externalBreakMode,
  name,
  hasAddButton = false,
  everydayBreaks: externalEverydayBreaks,
  bydayBreaks: externalBydayBreaks,
  originValues,
  onBreakModeChange,
  onEverydayBreaksChange,
  onBydayBreaksChange,
}: BreakHoursProps) => {
  // 내부 상태
  const [internalMode, setInternalMode] = useState<BreakMode>('none');
  const [internalEverydayBreaks, setInternalEverydayBreaks] = useState<EverydayBreak[]>([
    { start: '15:00', end: '17:00' },
  ]);
  const [internalBydayBreaks, setInternalBydayBreaks] = useState<BreakHoursByDay>(() => {
    const initial: BreakHoursByDay = {};

    daysOfWeek.forEach((day) => {
      const engDay = dayMapping[day];

      // 해당 요일의 operating time 찾기
      const operating = originValues?.dailyOperatingTimes?.find((op) => op.dayOfWeek === engDay);

      // 영업시간이 없거나, openTime과 closeTime이 모두 null/없으면 휴무로 간주
      const isActuallyClosed =
        !operating ||
        (operating.openTime === null && operating.closeTime === null) ||
        (!operating.openTime && !operating.closeTime);

      initial[day] = {
        start: '15:00',
        end: '17:00',
        isClosed: isActuallyClosed,
      };
    });

    return initial;
  });
  const mode = externalBreakMode ?? internalMode;
  const everydayBreaks = externalEverydayBreaks ?? internalEverydayBreaks;
  const bydayBreaks = externalBydayBreaks ?? internalBydayBreaks;

  const setEverydayBreaks = onEverydayBreaksChange ?? setInternalEverydayBreaks;
  const setBydayBreaks = onBydayBreaksChange ?? setInternalBydayBreaks;

  const [isInitialized, setIsInitialized] = useState(false);
  const [userChangedMode, setUserChangedMode] = useState(false);

  useEffect(() => {
    if (externalBreakMode !== undefined && externalBreakMode !== internalMode) {
      setInternalMode(externalBreakMode);
    }
  }, [externalBreakMode, internalMode]);

  // originValues → 초기값 설정 (최초 1회만)
  useEffect(() => {
    if (externalBreakMode !== undefined) return;

    if (!originValues?.dailyBreakTimes?.length || isInitialized) return;

    const bk = originValues.dailyBreakTimes;

    const allNullOrEmpty =
      bk.length === 0 || bk.every((item) => !item.breakStartTime && !item.breakEndTime);

    if (allNullOrEmpty) {
      setInternalMode('none');
      onBreakModeChange?.('none');
      setIsInitialized(true);
      return;
    }
    // different_by_day 초기화 (originValues에 여러 시간대 있을 때 요일별 첫 번째만)
    if (mode === 'different_by_day' || (!externalBreakMode && !userChangedMode)) {
      setBydayBreaks((prev) => {
        const next = { ...prev };
        daysOfWeek.forEach((day) => {
          const eng = dayMapping[day];
          const items = bk.filter((b) => b.dayOfWeek === eng && b.breakStartTime && b.breakEndTime);
          const first = items[0]; // 요일당 첫 번째만 (필요시 확장)
          if (first) {
            next[day] = {
              start: toHHmm(first.breakStartTime),
              end: toHHmm(first.breakEndTime),
              isClosed: false,
            };
          }
        });
        return next;
      });
    }

    // same_everyday 초기화 (7개 이상 → 중복 제거)
    if (bk.length >= 7) {
      if (!externalBreakMode) setInternalMode('same_everyday');
      onBreakModeChange?.('same_everyday');

      const uniqueMap = new Map<string, EverydayBreak>();
      bk.forEach((item) => {
        if (item.breakStartTime && item.breakEndTime) {
          const start = toHHmm(item.breakStartTime);
          const end = toHHmm(item.breakEndTime);
          const key = `${start}-${end}`;
          uniqueMap.set(key, { start, end }); // 마지막으로 덮어쓰기
        }
      });

      const sorted = Array.from(uniqueMap.values()).sort((a, b) => a.start.localeCompare(b.start));
      const limited = sorted.slice(0, 3); // 최대 3개

      setEverydayBreaks(limited.length > 0 ? limited : [{ start: '15:00', end: '17:00' }]);
    } else if (mode === 'same_everyday') {
      const first = bk.find((b) => b.breakStartTime && b.breakEndTime);
      if (first) {
        setEverydayBreaks([
          {
            start: toHHmm(first.breakStartTime),
            end: toHHmm(first.breakEndTime),
          },
        ]);
      }
    }

    setIsInitialized(true);
  }, [
    originValues,
    isInitialized,
    externalBreakMode,
    mode,
    userChangedMode,
    onBreakModeChange,
    setBydayBreaks,
    setEverydayBreaks,
  ]);

  const handleBydayTimeChange = (day: string, type: 'start' | 'end', time: string) => {
    setBydayBreaks((prev) => {
      const current = prev[day] ?? {
        start: '15:00',
        end: '17:00',
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
  const handleAddBreak = () => {
    setEverydayBreaks((prev) => [...prev, { start: '15:00', end: '17:00' }]);
  };

  const handleRemoveBreak = (index: number) => {
    if (everydayBreaks.length <= 1) return;
    setEverydayBreaks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTimeChange = (index: number, field: 'start' | 'end', value: string) => {
    setEverydayBreaks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleDayOffToggle = (day: string) => {
    setBydayBreaks((prev) => {
      const current = prev[day] ?? { start: '15:00', end: '17:00', isClosed: false };
      const newClosed = !current.isClosed;

      return {
        ...prev,
        [day]: {
          ...current,
          isClosed: newClosed,
          // 휴무 체크 해제 시 기본값 넣어주기
          start: newClosed ? '' : current.start || '15:00',
          end: newClosed ? '' : current.end || '17:00',
        },
      };
    });
  };

  return (
    <div className='w-full'>
      <RadioButtonGroup
        options={[
          { label: '매일 같아요', value: 'same_everyday' },
          { label: '요일마다 달라요', value: 'different_by_day' },
          { label: '없어요', value: 'none' },
        ]}
        name={name || 'break-hours'}
        selectedValue={mode}
        onChange={(val) => {
          const newMode = val as BreakMode;
          if (!externalBreakMode) {
            setInternalMode(newMode);
          }
          onBreakModeChange?.(newMode);
          setUserChangedMode(true);
        }}
      />

      <div className='mt-6'>
        {mode === 'same_everyday' && (
          <div className='flex flex-col gap-2 w-full items-center'>
            {everydayBreaks.map((brk, index) => (
              <div key={index} className='flex items-center gap-4 w-full'>
                <TimePicker
                  value={brk.start}
                  onChange={(v) => handleTimeChange(index, 'start', v)}
                />
                <span>~</span>
                <TimePicker value={brk.end} onChange={(v) => handleTimeChange(index, 'end', v)} />

                {hasAddButton && everydayBreaks.length > 1 && (
                  <button
                    type='button'
                    onClick={() => handleRemoveBreak(index)}
                    className='flex items-center gap-1 text-gray-500 hover:text-red-600 min-w-[80px]'
                  >
                    <MinusCircle />
                    <span className='text-sm'>삭제</span>
                  </button>
                )}
              </div>
            ))}
            {hasAddButton && (
              <button
                type='button'
                onClick={handleAddBreak}
                className='body-2 text-fooding-purple flex items-center gap-1 mt-2'
              >
                <div className='w-5 h-5 bg-[#6366F1]/5 flex justify-center items-center rounded-full'>
                  <PlusIcon />
                </div>
                <span>추가</span>
              </button>
            )}
          </div>
        )}

        {mode === 'different_by_day' && (
          <ul className='space-y-4'>
            {daysOfWeek.map((day) => {
              const dayInfo = bydayBreaks[day] ?? { start: '', end: '', isClosed: false };

              return (
                <li key={day} className='flex items-center gap-6'>
                  <div className='flex justify-center items-center border border-gray-3 w-[54px] h-[58px] rounded-lg font-medium'>
                    {day}
                  </div>

                  <div className='flex flex-1 items-center gap-2'>
                    <TimePicker
                      value={dayInfo.start}
                      onChange={(v) => handleBydayTimeChange(day, 'start', v)}
                      disabled={dayInfo.isClosed}
                    />
                    <span>~</span>
                    <TimePicker
                      value={dayInfo.end}
                      onChange={(v) => handleBydayTimeChange(day, 'end', v)}
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

        {mode === 'none' && <div className='text-gray-400'>휴게시간 없음</div>}
      </div>
    </div>
  );
};
