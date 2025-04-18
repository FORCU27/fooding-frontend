'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// 로고 컴포넌트
const Logo = () => (
  <div className='mb-8 relative w-full'>
    <Image
      src='/fooding-logo.png'
      alt='Fooding'
      className='w-full h-auto'
      width={0}
      height={0}
      sizes='100vw'
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

// 웨이팅 안내 메시지 컴포넌트
const WaitingInfo = () => (
  <div className='text-center my-8'>
    <h2 className='text-base sm:text-lg md:text-xl mb-3'>휴대폰 번호를 입력하시면 카카오톡으로</h2>
    <h2 className='text-base sm:text-lg md:text-xl'>실시간 웨이팅 현황을 알려드려요</h2>
  </div>
);

// 매장 이름 컴포넌트
const StoreName = () => (
  <div className='mt-10'>
    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-6'>강고기 홍대점</h1>
  </div>
);

// 웨이팅 통계 컴포넌트
const WaitingStats = () => (
  <div className='grid grid-cols-2 gap-4 justify-between mt-auto'>
    <div>
      <h1 className='text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6'>
        현재 웨이팅
      </h1>
      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-8xl font-bold text-center mb-6 text-[#FF4412]'>
        0<span className='text-xl sm:text-3xl'>팀</span>
      </h2>
    </div>
    <div className='border-l border-gray-600 pl-4 sm:pl-6 md:pl-8'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-6'>
        예상 시간
      </h1>
      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-8xl font-bold text-center mb-6 text-[#FF4412]'>
        5<span className='text-xl sm:text-3xl'>분</span>
      </h2>
    </div>
  </div>
);

// 왼쪽 패널 컴포넌트
const LeftPanel = () => (
  <div className='w-1/2 bg-[#121212] text-white p-8 flex flex-col justify-between'>
    <Logo />
    <WaitingInfo />
    <StoreName />
    <WaitingStats />
  </div>
);

// 전화번호 표시 컴포넌트
const PhoneNumberDisplay = ({ phoneNumber }: { phoneNumber: string }) => (
  <div className='flex justify-center mb-8'>
    <div className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center p-4 rounded-md'>
      <p className='text-5xl font-bold text-gray-800 break-all'>{phoneNumber}</p>
    </div>
  </div>
);

// 숫자 패드 컴포넌트
const NumberPad = ({
  onNumberClick,
  onReset,
  onBackspace,
}: {
  onNumberClick: (num: string) => void;
  onReset: () => void;
  onBackspace: () => void;
}) => (
  <div className='grid grid-cols-3 gap-2'>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
      <button
        key={num}
        className='h-20 border border-gray-300 rounded-md text-3xl text-gray-800 hover:bg-gray-100'
        onClick={() => onNumberClick(num.toString())}
      >
        {num}
      </button>
    ))}
    <button
      className='h-20 border border-gray-300 rounded-md text-3xl text-gray-800 hover:bg-gray-100'
      onClick={onReset}
    >
      C
    </button>
    <button
      className='h-20 border border-gray-300 rounded-md text-3xl text-gray-800 hover:bg-gray-100'
      onClick={() => onNumberClick('0')}
    >
      0
    </button>
    <button
      className='h-20 border border-gray-300 rounded-md text-3xl text-gray-800 hover:bg-gray-100'
      onClick={onBackspace}
    >
      ←
    </button>
  </div>
);

// 액션 버튼 컴포넌트
const ActionButtons = ({ isPhoneNumberComplete }: { isPhoneNumberComplete: boolean }) => {
  const router = useRouter();
  return (
    <div className='flex justify-between mt-auto'>
      <button className='w-[48%] h-14 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200'>
        웨이팅 목록
      </button>
      <button
        className={`w-[48%] h-14 rounded-md ${
          isPhoneNumberComplete
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-100 text-gray-400'
        }`}
        disabled={!isPhoneNumberComplete}
        onClick={() => router.push('/store/register')}
      >
        웨이팅 시작
      </button>
    </div>
  );
};

// 오른쪽 패널 컴포넌트
const RightPanel = ({
  phoneNumber,
  onNumberClick,
  onReset,
  onBackspace,
  isPhoneNumberComplete,
}: {
  phoneNumber: string;
  onNumberClick: (num: string) => void;
  onReset: () => void;
  onBackspace: () => void;
  isPhoneNumberComplete: boolean;
}) => (
  <div className='w-1/2 bg-white p-8 flex flex-col'>
    <PhoneNumberDisplay phoneNumber={phoneNumber} />

    <h2 className='text-xl text-gray-800 mb-6'>
      실시간 웨이팅 안내를 받을 수 있는 번호를 발송해주세요
    </h2>

    <NumberPad onNumberClick={onNumberClick} onReset={onReset} onBackspace={onBackspace} />

    <ActionButtons isPhoneNumberComplete={isPhoneNumberComplete} />
  </div>
);

// usePhoneNumber.ts 파일로 분리하거나 같은 파일 내에 선언
const usePhoneNumber = (initialValue = '010-') => {
  const [phoneNumber, setPhoneNumber] = useState(initialValue);

  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 13) {
      if (phoneNumber.length === 8) {
        setPhoneNumber((prev) => prev + '-' + num);
      } else {
        setPhoneNumber((prev) => prev + num);
      }
    }
  };

  const handleBackspace = () => {
    if (phoneNumber.length > 4) {
      // 하이픈 바로 뒤의 문자를 삭제할 때 하이픈도 함께 삭제
      if (phoneNumber.charAt(phoneNumber.length - 2) === '-') {
        setPhoneNumber((prev) => prev.slice(0, -2));
      } else {
        setPhoneNumber((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleReset = () => {
    setPhoneNumber(initialValue);
  };

  const isPhoneNumberComplete = phoneNumber.length >= 13;

  return {
    phoneNumber,
    handleNumberClick,
    handleBackspace,
    handleReset,
    isPhoneNumberComplete,
  };
};

// 메인 컴포넌트
export default function WaitingPage() {
  const { phoneNumber, handleNumberClick, handleBackspace, handleReset, isPhoneNumberComplete } =
    usePhoneNumber();

  return (
    <div className='flex h-screen'>
      <LeftPanel />
      <RightPanel
        phoneNumber={phoneNumber}
        onNumberClick={handleNumberClick}
        onReset={handleReset}
        onBackspace={handleBackspace}
        isPhoneNumberComplete={isPhoneNumberComplete}
      />
    </div>
  );
}
