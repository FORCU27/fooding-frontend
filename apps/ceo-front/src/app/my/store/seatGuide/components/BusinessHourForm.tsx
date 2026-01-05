import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DAY_OF_WEEK, StoreOperatingHourBody } from '@repo/api/ceo';
import {
  Card,
  CardSubtitle,
  BusinessHours,
  HoursByDay,
  OperatingMode,
  BreakMode,
} from '@repo/design-system/components/ceo';
import { UseFormSetValue } from 'react-hook-form';

import { OperatingHoursFormValues } from './OperatingHourForm';

const daysOfWeekKor = ['월', '화', '수', '목', '금', '토', '일'];
const dayMapping: Record<string, string> = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};

type BusinessHourFormProps = {
  setValue: UseFormSetValue<OperatingHoursFormValues>;
  mode: OperatingMode;
  breakMode: BreakMode;
  originValues?: StoreOperatingHourBody;
  onModeChange: Dispatch<SetStateAction<OperatingMode>>;
  onBreakModeChange: Dispatch<SetStateAction<BreakMode>>;
};

export const BusinessHourForm = ({
  setValue,
  mode,
  breakMode,
  originValues,
  onModeChange,
  onBreakModeChange,
}: BusinessHourFormProps) => {
  const toHHmm = (time?: string | null) => (time ? time.slice(0, 5) : '');

  // 초기값
  const originOperating = originValues?.dailyOperatingTimes;
  const originBreak = originValues?.dailyBreakTimes;

  // 단일/다중 시간대 모두 지원하는 구조
  const defaultEverydayHours = useMemo(() => {
    if (!originOperating || originOperating.length === 0) {
      return { start: ['09:00'], end: ['22:00'], isClosed: false };
    }
    const firstDay = originOperating[0]?.dayOfWeek;
    const sameDayOp = originOperating.filter((op) => op.dayOfWeek === firstDay);
    return {
      start: sameDayOp.map((op) => toHHmm(op.openTime)),
      end: sameDayOp.map((op) => toHHmm(op.closeTime)),
      isClosed: false,
    };
  }, [originOperating]);

  // by day 초기값
  const defaultBydayHours: HoursByDay = useMemo(() => {
    return Object.fromEntries(
      daysOfWeekKor.map((day) => {
        const engDay = dayMapping[day];
        const opItems =
          originValues?.dailyOperatingTimes?.filter((d) => d.dayOfWeek === engDay) ?? [];

        const isClosed =
          opItems.length === 0 ||
          (opItems.every((d) => d.openTime === null) && opItems.every((d) => d.closeTime === null));

        return [
          day,
          {
            start: opItems.length && !isClosed ? opItems.map((d) => toHHmm(d.openTime)) : [''],
            end: opItems.length && !isClosed ? opItems.map((d) => toHHmm(d.closeTime)) : [''],
            isClosed,
          },
        ];
      }),
    ) as HoursByDay;
  }, [originValues, daysOfWeekKor, dayMapping]);

  const defaultBreakBydayHours: HoursByDay = useMemo(() => {
    return Object.fromEntries(
      daysOfWeekKor.map((day) => {
        const engDay = dayMapping[day];
        const brItems = originValues?.dailyBreakTimes?.filter((d) => d.dayOfWeek === engDay) ?? [];
        const opItems =
          originValues?.dailyOperatingTimes?.filter((d) => d.dayOfWeek === engDay) ?? [];

        const isClosed =
          opItems.length === 0 ||
          (opItems.every((d) => d.openTime === null) && opItems.every((d) => d.closeTime === null));
        return [
          day,
          {
            start:
              brItems.length && !isClosed ? brItems.map((d) => toHHmm(d.breakStartTime)) : ['15:00'],
            end: brItems.length && !isClosed ? brItems.map((d) => toHHmm(d.breakEndTime)) : ['17:00'],
            isClosed,
          },
        ];
      }),
    ) as HoursByDay;
  }, [originValues, daysOfWeekKor, dayMapping]);

  // 상태
  const getInitialBreakEveryday = () => {
    if (!originBreak || originBreak.length === 0) {
      return { start: ['13:00'], end: ['17:00'], isClosed: false };
    }
    const firstDay = originBreak[0]?.dayOfWeek;
    const firstDayBreaks = originBreak.filter((b) => b.dayOfWeek === firstDay);
    return {
      start: firstDayBreaks.map((b) => toHHmm(b.breakStartTime)),
      end: firstDayBreaks.map((b) => toHHmm(b.breakEndTime)),
      isClosed: false,
    };
  };

  const [everydayHours, setEverydayHours] = useState(defaultEverydayHours);
  const [bydayHours, setBydayHours] = useState<HoursByDay>(defaultBydayHours);
  const [breakEverydayHours, setBreakEverydayHours] = useState<{
    start: string[];
    end: string[];
    isClosed?: boolean;
  }>(getInitialBreakEveryday());
  const [breakBydayHours, setBreakBydayHours] = useState<HoursByDay>(defaultBreakBydayHours);
  const mapDayToKor = (day: string) =>
    Object.entries(dayMapping).find(([, eng]) => eng === day)?.[0] || '';



  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!originValues || hasInitializedRef.current) return;

    const allBreakNull = originValues.dailyBreakTimes.every(
      (b) => b.breakStartTime === null && b.breakEndTime === null,
    );

    if (allBreakNull) {
      onBreakModeChange('none');
    } else {
      const first = originValues.dailyBreakTimes[0];
      const allSame = originValues.dailyBreakTimes.every(
        (b) => b.breakStartTime === first?.breakStartTime && b.breakEndTime === first.breakEndTime,
      );
      onBreakModeChange(allSame ? 'same_everyday' : 'different_by_day');
    }

    // 초기 데이터 로드 시에만 상태 설정
    setEverydayHours(defaultEverydayHours);
    setBydayHours(defaultBydayHours);

    const firstDay = originValues.dailyBreakTimes[0]?.dayOfWeek;
    const firstDayBreaks = originValues.dailyBreakTimes.filter((b) => b.dayOfWeek === firstDay);
    setBreakEverydayHours(
      firstDayBreaks.length > 0
        ? {
            start: firstDayBreaks.map((b) => toHHmm(b.breakStartTime)),
            end: firstDayBreaks.map((b) => toHHmm(b.breakEndTime)),
            isClosed: false,
          }
        : { start: ['15:00'], end: ['17:00'], isClosed: false }
    );
    setBreakBydayHours(defaultBreakBydayHours);
    
    hasInitializedRef.current = true;
  }, [originValues, onBreakModeChange, defaultEverydayHours, defaultBydayHours, defaultBreakBydayHours]);

  // form 반영
  useEffect(() => {
    const operatingTimes = DAY_OF_WEEK.map((day) => {
      const originItem = originOperating?.find((d) => d.dayOfWeek === day);

      let openTime: string | null = null;
      let closeTime: string | null = null;

      if (mode === 'same_everyday') {
        // 체크박스가 휴무라면 null, 아니면 첫 번째 값 사용
        const isClosed = everydayHours.start[0] === everydayHours.end[0];
        openTime = isClosed ? null : everydayHours.start[0]!;
        closeTime = isClosed ? null : everydayHours.end[0]!;
      }

      if (mode === 'different_by_day') {
        const korDay = mapDayToKor(day);
        const item = korDay ? bydayHours[korDay] : undefined;
        if (item) {
          const isClosed = item.isClosed || item.start[0] === item.end[0];
          openTime = isClosed ? null : item.start[0]!;
          closeTime = isClosed ? null : item.end[0]!;
        }
      }

      if (mode === 'open_24h') {
        openTime = '00:00';
        closeTime = '24:00';
      }

      return {
        id: originItem?.id,
        dayOfWeek: day,
        openTime,
        closeTime,
        breakStartTime: null,
        breakEndTime: null,
      };
    });

    const breakTimesFlat = DAY_OF_WEEK.flatMap((day) => {
      if (breakMode === 'none') {
        return [{ day, start: null, end: null }];
      } else if (breakMode === 'same_everyday') {
        // 모든 휴게시간을 리스트에 담음
        if (breakEverydayHours.start.length === 0) {
          return [{ day, start: null, end: null }];
        }
        return breakEverydayHours.start.map((s, i) => ({
          day,
          start: s?.trim() || null,
          end: breakEverydayHours.end[i]?.trim() || null,
        }));
      } else if (breakMode === 'different_by_day') {
        const korDay = mapDayToKor(day);
        const item = korDay ? breakBydayHours[korDay] : undefined;

        if (item && !item.isClosed) {
          if (item.start.length === 0) {
            return [{ day, start: null, end: null }];
          }
          return item.start.map((s, i) => ({
            day,
            start: s?.trim() || null,
            end: item.end[i]?.trim() || null,
          }));
        }
        return [{ day, start: null, end: null }];
      }
      return [];
    });

    const breakTimesForm = breakTimesFlat.map((b) => {
      // 해당 요일에서 몇 번째 휴게시간인지 확인
      const sameDayBreaks = breakTimesFlat.filter((x) => x.day === b.day);
      const position = sameDayBreaks.indexOf(b);

      // 원본 데이터에서 같은 요일의 같은 순서인 항목의 ID를 찾음
      const originSameDayBreaks = originBreak?.filter((ob) => ob.dayOfWeek === b.day) || [];
      const originItem = originSameDayBreaks[position];

      return {
        ...(originItem?.id && { id: originItem.id }),
        dayOfWeek: b.day as any,
        openTime: null,
        closeTime: null,
        breakStartTime: b.start,
        breakEndTime: b.end,
      };
    });

    console.log('=== [DEBUG] BusinessHourForm: setValue 호출 직전 ===');
    console.log('현재 breakMode:', breakMode);
    console.log('breakEverydayHours(상태):', JSON.stringify(breakEverydayHours));
    console.log('breakTimesFlat 개수:', breakTimesFlat.length);
    console.log('breakTimesForm 개수:', breakTimesForm.length);
    console.log('breakTimesForm 데이터:', breakTimesForm);
    console.log('==================================================');

    setValue('dailyOperatingTimes', operatingTimes);
    setValue('dailyBreakTimes', breakTimesForm);
  }, [
    mode,
    breakMode,
    everydayHours,
    bydayHours,
    breakEverydayHours,
    breakBydayHours,
    setValue,
    originOperating,
    originBreak,
  ]);

  // breakEverydayHours 상태 변화 추적 로그
  useEffect(() => {
    console.log('=== [DEBUG] breakEverydayHours 상태 변경됨:', breakEverydayHours);
  }, [breakEverydayHours]);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Card>
        <CardSubtitle label='영업 시간을 알려주세요'>
          <BusinessHours
            mode={mode}
            name='operatingMode'
            everydayHours={everydayHours}
            bydayHours={bydayHours}
            onModeChange={onModeChange}
            onEverydayHoursChange={setEverydayHours}
            onBydayHoursChange={setBydayHours}
          />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='휴게 시간을 알려주세요'>
          <BusinessHours
            breakMode={breakMode}
            name='breakMode'
            type='breakTime'
            hasAddButton
            everydayHours={breakEverydayHours}
            bydayHours={breakBydayHours}
            onBreakModeChange={onBreakModeChange}
            onEverydayHoursChange={setBreakEverydayHours}
            onBydayHoursChange={setBreakBydayHours}
          />
        </CardSubtitle>
      </Card>
    </div>
  );
};
