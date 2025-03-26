'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputLabel,
  FormHelperText,
  Alert,
  Snackbar,
} from '@mui/material';

import { useAuth } from '@/libs/auth';

interface ApiError {
  response?: {
    data: {
      error: {
        message: string;
      };
    };
  };
}

export default function LoginPage() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // 유효성 검사 함수
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value.trim()) return '이메일을 입력해주세요.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : '유효한 이메일 형식이 아닙니다.';
      case 'password':
        if (!value.trim()) return '비밀번호를 입력해주세요.';
        const lengthValid = value.length >= 6 && value.length <= 20;
        const hasLetters = /[a-zA-Z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const combinationCount = [hasLetters, hasNumbers, hasSpecial].filter(Boolean).length;
        return lengthValid
          ? combinationCount < 2
            ? '영문, 숫자, 특수문자 중 2가지 이상을 조합해주세요.'
            : ''
          : '비밀번호는 6~20자 사이여야 합니다.';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
    setErrors({ email: emailError, password: passwordError });

    setIsLoading(true);

    if (!emailError && !passwordError) {
      try {
        await login({ email, password });
        const returnTo = searchParams.get('returnTo');
        router.push(returnTo || '/');
      } catch (error) {
        let errorMessage = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
        const apiError = error as ApiError;
        if (apiError.response && apiError.response.data && apiError.response.data.error) {
          errorMessage = apiError.response.data.error.message;
        }

        setNotification({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            p: 5,
          }}
        >
          <Image
            src={'/images/logo.svg'}
            width={40}
            height={40}
            alt={'zapp-logo'}
            style={{ marginBottom: '32px' }}
          />
          <Typography
            component='h1'
            variant='h5'
            sx={{ fontWeight: '800', mt: '32px', mb: '32px' }}
            gutterBottom
          >
            빠르고 간결한 앱 개발,
            <br />
            ZAPP
          </Typography>

          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
            <Box sx={{ mb: 2 }}>
              <InputLabel sx={{ fontWeight: 600, color: '#ffffff' }}>이메일</InputLabel>
              <TextField
                required
                fullWidth
                autoFocus
                margin='dense'
                id='email'
                name='email'
                type='email'
                size='medium'
                value={email}
                autoComplete='email'
                sx={{
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { border: 'none' },
                }}
                placeholder='이메일 주소를 입력해주세요.'
                onChange={handleChange}
                error={!!errors.email}
                helperText={null}
              />

              {errors.email && (
                <FormHelperText component='div' error sx={{ color: '#EC2323', m: 0, p: 0 }}>
                  <Alert severity='error' sx={{ backgroundColor: 'transparent', color: '#EC2323' }}>
                    {errors.email}
                  </Alert>
                </FormHelperText>
              )}
            </Box>

            <Box>
              <InputLabel sx={{ fontWeight: 600, color: '#ffffff' }}>비밀번호</InputLabel>
              <TextField
                required
                fullWidth
                margin='dense'
                id='password'
                name='password'
                type='password'
                size='medium'
                value={password}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { border: 'none' },
                }}
                placeholder='비밀번호를 입력해주세요.'
                autoComplete='current-password'
                onChange={handleChange}
                error={!!errors.password}
                helperText={null}
              />
              {errors.password && (
                <FormHelperText component='div' error sx={{ mt: 1 }}>
                  <Alert severity='error' sx={{ backgroundColor: 'transparent', color: '#EC2323' }}>
                    {errors.password}
                  </Alert>
                </FormHelperText>
              )}
            </Box>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              disableElevation
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#FF4938',
                color: '#ffffff',
                fontWeight: 800,
                height: '56px',
              }}
            >
              {isLoading ? '로그인 중...' : '계속'}
            </Button>

            <Box
              sx={{
                m: 1,
                p: 1,
                display: 'flex',
                justifyContent: 'space-around',
                color: '#999999',
                fontSize: '16px',
              }}
            >
              <StyledLink href={'/join'} style={{}}>
                이메일로 회원가입
              </StyledLink>
              <StyledLink href={'/reset-password/request'}>
                비밀번호가 기억나지 않으시나요?
              </StyledLink>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notification.open}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant='filled'
          sx={{ width: '100%', color: '#FFFFFF' }}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
