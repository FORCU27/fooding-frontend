'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import axios from 'axios';

import { userRepository } from '@/repository/user-repository';

interface User {
  id: string;
  email: string;
  nickname: string;
  joinPath: string;
  isMarketingAgree?: boolean;
  isPrivacyAgree?: boolean;
  isTermsAgree?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  // fetchUserInfo: () => Promise<void>
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [, setIsLoading] = useState(true);
  const router = useRouter();

  // 초기 인증 상태 확인은 한 번만 실행
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await userRepository.getSelf();

        setUser(response.data);
      } catch (error) {
        // 현재 페이지가 비밀번호 재설정 페이지일 경우 logout 실행 안 함
        if (!window.location.pathname.startsWith('/reset-password')) {
          setUser(null);
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // 의존성 배열 비움

  const login = async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/api/auth/login', credentials);

    // 토큰을 localStorage에 저장
    localStorage.setItem('access_token', response.data.access_token);
    console.log('hi', response.data.access_token);

    const userResponse = await userRepository.getSelf();

    setUser(userResponse.data);
    // router.push('/dashboard')
  };

  const logout = async () => {
    setUser(null);
    await axios.post('/api/auth/logout');
    localStorage.setItem('access_token', '');
    router.push('/login');
  };

  // 라우팅은 미들웨어에 맡기고, 컨텍스트는 상태 관리만 담당
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading: true,
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
