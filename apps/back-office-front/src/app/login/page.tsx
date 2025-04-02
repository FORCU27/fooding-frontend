'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Button, Container, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(`email: ${email}`);
    console.log(`password: ${password}`);

    router.push('/');
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        height: '100%',
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
            borderRadius: 1,
            p: 3,
            boxShadow: 1,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography
            component='h1'
            variant='h5'
            align='center'
            sx={{ color: 'text.primary' }}
            gutterBottom
          >
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

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              로그인
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
