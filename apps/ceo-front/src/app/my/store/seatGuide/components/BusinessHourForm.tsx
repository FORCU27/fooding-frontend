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
  setValue: UseFormSetValue<StoreOperatingHourBody>;
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
  const defaultEverydayHours = originValues?.dailyOperatingTimes?.[0]
    ? {
        start: originValues.dailyOperatingTimes[0].openTime || '09:00',
        end: originValues.dailyOperatingTimes[0].closeTime || '22:00',
      }
    : { start: '09:00', end: '22:00' };

  const defaultBreakEverydayHours = originValues?.dailyOperatingTimes?.[0]
    ? {
        start: originValues.dailyOperatingTimes[0].breakStartTime || '13:00',
        end: originValues.dailyOperatingTimes[0].breakEndTime || '17:00',
      }
    : { start: '13:00', end: '17:00' };

  const mapDayToKor = (day: string) =>
    Object.entries(dayMapping).find(([, eng]) => eng === day)?.[0] || '';

  const defaultBydayHours: HoursByDay = Object.fromEntries(
    daysOfWeekKor.map((day) => {
      const engDay = dayMapping[day];
      const item = originValues?.dailyOperatingTimes?.find((d) => d.dayOfWeek === engDay);
      return [
        day,
        {
          start: item?.openTime || '09:00',
          end: item?.closeTime || '22:00',
          isClosed: !item || (!item.openTime && !item.closeTime),
        },
      ];
    }),
  ) as HoursByDay;

  const defaultBreakBydayHours: HoursByDay = Object.fromEntries(
    daysOfWeekKor.map((day) => {
      const engDay = dayMapping[day];
      const item = originValues?.dailyOperatingTimes?.find((d) => d.dayOfWeek === engDay);
      return [
        day,
        {
          start: item?.breakStartTime || '13:00',
          end: item?.breakEndTime || '17:00',
          isClosed: !item || (!item.breakStartTime && !item.breakEndTime),
        },
      ];
    }),
  ) as HoursByDay;

  const [everydayHours, setEverydayHours] = useState(defaultEverydayHours);
  const [bydayHours, setBydayHours] = useState<HoursByDay>(defaultBydayHours);
  const [breakEverydayHours, setBreakEverydayHours] = useState(defaultBreakEverydayHours);
  const [breakBydayHours, setBreakBydayHours] = useState<HoursByDay>(defaultBreakBydayHours);

  useEffect(() => {
    const times = DAY_OF_WEEK.map((day) => {
      let openTime = '';
      let closeTime = '';
      let breakStartTime = '';
      let breakEndTime = '';

      const originItem = originValues?.dailyOperatingTimes?.find((d) => d.dayOfWeek === day);

      // 영업시간
      if (mode === 'same_everyday') {
        openTime = everydayHours.start;
        closeTime = everydayHours.end;
      } else if (mode === 'different_by_day') {
        const korDay = mapDayToKor(day);
        if (korDay && bydayHours[korDay]) {
          openTime = bydayHours[korDay].start || '';
          closeTime = bydayHours[korDay].end || '';
        }
      } else if (mode === 'open_24h') {
        openTime = '00:00';
        closeTime = '24:00';
      }

      // 휴게시간
      if (breakMode === 'same_everyday') {
        breakStartTime = breakEverydayHours.start;
        breakEndTime = breakEverydayHours.end;
      } else if (breakMode === 'different_by_day') {
        const korDay = mapDayToKor(day);
        if (korDay && breakBydayHours[korDay]) {
          breakStartTime = breakBydayHours[korDay].start || '';
          breakEndTime = breakBydayHours[korDay].end || '';
        }
      } else if (breakMode === 'none') {
        breakStartTime = '';
        breakEndTime = '';
      }

      return {
        id: originItem?.id ?? 0,
        dayOfWeek: day,
        openTime,
        closeTime,
        breakStartTime,
        breakEndTime,
      };
    });

    setValue('dailyOperatingTimes', times);
  }, [
    mode,
    breakMode,
    everydayHours,
    bydayHours,
    breakEverydayHours,
    breakBydayHours,
    setValue,
    originValues,
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
