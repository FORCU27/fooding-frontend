/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormDailyOperatingTime } from '../components/OperatingHourForm';

export const normalizeDailyOperatingTimes = (
  times: FormDailyOperatingTime[],
): FormDailyOperatingTime[] => {
  return times.map((item) => {
    const isClosed = !item.openTime || !item.closeTime;

    return {
      ...item,
      // 휴무일이면 breakStartTime/breakEndTime는 null
      breakStartTime: isClosed ? null : ((item as any).breakStartTime ?? null),
      breakEndTime: isClosed ? null : ((item as any).breakEndTime ?? null),
    };
  });
};
