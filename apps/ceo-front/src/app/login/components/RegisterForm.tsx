import { useState } from 'react';

import { authApi } from '@repo/api/auth';
import { Input, Checkbox, Button } from '@repo/design-system/components/b2c';
import { EyeOffIcon, EyeOnIcon } from '@repo/design-system/icons';
import { AxiosError } from 'axios';

import { AuthErrorResponse } from '../../../../../../packages/api/src/shared';

interface RegisterFormProps {
  onSignupSuccess: () => void;
}

export default function RegisterForm({ onSignupSuccess }: RegisterFormProps) {
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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const regPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    setPhoneNumber(result);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 유효성 검사
    if (!isAgreedToPrivacy) {
      setErrorMessage('개인정보 수집 및 이용 동의는 필수입니다.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      setLoading(true);
      await authApi.register({
        name,
        email,
        password,
        role: 'CEO',
        phoneNumber: phoneNumber.replace(/-/g, ''),
        nickname: name,
        referralCode: referralCode || undefined,
        marketingConsent,
      });

      onSignupSuccess();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<AuthErrorResponse>;
      const apiMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        '회원가입 중 오류가 발생했습니다.';
      setErrorMessage(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-[20px]'>
          {/* 아이디 */}
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>아이디</label>
            <Input
              required
              autoFocus
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`text-start px-[20px] py-[18px] body-2 h-[58px] ${
                errorMessage ? 'border-red-500 text-red-500' : ''
              }`}
            />
          </div>
          {/* 비밀번호 */}
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>비밀번호</label>
            <div className='relative'>
              <Input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`text-start px-[20px] py-[18px] body-2 h-[58px] ${
                  errorMessage ? 'border-red-500 text-red-500' : ''
                }`}
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
          {/* 비밀번호 확인 */}
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>비밀번호 확인</label>
            <div className='relative'>
              <Input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`text-start px-[20px] py-[18px] body-2 h-[58px] ${
                  errorMessage ? 'border-red-500 text-red-500' : ''
                }`}
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
          {/* 이름 */}
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>이름</label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='text-start px-[20px] py-[18px] body-2 h-[58px]'
            />
          </div>
          {/* 휴대폰 번호 */}
          <div className='flex flex-col gap-[8px]'>
            <label className='subtitle-3'>휴대폰 번호</label>
            <Input
              required
              value={phoneNumber}
              onChange={regPhoneNumber}
              className='text-start px-[20px] py-[18px] body-2 h-[58px]'
            />
          </div>
          {/* 추천인 코드 (선택) */}
          <div className='flex flex-col gap-[8px]'>
            <span className='flex gap-[4px] subtitle-3'>
              <label>추천인 코드</label>
              <label className='text-gray-5'>(선택)</label>
            </span>
            <Input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className='text-start px-[20px] py-[18px] body-2 h-[58px]'
            />
          </div>
        </div>

        {/* 개인정보 동의 */}
        <div className='flex flex-col gap-[2px] pt-[12px] pb-[68px]'>
          <div className='flex'>
            <div className='flex gap-[8px] items-center cursor-pointer'>
              <Checkbox
                checked={isAgreedToPrivacy}
                onChange={(checked) => setIsAgreedToPrivacy(Boolean(checked))}
              />
              <label className='body-2' onClick={() => setIsAgreedToPrivacy((prev) => !prev)}>
                <span className='text-blue-500'>[필수] </span>
                개인정보 수집 및 이용 동의
              </label>
            </div>
          </div>
          <div className='flex'>
            <div className='flex gap-[8px] items-center cursor-pointer'>
              <Checkbox
                checked={marketingConsent}
                onChange={(checked) => setMarketingConsent(Boolean(checked))}
              />
              <label className='body-2' onClick={() => setMarketingConsent((prev) => !prev)}>
                [선택] 마케팅 수신동의
              </label>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && <p className='text-red-500 text-sm pb-[12px]'>{errorMessage}</p>}

      {/* 회원가입 버튼 */}
      <Button
        type='submit'
        disabled={loading || !email || !password || !confirmPassword || !name || !phoneNumber}
        className='py-[17px] rounded-full subtitle-1'
      >
        {loading ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  );
}
