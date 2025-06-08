'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { GetWaitingDetailResponse } from '@repo/api/app';
import { storeApi, userApi } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { CompleteStep } from './components/CompleteStep';
import ModalContent from './components/registerWating';
import { Step, WaitingRegisterData } from './types';
import Button from '@/components/Button';
import FullScreenPanel from '@/components/FullScreenPanel';
import Modal from '@/components/Modal';
import { useStore } from '@/components/Provider/StoreClientProvider';
import TermsAgreement from '@/components/TermsAgreement';

const Logo = () => (
  <div className='absolute top-10 right-20'>
    <svg
      width='204'
      height='48'
      viewBox='0 0 204 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M24.3517 31.1388C24.3517 33.7136 23.812 36.1843 22.8212 38.4725C23.8694 38.9546 25.0375 39.2256 26.2682 39.2256C27.9657 39.2256 29.5406 38.7122 30.8521 37.834C32.6122 36.6534 33.4309 34.4694 32.9251 32.4132C31.6266 27.154 29.4154 22.2544 26.469 17.8891C24.5629 15.0615 20.5422 14.6028 18.0756 16.9587C18.0599 16.9718 18.0469 16.9874 18.0312 17.0004C21.9659 20.782 24.3491 25.7258 24.3491 31.1388H24.3517Z'
        stroke='white'
        strokeWidth='3'
        strokeMiterlimit='10'
      />
      <path
        d='M22.8239 38.4642C23.8122 36.176 24.3545 33.7054 24.3545 31.1305C24.3545 25.7176 21.9713 20.7737 18.0366 16.9922C14.102 20.7737 11.7188 25.7176 11.7188 31.1305C11.7188 33.7054 12.2585 36.176 13.2493 38.4642C14.6 39.4311 16.2505 39.9992 18.0366 39.9992C19.8227 39.9992 21.4759 39.4285 22.8239 38.4642Z'
        stroke='white'
        strokeWidth='3'
        strokeMiterlimit='10'
      />
      <path
        d='M18.0399 17.0004C18.0242 16.9874 18.0112 16.9718 17.9955 16.9587C15.5315 14.6028 11.5108 15.0615 9.60213 17.8891C6.65831 22.2544 4.44718 27.154 3.14866 32.4132C2.64021 34.4694 3.46156 36.6534 5.22159 37.834C6.53315 38.7122 8.10805 39.2256 9.80551 39.2256C11.0362 39.2256 12.2044 38.9546 13.2526 38.4698C12.2643 36.1817 11.722 33.7136 11.722 31.1388C11.722 25.7258 14.1052 20.782 18.0399 17.0004Z'
        stroke='white'
        strokeWidth='3'
        strokeMiterlimit='10'
      />
      <path
        d='M18.0388 10.937C21.059 10.937 23.5073 8.48868 23.5073 5.46851C23.5073 2.44833 21.059 0 18.0388 0C15.0186 0 12.5703 2.44833 12.5703 5.46851C12.5703 8.48868 15.0186 10.937 18.0388 10.937Z'
        fill='white'
      />
      <path
        d='M54.9965 17.926H50.8212V36H44.711V17.926H42V13.1901H44.711V12.038C44.711 9.24006 45.5432 7.18109 47.2077 5.86106C48.8722 4.54439 51.383 3.92636 54.7401 4.00698V8.86387C53.2758 8.837 52.2574 9.06876 51.685 9.56251C51.1091 10.0563 50.8247 10.9497 50.8247 12.2395V13.1867H55V17.9227L54.9965 17.926Z'
        fill='white'
      />
      <path
        d='M62.7681 35.5111C60.9714 34.5185 59.5594 33.1118 58.5356 31.2944C57.5119 29.4769 57 27.3788 57 25C57 22.6212 57.5256 20.5265 58.5803 18.7056C59.6316 16.8882 61.071 15.4815 62.8952 14.4889C64.7194 13.4963 66.7532 13 69 13C71.2468 13 73.2806 13.4963 75.1048 14.4889C76.929 15.4815 78.3684 16.8882 79.4197 18.7056C80.4709 20.5231 81 22.6212 81 25C81 27.3788 80.4606 29.4735 79.3785 31.2944C78.2963 33.1118 76.8362 34.5185 74.9983 35.5111C73.1603 36.5037 71.1025 37 68.8282 37C66.554 37 64.5614 36.5037 62.7647 35.5111H62.7681ZM71.8411 31.1061C72.7824 30.5893 73.5313 29.8123 74.0948 28.7787C74.6547 27.745 74.9364 26.4855 74.9364 25.0034C74.9364 22.7958 74.3524 21.0947 73.1878 19.907C72.0232 18.7193 70.5975 18.1238 68.9141 18.1238C67.2307 18.1238 65.8188 18.7193 64.6816 19.907C63.5445 21.0947 62.9777 22.7958 62.9777 25.0034C62.9777 27.2111 63.5308 28.9122 64.6404 30.0998C65.7501 31.2875 67.1449 31.8831 68.8317 31.8831C69.8967 31.8831 70.9032 31.6264 71.8411 31.1061Z'
        fill='white'
      />
      <path
        d='M89.7681 35.5111C87.9714 34.5185 86.5594 33.1118 85.5356 31.2944C84.5119 29.4769 84 27.3788 84 25C84 22.6212 84.5256 20.5265 85.5803 18.7056C86.6316 16.8882 88.071 15.4815 89.8952 14.4889C91.7194 13.4963 93.7532 13 96 13C98.2468 13 100.281 13.4963 102.105 14.4889C103.929 15.4815 105.368 16.8882 106.42 18.7056C107.471 20.5231 108 22.6212 108 25C108 27.3788 107.461 29.4735 106.378 31.2944C105.296 33.1118 103.836 34.5185 101.998 35.5111C100.16 36.5037 98.1025 37 95.8282 37C93.554 37 91.5614 36.5037 89.7647 35.5111H89.7681ZM98.8411 31.1061C99.7824 30.5893 100.531 29.8123 101.095 28.7787C101.655 27.745 101.936 26.4855 101.936 25.0034C101.936 22.7958 101.352 21.0947 100.188 19.907C99.0232 18.7193 97.5975 18.1238 95.9141 18.1238C94.2307 18.1238 92.8188 18.7193 91.6816 19.907C90.5445 21.0947 89.9777 22.7958 89.9777 25.0034C89.9777 27.2111 90.5308 28.9122 91.6404 30.0998C92.7501 31.2875 94.1449 31.8831 95.8317 31.8831C96.8967 31.8831 97.9032 31.6264 98.8411 31.1061Z'
        fill='white'
      />
      <path
        d='M111.398 18.9133C112.328 17.1202 113.597 15.739 115.202 14.7732C116.811 13.8074 118.6 13.3245 120.568 13.3245C122.064 13.3245 123.493 13.6487 124.851 14.2971C126.208 14.9454 127.291 15.8065 128.095 16.8838V6H134V36.6285H128.095V33.2347C127.372 34.366 126.361 35.2778 125.058 35.9667C123.755 36.6556 122.244 37 120.524 37C118.583 37 116.808 36.5036 115.199 35.5108C113.591 34.518 112.321 33.1166 111.395 31.3099C110.465 29.5033 110 27.4265 110 25.0795C110 22.7326 110.465 20.7064 111.395 18.9133H111.398ZM127.308 21.5405C126.751 20.5342 126.005 19.7609 125.061 19.224C124.118 18.687 123.106 18.4169 122.024 18.4169C120.941 18.4169 119.943 18.6803 119.031 19.2037C118.114 19.7271 117.374 20.4937 116.804 21.5C116.234 22.5063 115.952 23.7017 115.952 25.0795C115.952 26.4573 116.238 27.6662 116.804 28.7029C117.371 29.7363 118.121 30.5298 119.051 31.0837C119.981 31.6375 120.972 31.911 122.024 31.911C123.076 31.911 124.118 31.6409 125.061 31.1039C126.005 30.567 126.751 29.7937 127.308 28.7874C127.861 27.781 128.139 26.5721 128.139 25.1639C128.139 23.7558 127.861 22.5502 127.308 21.5439V21.5405Z'
        fill='white'
      />
      <path d='M146 14V37H140V14H146Z' fill='white' />
      <path
        d='M171.457 15.5548C173.15 17.2614 174 19.6425 174 22.6983V36H168.166V23.4731C168.166 21.673 167.707 20.2871 166.792 19.3186C165.875 18.3501 164.627 17.8658 163.042 17.8658C161.458 17.8658 160.159 18.3501 159.231 19.3186C158.3 20.2871 157.834 21.673 157.834 23.4731V36H152V13.3239H157.834V16.1493C158.613 15.1674 159.605 14.396 160.812 13.8382C162.019 13.2805 163.348 13 164.793 13C167.544 13 169.764 13.8516 171.46 15.5582L171.457 15.5548Z'
        fill='white'
      />
      <path
        d='M193.059 14.0181C194.362 14.7013 195.387 15.5896 196.137 16.6759V13.369H202V36.7365C202 38.8853 201.569 40.8053 200.711 42.4929C199.852 44.1806 198.563 45.5232 196.842 46.5139C195.122 47.5046 193.042 48 190.602 48C187.331 48 184.647 47.2313 182.554 45.6974C180.46 44.1601 179.276 42.0693 178.998 39.4148H184.78C185.085 40.4739 185.743 41.3211 186.754 41.9497C187.766 42.5783 188.994 42.8926 190.436 42.8926C192.126 42.8926 193.5 42.3836 194.552 41.3655C195.607 40.3475 196.133 38.8033 196.133 36.7399V33.1391C195.383 34.2289 194.352 35.1342 193.035 35.8619C191.719 36.5861 190.212 36.9517 188.522 36.9517C186.581 36.9517 184.807 36.4495 183.198 35.4451C181.59 34.4407 180.321 33.0229 179.395 31.1952C178.465 29.3675 178 27.2665 178 24.8921C178 22.5178 178.465 20.468 179.395 18.654C180.324 16.8399 181.583 15.4427 183.178 14.4656C184.773 13.4885 186.554 13 188.522 13C190.239 13 191.753 13.3416 193.056 14.0249L193.059 14.0181ZM195.305 21.305C194.749 20.287 194.002 19.5046 193.059 18.9614C192.116 18.4183 191.104 18.1449 190.022 18.1449C188.94 18.1449 187.942 18.4114 187.026 18.9409C186.11 19.4705 185.37 20.246 184.8 21.264C184.23 22.2821 183.948 23.4915 183.948 24.8853C183.948 26.2792 184.233 27.5022 184.8 28.551C185.367 29.5964 186.116 30.3992 187.046 30.9595C187.976 31.5198 188.967 31.7965 190.019 31.7965C191.071 31.7965 192.112 31.5232 193.056 30.98C193.999 30.4368 194.745 29.6545 195.302 28.6364C195.855 27.6183 196.133 26.3953 196.133 24.9707C196.133 23.5461 195.855 22.3265 195.302 21.3084L195.305 21.305Z'
        fill='white'
      />
      <path
        d='M139.996 9.99701C139.332 9.32836 139 8.49602 139 7.5C139 6.50398 139.332 5.67164 139.996 5.00298C140.66 4.33433 141.494 4 142.5 4C143.506 4 144.336 4.33433 145.004 5.00298C145.668 5.67164 146 6.50398 146 7.5C146 8.49602 145.668 9.32836 145.004 9.99701C144.34 10.6657 143.503 11 142.5 11C141.497 11 140.66 10.6657 139.996 9.99701Z'
        fill='white'
      />
    </svg>
  </div>
);

