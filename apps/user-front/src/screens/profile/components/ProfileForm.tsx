'use client';

import Image from 'next/image';
import { ChangeEvent, PropsWithoutRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AuthUpdateUserBody, AuthUpdateUserProfileImageBody } from '@repo/api/auth';
import { Button, TextField } from '@repo/design-system/components/b2c';
import { FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';
import { Controller, useForm } from 'react-hook-form';
import z, { isValid } from 'zod';

import { Header } from '@/components/Layout/Header';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useGetUserNicknameCheck } from '@/hooks/auth/useGetUserNicknameCheck';

const formSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.').regex(/^\S+$/, '공백 없이 입력해주세요.'),
  description: z.string().max(150, '최대 150자까지 입력 가능합니다.'),
  imageId: z.string(),
  imageFile: z.instanceof(File).nullable().optional(),
  isNicknameChecked: z.boolean().refine((val) => val, '닉네임 중복 확인이 필요합니다.'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export interface ProfileFormProps {
  isUpdateMode: boolean;
  editOriginValue: AuthUpdateUserBody & AuthUpdateUserProfileImageBody;
  handleSubmit: (data: AuthUpdateUserBody & { imageFile: File | null }) => void;
}

export const ProfileForm = ({
  editOriginValue,
  handleSubmit,
  isUpdateMode,
}: PropsWithoutRef<ProfileFormProps>) => {
  const { user } = useAuth();
  assert(user, '로그인이 필요합니다.');

  const flow = useFlow();

  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profileImage ?? editOriginValue.imageId ?? null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nicknameToCheck, setNicknameToCheck] = useState(editOriginValue.nickname || '');
  const [hasNicknameCheckClicked, setHasNicknameCheckClicked] = useState(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);

  const { data: nicknameCheckData, refetch: checkNickname } =
    useGetUserNicknameCheck(nicknameToCheck);

  const maxLength = 150;

  const {
    control,
    setValue,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: editOriginValue.nickname || '',
      description: editOriginValue.description || '',
      isNicknameChecked: editOriginValue.nickname === user.nickname,
      imageId: editOriginValue.imageId || '',
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setPreviewImage(
      file ? URL.createObjectURL(file) : (user.profileImage ?? editOriginValue.imageId ?? null),
    );
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNicknameToCheck(newNickname);
    setIsNicknameChanged(newNickname !== user.nickname);
    setHasNicknameCheckClicked(false);
    setValue('isNicknameChecked', newNickname === user.nickname);
  };

  const handleNicknameCheck = async () => {
    setHasNicknameCheckClicked(true);

    const nickname = getValues('nickname');
    if (!nickname || nickname === user.nickname) {
      setValue('isNicknameChecked', true);
      return;
    }

    const { data } = await checkNickname();
    const isAvailable = !data?.isDuplicated;

    setValue('isNicknameChecked', isAvailable);
  };

  const onFormSubmit = (data: FormSchemaType) => {
    handleSubmit({
      ...data,
      imageFile: selectedFile,
      name: editOriginValue.name ? editOriginValue.name : null,
      phoneNumber: editOriginValue.phoneNumber ? editOriginValue.phoneNumber : null,
      referralCode: editOriginValue.referralCode ? editOriginValue.referralCode : null,
      gender: editOriginValue.gender ? editOriginValue.gender : 'NONE',
    });
  };

  return (
    <div className='flex flex-col p-grid-margin min-h-screen'>
      <Header left={<Header.Back />} title={`프로필 ${isUpdateMode ? '수정 ' : '입력 '}`} />

      <form onSubmit={onSubmit(onFormSubmit)} className='flex flex-col mt-[60px] h-full'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-center'>
              <div className='relative'>
                <div className='size-[120px] rounded-full overflow-hidden'>
                  <div className='w-full h-full'>
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt='Profile preview'
                        className='w-full h-full object-cover'
                        width={120}
                        height={120}
                      />
                    ) : (
                      <div className='size-[120px] bg-gray-2 flex justify-center items-center text-[#111111]/10'>
                        <FoodingIcon />
                      </div>
                    )}
                  </div>
                </div>
                <div className='absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white border border-gray-2 flex justify-center items-center z-10'>
                  <input
                    type='file'
                    accept='image/png, image/jpg, image/jpeg'
                    className='absolute inset-0 opacity-0 cursor-pointer'
                    onChange={handleImageChange}
                  />
                  <CameraIcon />
                </div>
              </div>
            </div>
            <div className='flex justify-between gap-3'>
              <Controller
                name='nickname'
                control={control}
                render={({ field }) => {
                  const isError =
                    !!errors.nickname ||
                    (hasNicknameCheckClicked &&
                      nicknameCheckData?.isDuplicated &&
                      nicknameToCheck !== user.nickname);

                  const isSuccess =
                    hasNicknameCheckClicked &&
                    nicknameCheckData &&
                    !nicknameCheckData.isDuplicated &&
                    nicknameToCheck !== user.nickname;

                  return (
                    <div className='flex flex-col w-full'>
                      <TextField
                        label={<TextField.Label className='text-gray-500'>닉네임</TextField.Label>}
                        error={isError}
                        errorMessage={
                          <TextField.ErrorMessage>
                            {errors.nickname?.message || '이미 사용 중인 닉네임입니다.'}
                          </TextField.ErrorMessage>
                        }
                        success={isSuccess}
                        successMessage={
                          <TextField.SuccessMessage>
                            사용 가능한 닉네임입니다.
                          </TextField.SuccessMessage>
                        }
                      >
                        <TextField.Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleNicknameChange(e);
                          }}
                          placeholder='닉네임을 입력하세요'
                        />
                      </TextField>
                    </div>
                  );
                }}
              />
              <Button
                size='large'
                className='w-1/4 mt-7'
                onClick={handleNicknameCheck}
                disabled={!isNicknameChanged}
              >
                중복확인
              </Button>
            </div>

            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <div className='relative w-full mt-4'>
                  <TextField
                    label={
                      <TextField.Label className='text-gray-500'>
                        자신을 소개해주세요.
                      </TextField.Label>
                    }
                    error={!!errors.description}
                    errorMessage={errors.description?.message}
                  >
                    <TextField.Textarea
                      {...field}
                      maxLength={maxLength}
                      placeholder='사람들에게 나를 간단하게 소개해보세요!'
                      className='resize-none'
                    />
                  </TextField>
                  <div className='text-right text-gray-500 text-sm mt-2'>
                    {field.value?.length || 0}/150
                  </div>
                </div>
              )}
            />
          </div>

          <div className='mt-4'>
            {isUpdateMode ? (
              <Button
                type='submit'
                disabled={
                  !isValid ||
                  (isNicknameChanged &&
                    (!hasNicknameCheckClicked || nicknameCheckData?.isDuplicated))
                }
              >
                저장
              </Button>
            ) : (
              <Button
                type='button'
                disabled={
                  !!errors.nickname ||
                  !!errors.description ||
                  (isNicknameChanged &&
                    (nicknameCheckData?.isDuplicated || !hasNicknameCheckClicked))
                }
                onClick={() => {
                  const formValues = getValues();
                  flow.push('ProfileUserInfoScreen', {
                    isUpdateMode: isUpdateMode,
                    nickname: formValues.nickname,
                    description: formValues.description,
                    imageFile: selectedFile,
                    gender: editOriginValue.gender ? editOriginValue.gender : 'NONE',
                    phoneNumber: editOriginValue.phoneNumber ? editOriginValue.phoneNumber : null,
                    referralCode: editOriginValue.referralCode
                      ? editOriginValue.referralCode
                      : null,
                  });
                }}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

const CameraIcon = () => {
  return (
    <svg width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1 8.04851C1 7.66131 1 7.46772 1.01608 7.30465C1.17116 5.73193 2.4094 4.48777 3.97463 4.33195C4.13692 4.31579 4.33999 4.31579 4.74614 4.31579C4.90264 4.31579 4.98089 4.31579 5.04732 4.31175C5.89567 4.26012 6.63855 3.72213 6.95556 2.92979C6.98039 2.86774 7.00359 2.79779 7.05 2.65789C7.09641 2.518 7.11961 2.44805 7.14444 2.386C7.46145 1.59366 8.20433 1.05567 9.05268 1.00404C9.11911 1 9.19249 1 9.33925 1H14.6607C14.8075 1 14.8809 1 14.9473 1.00404C15.7957 1.05567 16.5385 1.59366 16.8556 2.386C16.8804 2.44805 16.9036 2.518 16.95 2.65789C16.9964 2.79779 17.0196 2.86774 17.0444 2.92979C17.3615 3.72213 18.1043 4.26012 18.9527 4.31175C19.0191 4.31579 19.0974 4.31579 19.2539 4.31579C19.66 4.31579 19.8631 4.31579 20.0254 4.33195C21.5906 4.48777 22.8288 5.73193 22.9839 7.30465C23 7.46772 23 7.66131 23 8.04851V16.6947C23 18.5518 23 19.4803 22.6403 20.1895C22.3239 20.8135 21.8191 21.3207 21.1982 21.6386C20.4923 22 19.5682 22 17.72 22H6.28C4.43183 22 3.50774 22 2.80183 21.6386C2.1809 21.3207 1.67606 20.8135 1.35968 20.1895C1 19.4803 1 18.5518 1 16.6947V8.04851Z'
        fill='#767676'
      />
      <path
        d='M12 17.0263C14.4301 17.0263 16.4 15.0469 16.4 12.6053C16.4 10.1636 14.4301 8.18421 12 8.18421C9.56995 8.18421 7.6 10.1636 7.6 12.6053C7.6 15.0469 9.56995 17.0263 12 17.0263Z'
        fill='#767676'
      />
      <path
        d='M1 8.04851C1 7.66131 1 7.46772 1.01608 7.30465C1.17116 5.73193 2.4094 4.48777 3.97463 4.33195C4.13692 4.31579 4.33999 4.31579 4.74614 4.31579C4.90264 4.31579 4.98089 4.31579 5.04732 4.31175C5.89567 4.26012 6.63855 3.72213 6.95556 2.92979C6.98039 2.86774 7.00359 2.79779 7.05 2.65789C7.09641 2.518 7.11961 2.44805 7.14444 2.386C7.46145 1.59366 8.20433 1.05567 9.05268 1.00404C9.11911 1 9.19249 1 9.33925 1H14.6607C14.8075 1 14.8809 1 14.9473 1.00404C15.7957 1.05567 16.5385 1.59366 16.8556 2.386C16.8804 2.44805 16.9036 2.518 16.95 2.65789C16.9964 2.79779 17.0196 2.86774 17.0444 2.92979C17.3615 3.72213 18.1043 4.26012 18.9527 4.31175C19.0191 4.31579 19.0974 4.31579 19.2539 4.31579C19.66 4.31579 19.8631 4.31579 20.0254 4.33195C21.5906 4.48777 22.8288 5.73193 22.9839 7.30465C23 7.46772 23 7.66131 23 8.04851V16.6947C23 18.5518 23 19.4803 22.6403 20.1895C22.3239 20.8135 21.8191 21.3207 21.1982 21.6386C20.4923 22 19.5682 22 17.72 22H6.28C4.43183 22 3.50774 22 2.80183 21.6386C2.1809 21.3207 1.67606 20.8135 1.35968 20.1895C1 19.4803 1 18.5518 1 16.6947V8.04851Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 17.0263C14.4301 17.0263 16.4 15.0469 16.4 12.6053C16.4 10.1636 14.4301 8.18421 12 8.18421C9.56995 8.18421 7.6 10.1636 7.6 12.6053C7.6 15.0469 9.56995 17.0263 12 17.0263Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
