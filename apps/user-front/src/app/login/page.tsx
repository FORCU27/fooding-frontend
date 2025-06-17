'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JSX, useCallback, useEffect, useState } from 'react';

import { AuthSocialLoginBody, SocialPlatform, socialPlatforms } from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { TooltipBubble, SocialButton } from '@repo/design-system/components';
import { AppleIcon, GoogleIcon, KakaoIcon, NaverIcon } from '@repo/design-system/icons';
import Cookies from 'js-cookie';

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [recentProvider, setRecentProvider] = useState<string | null>(null);

  const returnTo = '/';
  const { socialLogin } = useAuth();

  useEffect(() => {
    const cookieValue = Cookies.get(STORAGE_KEYS.RECENT_PROVIDER) || null;
    setRecentProvider(cookieValue);
  }, []);

  const handleSocialLogin = useCallback(
    async (platform: SocialPlatform) => {
      const loginUrl = getPlatformUrl(platform);
      if (!loginUrl) return;

      const popup = openSocialLoginPopup(loginUrl);
      if (!popup) return;

      const handleMessage = async (event: MessageEvent) => {
        //	COOP 정책 보안 제한 오류 방지 코드
        const allowedOrigins = [
          'http://localhost:3000',
          'https://stage.fooding.im',
          'https://fooding.im',
        ];

        if (!allowedOrigins.includes(event.origin)) {
          console.warn(`Origin mismatch: ${event.origin} !== any of`, allowedOrigins);
          return;
        }

        const { action, code } = event.data;
        if (action === 'closePopup') {
          popup.close?.();
          window.removeEventListener('message', handleMessage);
          return;
        }

        if (!code) return;
        window.removeEventListener('message', handleMessage);

        try {
          setIsLoading(true);
          const credentials: AuthSocialLoginBody = {
            code,
            provider: platform,
            redirectUri:
              platform === 'APPLE' ? env.OAUTH_APPLE_REDIRECT_URI : env.OAUTH_REDIRECT_URI,
            role: 'USER',
          };
          await socialLogin(credentials);

          Cookies.set(STORAGE_KEYS.RECENT_PROVIDER, platform, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });

          router.push(returnTo);
        } catch (error) {
          console.error('Social login failed:', error);
        } finally {
          setIsLoading(false);
        }
      };

      window.addEventListener('message', handleMessage);
    },
    [returnTo, router, socialLogin],
  );

  const handleRecentProvider = (platform: string) => {
    return recentProvider === platform ? (
      <TooltipBubble
        className='flex bg-[#292929] rounded-[8px] h-[39px] mt-3 '
        bubbleClassName='flex text-center text-white body-5 w-[96px] justify-center items-center'
        tailColor='#292929'
        tailPosition='bottom'
      >
        최근 로그인
      </TooltipBubble>
    ) : null;
  };

  return (
    <main className='w-full min-h-screen bg-white overflow-hidden'>
      <div className='flex flex-col max-w-[440px] h-screen mx-auto justify-around items-center'>
        <div className='flex flex-col items-center mt-10'>
          <Image
            src='/images/fooding_icon.png'
            width={120}
            height={120}
            alt='fooding_로고'
            className='mb-4'
          />
          <p className='text-center headline-3'>
            당신의 한 끼가
            <br />
            특별해지는 순간
          </p>
        </div>

        <div className='flex flex-col items-center  mb-6'>
          <h1 className='text-center text-gray-5 mb-6 body-5'>SNS 계정으로 빠르게 시작하기</h1>
          <div className='flex w-[304px] gap-4'>
            {socialPlatforms.map((platform) => (
              <div key={platform} className='flex flex-col justify-between items-center w-[96px]'>
                <SocialButton
                  platform={platform}
                  icon={platformIcons[platform]}
                  onClick={() => handleSocialLogin(platform)}
                  styles={platformStyles[platform]}
                  disabled={isLoading}
                />
                {handleRecentProvider(platform)}
              </div>
            ))}
          </div>
          <div className='text-center mt-5'>
            <Link href={'/'} className='text-gray-5 underline decoration-1 body-5'>
              고객센터
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
