'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Button } from '@repo/design-system/components/b2c';
import { EyeOffIcon, EyeOnIcon } from '@repo/design-system/icons';
import { isAxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { Input } from '../../_components/Input';
import { useAuth } from '@/components/Provider/AuthProvider';

const loginFormSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export default function LoginForm() {
  const { login } = useAuth();

  const [isRememberId, setIsRememberId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
        role: 'CEO',
      });

      if (isRememberId) {
        localStorage.setItem('saved_email', data.email);
      } else {
        localStorage.removeItem('saved_email');
      }

      router.replace('/my');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        form.setError('root', {
          message: '이메일 또는 비밀번호가 일치하지 않습니다\n입력한 내용을 다시 확인해주세요',
        });
      }
    }
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      form.setValue('email', savedEmail);
      setIsRememberId(true);
    }
  }, [form, setIsRememberId]);

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex flex-col'>
          <label className='body-b mb-2'>이메일</label>
          <Controller
            name='email'
            control={form.control}
            render={({ field }) => (
              <Input
                aria-invalid={!!form.formState.errors.email || !!form.formState.errors.root}
                autoFocus
                type='email'
                {...field}
                onChange={(e) => {
                  form.clearErrors('root');
                  field.onChange(e);
                }}
              />
            )}
          />
          {form.formState.errors.email && (
            <p className='mt-2 text-sm text-error-red whitespace-pre-wrap'>
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호</label>
          <Controller
            name='password'
            control={form.control}
            render={({ field }) => (
              <div className='relative'>
                <Input
                  aria-invalid={!!form.formState.errors.password || !!form.formState.errors.root}
                  className='pr-14'
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  onChange={(e) => {
                    form.clearErrors('root');
                    field.onChange(e);
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-5 cursor-pointer hover:text-gray-6'
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                </button>
              </div>
            )}
          />
          {form.formState.errors.password && (
            <p className='mt-2 text-sm text-error-red whitespace-pre-wrap'>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-between mt-3'>
        <div className='flex gap-[8px] items-center cursor-pointer'>
          <Checkbox
            checked={isRememberId}
            onChange={(checked) => setIsRememberId(Boolean(checked))}
          />
          <label onClick={() => setIsRememberId((prev) => !prev)}>아이디 저장</label>
        </div>
        <Link href='/find-account'>
          <span className='body-6 text-gray-5 cursor-pointer'>아이디/비밀번호를 잊으셨나요?</span>
        </Link>
      </div>
      {form.formState.errors.root?.message && (
        <p className='mt-2 text-sm text-error-red whitespace-pre-wrap'>
          {form.formState.errors.root.message}
        </p>
      )}
      <Button type='submit' className='py-[17px] rounded-full subtitle-1 mt-[68px]'>
        로그인
      </Button>
    </form>
  );
}
