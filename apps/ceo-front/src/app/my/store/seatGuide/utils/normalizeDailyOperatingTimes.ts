import { DailyOperatingTime } from '@repo/api/ceo';

export const normalizeDailyOperatingTimes = (times: DailyOperatingTime[]): DailyOperatingTime[] => {
  return times.map((item) => {
    const isClosed = item.openTime == null && item.closeTime == null;

    if (isClosed) {
      return {
        ...item,
        breakStartTime: null,
        breakEndTime: null,
      };
    }

    return item;
  });
};
