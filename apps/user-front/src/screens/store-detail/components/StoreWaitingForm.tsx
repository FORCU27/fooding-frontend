import { zodResolver } from '@hookform/resolvers/zod';
import { StoreWaitingBody } from '@repo/api/user';
import { Button, Counter } from '@repo/design-system/components/b2c';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod/v4';

import StoreWaitingAgreementCheckBoxGroup from './StoreWaitingAgreementGroup';

const formSchema = z
  .object({
    infantChairCount: z.number(),
    infantCount: z.number(),
    adultCount: z.number().min(1, '성인은 최소 1명 이상이어야 합니다.'),
    termsAgreed: z.boolean(),
    privacyPolicyAgreed: z.boolean(),
    thirdPartyAgreed: z.boolean(),
  })
  .refine((data) => data.termsAgreed, {
    message: '서비스 이용약관에 동의해주세요.',
    path: ['termsAgreed'],
  })
  .refine((data) => data.privacyPolicyAgreed, {
    message: '개인정보 수집 및 이용약관에 동의해주세요.',
    path: ['privacyPolicyAgreed'],
  })
  .refine((data) => data.thirdPartyAgreed, {
    message: '마케팅 수신 동의가 필요합니다.',
    path: ['thirdPartyAgreed'],
  });

export type StoreWaitingFormData = Omit<StoreWaitingBody, 'storeId'>;

export interface StoreWaitingFormProps {
  storeId: number;
  handleSubmit: (data: StoreWaitingBody) => void;
}

export const StoreWaitingForm = ({ storeId, handleSubmit }: StoreWaitingFormProps) => {
  const {
    control,
    setValue,
    watch,
    handleSubmit: onSubmit,
    formState: { isValid },
  } = useForm<StoreWaitingFormData>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      termsAgreed: false,
      privacyPolicyAgreed: false,
      thirdPartyAgreed: false,
      infantChairCount: 0,
      infantCount: 0,
      adultCount: 1,
    },
  });

  const submitForm = (data: StoreWaitingFormData) => {
    handleSubmit({ ...data, storeId });
  };

  return (
    <form
      onSubmit={onSubmit(submitForm)}
      className='flex flex-col gap-4 items-center w-full text-gray-6'
    >
      <div className='flex justify-between items-center gap-4 w-full'>
        <p className='w-[40%] text-center subtitle-4'>성인</p>
        <Controller
          name='adultCount'
          control={control}
          render={({ field }) => (
            <Counter value={field.value} onChange={field.onChange} className='w-[50%]' />
          )}
        />
      </div>
      <div className='flex justify-between items-center gap-4 w-full'>
        <p className='w-[40%] text-center subtitle-4'>유아</p>
        <Controller
          name='infantCount'
          control={control}
          render={({ field }) => (
            <Counter value={field.value} onChange={field.onChange} className='w-[50%]' />
          )}
        />
      </div>
      <div className='flex justify-between items-center gap-4 w-full'>
        <p className='w-[40%] text-center subtitle-4'>유아 의자</p>
        <Controller
          name='infantChairCount'
          control={control}
          render={({ field }) => (
            <Counter value={field.value} onChange={field.onChange} className='w-[50%]' />
          )}
        />
      </div>

      <StoreWaitingAgreementCheckBoxGroup
        control={control}
        setValue={setValue}
        watch={watch}
        className='px-10 py-1'
      />

      <Button type='submit' disabled={!isValid}>
        줄서기
      </Button>
    </form>
  );
};
