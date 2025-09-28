'use client';

import { Suspense } from 'react';

import { AuthUpdateUserBody, AuthUpdateUserProfileImageBody } from '@repo/api/auth';
import { ErrorFallback, toast } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { ProfileForm } from './components/ProfileForm';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useUpdateUserInfo } from '@/hooks/auth/useUpdateUserInfo';
import { useUpdateUserProfileImage } from '@/hooks/auth/useUpdateUserProfileImage';
import { useUploadFile } from '@/hooks/file/useUploadFile';

export const ProfileModifyScreen: ActivityComponentType<'ProfileModifyScreen'> = () => {
  const flow = useFlow();

  const { user } = useAuth();
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { mutateAsync: uploadImageFile } = useUploadFile();
  const { mutateAsync: updateUserProfileImage } = useUpdateUserProfileImage();

  const handleFormSubmit = async (formData: AuthUpdateUserBody & { imageFile: File | null }) => {
    const isFirstProfile = user.nickname === null;

    if (isFirstProfile) {
      flow.push('ProfileUserInfoScreen', { ...formData, isUpdateMode: true });
      return;
    }

    try {
      const profileInfo: AuthUpdateUserBody = {
        name: formData.name === '' ? null : formData.name,
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
          await updateUserProfileImage({
            imageId: uploadResult.data[0]?.id ? uploadResult.data[0]?.id : '',
          });
        } catch {
          toast.error('프로필 이미지 업로드에 실패했어요. 잠시 후 다시 시도해주세요.');
        }
      }

      toast.success('프로필이 수정되었어요.');
    } catch {
      toast.error('프로필 수정에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const editOriginValue: AuthUpdateUserBody & AuthUpdateUserProfileImageBody = {
    name: user.name ?? '',
    nickname: user.nickname ?? '',
    description: user.description ?? '',
    phoneNumber: user.phoneNumber ?? '',
    gender: user.gender ?? '',
    referralCode: user.referralCode ?? '',
    imageId: user.profileImage ?? '',
  };

  return (
    <Screen>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={ProfileErrorFallback} onReset={reset}>
            <Suspense>
              <ProfileForm
                handleSubmit={handleFormSubmit}
                editOriginValue={editOriginValue}
                isUpdateMode={true}
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
      <ErrorFallback.Title>프로필 정보를 불러오지 못했어요.</ErrorFallback.Title>
      <ErrorFallback.Actions>
        <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
      </ErrorFallback.Actions>
    </ErrorFallback>
  );
};
