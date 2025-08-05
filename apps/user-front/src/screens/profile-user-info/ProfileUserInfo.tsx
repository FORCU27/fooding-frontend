/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Suspense } from 'react';

import {
  AuthUpdateUserBody,
  UpdateProfileErrorCode,
  UpdateProfileErrorMessages,
  UpdateProfileErrorResponse,
} from '@repo/api/auth';
import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

import { ProfileUserInfoForm } from './components/ProfileUserInfoForm';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useUpdateUserInfo } from '@/hooks/auth/useUpdateUserInfo';
import { useUpdateUserProfileImage } from '@/hooks/auth/useUpdateUserProfileImage';
import { useUploadFile } from '@/hooks/file/useUploadFile';

export const ProfileUserInfoScreen: ActivityComponentType<'ProfileUserInfoScreen'> = ({
  params,
}: {
  params: any; //TODO: 추후 타입 수정
}) => {
  const flow = useFlow();

  const { user } = useAuth();
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { mutateAsync: uploadImageFile } = useUploadFile();
  const { mutateAsync: updateUserProfileImage } = useUpdateUserProfileImage();

  const handleFormSubmit = async (
    formData: AuthUpdateUserBody & { imageFile?: File | null },
    utils: { setError: UseFormSetError<any> },
  ) => {
    try {
      const profileInfo: AuthUpdateUserBody = {
        name: formData.name === '' ? null : formData.name,
        nickname: params.nickname === '' ? null : params.nickname,
        phoneNumber: formData.phoneNumber === '' ? null : formData.phoneNumber,
        description: params.description === '' ? null : params.description,
        gender: formData.gender === '' ? 'NONE' : formData.gender,
        referralCode: formData.referralCode === '' ? null : formData.referralCode,
      };

      await updateUserInfo(profileInfo);

      if (params.imageFile) {
        const formDataToUpload = new FormData();
        formDataToUpload.append('files', params.imageFile);

        try {
          const uploadResult = await uploadImageFile(formDataToUpload);

          await updateUserProfileImage({
            imageId: uploadResult.data[0]?.id || '',
          });
        } catch (error) {
          console.error('uploadImageFile 에러:', error);
        }
      }

      if (user.phoneNumber || user.name === null)
        return flow.push('ProfileCompleteScreen', { userName: formData.name || '' });

      return flow.pop();
    } catch (error) {
      console.error('프로필 수정 실패:', error);

      if (isAxiosError<UpdateProfileErrorResponse>(error)) {
        if (error.response?.data.code === UpdateProfileErrorCode.PHONE_NUMBER_ALREADY_EXISTS) {
          utils.setError('phoneNumber', {
            type: 'server',
            message: UpdateProfileErrorMessages[error.response.data.code],
          });
        }
      }
    }
  };

  const editOriginValue: AuthUpdateUserBody = {
    name: user.name ?? '',
    nickname: user.nickname ?? '',
    description: user.description ?? '',
    phoneNumber: user.phoneNumber ?? '',
    gender: user.gender ?? '',
    referralCode: user.referralCode ?? '',
  };

  return (
    <Screen>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={ProfileErrorFallback} onReset={reset}>
            <Suspense>
              <ProfileUserInfoForm
                handleSubmit={handleFormSubmit}
                editOriginValue={editOriginValue}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Screen>
  );
};

const ProfileErrorFallback = ({ reset }: ErrorBoundaryFallbackProps) => {
  return (
    <ErrorFallback className='flex-1'>
      <ErrorFallback.Title>내 정보를 불러오지 못했어요.</ErrorFallback.Title>
      <ErrorFallback.Actions>
        <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
      </ErrorFallback.Actions>
    </ErrorFallback>
  );
};
