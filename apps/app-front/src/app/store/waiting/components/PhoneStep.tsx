import { useState } from 'react';

import Button from '@/components/Button';

export function PhoneStep() {
  // 전화번호 표시 컴포넌트
  const PhoneNumberDisplay = ({ phoneNumber }: { phoneNumber: string }) => (
    <div className='flex justify-center'>
      <div className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center p-4 rounded-md'>
        <p className='text-[60px] font-bold text-gray-800 break-all'>{phoneNumber}</p>
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
            className={`w-[184px] h-[91px] border-b ${
              isLastCol ? '' : 'border-r'
            } border-gray-2 text-3xl`}
            onClick={() => onNumberClick(num.toString())}
          >
            {num}
          </button>
        );
      })}
    </div>
  );

  // usePhoneNumber.ts 파일로 분리하거나 같은 파일 내에 선언
  const usePhoneNumber = (initialValue = '010-') => {
    const [phoneNumber, setPhoneNumber] = useState(initialValue);

    const handleNumberClick = (num: string) => {
      if (num === 'C') {
        setPhoneNumber(initialValue);
      } else if (num === '←') {
        if (phoneNumber.length > 4) {
          // 하이픈 바로 뒤의 문자를 삭제할 때 하이픈도 함께 삭제
          if (phoneNumber.charAt(phoneNumber.length - 2) === '-' && phoneNumber.length > 5) {
            setPhoneNumber((prev) => prev.slice(0, -2));
          } else {
            setPhoneNumber((prev) => prev.slice(0, -1));
          }
        }
      } else if (phoneNumber.length < 13) {
        if (phoneNumber.length === 8) {
          setPhoneNumber((prev) => prev + '-' + num);
        } else {
          setPhoneNumber((prev) => prev + num);
        }
      }
    };

    const isPhoneNumberComplete = phoneNumber.length >= 13;

    return {
      phoneNumber,
      handleNumberClick,
      isPhoneNumberComplete,
    };
  };

  const { phoneNumber, handleNumberClick, isPhoneNumberComplete } = usePhoneNumber();

  return (
    <div className=' bg-white p-8 flex flex-col items-center'>
      <PhoneNumberDisplay phoneNumber={phoneNumber} />
      <h2 className='fs-body-2 text-gray-5'>
        실시간 웨이팅 안내를 받을 수 있는 번호를 발송해주세요
      </h2>
      <NumberPad onNumberClick={handleNumberClick} />
      <div className='flex items-center gap-2'>
        <svg
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='12.5'
            cy='12.5'
            r='12.5'
            fill={isPhoneNumberComplete ? 'var(--color-primary-pink)' : 'var(--color-gray-5)'}
          />
          <path
            d='M18.1693 9.25L10.3776 17.0417L6.83594 13.5'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <div className='text-gray-5 text-body-1  underline-offset-2 underline'>
          이용 약관 모두 동의하기
        </div>
      </div>
      <Button size='sm' variant={isPhoneNumberComplete ? 'default' : 'disabled'} className=''>
        다음
      </Button>
    </div>
  );
}
