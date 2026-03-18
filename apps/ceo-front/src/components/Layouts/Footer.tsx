'use client';

import { useState } from 'react';

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className='border-t border-gray-8 h-[180px] w-full flex flex-col justify-start pt-8 text-[12px]'>
      <div className='flex items-start'>
        <div className='flex flex-col space-y-3 ml-10 mr-10 text-gray-6'>
          <div className='flex items-center space-x-2'>
            <a
              href='https://fooding-cs.notion.site/2025-09-14-ver-26e6b89156ba81a083a8feed50bda06?pvs=25'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-red-400 transition-colors'
            >
              이용약관
            </a>
            <span className='text-gray-8'>|</span>
            <a
              href='https://fooding-cs.notion.site/2025-09-14-ver-26e6b89156ba81659fb3c2ac4dab36bb'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-red-400 transition-colors'
            >
              개인정보처리방침
            </a>
          </div>
          <div className=''>
            <span className='text-gray-6 font-bold  '>주식회사 Fooding 대표 홍길동</span>
          </div>
        </div>

        <div className='flex flex-col space-y-3 text-right text-gray-5'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center hover:text-red-400 transition-colors'
          >
            <span>자세히 보기</span>
            <svg 
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
          {isExpanded && (
            <div className=''>
              <span>사업자 등록번호 555-55-55555</span>
              <span className='mx-2'>|</span>
              <span>서울특별시 강남구 역삼로 555</span>
              <span className='mx-2'>|</span>
              <span>@ Fooding.co.kr</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
