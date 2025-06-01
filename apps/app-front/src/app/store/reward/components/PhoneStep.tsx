import { B2BCheckBoxIcon, B2BRefreshIcon, B2BDeleteIcon } from '@repo/design-system/icons';

import Button from '@/components/Button';

export function PhoneStep({ formData, updateFormData, onNext, onPrev, onClickTerms }: StepProps) {
  const { phoneNumber, termsAgreed, privacyPolicyAgreed, thirdPartyAgreed } = formData;

  // 필수 약관 3개가 모두 체크되었는지 확인
  const isAllRequiredTermsAgreed = termsAgreed && privacyPolicyAgreed && thirdPartyAgreed;

  // 전화번호 표시 컴포넌트

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
          fill={isAllRequiredTermsAgreed ? 'var(--color-primary-pink)' : 'var(--color-gray-5)'}
        />
        <div
          className='text-gray-5 body-2-2 underline-offset-2 underline cursor-pointer'
          onClick={onClickTerms}
        >
          이용 약관 모두 동의하기
        </div>
      </div>
      <Button
        size='md'
        variant={isPhoneNumberComplete && isAllRequiredTermsAgreed ? 'default' : 'disabled'}
        className=''
        onClick={onNext}
      >
        다음
      </Button>
    </div>
  );
}
