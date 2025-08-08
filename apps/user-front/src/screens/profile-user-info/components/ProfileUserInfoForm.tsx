/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PropsWithoutRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AuthUpdateUserBody } from '@repo/api/auth';
import {
  BottomSheet,
  BottomSheetSelect,
  Button,
  TextField,
} from '@repo/design-system/components/b2c';
import { useFlow } from '@stackflow/react/future';
import { Controller, useForm, UseFormSetError } from 'react-hook-form';
import z from 'zod/v4';

import { Header } from '@/components/Layout/Header';
import { useAuth } from '@/components/Provider/AuthProvider';

const formSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.').regex(/^\S+$/, '공백 없이 입력해주세요.'),
  description: z.string().max(150, '최대 150자까지 입력 가능합니다.'),
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .regex(/^[a-zA-Z가-힣]+$/, '이름은 문자(한글 또는 영어)만 입력 가능합니다.'),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, '숫자만 입력 가능합니다.')
    .regex(/^\S*$/, '공백 없이 입력해주세요.'),
  gender: z.string(),
  referralCode: z.string(),
  imageFile: z.instanceof(File).nullable().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;
export interface ProfileFormProps {
  editOriginValue: AuthUpdateUserBody;
  handleSubmit: (
    data: AuthUpdateUserBody & { imageFile?: File | null },
    utils: { setError: UseFormSetError<any> },
  ) => void;
}

export const ProfileUserInfoForm = ({
  editOriginValue,
  handleSubmit,
}: PropsWithoutRef<ProfileFormProps>) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { user } = useAuth();
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const flow = useFlow();

  const GENDER = [
    { value: 'MALE', label: '남성' },
    { value: 'FEMALE', label: '여성' },
    { value: 'NONE', label: '선택안함' },
  ] as const;

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: editOriginValue.nickname || '',
      description: editOriginValue.description || '',
      name: editOriginValue.name || '',
      phoneNumber: editOriginValue.phoneNumber || '',
      gender: editOriginValue.gender || 'NONE',
      referralCode: editOriginValue.referralCode || '',
    },
  });

  const onFormSubmit = (data: FormSchemaType) => {
    handleSubmit(
      {
        ...data,
        nickname: data.nickname ? data.nickname : null,
        description: data.description ? data.description : null,
        imageFile: data.imageFile ? data.imageFile : null,
      },
      { setError },
    );

    setIsBottomSheetOpen(false);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-****-$3');
  };

  const handleSaveClick = async () => {
    setIsBottomSheetOpen(true);
  };

  return (
    <div className='flex flex-col p-grid-margin min-h-screen'>
      <Header
        left={<Header.Back />}
        title={`내 정보 ${user.name === null || user.phoneNumber === null ? '입력' : '수정'}`}
      />
      <div className='flex flex-col mt-[60px]'>
        <p className='mt-8 body-1'>리워드, 웨이팅, 예약에 사용될</p>
        <p className='body-1'>정보를 알려주세요!</p>
      </div>
      <form onSubmit={onSubmit(onFormSubmit)} className='flex flex-col mt-8 h-full'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col gap-4'>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={<TextField.Label>이름</TextField.Label>}
                  error={!!errors.name}
                  errorMessage={
                    <TextField.ErrorMessage>
                      {errors.name?.message || '이름을 입력해주세요'}
                    </TextField.ErrorMessage>
                  }
                >
                  <TextField.Input placeholder='이름을 입력해주세요' {...field} />
                </TextField>
              )}
            />
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
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
                    {...field}
                  />
                </TextField>
              )}
            />
            <Controller
              control={control}
              name='gender'
              render={({ field }) => (
                <BottomSheetSelect
                  placeholder='성별을 선택해주세요.'
                  label='성별'
                  options={GENDER}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div>
            {user.name === null || user.phoneNumber === null ? (
              <div className='w-full flex flex-col justify-between items-center h-[88px]'>
                <a onClick={() => flow.push('HomeTab', {})} className='text-gray-5 body-6'>
                  {`다음에 할게요  :)`}
                </a>
                <Button
                  type='button'
                  disabled={!!errors.name || !!errors.phoneNumber}
                  onClick={handleSaveClick}
                >
                  다음
                </Button>
              </div>
            ) : (
              <Button
                type='button'
                disabled={!!errors.name || !!errors.phoneNumber}
                onClick={handleSaveClick}
              >
                저장
              </Button>
            )}
            <BottomSheet isOpen={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
              <BottomSheet.Content>
                <BottomSheet.Header>
                  <BottomSheet.Title className='headline-3'>
                    안전한 이용을 위해
                    <br /> 본인인증을 진행해 주세요
                  </BottomSheet.Title>
                  <BottomSheet.Description className='h-[72px] bg-gray-1 rounded-xl mt-10 flex justify-center items-center body-1'>
                    <span>
                      {errors.phoneNumber
                        ? errors.phoneNumber.message
                        : user.phoneNumber && formatPhoneNumber(watch('phoneNumber') || '')}
                    </span>
                  </BottomSheet.Description>
                </BottomSheet.Header>
                <BottomSheet.Body>
                  <Button
                    size='large'
                    type='submit'
                    disabled={!!errors.name || !!errors.phoneNumber}
                    onClick={onSubmit(onFormSubmit)}
                  >
                    본인인증하러 가기
                  </Button>
                </BottomSheet.Body>
                <BottomSheet.Footer>
                  <a
                    onClick={() => setIsBottomSheetOpen(false)}
                    className='text-gray-5 body-6 w-full text-center'
                  >
                    휴대폰 번호를 바꿀래요
                  </a>
                </BottomSheet.Footer>
              </BottomSheet.Content>
            </BottomSheet>
          </div>
        </div>
      </form>
    </div>
  );
};
