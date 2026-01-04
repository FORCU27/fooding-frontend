import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  const defaultEverydayHours: { start: string[]; end: string[]; isClosed?: boolean } =
    originOperating?.[0]
      ? {
          start: [toHHmm(originOperating[0].openTime)],
          end: [toHHmm(originOperating[0].closeTime)],
          isClosed: false,
        }
      : { start: ['09:00'], end: ['22:00'], isClosed: false };

  // by day 초기값
  const defaultBydayHours: HoursByDay = Object.fromEntries(
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

  const defaultBreakBydayHours: HoursByDay = Object.fromEntries(
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

  // 상태
  const [everydayHours, setEverydayHours] = useState(defaultEverydayHours);
  const [bydayHours, setBydayHours] = useState<HoursByDay>(defaultBydayHours);
  const [breakEverydayHours, setBreakEverydayHours] = useState<{
    start: string[];
    end: string[];
    isClosed?: boolean;
  }>(
    originBreak?.[0]
      ? {
          start: [toHHmm(originBreak[0].breakStartTime)],
          end: [toHHmm(originBreak[0].breakEndTime)],
          isClosed: false,
        }
      : { start: ['13:00'], end: ['17:00'], isClosed: false },
  );
  const [breakBydayHours, setBreakBydayHours] = useState<HoursByDay>(defaultBreakBydayHours);
  const mapDayToKor = (day: string) =>
    Object.entries(dayMapping).find(([, eng]) => eng === day)?.[0] || '';

  useEffect(() => {
    if (!originValues?.dailyBreakTimes) return;

    const allBreakNull = originValues.dailyBreakTimes.every(
      (b) => b.breakStartTime === null && b.breakEndTime === null,
    );

    if (allBreakNull) {
      onBreakModeChange('none');
    } else {
      // 모든 휴게시간이 동일한지 확인
      const first = originValues.dailyBreakTimes[0];
      const allSame = originValues.dailyBreakTimes.every(
        (b) => b.breakStartTime === first?.breakStartTime && b.breakEndTime === first.breakEndTime,
      );
      onBreakModeChange(allSame ? 'same_everyday' : 'different_by_day');
    }
  }, [originValues, onBreakModeChange]);

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

    const breakTimes = DAY_OF_WEEK.map((day) => {
      let start: string | null = null;
      let end: string | null = null;

      if (breakMode === 'none') {
        start = null;
        end = null;
      } else if (breakMode === 'same_everyday') {
        // 입력값이 있으면 사용, 없으면 null (빈 문자열도 null)
        start = breakEverydayHours.start[0]?.trim() || null;
        end = breakEverydayHours.end[0]?.trim() || null;
      } else if (breakMode === 'different_by_day') {
        const korDay = mapDayToKor(day);
        const item = korDay ? breakBydayHours[korDay] : undefined;

        if (item && !item.isClosed) {
          // 영업 휴무가 아니면 휴게시간 입력 가능
          start = item.start[0]?.trim() || null;
          end = item.end[0]?.trim() || null;
        }
        // item.isClosed === true 이면 → 영업 휴무 → 휴게시간도 null (자동)
      }

      return { day, start, end };
    });

    const merged = operatingTimes.map((op) => {
      const breakItem = breakTimes.find((b) => b.day === op.dayOfWeek);

      // 영업시간 휴무 처리 (기존 로직 유지)
      const isOperatingClosed = !op.openTime || op.openTime.trim() === '';

      return {
        ...op,
        openTime: isOperatingClosed ? null : op.openTime,
        closeTime: isOperatingClosed ? null : op.closeTime,
        breakStartTime: breakItem?.start ?? null,
        breakEndTime: breakItem?.end ?? null,
      };
    });

    setValue('dailyOperatingTimes', merged);
  }, [
    mode,
    breakMode,
    everydayHours,
    bydayHours,
    breakEverydayHours,
    breakBydayHours,
    setValue,
    originOperating,
  ]);

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
