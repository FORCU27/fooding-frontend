'use client';

import { useEffect, useState } from 'react';

import { authApi } from '@repo/api/ceo';
import { Button } from '@repo/design-system/components/b2c';
import { Input } from '@repo/design-system/components/ceo';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import VerificationResult from './VerificationResult';

interface FormFields {
  name: string;
  phone: string;
  verifyCode: string;
}

const FindAccountForm = () => {
  const [activeTab, setActiveTab] = useState<'id' | 'pw'>('id');
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3분(180초)
  const [verified, setVerified] = useState(false); // 인증 완료 여부
  const [foundEmail, setFoundEmail] = useState<string>(''); // 아이디 찾기 결과
  console.log('verified', verified);

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
    reset,
  } = useForm<FormFields>();

  const nameValue = watch('name');
  const phoneValue = watch('phone');

  const onSendVerification = () => {
    if (!nameValue || !phoneValue) return;

    setShowVerifyInput(true);
    setCountdown(180); // 타이머 리셋
    console.log('인증번호 전송');
    // 인증번호 전송 API 호출
    authApi.postVerifyPhone(nameValue, phoneValue);
  };

  const onSubmit = async (data: FormFields) => {
    console.log('🔥 onSubmit data', data);

    const code = data.verifyCode.trim();
    console.log('🔥 trimmed code:', code);

    if (!code || code.length !== 6) {
      alert('인증번호 6자리를 정확하게 입력하세요');
      return;
    }

    const res = await authApi.getVerifyPhone(phoneValue, Number(code));
    console.log('🔥 verify response', res);

    const success = res?.status ?? res?.data?.success;

    if (!success) {
      alert('인증에 실패했습니다.');
      return;
    }

    setVerified(true);

    if (activeTab === 'id') {
      const result = await authApi.getFindEmailResult(phoneValue, Number(data.verifyCode));
      console.log('result ~~~', result);
      setFoundEmail(result?.data?.email);
    }
  };

  const onSendSmsLink = async () => {
    await authApi.postFindPasswordSms({
      name: nameValue,
      phoneNumber: phoneValue,
      code: Number(watch('verifyCode')),
    });
    alert('문자로 비밀번호 재설정 링크를 전송했습니다.');
  };

  const onSendEmailLink = async () => {
    await authApi.postFindPasswordEmail({
      name: nameValue,
      phoneNumber: phoneValue,
      code: Number(watch('verifyCode')),
    });
    alert('이메일로 비밀번호 재설정 링크를 전송했습니다.');
  };

  // 인증번호 입력 countdown
  useEffect(() => {
    if (!showVerifyInput) return;

    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showVerifyInput, countdown]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const actionBtnText = activeTab === 'id' ? '아이디 찾기' : '비밀번호 찾기';
  const isSendBtnDisabled = !(nameValue && phoneValue);

  return (
    <main className='w-[450px]'>
      <h1 className='headline-2'>아이디 · 비밀번호 찾기</h1>

      {verified && foundEmail ? (
        <VerificationResult
          target={activeTab}
          foundEmail={foundEmail}
          onSendSmsLink={onSendSmsLink}
          onSendEmailLink={onSendEmailLink}
        />
      ) : (
        <>
          {/* 탭 */}
          <div className='flex my-[45px]'>
            <button
              type='button'
              className={clsx(
                'flex-1 py-[23px] text-center subtitle-2',
                activeTab === 'id'
                  ? 'text-primary-pink border-b-2 border-primary-pink'
                  : 'text-gray-4 border-b-2 border-gray-4',
              )}
              onClick={() => {
                setShowVerifyInput(false);
                setActiveTab('id');
                if (activeTab !== 'id') reset();
              }}
            >
              아이디 찾기
            </button>

            <button
              type='button'
              className={clsx(
                'flex-1 py-[23px] text-center subtitle-2',
                activeTab === 'pw'
                  ? 'text-primary-pink border-b-2 border-primary-pink'
                  : 'text-gray-4 border-b-2 border-gray-4',
              )}
              onClick={() => {
                setShowVerifyInput(false);
                setActiveTab('pw');
                if (activeTab !== 'pw') reset();
              }}
            >
              비밀번호 찾기
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[20px]'>
            {/* 이름 */}
            <div className='flex flex-col'>
              <label className='body-b mb-2'>이름</label>
              <Input type='text' {...register('name', { required: true })} />
            </div>

            {/* 휴대폰 번호 */}
            <div className='flex flex-col'>
              <label className='body-b mb-2'>휴대폰 번호</label>
              <Input
                type='tel'
                placeholder='- 없이 숫자만 입력'
                {...register('phone', {
                  required: true,
                  pattern: {
                    value: /^010[0-9]{8}$/,
                    message: '올바른 휴대폰 번호를 입력해주세요',
                  },
                })}
              />
            </div>

            {/* 인증번호 발송 버튼 */}
            {!showVerifyInput && (
              <Button
                type='button'
                disabled={isSendBtnDisabled}
                onClick={onSendVerification}
                className='py-[17px] rounded-full subtitle-1 mt-[48px]'
              >
                인증번호 발송
              </Button>
            )}

            {/* 인증번호 입력 영역 */}
            {showVerifyInput && (
              <div className='flex flex-col gap-6'>
                <div>
                  <label className='body-b mb-2'>인증번호 입력</label>
                  <div className='flex items-center gap-3'>
                    <Input
                      type='text'
                      maxLength={6}
                      {...register('verifyCode', { required: true })}
                      suffix={<span className='text-error-red'>{formatTime(countdown)}</span>}
                    />
                  </div>
                </div>
                <Button asChild>
                  <button
                    type='submit'
                    className='py-[17px] mt-[48px] rounded-full subtitle-1 bg-primary-pink text-white'
                  >
                    {actionBtnText}
                  </button>
                </Button>
              </div>
            )}
          </form>
        </>
      )}
    </main>
  );
};

export default FindAccountForm;
