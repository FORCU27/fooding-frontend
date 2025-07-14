'use client';

import React, { useState } from 'react';

import { PostStoreWaiting } from '@repo/api/app';
import { storeApi } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { CompleteStep } from './components/CompleteStep';
import { FoodImage } from './components/FoodImage';
import { MainContent } from './components/MainContent';
import ModalContent from './components/registerWating';
import { WatingLogo } from './components/WatingLogo';
import { Step, WaitingRegisterData } from './types';
import FullScreenPanel from '@/components/FullScreenPanel';
import Modal from '@/components/Modal';
import { useStore } from '@/components/Provider/StoreClientProvider';
import TermsAgreement from '@/components/TermsAgreement';
import { useGetStoreWaitingOverview } from '@/hooks/store/useGetStoreWaitingOverview';

export default function WaitingPage() {
  const { storeId } = useStore();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [completeData, setCompleteData] = useState<PostStoreWaiting | null>(null);

  const { mutate: submitWaiting, data: mutationResponse } = useMutation({
    mutationFn: (formData: WaitingRegisterData) =>
      storeApi.createStoreWaiting({ body: formData }, storeId),
    onSuccess: (data) => {
      console.log('data', data);
      setCompleteData(data.data);
      resetFormData();
      setIsModalOpen(false);
      setOpenComplete(true);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.app.store.waitingOverview, storeId],
      });
    },
    onError: (error) => {
      console.error('웨이팅 등록 실패:', error);
      setError('웨이팅 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const { data: waitingOverview } = useGetStoreWaitingOverview(storeId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const [formData, setFormData] = useState<WaitingRegisterData>({
    name: '',
    phoneNumber: '010-',
    termsAgreed: false,
    privacyPolicyAgreed: false,
    thirdPartyAgreed: false,
    marketingConsent: false,
    infantChairCount: 0,
    infantCount: 0,
    adultCount: 0,
  });

  const [step, setStep] = useState<Step>('phone');

  const STEPS = ['phone', 'member', 'name'] as const;

  const handleNextStep = () => {
    const currentIndex = STEPS.indexOf(step);
    const nextStep = STEPS[currentIndex + 1];
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = STEPS.indexOf(step);
    const prevStep = STEPS[currentIndex - 1];
    if (prevStep) {
      setStep(prevStep);
    }
  };

  const updateFormData = <K extends keyof WaitingRegisterData>(
    key: K,
    value: WaitingRegisterData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFormData = () => {
    setStep('phone');
    setFormData({
      name: '',
      phoneNumber: '010-',
      termsAgreed: false,
      privacyPolicyAgreed: false,
      thirdPartyAgreed: false,
      marketingConsent: false,
      infantChairCount: 0,
      infantCount: 0,
      adultCount: 0,
    });
  };

  const handleSubmitWaiting = () => {
    setError(null);
    submitWaiting(formData);
  };

  const onClickAllTerms = () => {
    updateFormData('termsAgreed', !formData.termsAgreed);
    updateFormData('privacyPolicyAgreed', !formData.privacyPolicyAgreed);
    updateFormData('thirdPartyAgreed', !formData.thirdPartyAgreed);
    updateFormData('marketingConsent', !formData.marketingConsent);
  };

  return (
    <div className='flex h-screen border-l-20 border-primary-pink bg-primary-pink relative'>
      <div className='flex-[2] bg-white p-16 relative'>
        <MainContent onClick={() => setIsModalOpen(true)} waitingOverview={waitingOverview} />
      </div>
      <div className='flex-1 bg-primary-pink relative'>
        <WatingLogo />
      </div>
      <div className='absolute bottom-20 right-20'>
        <FoodImage />
      </div>
      <Modal
        open={isModalOpen}
        backBtn={step !== 'phone'}
        backFn={() => handlePrevStep()}
        onClose={() => {
          setIsModalOpen(false);
          resetFormData();
          setError(null);
        }}
      >
        <ModalContent
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onClickTerms={() => setOpenTerms(true)}
          onClickComplete={handleSubmitWaiting}
          onClickAllTerms={onClickAllTerms}
          error={error}
        />
      </Modal>
      {openTerms && (
        <FullScreenPanel isOpen={openTerms}>
          <TermsAgreement
            formData={formData}
            onClose={() => setOpenTerms(false)}
            updateFormData={(value) => {
              updateFormData('termsAgreed', value.termsAgreed);
              updateFormData('privacyPolicyAgreed', value.privacyPolicyAgreed);
              updateFormData('thirdPartyAgreed', value.thirdPartyAgreed);
              updateFormData('marketingConsent', value.marketingConsent);
            }}
          />
        </FullScreenPanel>
      )}
      {openComplete && completeData && (
        <CompleteStep
          onClose={() => {
            setOpenComplete(false);
            setIsModalOpen(false);
            resetFormData();
            setStep('phone');
          }}
          waitingList={completeData}
          currentWaiting={mutationResponse?.data}
        />
      )}
    </div>
  );
}
