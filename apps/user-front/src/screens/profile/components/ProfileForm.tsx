'use client';

import Image from 'next/image';
import { ChangeEvent, PropsWithoutRef, useMemo, useState } from 'react';

import { AuthUpdateUserBody, AuthUpdateUserProfileImageBody } from '@repo/api/auth';
import { Button, TextField } from '@repo/design-system/components/b2c';
import { FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';
import { useForm } from 'react-hook-form';

import { Header } from '@/components/Layout/Header';
import { useAuth } from '@/components/Provider/AuthProvider';

export interface ProfileFormProps {
  editOriginValue?: AuthUpdateUserBody & AuthUpdateUserProfileImageBody;
  handleSubmit: (data: AuthUpdateUserBody & { imageFile?: File | null }) => void;
}

export const ProfileForm = ({
  editOriginValue,
  handleSubmit,
}: PropsWithoutRef<ProfileFormProps>) => {
  const flow = useFlow();
  const { user } = useAuth();
  const isUpdateMode = useMemo(
    () => !!user && !(user.loginCount === 0 || user.phoneNumber == null),
    [user],
  );

  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.profileImage ?? editOriginValue?.imageId ?? null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const maxLength = 150;

  const {
    watch,
    register,
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

  const nickname = watch('nickname');
  const description = watch('description');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setPreviewImage(
      file ? URL.createObjectURL(file) : (user?.profileImage ?? editOriginValue?.imageId ?? null),
    );
  };

  const onFormSubmit = (data: {
    name: string;
    nickname: string;
    description: string;
    phoneNumber: string;
    gender: string;
    referralCode: string;
    imageId: string;
  }) => {
    handleSubmit({
      ...data,
      imageFile: selectedFile,
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
                <div className='size-[120px] rounded-full overflow-hidden flex'>
                  <div className='bg-gray-2 flex justify-center items-center text-[#111111]/10 w-full h-full'>
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt='Profile preview'
                        className='w-full h-full object-cover'
                        width={120}
                        height={120}
                      />
                    ) : (
                      <FoodingIcon />
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

            <TextField label={<TextField.Label>닉네임</TextField.Label>}>
              <TextField.Input
                {...register('nickname')}
                value={nickname}
                onChange={(e) => {
                  register('nickname').onChange(e);
                }}
              />
            </TextField>
            <TextField label={<TextField.Label>자신을 소개해주세요.</TextField.Label>}>
              <div className='relative w-full p-3'>
                <TextField.Textarea
                  {...register('description')}
                  value={description}
                  onChange={(e) => {
                    register('description').onChange(e);
                  }}
                  maxLength={maxLength}
                  placeholder='사람들에게 나를 간단하게 소개해보세요!'
                  className='resize-none'
                />
                <div className='text-right text-gray-5 text-sm mt-2'>
                  {description?.length ?? 0} / {maxLength}
                </div>
              </div>
            </TextField>
          </div>
          <div>
            {user && editOriginValue?.nickname ? (
              <Button type='submit'>저장</Button>
            ) : (
              <Button
                type='button'
                onClick={() =>
                  flow.push('ProfileUserInfoScreen', {
                    nickname,
                    description,
                    imageId: editOriginValue?.imageId ?? user?.profileImage,
                    gender: user?.gender || 'NONE',
                    phoneNumber: null,
                    referralCode: null,
                  })
                }
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
