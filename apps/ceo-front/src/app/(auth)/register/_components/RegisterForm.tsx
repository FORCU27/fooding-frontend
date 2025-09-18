'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { authApi } from '@repo/api/auth';
import { Checkbox, Button } from '@repo/design-system/components/b2c';
import { EyeOffIcon, EyeOnIcon } from '@repo/design-system/icons';
import { isAxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { Input } from '../../_components/Input';

const MIN_PASSWORD_LENGTH = 4;
const MAX_PASSWORD_LENGTH = 20;
const MAX_EMAIL_LENGTH = 50;
const MAX_NAME_LENGTH = 20;
const MAX_REFERRAL_CODE_LENGTH = 100;

const registerFormSchema = z
  .object({
    email: z.email('유효한 이메일을 입력해주세요.').min(1, '이메일을 입력해주세요.'),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`),
    confirmPassword: z.string().min(1, '비밀번호를 한번 더 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),
    phoneNumber: z.string().min(1, '휴대폰 번호를 입력해주세요.'),
    referralCode: z.string().optional(),
    privacy: z.boolean().refine((val) => val === true, {
      message: '개인정보 수집 및 이용에 동의해주세요.',
    }),
    marketing: z.boolean(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

interface RegisterFormProps {
  onSignupSuccess: () => void;
}

export default function RegisterForm({ onSignupSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phoneNumber: '',
      referralCode: '',
      privacy: false,
      marketing: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'CEO',
        phoneNumber: data.phoneNumber.replace(/-/g, ''),
        nickname: data.name,
        referralCode: data.referralCode,
        marketingConsent: data.marketing,
      });

      onSignupSuccess();
    } catch (error) {
      if (isAxiosError(error)) {
        form.setError('root', {
          message: error.response?.data.message,
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-[20px]'>
        {/* 아이디 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>이메일</label>
          <Controller
            name='email'
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                type='email'
                aria-invalid={!!form.formState.errors.email}
                maxLength={MAX_EMAIL_LENGTH}
              />
            )}
          />
          {form.formState.errors.email && (
            <p className='body-6 text-red-500 mt-1'>{form.formState.errors.email.message}</p>
          )}
        </div>
        {/* 비밀번호 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호</label>
          <Controller
            name='password'
            control={form.control}
            render={({ field }) => (
              <div className='relative'>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={!!form.formState.errors.password}
                  maxLength={MAX_PASSWORD_LENGTH}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-5 cursor-pointer hover:text-gray-6'
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                </button>
              </div>
            )}
          />
          {form.formState.errors.password && (
            <p className='body-6 text-red-500 mt-1'>{form.formState.errors.password.message}</p>
          )}
        </div>
        {/* 비밀번호 확인 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호 확인</label>
          <div className='relative'>
            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showConfirmPassword ? 'text' : 'password'}
                  aria-invalid={!!form.formState.errors.confirmPassword}
                  maxLength={MAX_PASSWORD_LENGTH}
                />
              )}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className='absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700'
              aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            >
              {showConfirmPassword ? <EyeOnIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className='body-6 text-red-500 mt-1'>
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* 이름 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>이름</label>
          <Controller
            name='name'
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                aria-invalid={!!form.formState.errors.name}
                maxLength={MAX_NAME_LENGTH}
              />
            )}
          />
          {form.formState.errors.name && (
            <p className='body-6 text-red-500 mt-1'>{form.formState.errors.name.message}</p>
          )}
        </div>
        {/* 휴대폰 번호 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>휴대폰 번호</label>
          <Controller
            name='phoneNumber'
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => {
                  const formatted = formatAsPhoneNumberDashed(numberOnly(e.target.value));
                  field.onChange(formatted);
                }}
                aria-invalid={!!form.formState.errors.phoneNumber}
              />
            )}
          />
          {form.formState.errors.phoneNumber && (
            <p className='body-6 text-red-500 mt-1'>{form.formState.errors.phoneNumber.message}</p>
          )}
        </div>
        {/* 추천인 코드 (선택) */}
        <div className='flex flex-col'>
          <label className='flex gap-[4px] body-b mb-2'>
            추천인 코드
            <span className='text-gray-5'>(선택)</span>
          </label>
          <Controller
            name='referralCode'
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                aria-invalid={!!form.formState.errors.referralCode}
                maxLength={MAX_REFERRAL_CODE_LENGTH}
              />
            )}
          />
        </div>
      </div>

      {/* 개인정보 동의 */}
      <div className='flex flex-col gap-[2px] pt-[12px] pb-[68px]'>
        <div className='flex'>
          <label className='flex gap-[8px] items-center cursor-pointer'>
            <Controller
              name='privacy'
              control={form.control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  aria-invalid={!!form.formState.errors.privacy}
                />
              )}
            />
            <span className='body-2'>
              <span className='text-info-blue'>[필수] </span>
              개인정보 수집 및 이용 동의
            </span>
          </label>
        </div>
        {form.formState.errors.privacy && (
          <p className='body-6 text-red-500 mt-1 mb-3'>{form.formState.errors.privacy.message}</p>
        )}
        <div className='flex'>
          <label className='flex gap-[8px] items-center cursor-pointer'>
            <Controller
              name='marketing'
              control={form.control}
              render={({ field }) => <Checkbox checked={field.value} onChange={field.onChange} />}
            />
            <span className='body-2'>[선택] 마케팅 수신동의</span>
          </label>
        </div>
        {form.formState.errors.root && (
          <p className='font-medium text-red-500 mt-4'>{form.formState.errors.root.message}</p>
        )}
      </div>
      <Button type='submit' className='py-[17px] rounded-full subtitle-1'>
        회원가입
      </Button>
    </form>
  );
}

const numberOnly = (value: string) => {
  return value.replace(/[^0-9]/g, '');
};

// 000-0000-0000
const formatAsPhoneNumberDashed = (value: string) => {
  if (value.length <= 3) return value;
  if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;

  return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
};
