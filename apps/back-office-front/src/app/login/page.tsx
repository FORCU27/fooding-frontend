'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';

import { useAuth } from '@/libs/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      const returnTo = searchParams.get('returnTo');

      router.push(returnTo || '/');
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 1,
            p: 3,
            boxShadow: 1,
          }}
        >
          <Typography component='h1' variant='h5' align='center' gutterBottom>
            로그인
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='이메일'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='비밀번호'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Alert severity='error' sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
