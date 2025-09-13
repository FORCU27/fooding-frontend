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
  onModeChange: Dispatch<SetStateAction<OperatingMode>>;
  onBreakModeChange: Dispatch<SetStateAction<BreakMode>>;
};

export const BusinessHourForm = ({
  setValue,
  mode,
  breakMode,
  onModeChange,
  onBreakModeChange,
}: BusinessHourFormProps) => {
  const [everydayHours, setEverydayHours] = useState({ start: '09:00', end: '22:00' });

  const [bydayHours, setBydayHours] = useState<HoursByDay>(
    Object.fromEntries(
      daysOfWeekKor.map((day) => [day, { start: '09:00', end: '22:00', isClosed: false }]),
    ) as HoursByDay,
  );

  const [breakEverydayHours, setBreakEverydayHours] = useState({ start: '13:00', end: '17:00' });
  const [breakBydayHours, setBreakBydayHours] = useState<HoursByDay>(
    Object.fromEntries(
      daysOfWeekKor.map((day) => [day, { start: '13:00', end: '17:00', isClosed: false }]),
    ) as HoursByDay,
  );

  useEffect(() => {
    const times = DAY_OF_WEEK.map((day) => {
      // 영업시간
      let openTime = '';
      let closeTime = '';

      if (mode === 'same_everyday') {
        openTime = everydayHours.start;
        closeTime = everydayHours.end;
      } else if (mode === 'different_by_day') {
        const korDay = Object.entries(dayMapping).find(([, eng]) => eng === day)?.[0];
        if (korDay) {
          openTime = bydayHours[korDay]?.start || '';
          closeTime = bydayHours[korDay]?.end || '';
        }
      } else if (mode === 'open_24h') {
        openTime = '00:00';
        closeTime = '24:00';
      }

      // 휴게시간
      let breakStartTime = '';
      let breakEndTime = '';
      if (breakMode === 'same_everyday') {
        breakStartTime = breakEverydayHours.start;
        breakEndTime = breakEverydayHours.end;
      } else if (breakMode === 'different_by_day') {
        const korDay = Object.entries(dayMapping).find(([, eng]) => eng === day)?.[0];
        if (korDay) {
          breakStartTime = breakBydayHours[korDay]?.start || '';
          breakEndTime = breakBydayHours[korDay]?.end || '';
        }
      } else if (breakMode === 'none') {
        breakStartTime = '';
        breakEndTime = '';
      }

      return { dayOfWeek: day, openTime, closeTime, breakStartTime, breakEndTime };
    });

    setValue('dailyOperatingTimes', times);
  }, [mode, everydayHours, bydayHours, breakMode, breakEverydayHours, breakBydayHours, setValue]);

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
            BreakMode={breakMode}
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
