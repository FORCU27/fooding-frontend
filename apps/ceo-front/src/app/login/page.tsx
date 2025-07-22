'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { JSX, useCallback, useState } from 'react';

import { AuthSocialLoginBody, SocialPlatform, socialPlatforms } from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { SocialButton } from '@repo/design-system/components';
import { Input, Checkbox, Button } from '@repo/design-system/components/b2c';
import {
  AppleIcon,
  GoogleIcon,
  KakaoIcon,
  NaverIcon,
  EyeOffIcon,
  EyeOnIcon,
} from '@repo/design-system/icons';
import Cookies from 'js-cookie';

import FooterLayout from '@/components/Layouts/FooterLayout';
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
    KAKAO_CLIENT_ID,
    NAVER_CLIENT_ID,
    APPLE_CLIENT_ID,
  } = env;

  const platformUrls: Record<SocialPlatform, string> = {
    GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&response_type=code&scope=email%20profile`,
    KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}`,
    NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&state=test1234`,
    APPLE: `https://appleid.apple.com/auth/authorize?response_type=code&response_mode=form_post&client_id=${APPLE_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&scope=name%20email&state=test123`,
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { socialLogin } = useAuth();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
            redirectUri: env.OAUTH_REDIRECT_URI || '',
            role: 'CEO',
          };
          await socialLogin(credentials);

          Cookies.set(STORAGE_KEYS.RECENT_PROVIDER, platform, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });

          const returnTo = searchParams.get('returnTo') || '/';
          router.replace(returnTo);
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
    <div className='flex flex-col'>
      <div className='flex w-screen'>
        {/* 왼쪽 일러스트 영역 (1380px 이상일 때만 보이도록) */}
        <div className='hidden md:flex flex-1 bg-[#F9F9F9] custom-hide:block overflow-hidden relative'>
          <Image
            src='/images/login-illust.png'
            alt='login illust'
            width={1380}
            height={1200}
            className='object-cover'
            style={{
              width: '1380px',
              height: '1200px',
              minWidth: '1380px',
              minHeight: '1200px',
            }}
          />
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className='flex items-center justify-center w-full lg:w-[808px] relative'>
          <div className='absolute top-[50px] right-[60px]'>
            <Image src='/images/fooding-ceo-logo.svg' alt='logo' width={153} height={24} />
          </div>
          <div className='w-[450px] h-[678px]'>
            <h1 className='headline-2'>로그인</h1>
            {/* TODO Spacer 컴포넌트 추가 */}
            <div className='h-[12px]' />
            <div className='flex flex-col gap-[4px]'>
              <p className='body-3'>사장님을 위한 전용 공간에 오신 걸 환영합니다.</p>
              <p className='body-6 text-blue-500'>계정이 없으신가요?</p>
            </div>
            <div className='h-[45px]' />
            <form>
              <div className='flex flex-col gap-[20px]'>
                <div className='flex flex-col gap-[8px]'>
                  <p className='subtitle-3'>아이디</p>
                  <Input
                    required
                    autoFocus
                    type='email'
                    className='px-[20px] py-[18px] body-2 h-[58px]'
                  />
                </div>
                <div className='flex flex-col gap-[8px]'>
                  <p className='subtitle-3'>비밀번호</p>
                  <div className='relative'>
                    <Input
                      required
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      className='px-[20px] py-[18px] body-2 h-[58px]'
                    />
                    <button
                      type='button'
                      onClick={handleTogglePasswordVisibility}
                      className='absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700'
                      aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                    >
                      {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>
              </div>
              <div className='h-[12px]' />
              <div className='flex justify-between'>
                <div className='flex gap-[8px] cursor-pointer'>
                  <Checkbox />
                  <p>아이디 저장</p>
                </div>
                <p className='body-6 text-gray-5'>아이디/비밀번호를 잊으셨나요?</p>
              </div>
              <div className='h-[68px]' />
              <Button className='py-[17px] rounded-full subtitle-1'>로그인</Button>
            </form>
            <div className='h-[120px]' />
            {/* 소셜 로그인 버튼 */}
            <div className='flex justify-center gap-4 mt-8'>
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
          </div>
        </div>

        {/* 1380px 이하에서 일러스트 숨김 처리 */}
        <style jsx>{`
          @media (max-width: 1379px) {
            .custom-hide {
              display: none !important;
            }
          }
        `}</style>
      </div>
      <FooterLayout />
    </div>
  );
}
