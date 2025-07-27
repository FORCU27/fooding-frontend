'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { authApi, AuthLoginBody, AuthLoginUser, AuthSocialLoginBody } from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: AuthLoginUser | null;
  login: (credentials: AuthLoginBody) => Promise<void>;
  socialLogin: (credentials: AuthSocialLoginBody) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthLoginUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken =
          Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) || localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!accessToken) {
          setUser(null);
          return;
        }

        const response = await authApi.getSelf();
        if (response.status !== 'OK') {
          throw new Error(`Get user failed: ${response.status}`);
        }
        setUser(response.data);
      } catch {
        setUser(null);
        Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
        Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: AuthLoginBody) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(credentials);
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

      const userResponse = await authApi.getSelf();
      setUser(userResponse.data);
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 로그인
  const socialLogin = async (credentials: AuthSocialLoginBody) => {
    try {
      setIsLoading(true);
      const response = await authApi.socialLogin(credentials);
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
      const userResponse = await authApi.getSelf();
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
