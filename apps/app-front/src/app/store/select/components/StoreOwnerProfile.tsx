'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface StoreOwnerProfileProps {
  ownerName?: string;
  profileImageSrc?: string;
}

const UserIcon = () => (
  <svg
    width='255'
    height='255'
    viewBox='0 0 255 255'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M127.501 159.375C161.183 159.375 191.136 175.638 210.206 200.876C214.31 206.308 216.362 209.024 216.295 212.694C216.243 215.53 214.463 219.108 212.231 220.859C209.343 223.125 205.341 223.125 197.337 223.125H57.6652C49.6607 223.125 45.6585 223.125 42.7704 220.859C40.5391 219.108 38.7583 215.53 38.7064 212.694C38.6393 209.024 40.6915 206.308 44.7958 200.876C63.8656 175.638 93.8188 159.375 127.501 159.375Z'
      fill='white'
    />
    <path
      d='M127.501 127.5C101.095 127.5 79.6884 106.094 79.6884 79.6875C79.6884 53.2814 101.095 31.875 127.501 31.875C153.907 31.875 175.313 53.2814 175.313 79.6875C175.313 106.094 153.907 127.5 127.501 127.5Z'
      fill='white'
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M47.5 30H12.5M12.5 30L30 47.5M12.5 30L30 12.5'
      stroke='white'
      strokeWidth='5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function StoreOwnerProfile({ ownerName, profileImageSrc }: StoreOwnerProfileProps) {
  const router = useRouter();
  return (
    <div className='relative flex flex-col items-center bg-gray-6 text-white w-1/2 h-screen'>
      <button
        onClick={() => router.back()}
        className='absolute top-[50px] left-[80px] w-[60px] h-[60px]'
      >
        <ArrowLeftIcon />
      </button>
      <div className='flex flex-col items-center pt-[160px]'>
        <p className='subtitle-1'>안녕하세요</p>
        <div className='flex gap-2'>
          <div className='headline-3-2'>{ownerName}</div>
          <div className='headline-3-1'>사장님</div>
        </div>

        <div className='relative flex items-center justify-center mt-[32px] w-[400px] h-[400px] rounded-full bg-gray-3 overflow-hidden'>
          {profileImageSrc ? (
            <Image
              src={profileImageSrc}
              alt='프로필 이미지'
              fill
              priority
              sizes='400px'
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
    </div>
  );
}
