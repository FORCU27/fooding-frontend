'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { JSX, useCallback, useState } from 'react';

import {
  authApi,
  AuthLoginBody,
  AuthSocialLoginBody,
  SocialPlatform,
  socialPlatforms,
} from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { SocialButton } from '@repo/design-system/components';
import {
  ArrowLeftIcon,
  AppleIcon,
  GoogleIcon,
  KakaoIcon,
  NaverIcon,
} from '@repo/design-system/icons';
import axios from 'axios';
import Cookies from 'js-cookie';

import LoginForm from '@/components/Login/LoginForm';
import { useAuth } from '@/components/Provider/AuthProvider';
import { env } from '@/configs/env';

const platformIcons: Record<SocialPlatform, JSX.Element> = {
  KAKAO: <KakaoIcon size={30} />,
  NAVER: <NaverIcon size={30} />,
  APPLE: <AppleIcon size={30} fill='white' />,
  GOOGLE: <GoogleIcon size={30} />,
};

const platformStyles: Record<SocialPlatform, string> = {
  KAKAO: 'bg-[#FEE500] rounded-[50%] h-[64px] w-[64px] ',
  NAVER: 'bg-[#03C75A] rounded-[50%] h-[64px] w-[64px]',
  APPLE: 'bg-black rounded-[50%] h-[64px] w-[64px]',
  GOOGLE: 'bg-[#F2F2F2] rounded-[50%] h-[64px] w-[64px]',
};

const getPlatformUrl = (platform: SocialPlatform): string => {
  const {
    GOOGLE_CLIENT_ID,
    OAUTH_REDIRECT_URI,
    OAUTH_APPLE_REDIRECT_URI,
    KAKAO_CLIENT_ID,
    NAVER_CLIENT_ID,
    APPLE_CLIENT_ID,
  } = env;

  const platformUrls: Record<SocialPlatform, string> = {
    KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}`,
    NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&state=test1234`,
    APPLE: `https://appleid.apple.com/auth/authorize?response_type=code&response_mode=form_post&client_id=${APPLE_CLIENT_ID}&redirect_uri=${OAUTH_APPLE_REDIRECT_URI}&scope=name%20email&state=test123`,
    GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&response_type=code&scope=email%20profile`,
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { socialLogin } = useAuth();

  const handleSocialLogin = useCallback(
    async (platform: SocialPlatform) => {
      const loginUrl = getPlatformUrl(platform);
      if (!loginUrl) return;

      const popup = openSocialLoginPopup(loginUrl);
      if (!popup) return;

      const handleMessage = async (event: MessageEvent) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'https://stage.fooding.im',
          'https://fooding.im',
        ];

        if (!allowedOrigins.includes(event.origin)) {
          console.warn(`Origin mismatch: ${event.origin} !== any of`, allowedOrigins);
          return;
        }

        if (event.data?.action === 'closePopup') {
          popup.close?.();
          return;
        }

        const { code } = event.data;
        if (!code) return;
        window.removeEventListener('message', handleMessage);

        setIsLoading(true);
        try {
          const credentials: AuthSocialLoginBody = {
            code,
            provider: platform,
            redirectUri:
              platform === 'APPLE'
                ? env.OAUTH_APPLE_REDIRECT_URI || ''
                : env.OAUTH_REDIRECT_URI || '',
            role: 'USER',
          };
          await socialLogin(credentials);

          Cookies.set(STORAGE_KEYS.RECENT_PROVIDER, platform, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });

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

  const handleSubmit = async (data: AuthLoginBody) => {
    try {
      setIsLoading(true);

      const credentials = {
        ...data,
        role: 'USER' as const,
      };

      await authApi.login(credentials);

      const returnTo = searchParams.get('returnTo') || '/';
      router.push(returnTo);
    } catch (error) {
      console.error('로그인 실패:', error);

      let errorMessageText = '로그인에 실패했습니다.';

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (typeof message === 'string') {
          errorMessageText = message;
        }
      }

      setErrorMessage(errorMessageText);
    } finally {
      setIsLoading(false);
    }
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
        {socialPlatforms.map((platform) => (
          <div key={platform} className='flex flex-col justify-between items-center w-[96px]'>
            <SocialButton
              platform={platform}
              icon={platformIcons[platform]}
              onClick={() => handleSocialLogin(platform)}
              styles={platformStyles[platform]}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
