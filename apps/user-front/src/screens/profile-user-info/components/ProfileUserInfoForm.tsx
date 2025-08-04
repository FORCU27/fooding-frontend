'use client';

import { PropsWithoutRef } from 'react';

import { AuthUpdateUserBody, AuthUpdateUserProfileImageBody } from '@repo/api/auth';
import { BottomSheetSelect, Button, TextField } from '@repo/design-system/components/b2c';
import { useFlow } from '@stackflow/react/future';
import { Controller, useForm, UseFormSetError } from 'react-hook-form';

import { Header } from '@/components/Layout/Header';
import { useAuth } from '@/components/Provider/AuthProvider';

export interface ProfileFormProps {
  editOriginValue?: AuthUpdateUserBody & AuthUpdateUserProfileImageBody;
  handleSubmit: (
    data: AuthUpdateUserBody & { imageFile?: File | null },
    utils: { setError: UseFormSetError<any> },
  ) => void;
}

export const ProfileUserInfoForm = ({
  editOriginValue,
  handleSubmit,
}: PropsWithoutRef<ProfileFormProps>) => {
  const { user } = useAuth();
  const flow = useFlow();

  const GENDER = [
    { value: 'MALE', label: '남성' },
    { value: 'FEMALE', label: '여성' },
    { value: 'NONE', label: '선택안함' },
  ] as const;

  const {
    watch,
    register,
    control,
    formState: { errors },
    setError,
    handleSubmit: onSubmit,
  } = useForm<{
    name: string;
    nickname: string;
    description: string;
    phoneNumber: string;
    gender: string;
    referralCode: string;
    imageId: string;
  }>({
    mode: 'onSubmit',
    defaultValues: {
      name: editOriginValue?.name || '',
      nickname: editOriginValue?.nickname || '',
      description: editOriginValue?.description ?? '',
      phoneNumber: editOriginValue?.phoneNumber || '',
      gender: editOriginValue?.gender || '',
      referralCode: editOriginValue?.referralCode || '',
    },
  });

  const name = watch('name');
  const phoneNumber = watch('phoneNumber');

  const onFormSubmit = (data: {
    name: string;
    nickname: string;
    description: string;
    phoneNumber: string;
    gender: string;
    referralCode: string;
    imageId: string;
  }) => {
    handleSubmit(
      {
        ...data,
      },
      { setError },
    );
  };

  return (
    <div className='flex flex-col p-grid-margin min-h-screen'>
      <Header
        left={<Header.Back />}
        title={`내 정보 ${user?.name === null || user?.phoneNumber === null ? '입력' : '수정'}`}
      />
      <div className='flex flex-col mt-[60px]'>
        <p className='mt-8 body-1'>리워드, 웨이팅, 예약에 사용될</p>
        <p className='body-1'>정보를 알려주세요!</p>
      </div>
      <form onSubmit={onSubmit(onFormSubmit)} className='flex flex-col mt-8 h-full'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col gap-4'>
            <TextField label={<TextField.Label>이름</TextField.Label>}>
              <TextField.Input
                {...register('name')}
                value={name}
                onChange={(e) => {
                  register('name').onChange(e);
                }}
              />
            </TextField>
            <TextField
              label={<TextField.Label>휴대폰 번호</TextField.Label>}
              error={!!errors.phoneNumber}
              errorMessage={
                errors.phoneNumber ? (
                  <TextField.ErrorMessage>{errors.phoneNumber.message}</TextField.ErrorMessage>
                ) : undefined
              }
            >
              <TextField.Input
                placeholder='휴대폰 번호를 입력해주세요'
                maxLength={11}
                {...register('phoneNumber', {
                  required: '휴대폰 번호를 입력해주세요.',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                  validate: (value) => !/\s/.test(value) || '공백 없이 입력해주세요.',
                })}
                value={phoneNumber}
                onChange={(e) => {
                  register('phoneNumber').onChange(e);
                }}
              />
            </TextField>
            <Controller
              control={control}
              name='gender'
              render={({ field }) => (
                <BottomSheetSelect
                  placeholder='성별을 선택해주세요.'
                  label='성별'
                  options={GENDER as unknown as { value: string; label: string }[]}
                  value={field.value ?? 'NONE'}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div>
            {user?.name === null || user?.phoneNumber === null ? (
              <div className='w-full flex flex-col justify-between items-center h-[88px]'>
                <a
                  onClick={() => flow.push('HomeTab', {})}
                  className='text-gray-5 body-6'
                >{`다음에 할게요:)`}</a>
                <Button type='submit'>다음</Button>
              </div>
            ) : (
              <Button type='submit'>저장</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
