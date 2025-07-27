import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { AuthLoginBody } from '@repo/api/auth';

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
    } catch (err: any) {
      // TODO any 타입 fix
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        setErrorMessage('비밀번호가 일치하지 않습니다.\n입력한 내용을 다시 확인해주세요');
      } else if (status === 401 || status === 404) {
        setErrorMessage('존재하지 않는 계정입니다.\n이메일을 다시 확인해주세요');
      } else {
        setErrorMessage(message ?? '로그인에 실패했습니다.\n다시 시도해주세요');
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
