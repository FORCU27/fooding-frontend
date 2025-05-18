'use client';

import Image from 'next/image';

interface StoreOwnerProfileProps {
  ownerName?: string;
  profileImageSrc?: string;
}

export default function StoreOwnerProfile({ ownerName, profileImageSrc }: StoreOwnerProfileProps) {
  return (
    <div className='relative flex flex-col items-center bg-[var(--color-gray-6)] text-white w-1/2 h-screen'>
      {/* TODO arrow-left 아이콘 분리 필요 */}
      <button className='absolute top-[50px] left-[80px] w-[60px] h-[60px]'>
        <svg
          width='60'
          height='60'
          viewBox='0 0 60 60'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M47.5 30H12.5M12.5 30L30 47.5M12.5 30L30 12.5'
            stroke='white'
            strokeWidth='5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      <div className='flex flex-col items-center pt-[160px]'>
        <p className='subtitle-1'>안녕하세요</p>
        <div className='flex gap-2'>
          <div className='headline-3-2'>{ownerName ? ownerName : '김홍길'}</div>
          <div className='headline-3-1'>사장님</div>
        </div>

        <div className='mt-[32px] w-[400px] h-[400px] rounded-full bg-neutral-600 overflow-hidden relative'>
          {profileImageSrc && (
            <Image src={profileImageSrc} alt='프로필 이미지' fill style={{ objectFit: 'cover' }} />
          )}
        </div>
      </div>
    </div>
  );
}
