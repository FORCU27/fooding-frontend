import { useState } from 'react';

import { authApi } from '@repo/api/auth';
import { Input, Checkbox, Button } from '@repo/design-system/components/b2c';
import { EyeOffIcon, EyeOnIcon } from '@repo/design-system/icons';

interface RegisterFormProps {
  errorMessage: string;
}

export default function RegisterForm({ errorMessage }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isAgreedToPrivacy, setIsAgreedToPrivacy] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleRegister = () => {
    authApi.register({
      name: name,
      email: email,
      password: password,
      role: 'CEO',
      phoneNumber: phoneNumber,
      nickname: name,
    });
  };

  return (
    <>
      <form>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-[8px]'>
              <p className='subtitle-3'>아이디</p>
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
              <p className='subtitle-3'>비밀번호</p>
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
            <div className='flex flex-col gap-[8px]'>
              <p className='subtitle-3'>비밀번호 확인</p>
              <div className='relative'>
                <Input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className={`text-start px-[20px] py-[18px] body-2 h-[58px] ${errorMessage ? 'border-red-500 text-red-500' : ''}`}
                />
                <button
                  type='button'
                  onClick={handleToggleConfirmPasswordVisibility}
                  className='absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700'
                  aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  {showConfirmPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-[8px]'>
              <p className='subtitle-3'>이름</p>
              <Input
                required
                autoFocus
                // type='email'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={`text-start px-[20px] py-[18px] body-2 h-[58px]`}
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <p className='subtitle-3'>휴대폰 번호</p>
              <Input
                required
                autoFocus
                // type='email'
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className={`text-start px-[20px] py-[18px] body-2 h-[58px]`}
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <p className='subtitle-3'>추천인 코드 (선택)</p>
              <Input
                required
                autoFocus
                // type='email'
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(e.target.value);
                }}
                className={`text-start px-[20px] py-[18px] body-2 h-[58px]`}
              />
            </div>
          </div>

          <div className='flex flex-col gap-[2px] pt-[12px] pb-[68px]'>
            <div className='flex'>
              <div className='flex gap-[8px] items-center cursor-pointer'>
                <Checkbox
                  checked={isAgreedToPrivacy}
                  onChange={(checked) => setIsAgreedToPrivacy(Boolean(checked))}
                />
                <p onClick={() => setIsAgreedToPrivacy((prev) => !prev)}>
                  [필수] 개인정보 수집 및 이용 동의
                </p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex gap-[8px] items-center cursor-pointer'>
                <Checkbox
                  checked={marketingConsent}
                  onChange={(checked) => setMarketingConsent(Boolean(checked))}
                />
                <p onClick={() => setMarketingConsent((prev) => !prev)}>[선택] 마케팅 수신동의</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleRegister}
          disabled={
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0 ||
            name.length === 0 ||
            phoneNumber.length === 0
          }
          className='py-[17px] rounded-full subtitle-1'
        >
          회원가입
        </Button>
      </form>
    </>
  );
}
