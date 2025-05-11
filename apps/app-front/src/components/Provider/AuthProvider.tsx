'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { auth, UserInfoType, UserLoginType, UserSocialLoginType } from '@repo/api/user-login';

import { setCookie } from '@/utils/cookie';

interface AuthContextType {
  user: UserInfoType | null;
  login: (credentials: UserLoginType) => Promise<void>;
  socialLogin: (credentials: UserSocialLoginType) => Promise<void>;
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
        const token = localStorage.getItem('accessToken');
        if (token) {
          const userResponse = await auth.getSelf();
          setUser(userResponse.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: UserLoginType) => {
    try {
      setIsLoading(true);
      const response = await auth.login(credentials);
      localStorage.setItem('accessToken', response.data.accessToken);

      const userResponse = await auth.getSelf();
      setUser(userResponse.data);
    } catch (error) {
      console.error('Email login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 로그인
  const socialLogin = async (credentials: UserSocialLoginType) => {
    try {
      setIsLoading(true);
      const response = await auth.login(credentials);
      const accessToken = response.data.accessToken;

      localStorage.setItem('accessToken', accessToken);
      setCookie('accessToken', accessToken);

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
