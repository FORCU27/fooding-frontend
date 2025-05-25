import { useState } from 'react';

import {
  B2BCheckBoxIcon,
  B2BRefreshIcon,
  ArrowLeftIcon,
  B2BDeleteIcon,
} from '@repo/design-system/icons';

import { WaitingRegisterData, UpdateWaitingRegisterData, StepProps } from '../types';
import Button from '@/components/Button';

export function PhoneStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const { phoneNumber } = formData;
  // 전화번호 표시 컴포넌트
  const PhoneNumberDisplay = ({ phoneNumber }: { phoneNumber: string }) => (
    <div className='flex justify-center'>
      <div className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center p-4 rounded-md'>
        <p className='headline-2-2  break-all'>{phoneNumber}</p>
      </div>
    </div>
  );

  // 숫자 패드 컴포넌트
  const NumberPad = ({ onNumberClick }: { onNumberClick: (num: string) => void }) => (
    <div className='grid grid-cols-3  border-t-2 border-b-1 border-gray-2'>
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

  const { handleNumberClick, isPhoneNumberComplete } = usePhoneNumber();

  return (
    <div className='flex flex-col items-center'>
      <PhoneNumberDisplay phoneNumber={phoneNumber} />
      <h2 className='body-3 text-gray-5 mb-[30px]'>
        실시간 웨이팅 안내를 받을 수 있는 번호를 발송해주세요
      </h2>
      <NumberPad onNumberClick={handleNumberClick} />
      <div className='flex items-center gap-2 mt-[15px] mb-[25px]'>
        <B2BCheckBoxIcon
          fill={isPhoneNumberComplete ? 'var(--color-primary-pink)' : 'var(--color-gray-5)'}
        />
        <div className='text-gray-5 text-body-1  underline-offset-2 underlines'>
          이용 약관 모두 동의하기
        </div>
      </div>
      <Button
        size='md'
        variant={isPhoneNumberComplete ? 'default' : 'disabled'}
        className=''
        onClick={onNext}
      >
        다음
      </Button>
    </div>
  );
}
