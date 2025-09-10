'use client';

import { StoreOperatingHourBody } from '@repo/api/ceo';

import { OperatingHoursForm } from './components/OperatingHourForm';
import { useCreateStoreOperatingHour } from '@/hooks/store/useCreateStoreOperatingHour';
import { useGetStore } from '@/hooks/store/useGetStore';

const SeatGuidePage = () => {
  const { data: store, isLoading } = useGetStore(15);
  const { mutate } = useCreateStoreOperatingHour();

  const handleFormSubmit = (formData: StoreOperatingHourBody) => {
    // mutate(
    //   { id: 15, body: formData },
    //   {
    //     onSuccess: () => {
    //       alert('저장되었습니다.');
    //     },
    //     onError: () => {
    //       alert('저장에 실패했습니다.');
    //     },
    //   },
    // );

    console.log('formData', formData);
  };

  return (
    <div>
      <h1>영업 시간/휴무일</h1>
      <OperatingHoursForm handleSubmit={handleFormSubmit} />
    </div>
  );
};

export default SeatGuidePage;
