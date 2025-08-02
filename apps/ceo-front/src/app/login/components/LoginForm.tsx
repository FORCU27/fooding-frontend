'use client';

import { JSX, useState, useEffect } from 'react';

import { SocialPlatform, socialPlatforms } from '@repo/api/auth';
import { SocialButton } from '@repo/design-system/components';
import { Input, Checkbox, Button } from '@repo/design-system/components/b2c';
import {
  AppleIcon,
  GoogleIcon,
  KakaoIcon,
  NaverIcon,
  EyeOffIcon,
  EyeOnIcon,
} from '@repo/design-system/icons';

import { useSocialLogin, platformStyles } from '@/hooks/useSocialLogin';

interface LoginFormProps {
  email: string;
  password: string;
  errorMessage: string;
  isRememberId: boolean;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setIsRememberId: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
}

const platformIcons: Record<SocialPlatform, JSX.Element> = {
  KAKAO: <KakaoIcon size={30} />,
  NAVER: <NaverIcon size={30} />,
  APPLE: <AppleIcon size={30} fill='white' />,
  GOOGLE: <GoogleIcon size={30} />,
};

export default function LoginForm({
  email,
  password,
  errorMessage,
  isRememberId,
  setEmail,
  setPassword,
  setIsRememberId,
  handleLogin,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSocialLogin } = useSocialLogin();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsRememberId(true);
    }
  }, [setEmail, setIsRememberId]);

  return (
    <>
      <form>
        <div className='flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>아이디</label>
            <Input
              required
              autoFocus
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`text-start px-[20px] py-[18px] body-2 h-[58px] ${errorMessage ? 'border-red-500 text-red-500' : ''}`}
            />
          </div>
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>비밀번호</label>
            <div className='relative'>
              <Input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`text-start px-[20px] py-[18px] body-2 h-[58px] ${errorMessage ? 'border-red-500 text-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={handleTogglePasswordVisibility}
                className='absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700'
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
              >
                {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>
        </div>

        <div className='h-[12px]' />
        <div className='flex justify-between'>
          <div className='flex gap-[8px] items-center cursor-pointer'>
            <Checkbox
              checked={isRememberId}
              onChange={(checked) => setIsRememberId(Boolean(checked))}
            />
            <label onClick={() => setIsRememberId((prev) => !prev)}>아이디 저장</label>
          </div>
          <label className='body-6 text-gray-5'>아이디/비밀번호를 잊으셨나요?</label>
        </div>

        {errorMessage.length > 0 && (
          <p className='mt-2 text-sm text-red-500 whitespace-pre-line'>{errorMessage}</p>
        )}

        <div className='h-[68px]' />
        <Button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          disabled={email.length === 0 || password.length === 0}
          className='py-[17px] rounded-full subtitle-1'
        >
          로그인
        </Button>
      </form>
      <div className='h-[120px]' />
      {/* 소셜 로그인 버튼 */}
      <div className='flex justify-center gap-4 mt-8'>
        {socialPlatforms.map((platform) => (
          <SocialButton
            key={platform}
            platform={platform}
            icon={platformIcons[platform]}
            onClick={() => handleSocialLogin(platform)}
            styles={platformStyles[platform]}
          />
        ))}
      </div>
    </>
  );
}
