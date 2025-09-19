'use client';

import Link from 'next/link';
import { JSX } from 'react';

import { SocialPlatform, socialPlatforms } from '@repo/api/auth';
import { SocialButton } from '@repo/design-system/components';
import { AppleIcon, GoogleIcon, KakaoIcon, NaverIcon } from '@repo/design-system/icons';

import LoginForm from './_components/LoginForm';
import { platformStyles, useSocialLogin } from '@/hooks/useSocialLogin';

export default function LoginPage() {
  return (
    <main>
      <h1 className='headline-2'>로그인</h1>
      <div className='flex flex-col gap-[4px] mb-[45px] mt-3'>
        <p className='body-b'>사장님을 위한 전용 공간에 오신 걸 환영합니다.</p>
        <Link href='/register' className='body-6 text-info-blue cursor-pointer w-fit'>
          계정이 없으신가요?
        </Link>
      </div>
      <LoginForm />
      <SocialLogin />
    </main>
  );
}

const SocialLogin = () => {
  const { handleSocialLogin } = useSocialLogin();

  return (
    <div className='flex justify-center gap-4 mt-30'>
      {socialPlatforms.map((platform) => (
        <SocialButton
          key={platform}
          platform={platform}
          icon={platformIcons[platform]}
          onClick={() => handleSocialLogin(platform)}
          styles={platformStyles[platform]}
        />
      ))}
    </div>
  );
};

const platformIcons: Record<SocialPlatform, JSX.Element> = {
  KAKAO: <KakaoIcon size={30} />,
  NAVER: <NaverIcon size={30} />,
  APPLE: <AppleIcon size={30} fill='white' />,
  GOOGLE: <GoogleIcon size={30} />,
};
