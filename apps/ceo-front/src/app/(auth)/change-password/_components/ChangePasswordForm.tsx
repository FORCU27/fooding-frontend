'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { authApi } from '@repo/api/ceo';
import { Button } from '@repo/design-system/components/b2c';
import { EyeOffIcon, EyeOnIcon } from '@repo/design-system/icons';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '../../_components/Input';

const passwordSchema = z.string().min(1, '비밀번호는 1자 이상이어야 합니다');
//   .regex(/[0-9]/, '숫자를 포함해야 합니다')
//   .regex(/[a-zA-Z]/, '영문자를 포함해야 합니다');

const changePasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type ChangePasswordFormFields = z.infer<typeof changePasswordFormSchema>;

const ChangePasswordForm = () => {
  const searchParams = useSearchParams();
  const encodedLine = searchParams.get('encodedLine') || ''; // https://ceo.fooding.im/change-password?encodedLine=xxxx
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ChangePasswordFormFields>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authApi.resetPassword(encodedLine, data.password);
      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
      router.replace('/login');
    } catch (e) {
      alert(`비밀번호 재설정 중 오류 ${e} 가 발생했습니다.`);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-[20px]'>
        {/* 비밀번호 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호</label>
          <Controller
            name='password'
            control={form.control}
            render={({ field }) => (
              <div className='relative'>
                <Input
                  aria-invalid={!!form.formState.errors.password}
                  className='pr-14'
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-5 cursor-pointer hover:text-gray-6'
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

        {/* 비밀번호 확인 */}
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호 확인</label>
          <Controller
            name='confirmPassword'
            control={form.control}
            render={({ field }) => (
              <Input
                aria-invalid={!!form.formState.errors.confirmPassword}
                type={'password'}
                {...field}
              />
            )}
          />
          {form.formState.errors.confirmPassword && (
            <p className='mt-2 text-sm text-error-red whitespace-pre-wrap'>
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* 서버 에러 */}
      {form.formState.errors.root?.message && (
        <p className='mt-4 text-sm text-error-red whitespace-pre-wrap'>
          {form.formState.errors.root.message}
        </p>
      )}

      {/* 제출 버튼 */}
      <Button type='submit' className='py-[17px] rounded-full subtitle-1 mt-[68px]'>
        초기화
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
