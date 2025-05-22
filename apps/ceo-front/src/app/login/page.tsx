'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { JSX, useCallback, useState } from 'react';

import { AuthSocialLoginBody, SocialPlatform, socialPlatforms } from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { SocialButton } from '@repo/design-system/components';
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
const getPlatformUrl = (platform: SocialPlatform): string | null => {
  const {
    GOOGLE_CLIENT_ID,
    OAUTH_REDIRECT_URI,
    OAUTH_APPLE_REDIRECT_URI,
    KAKAO_CLIENT_ID,
    NAVER_CLIENT_ID,
    APPLE_CLIENT_ID,
  } = env;

  const platformUrls: Record<SocialPlatform, string> = {
    GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&response_type=code&scope=email%20profile`,
    KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}`,
    NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&state=test1234`,
    APPLE: `https://appleid.apple.com/auth/authorize?response_type=code&response_mode=form_post&client_id=${APPLE_CLIENT_ID}&redirect_uri=${OAUTH_APPLE_REDIRECT_URI}&scope=name%20email&state=test123`,
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
  const [, setIsLoading] = useState(false);

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
          'https://ceo-stage.fooding.im',
          'https://ceo.fooding.im',
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
            role: 'CEO',
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
        } finally {
          setIsLoading(false);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);
    },
    [router, searchParams, socialLogin],
  );

  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <div className='flex flex-col p-4 justify-around items-center w-[554px] h-[757px] border border-gray-3 rounded-[11px]'>
        <div className='h-[90px] flex flex-col justify-center items-center'>
          <Image
            src='/images/fooding-logo.png'
            alt='logo'
            width={253}
            height={60}
            className='mb-4'
          />
          <p className='text-gray-5 text-medium'>사장님을 위한 전용 공간에 오신 걸 환영합니다</p>
        </div>

        {/* FIXME: 추후 일반 로그인 추가 */}

        <div className='flex gap-[16]'>
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
      </div>
    </div>
  );
}
