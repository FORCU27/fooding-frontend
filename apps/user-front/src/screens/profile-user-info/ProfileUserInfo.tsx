'use client';

import { Suspense } from 'react';

import { AuthUpdateUserBody, AuthUpdateUserProfileImageBody } from '@repo/api/auth';
import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { ProfileUserInfoForm } from './components/ProfileUserInfoForm';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useUpdateUserInfo } from '@/hooks/auth/useUpdateUserInfo';
import { useUpdateUserProfileImage } from '@/hooks/auth/useUpdateUserProfileImage';
import { useUploadFile } from '@/hooks/file/useUploadFile';

export const ProfileUserInfoScreen: ActivityComponentType<'ProfileUserInfoScreen'> = () => {
  const { user } = useAuth();
  const flow = useFlow();

  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { mutateAsync: uploadImageFile } = useUploadFile();
  const { mutateAsync: updateUserProfileImage } = useUpdateUserProfileImage();

  const handleFormSubmit = async (formData: AuthUpdateUserBody & { imageFile?: File | null }) => {
    try {
      const profileInfo: AuthUpdateUserBody = {
        nickname: formData.nickname === '' ? null : formData.nickname,
        phoneNumber: formData.phoneNumber === '' ? null : formData.phoneNumber,
        description: formData.description === '' ? null : formData.description,
        gender: formData.gender === '' ? 'NONE' : formData.gender,
        referralCode: formData.referralCode === '' ? null : formData.referralCode,
      };

      await updateUserInfo(profileInfo);

      if (formData.imageFile) {
        const formDataToUpload = new FormData();
        formDataToUpload.append('files', formData.imageFile);

        try {
          const uploadResult = await uploadImageFile(formDataToUpload);
          console.log('uploadResult', uploadResult);
          await updateUserProfileImage({
            imageId: uploadResult.data[0]?.id ? uploadResult.data[0]?.id : '',
          });
        } catch (error) {
          console.error('uploadImageFile 에러:', error);
        }
      }

      if (user?.phoneNumber === null) return flow.push('ProfileCompleteScreen', {});

      return flow.pop();
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    }
  };

  const editOriginValue: AuthUpdateUserBody & AuthUpdateUserProfileImageBody = {
    nickname: user?.nickname ?? '',
    description: user?.description ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    gender: user?.gender ?? '',
    referralCode: user?.referralCode ?? '',
    imageId: user?.profileImage ?? '',
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
