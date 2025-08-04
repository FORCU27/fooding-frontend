'use client';

import { ChangeEvent, PropsWithoutRef, useState } from 'react';

import { AuthUpdateUserBody, AuthUpdateUserProfileImageBody } from '@repo/api/auth';
import { BottomSheetSelect, Button, TextField } from '@repo/design-system/components/b2c';
import { useFlow } from '@stackflow/react/future';
import { Controller, useForm } from 'react-hook-form';

import { Header } from '@/components/Layout/Header';
import { useAuth } from '@/components/Provider/AuthProvider';

export interface ProfileFormProps {
  editOriginValue?: AuthUpdateUserBody & AuthUpdateUserProfileImageBody;
  handleSubmit: (data: AuthUpdateUserBody & { imageFile?: File | null }) => void;
}

export const ProfileUserInfoForm = ({
  editOriginValue,
  handleSubmit,
}: PropsWithoutRef<ProfileFormProps>) => {
  const { user } = useAuth();
  const flow = useFlow();

  const [nickname, setNickname] = useState(editOriginValue?.nickname ?? '');
  const [phoneNumber, setPhoneNumber] = useState(editOriginValue?.phoneNumber ?? '');

  const GENDER = [
    { value: 'MALE', label: '남성' },
    { value: 'FEMALE', label: '여성' },
    { value: 'NONE', label: '선택안함' },
  ] as const;

  const {
    register,
    control,
    formState: { errors },
    handleSubmit: onSubmit,
  } = useForm<{
    nickname: string;
    description: string;
    phoneNumber: string;
    gender: string;
    referralCode: string;
    imageId: string;
  }>({
    mode: 'onSubmit',
    defaultValues: {
      nickname: editOriginValue?.nickname || '',
      description: editOriginValue?.description ?? '',
      phoneNumber: editOriginValue?.phoneNumber || '',
      gender: editOriginValue?.gender || '',
      referralCode: editOriginValue?.referralCode || '',
    },
  });

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const onFormSubmit = (data: {
    nickname: string;
    description: string;
    phoneNumber: string;
    gender: string;
    referralCode: string;
    imageId: string;
  }) => {
    handleSubmit({
      ...data,
    });
  };

  return (
    <div className='flex flex-col p-grid-margin'>
      <Header
        left={<Header.Back />}
        title={`내 정보 ${user?.phoneNumber !== null ? '수정 ' : '입력 '}`}
      />
      <div className='flex flex-col mt-[60px]'>
        <p className='mt-8 body-1'>리워드, 웨이팅, 예약에 사용될</p>
        <p className='body-1'>정보를 알려주세요!</p>
      </div>
      <form onSubmit={onSubmit(onFormSubmit)} className='flex flex-col gap-4 mt-8'>
        <TextField label={<TextField.Label>이름</TextField.Label>}>
          <TextField.Input
            {...register('nickname')} //TODO: DB 수정 후 name으로 변경
            value={nickname}
            onChange={handleNicknameChange}
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
            onChange={handlePhoneNumberChange}
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

        <Button type='submit'>{user?.phoneNumber !== null ? '저장' : '다음'}</Button>
      </form>
    </div>
  );
};
