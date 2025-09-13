import { useRouter, useSearchParams } from 'next/navigation';

import { AuthSocialLoginBody, SocialPlatform } from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import Cookies from 'js-cookie';

import { useAuth } from '@/components/Provider/AuthProvider';
import { env } from '@/configs/env';

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

export const platformStyles: Record<SocialPlatform, string> = {
  KAKAO: 'bg-[#FEE500] rounded-[50%] h-[64px] w-[64px] ',
  NAVER: 'bg-[#03C75A] rounded-[50%] h-[64px] w-[64px]',
  APPLE: 'bg-black rounded-[50%] h-[64px] w-[64px]',
  GOOGLE: 'bg-[#F2F2F2] rounded-[50%] h-[64px] w-[64px]',
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

export function useSocialLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { socialLogin } = useAuth();

  const handleSocialLogin = async (platform: SocialPlatform) => {
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

      if (!allowedOrigins.includes(event.origin)) return;

      const { code } = event.data;
      if (!code) return;

      window.removeEventListener('message', handleMessage);

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

        const returnTo = searchParams.get('returnTo') || '/my';
        router.replace(returnTo);
      } catch (error) {
        console.error('Social login failed:', error);
      }
    };

    window.addEventListener('message', handleMessage);
  };

  return { handleSocialLogin };
}
