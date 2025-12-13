'use client';

import { RegularHolidayType, StoreOperatingHourBody } from '@repo/api/ceo';
import { toast } from '@repo/design-system/components/b2c';

import { OperatingHoursForm } from './components/OperatingHourForm';
import { useStore } from '@/context/StoreContext';
import { useCreateStoreOperatingHour } from '@/hooks/store/useCreateStoreOperatingHour';
import { useGetStoreOperatingHour } from '@/hooks/store/useGetStoreOperatingHour';
import { useModifyStoreOperatingHour } from '@/hooks/store/useModifyStoreOperatingHour';

type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

const SeatGuidePage = () => {
  const { storeId } = useStore();
  const { data: storeOperatingHour, isPending } = useGetStoreOperatingHour(Number(storeId));
  const { mutate: createMutate } = useCreateStoreOperatingHour();
  const { mutate: updateMutate } = useModifyStoreOperatingHour();

  const originValues: StoreOperatingHourBody | undefined = storeOperatingHour
    ? {
        hasHoliday: storeOperatingHour.hasHoliday,
        regularHolidayType: storeOperatingHour.regularHolidayType as RegularHolidayType | null,
        regularHoliday: storeOperatingHour.regularHoliday as DayOfWeek | null,
        closedNationalHolidays: storeOperatingHour.closedNationalHolidays ?? [],
        customHolidays: storeOperatingHour.customHolidays ?? [],
        operatingNotes: storeOperatingHour.operatingNotes ?? '',
        dailyOperatingTimes: storeOperatingHour.dailyOperatingTimes.map((item, index) => ({
          id: item.id ?? index + 1,
          dayOfWeek: item.dayOfWeek as DayOfWeek,
          openTime: item.openTime ?? null,
          closeTime: item.closeTime ?? null,
          breakStartTime: item.breakStartTime ?? null,
          breakEndTime: item.breakEndTime ?? null,
        })),
      }
    : undefined;

  const handleFormSubmit = (formData: StoreOperatingHourBody) => {
    if (!storeId || isPending) return;

    const dailyOperatingTimesForServer = formData.dailyOperatingTimes.map((item) => {
      const existing = originValues?.dailyOperatingTimes.find(
        (d) => d.dayOfWeek === item.dayOfWeek,
      );

      return {
        id: existing?.id ?? 0,
        dayOfWeek: item.dayOfWeek as DayOfWeek,
        openTime: item.openTime,
        closeTime: item.closeTime,
        breakStartTime: item.breakStartTime,
        breakEndTime: item.breakEndTime,
      };
    });

    const body = {
      regularHolidayType:
        formData.regularHoliday && formData.regularHoliday.length > 0
          ? formData.regularHolidayType
          : null,
      regularHoliday: formData.regularHoliday ?? originValues?.regularHoliday ?? null,
      closedNationalHolidays:
        formData.closedNationalHolidays ?? originValues?.closedNationalHolidays ?? [],
      customHolidays: formData.customHolidays ?? originValues?.customHolidays ?? [],
      operatingNotes: formData.operatingNotes ?? originValues?.operatingNotes ?? '',
      hasHoliday: formData.hasHoliday ?? originValues?.hasHoliday ?? false,
      dailyOperatingTimes: dailyOperatingTimesForServer,
    };

    if (!storeOperatingHour?.id) {
      createMutate(
        { storeId: Number(storeId), body },
        {
          onSuccess: () => toast.success('저장되었습니다.'),
          onError: () => toast.error('저장에 실패했습니다.'),
        },
      );
      return;
    }

    updateMutate(
      { storeId: Number(storeId), id: storeOperatingHour.id, body },
      {
        onSuccess: () => toast.success('저장되었습니다.'),
        onError: () => toast.error('저장에 실패했습니다.'),
      },
    );
  };

  return (
    <div className='flex flex-col'>
      <h1 className='headline-2 pb-10 px-10'>영업 시간/휴무일</h1>

      <OperatingHoursForm originValues={originValues} handleSubmit={handleFormSubmit} />
    </div>
  );
};

export default SeatGuidePage;
