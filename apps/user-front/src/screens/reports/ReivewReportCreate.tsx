'use client';

import { useEffect } from 'react';

import { CreateReportBody } from '@repo/api/user';
import { toast } from '@repo/design-system/components/b2c';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { ReviewReportForm } from './components/ReviewReportForm';
import { useLoginBottomSheet } from '@/components/Auth/LoginBottomSheet';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useCreateReport } from '@/hooks/report/useCreateReport';

export const ReviewReportCreateScreen: ActivityComponentType<'ReviewReportCreateScreen'> = ({
  params,
}) => {
  const { review, store, type } = params;
  const { mutate: createReport } = useCreateReport(review.reviewId);
  const loginBottomSheet = useLoginBottomSheet();
  const flow = useFlow();

  const { user } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (!isLoggedIn) {
      loginBottomSheet.open();

      if (!loginBottomSheet.isOpen) return flow.pop();
    }
  }, [flow, isLoggedIn, loginBottomSheet]);

  const handleFormSubmit = (formData: CreateReportBody & { reasons: string[] }) => {
    if (!isLoggedIn) return;

    createReport(
      {
        referenceId: review.reviewId,
        reporterId: user.id,
        targetType: type,
        description: `사유: ${formData.reasons.join(', ')}, 상세: ${formData.description}`,
      },
      {
        onSuccess: () => {
          flow.pop();
          toast.success('신고가 완료되었습니다.');
        },
        onError: () => {
          toast.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <Screen header={<Header title='신고하기' left={<Header.Back />} />}>
      <ReviewReportForm handleSubmit={handleFormSubmit} review={review} store={store} />
    </Screen>
  );
};
