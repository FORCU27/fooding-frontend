'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { auth, UserInfoType, UserSocialLogin } from '@repo/api/user-login';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: UserInfoType | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  socialLogin: (credentials: UserSocialLogin) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 인증 상태 확인
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken =
          Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) || localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!accessToken) {
          setUser(null);
          return;
        }

        const response = await auth.getSelf();
        if (response.status !== 'OK') {
          throw new Error(`Get user failed: ${response.status}`);
        }
        setUser(response.data);
      } catch (error) {
        setUser(null);
        Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
        Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  //FIXME: 추후 일반로그인 수정
  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await auth.login(credentials);
      const { accessToken, refreshToken, expiredIn, refreshExpiredIn } = response.data;

      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + expiredIn),
      });
      Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + refreshExpiredIn),
      });

      const userResponse = await auth.getSelf();
      setUser(userResponse.data);
    } catch (error) {
      console.error('Email login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 로그인
  const socialLogin = async (credentials: UserSocialLogin) => {
    try {
      setIsLoading(true);
      const response = await auth.login(credentials);
      if (response.status !== 'OK') {
        throw new Error(`Social login failed: ${response.status}`);
      }

      const { accessToken, refreshToken, expiredIn, refreshExpiredIn } = response.data;
      if (!accessToken || !refreshToken) {
        throw new Error('Tokens are missing in response');
      }

      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + expiredIn),
      });
      Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + refreshExpiredIn),
      });
      const userResponse = await auth.getSelf();
      setUser(userResponse.data);
    } catch (error) {
      console.error('Social login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        socialLogin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
