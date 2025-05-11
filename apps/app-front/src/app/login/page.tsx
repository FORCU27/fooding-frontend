'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import { UserLoginType, UserSocialLoginType } from '@repo/api/user-login';
import axios from 'axios';

import LoginForm from '@/components/Login/LoginForm';
import {
  AppleIcon,
  ArrowLeftIcon,
  GoogleIcon,
  KakaoIcon,
  NaverIcon,
  SocialButton,
} from '@/components/Login/SocialLoginButton';
import { useAuth } from '@/components/Provider/AuthProvider';
import { env } from '@/configs/env';

export type PlatformType = 'GOOGLE' | 'KAKAO' | 'NAVER' | 'APPLE' | 'fooding';

const BUTTON_STYLES = {
  base: 'flex items-center justify-center rounded-[50%] w-[64px] h-[64px]',
  naver: 'bg-[#03C75A] ',
  kakao: 'bg-[#FEE500]',
  apple: 'bg-black border border-[#F1F3F5] ',
  google: 'bg-[#F2F2F2] border border-[#F1F3F5] ',
} as const;

const getPlatformUrl = (platform: PlatformType): string | null => {
  const {
    GOOGLE_CLIENT_ID,
    OAUTH_REDIRECT_URI,
    OAUTH_APPLE_REDIRECT_URI,
    KAKAO_CLIENT_ID,
    NAVER_CLIENT_ID,
    APPLE_CLIENT_ID,
  } = env;

  const platformUrls: Record<PlatformType, string> = {
    GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&response_type=code&scope=email%20profile`,
    KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}`,
    NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&state=test1234`,
    APPLE: `https://appleid.apple.com/auth/authorize?response_type=code&response_mode=form_post&client_id=${APPLE_CLIENT_ID}&redirect_uri=${OAUTH_APPLE_REDIRECT_URI}&scope=name%20email&state=test123`,
    fooding: '',
  };

  return platformUrls[platform];
};

const openSocialLoginPopup = (loginUrl: string) => {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  return window.open(
    loginUrl,
    'login-popup',
    `width=${width},height=${height},left=${left},top=${top}`,
  );
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, socialLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 소셜 로그인 처리
  const handleSocialLogin = useCallback(
    async (platform: PlatformType) => {
      if (platform === 'fooding') return;

      const loginUrl = getPlatformUrl(platform);
      if (!loginUrl) {
        setErrorMessage('소셜 로그인 URL을 생성할 수 없습니다.');
        return;
      }

      const popup = openSocialLoginPopup(loginUrl);
      if (!popup) return;

      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        const { code } = event.data;
        if (!code) return;

        try {
          setIsLoading(true);
          const credentials = {
            provider: platform as UserSocialLoginType['provider'],
            token: code,
          };
          await socialLogin(credentials);

          const returnTo = searchParams.get('returnTo') || '/';
          router.push(returnTo);
        } catch (error) {
          console.error('Social login failed:', error);
          setErrorMessage(
            axios.isAxiosError(error) && error.response?.data?.message
              ? error.response.data.message
              : '소셜 로그인에 실패했습니다.',
          );
        } finally {
          setIsLoading(false);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);
    },
    [router, searchParams, socialLogin],
  );

  // // 이메일 로그인 처리
  // const handleSubmit = async (data: UserLoginType) => {
  //   try {
  //     if (!data.email) return setErrorMessage('올바른 이메일을 입력해주세요.');

  //     setIsLoading(true);
  //     await login(data);
  //     alert('로그인 완료');
  //     const returnTo = searchParams.get('returnTo') || '/';
  //     router.push(returnTo);
  //   } catch (error) {
  //     console.error('Email login failed:', error);

  //     setErrorMessage(
  //       axios.isAxiosError(error) && error.response?.data?.message
  //         ? error.response.data.message
  //         : '이메일 로그인에 실패했습니다.',
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (data: UserLoginType) => {
    console.log(data);
  };

  return (
    <main className='flex mt-[50px] maxWidth-[1280px] justify-center'>
      <div className='fixed left-[80px] cursor-pointer z-50' onClick={() => router.push('/')}>
        <ArrowLeftIcon />
      </div>

      <div className='flex flex-col items-center'>
        <Image
          src='/images/fooding-logo.png'
          alt='logo'
          width={253}
          height={60}
          className='mb-[100px]'
        />
        <LoginForm handleSubmit={handleSubmit} errorMessage={errorMessage} isLoading={isLoading} />
      </div>

      <div className='fixed top-[416px] right-[80px] flex flex-col gap-[16]'>
        <SocialButton
          platform='KAKAO'
          icon={<KakaoIcon />}
          onClick={handleSocialLogin}
          styles={BUTTON_STYLES.kakao}
        />
        <SocialButton
          platform='NAVER'
          icon={<NaverIcon />}
          onClick={handleSocialLogin}
          styles={BUTTON_STYLES.naver}
        />
        <SocialButton
          platform='APPLE'
          icon={<AppleIcon />}
          onClick={handleSocialLogin}
          styles={BUTTON_STYLES.apple}
        />
        <SocialButton
          platform='GOOGLE'
          icon={<GoogleIcon />}
          onClick={handleSocialLogin}
          styles={BUTTON_STYLES.google}
        />
      </div>
    </main>
  );
}
