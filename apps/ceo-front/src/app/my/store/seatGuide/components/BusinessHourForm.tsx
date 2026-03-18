import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DAY_OF_WEEK, StoreOperatingHourBody } from '@repo/api/ceo';
import {
  Card,
  CardSubtitle,
  BusinessHours,
  BreakHoursByDay,
  OperatingMode,
  BreakHours,
  BreakMode,
  EverydayBreak,
} from '@repo/design-system/components/ceo';
import { UseFormSetValue } from 'react-hook-form';

import { FormDailyBreakTime, OperatingHoursFormValues } from './OperatingHourForm';

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
  breakMode: externalBreakMode,
  originValues,
  onModeChange,
  onBreakModeChange,
}: BusinessHourFormProps) => {
  const toHHmm = (time?: string | null) => (time ? time.slice(0, 5) : '');

  // 초기값
  const originOperating = originValues?.dailyOperatingTimes;

  const defaultBydayOperating: BreakHoursByDay = Object.fromEntries(
    daysOfWeekKor.map((day) => {
      const eng = dayMapping[day];
      const op = originOperating?.find((d) => d.dayOfWeek === eng);
      const closed = !op || !op.openTime || !op.closeTime;
      return [
        day,
        {
          start: closed ? '' : toHHmm(op!.openTime),
          end: closed ? '' : toHHmm(op!.closeTime),
          isClosed: closed,
        },
      ];
    }),
  );
  const [bydayHours, setBydayHours] = useState<BreakHoursByDay>(defaultBydayOperating);

  const determineBreakMode = (bk: StoreOperatingHourBody['dailyBreakTimes'] = []): BreakMode => {
    if (bk.length === 0) return 'none';

    if (bk.length > 7) return 'same_everyday';

    const allNull = bk.every((item) => !item.breakStartTime && !item.breakEndTime);
    if (allNull) return 'none';

    const firstValid = bk.find((item) => item.breakStartTime && item.breakEndTime);
    if (!firstValid) return 'none';

    const isSameEveryday = bk.every(
      (item) =>
        (!item.breakStartTime && !item.breakEndTime) ||
        (item.breakStartTime === firstValid.breakStartTime &&
          item.breakEndTime === firstValid.breakEndTime),
    );

    return isSameEveryday ? 'same_everyday' : 'different_by_day';
  };

  const [internalBreakMode, setInternalBreakMode] = useState<BreakMode>(
    () => externalBreakMode ?? determineBreakMode(originValues?.dailyBreakTimes),
  );

  const currentBreakMode = externalBreakMode ?? internalBreakMode;

  // 매일 같아요용 (여러 시간대 지원)
  const [everydayBreaks, setEverydayBreaks] = useState<EverydayBreak[]>(() => {
    const bk = originValues?.dailyBreakTimes ?? [];
    if (bk.length === 0) return [{ start: '15:00', end: '17:00' }];

    const uniqueMap = new Map<string, EverydayBreak>();
    bk.forEach((item) => {
      if (item.breakStartTime && item.breakEndTime) {
        const start = toHHmm(item.breakStartTime);
        const end = toHHmm(item.breakEndTime);
        const key = `${start}-${end}`;
        if (!uniqueMap.has(key)) uniqueMap.set(key, { start, end });
      }
    });

    const sorted = Array.from(uniqueMap.values()).sort((a, b) => a.start.localeCompare(b.start));
    return sorted.length > 0 ? sorted : [{ start: '15:00', end: '17:00' }];
  });

  // 요일별 휴게시간
  const [bydayBreaks, setBydayBreaks] = useState<BreakHoursByDay>(() => {
    const initial: BreakHoursByDay = {};
    daysOfWeekKor.forEach((day) => {
      const eng = dayMapping[day];
      const bk = originValues?.dailyBreakTimes?.find((d) => d.dayOfWeek === eng);
      const isClosed = !bk || !bk.breakStartTime || !bk.breakEndTime;

      initial[day] = {
        start: isClosed ? '' : toHHmm(bk?.breakStartTime),
        end: isClosed ? '' : toHHmm(bk?.breakEndTime),
        isClosed,
      };
    });
    return initial;
  });

  const mapDayToKor = (day: string) =>
    Object.entries(dayMapping).find(([, eng]) => eng === day)?.[0] ?? '';

  // form 반영
  useEffect(() => {
    // 운영시간 세팅
    const operatingTimes = DAY_OF_WEEK.map((day) => {
      let openTime: string | null = null;
      let closeTime: string | null = null;

      if (mode === 'same_everyday') {
        openTime = bydayHours[mapDayToKor(day)!]?.start || null;
        closeTime = bydayHours[mapDayToKor(day)!]?.end || null;
      }

      if (mode === 'different_by_day') {
        const kor = mapDayToKor(day);
        const item = kor && bydayHours[kor];
        if (item && !item.isClosed) {
          openTime = item.start || null;
          closeTime = item.end || null;
        }
      }

      if (mode === 'open_24h') {
        openTime = '00:00';
        closeTime = '24:00';
      }

      return { dayOfWeek: day, openTime, closeTime };
    });

    setValue('dailyOperatingTimes', operatingTimes);
  }, [bydayHours, everydayBreaks, mode, setValue]);

  useEffect(() => {
    const breakTimes: FormDailyBreakTime[] = [];

    if (currentBreakMode === 'none') {
      DAY_OF_WEEK.forEach((dayOfWeek) => {
        breakTimes.push({
          dayOfWeek,
          breakStartTime: null,
          breakEndTime: null,
        });
      });
    } else if (currentBreakMode === 'same_everyday') {
      everydayBreaks.forEach((brk) => {
        DAY_OF_WEEK.forEach((dayOfWeek) => {
          breakTimes.push({
            dayOfWeek,
            breakStartTime: brk.start ? `${brk.start}:00` : null,
            breakEndTime: brk.end ? `${brk.end}:00` : null,
          });
        });
      });
    } else if (currentBreakMode === 'different_by_day') {
      DAY_OF_WEEK.forEach((dayOfWeek) => {
        const kor = mapDayToKor(dayOfWeek);
        const item = bydayBreaks[kor];

        const existing = originValues?.dailyBreakTimes?.find((b) => b.dayOfWeek === dayOfWeek);

        breakTimes.push({
          id: existing?.id,
          dayOfWeek,
          breakStartTime:
            item && !item.isClosed && item.start && item.end ? `${item.start}:00` : null,
          breakEndTime: item && !item.isClosed && item.start && item.end ? `${item.end}:00` : null,
        });
      });
    }

    setValue('dailyBreakTimes', breakTimes);
  }, [currentBreakMode, everydayBreaks, bydayBreaks, originValues, setValue]);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Card>
        <CardSubtitle label='영업 시간을 알려주세요'>
          <BusinessHours
            mode={mode}
            name='operatingMode'
            bydayHours={bydayHours}
            onModeChange={onModeChange}
            onBydayHoursChange={setBydayHours}
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='휴게 시간을 알려주세요'>
          <BreakHours
            breakMode={currentBreakMode}
            name='breakMode'
            hasAddButton={currentBreakMode === 'same_everyday'}
            everydayBreaks={everydayBreaks}
            bydayBreaks={bydayBreaks}
            originValues={originValues}
            onBreakModeChange={(newMode) => {
              setInternalBreakMode(newMode);
              onBreakModeChange(newMode);
            }}
            onEverydayBreaksChange={setEverydayBreaks}
            onBydayBreaksChange={setBydayBreaks}
          />
        </CardSubtitle>
      </Card>
    </div>
  );
};
