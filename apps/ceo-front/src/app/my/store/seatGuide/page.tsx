'use client';

import { StoreOperatingHourBody } from '@repo/api/ceo';
import { toast } from '@repo/design-system/components/b2c';

import { OperatingHoursForm } from './components/OperatingHourForm';
import { useStore } from '@/context/StoreContext';
import { useCreateStoreOperatingHour } from '@/hooks/store/useCreateStoreOperatingHour';

const SeatGuidePage = () => {
  const { mutate } = useCreateStoreOperatingHour();
  const { storeId } = useStore();

  const handleFormSubmit = (formData: StoreOperatingHourBody) => {
    mutate(
      { id: Number(storeId), body: formData },
      {
        onSuccess: () => {
          toast.success('저장되었습니다.');
        },
        onError: () => {
          toast.error('저장에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className='flex flex-col'>
      <h1 className='headline-2 pb-10 px-10'>영업 시간/휴무일</h1>
      <OperatingHoursForm handleSubmit={handleFormSubmit} />
    </div>
  );
};

export default SeatGuidePage;
