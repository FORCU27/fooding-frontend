'use client';

import { createContext, useContext, ReactNode, useCallback } from 'react';

import { authApi, AuthLoginBody, AuthLoginUser, AuthSocialLoginBody } from '@repo/api/auth';
import { queryKeys } from '@repo/api/configs/query-keys';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: AuthLoginUser | null;
  isLoading: boolean;
  login: (credentials: AuthLoginBody) => Promise<void>;
  socialLogin: (credentials: AuthSocialLoginBody) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<AuthLoginUser | null>({
    queryKey: [queryKeys.user.me],
    queryFn: async () => {
      const accessToken = Cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
      if (!accessToken) return null;
      const response = await authApi.getSelf();
      return response.data;
    },
    retry: false,
  });

  const setTokens = (
    accessToken: string,
    refreshToken: string,
    expiredIn: number,
    refreshExpiredIn: number,
  ) => {
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
  };

  const login = useCallback(
    async (credentials: AuthLoginBody) => {
      const response = await authApi.login(credentials);
      const { accessToken, refreshToken, expiredIn, refreshExpiredIn } = response.data;

      setTokens(accessToken, refreshToken, expiredIn, refreshExpiredIn);

      await queryClient.invalidateQueries({ queryKey: [queryKeys.user.me] });
    },
    [queryClient],
  );

  const socialLogin = useCallback(
    async (credentials: AuthSocialLoginBody) => {
      const response = await authApi.socialLogin(credentials);
      const { accessToken, refreshToken, expiredIn, refreshExpiredIn } = response.data;

      setTokens(accessToken, refreshToken, expiredIn, refreshExpiredIn);

      await queryClient.invalidateQueries({ queryKey: [queryKeys.user.me] });
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
    queryClient.removeQueries({ queryKey: [queryKeys.user.me] });
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        login,
        socialLogin,
        logout,
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
