'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { B2BRefreshIcon, B2BDeleteIcon } from '@repo/design-system/icons';

import { RewardComplete } from './components/RewardComplete';
import Button from '@/components/Button';

export default function WaitingPage() {
  const [phoneNumber, setPhoneNumber] = useState('010-');

  const updateFormData = (key: string, value: string) => {
    setPhoneNumber(value);
  };

  const PhoneNumberDisplay = ({ phoneNumber }: { phoneNumber: string }) => (
    <div className='flex justify-center'>
      <div className='max-w-xs sm:max-w-sm h-[185px] md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center p-4 rounded-md'>
        <p className='headline-2-2  break-all'>{phoneNumber}</p>
      </div>
    </div>
  );

  // 숫자 패드 컴포넌트
  const NumberPad = ({ onNumberClick }: { onNumberClick: (num: string) => void }) => (
    <div className='grid grid-cols-3  border-t-2 border-b-1 border-gray-2 mb-10'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '←'].map((num, index) => {
        // 오른쪽 끝 열 (3, 6, 9, ←)의 인덱스
        const isLastCol = (index + 1) % 3 === 0;

        return (
          <button
            key={num}
            className={`w-[184px] h-[91px] headline-3-2 border-b ${
              isLastCol ? '' : 'border-r'
            } border-gray-2 flex items-center justify-center`}
            onClick={() => onNumberClick(num.toString())}
          >
            {num === 'C' ? (
              <B2BRefreshIcon size={46} />
            ) : num === '←' ? (
              <B2BDeleteIcon size={46} />
            ) : (
              num
            )}
          </button>
        );
      })}
    </div>
  );

  // usePhoneNumber.ts 파일로 분리하거나 같은 파일 내에 선언
  const usePhoneNumber = (initialValue = '010-') => {
    const handleNumberClick = (num: string) => {
      if (num === 'C') {
        updateFormData('phoneNumber', initialValue);
      } else if (num === '←') {
        if (phoneNumber.length > 4) {
          // 하이픈 바로 뒤의 문자를 삭제할 때 하이픈도 함께 삭제
          if (phoneNumber.charAt(phoneNumber.length - 2) === '-' && phoneNumber.length > 5) {
            updateFormData('phoneNumber', phoneNumber.slice(0, -2));
          } else {
            updateFormData('phoneNumber', phoneNumber.slice(0, -1));
          }
        }
      } else if (phoneNumber.length < 13) {
        if (phoneNumber.length === 8) {
          updateFormData('phoneNumber', phoneNumber + '-' + num);
        } else {
          updateFormData('phoneNumber', phoneNumber + num);
        }
      }
    };

    const isPhoneNumberComplete = phoneNumber.length >= 13;

    return {
      handleNumberClick,
      isPhoneNumberComplete,
    };
  };

  const { handleNumberClick, isPhoneNumberComplete } = usePhoneNumber(phoneNumber);

  const [isRewardComplete, setIsRewardComplete] = useState(false);

  return (
    <>
      <div className='flex w-full h-screen overflow-hidden border-l-20 border-primary-pink px-[80px] py-[60px] gap-[65px]'>
        {/* 왼쪽 영역 (5/10) */}
        <div className='w-[50%] h-full bg-white '>
          <div className='h-full flex flex-col'>
            {/* 왼쪽 컨텐츠 */}{' '}
            <Image src='/images/fooding-logo.png' alt='logo' width={204} height={48} />
            <div className='body-2 text-gray-5 mt-[112px]'>
              마일리지 적립 링크를 전달 받으시기 위해
            </div>
            <div className='headline-3-2 text-black whitespace-nowrap mt-5 mb-15'>
              휴대폰 번호를 입력해주세요
            </div>
            <Button size='sm' variant='secondary'>
              리워드 사용하기
            </Button>
          </div>
        </div>

        {/* 오른쪽 영역 (5/10) */}
        <div className='w-[50%] h-full bg-white'>
          <div className='h-full flex flex-col'>
            <div className='flex flex-col items-center justify-center h-full'>
              <PhoneNumberDisplay phoneNumber={phoneNumber} />
              <NumberPad onNumberClick={handleNumberClick} />
              <Button
                variant={isPhoneNumberComplete ? 'default' : 'disabled'}
                onClick={() => setIsRewardComplete(true)}
              >
                적립하기
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isRewardComplete && <RewardComplete onClose={() => setIsRewardComplete(false)} />}
    </>
  );
}
