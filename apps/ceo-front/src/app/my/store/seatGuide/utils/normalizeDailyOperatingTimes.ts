import { FormDailyOperatingTime } from '../components/OperatingHourForm';

export const normalizeDailyOperatingTimes = (
  times: FormDailyOperatingTime[],
): FormDailyOperatingTime[] => {
  return times.map((item) => {
    return {
      ...item,
    };
  });
};
