'use client';

import { DayOfWeek, RegularHolidayType, StoreOperatingHourBody } from '@repo/api/ceo';
import { ProgressCircle, toast, Toaster } from '@repo/design-system/components/b2c';

import { OperatingHoursForm } from './components/OperatingHourForm';
import { useStore } from '@/context/StoreContext';
import { useCreateStoreOperatingHour } from '@/hooks/store/useCreateStoreOperatingHour';
import { useGetStoreOperatingHour } from '@/hooks/store/useGetStoreOperatingHour';
import { useModifyStoreOperatingHour } from '@/hooks/store/useModifyStoreOperatingHour';

const SeatGuidePage = () => {
  const { storeId } = useStore();
  const { data: storeOperatingHour, isPending } = useGetStoreOperatingHour(Number(storeId));
  const { mutate: createMutate } = useCreateStoreOperatingHour();
  const { mutate: updateMutate } = useModifyStoreOperatingHour();

  if (isPending) {
    return (
      <div className='w-full min-h-[400px] flex justify-center items-center'>
        <ProgressCircle />
      </div>
    );
  }

  const originValues: StoreOperatingHourBody | undefined = storeOperatingHour && {
    hasHoliday: storeOperatingHour.hasHoliday,
    regularHolidayType: storeOperatingHour.regularHolidayType as RegularHolidayType | null,
    regularHoliday: storeOperatingHour.regularHoliday as DayOfWeek | null,
    closedNationalHolidays: storeOperatingHour.closedNationalHolidays ?? [],
    customHolidays: storeOperatingHour.customHolidays ?? [],
    operatingNotes: storeOperatingHour.operatingNotes ?? '',

    dailyOperatingTimes:
      storeOperatingHour.dailyOperatingTimes?.map((b) => ({
        id: b.id,
        dayOfWeek: b.dayOfWeek as DayOfWeek,
        openTime: b.openTime,
        closeTime: b.closeTime,
      })) ?? [],

    dailyBreakTimes:
      storeOperatingHour.dailyBreakTimes?.map((b) => ({
        id: b.id ?? undefined,
        dayOfWeek: b.dayOfWeek as DayOfWeek,
        breakStartTime: b.breakStartTime,
        breakEndTime: b.breakEndTime,
      })) ?? [],
  };

  const handleFormSubmit = (formData: StoreOperatingHourBody) => {
    if (!storeId || isPending) return;
    const dailyOperatingTimes = formData.dailyOperatingTimes.map((item) => ({
      id: item.id,
      dayOfWeek: item.dayOfWeek,
      openTime: item.openTime ? item.openTime : null,
      closeTime: item.closeTime ? item.closeTime : null,
    }));

    const breakTimesToUpdate = formData.dailyBreakTimes
      .filter((item) => item.id != null) // id 있는 것 → update
      .map((item) => ({
        id: item.id!,
        dayOfWeek: item.dayOfWeek,
        breakStartTime: item.breakStartTime ? item.breakStartTime : null,
        breakEndTime: item.breakEndTime ? item.breakEndTime : null,
      }));

    const breakTimesToCreate = formData.dailyBreakTimes
      .filter((item) => item.id == null) // id 없는 것 → create
      .map((item) => ({
        dayOfWeek: item.dayOfWeek,
        breakStartTime: item.breakStartTime ? item.breakStartTime : null,
        breakEndTime: item.breakEndTime ? item.breakEndTime : null,
      }));

    const body: StoreOperatingHourBody = {
      hasHoliday: formData.hasHoliday,
      regularHolidayType: formData.hasHoliday ? formData.regularHolidayType : null,
      regularHoliday: formData.hasHoliday ? formData.regularHoliday : null,
      closedNationalHolidays: formData.closedNationalHolidays,
      customHolidays: formData.customHolidays,
      operatingNotes: formData.operatingNotes,

      dailyOperatingTimes,
      dailyBreakTimes: [...breakTimesToUpdate, ...breakTimesToCreate],
    };

    const isCreate = storeOperatingHour?.id == null;

    if (isCreate) {
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
        onSuccess: () => toast.success('수정되었습니다.'),
        onError: () => toast.error('수정에 실패했습니다.'),
      },
    );
  };

  return (
    <div className='flex flex-col'>
      <h1 className='headline-2 pb-10 px-10'>영업 시간/휴무일</h1>

      <OperatingHoursForm originValues={originValues} handleSubmit={handleFormSubmit} />
      <Toaster />
    </div>
  );
};

export default SeatGuidePage;
