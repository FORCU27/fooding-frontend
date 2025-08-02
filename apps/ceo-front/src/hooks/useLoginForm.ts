import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { AuthLoginBody } from '@repo/api/auth';
import { AxiosError } from 'axios';

import { AuthErrorResponse } from '../../../../packages/api/src/shared';

export function useLoginForm(loginFn: (credentials: AuthLoginBody) => Promise<void>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRememberId, setIsRememberId] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력해주세요');
      return;
    }

    try {
      await loginFn({ email, password, role: 'CEO' });

      if (isRememberId) {
        localStorage.setItem('saved_email', email);
      } else {
        localStorage.removeItem('saved_email');
      }

      router.replace('/');

    } catch (error: unknown) {
      const axiosError = error as AxiosError<AuthErrorResponse>;
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;

      if (status === 400) {
        setErrorMessage('이메일 또는 비밀번호를 입력한 내용을 다시 확인해주세요');
      } else if (status === 401 || status === 404) {
        setErrorMessage(
          '이메일 혹은 비밀번호가 일치하지 않습니다\n입력한 내용을 다시 확인해주세요',
        );
      } else {
        setErrorMessage(data?.message ?? '로그인에 실패했습니다.\n다시 시도해주세요');
      }
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsRememberId(true);
    }
  }, []);

  return {
    email,
    password,
    errorMessage,
    isRememberId,
    setEmail,
    setPassword,
    setIsRememberId,
    setErrorMessage,
    handleLogin,
  };
}