const StoreName = () => (
  <div className='space-y-2'>
    <div className='headline-3-1'>어서오세요</div>
    <div>
      <p className='headline-1'>
        민서네 김밥 짱 홍대점<span className='headline-2-1'> 입니다</span>
      </p>
    </div>
  </div>
);

const WaitingInfo = () => (
  <div className='subtitle-4-2 text-gray-5 mt-8'>
    <p>휴대폰 번호를 입력하시면</p>
    <p>카카오톡으로 실시간 웨이팅 현황을 알려드려요</p>
  </div>
);

const WaitingStats = ({ list }: { list: GetWaitingDetailResponse[] }) => (
  <div className='flex flex-row mt-12'>
    <div className='w-[250px] flex flex-col items-center'>
      <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>현재 웨이팅</h3>
      <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
        {list?.length}
        <span className='text-3xl ml-2'>팀</span>
      </p>
    </div>
    <div className='w-[250px] border-l border-dark flex flex-col items-center'>
      <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>예상시간</h3>
      <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
        {list?.length * 1}
        <span className='text-3xl ml-2'>분</span>
      </p>
    </div>
  </div>
);

const ActionButtons = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='flex gap-4 mt-12'>
      <Button size='sm' variant='default' onClick={onClick}>
        바로 줄서기
      </Button>
      <button className='px-8 py-4 subtitle-2-2 text-gray-5 rounded-full bg-background-primary  border-3 border-gray-3'>
        웨이팅 목록
      </button>
    </div>
  );
};

const MainContent = ({
  onClick,
  list,
}: {
  onClick: () => void;
  list?: GetWaitingDetailResponse[];
}) => (
  <div className='flex-1 max-w-4xl'>
    <StoreName />
    <WaitingInfo />
    <WaitingStats list={list || []} />
    <ActionButtons onClick={onClick} />
  </div>
);

const FoodImage = () => (
  <div className='absolute bottom-0 right-0 w-[600px]'>
    <Image
      src='/images/wating/wating-three-food.png'
      alt='음식 이미지'
      width={600}
      height={400}
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

export default function WaitingPage() {
  const { storeId } = useStore();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { mutate: submitWaiting, data: mutationResponse } = useMutation({
    mutationFn: (formData: WaitingRegisterData) =>
      storeApi.createStoreWaiting(formData, Number(storeId)),
    onSuccess: () => {
      resetFormData();
      setIsModalOpen(false);
      setOpenComplete(true);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.app.store.waiting, storeId, 'WAITING'],
      });
    },
    onError: (error) => {
      console.error('웨이팅 등록 실패:', error);
      setError('웨이팅 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const { data: waitingResponse } = useQuery({
    queryKey: [queryKeys.app.store.waiting, storeId, 'WAITING'],
    queryFn: () => storeApi.getStoreWaiting({ id: Number(storeId), status: 'WAITING' }),
  });

  const waitingList = waitingResponse?.data?.list || [];

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
        <MainContent onClick={() => setIsModalOpen(true)} list={waitingList} />
      </div>
      <div className='flex-1 bg-primary-pink relative'>
        <Logo />
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
      {openComplete && (
        <CompleteStep
          onClose={() => {
            setOpenComplete(false);
            setIsModalOpen(false);
            resetFormData();
            setStep('phone');
          }}
          waitingList={waitingResponse?.data?.list || []}
          currentWaiting={mutationResponse?.data}
        />
      )}
    </div>
  );
}
