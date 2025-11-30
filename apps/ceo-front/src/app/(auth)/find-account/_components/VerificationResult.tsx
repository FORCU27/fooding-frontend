import Link from 'next/link';

import { Button } from '@repo/design-system/components/b2c';

interface Props {
  target: 'id' | 'pw';
  foundEmail?: string;
  onSendSmsLink?: () => void;
  onSendEmailLink?: () => void;
}

const VerificationResult = ({ target, foundEmail, onSendSmsLink, onSendEmailLink }: Props) => {
  return (
    <div>
      {target === 'id' ? (
        <div className='flex flex-col'>
          <p className='body-1 text-gray-5 pt-[12px]'>
            인증된 휴대폰 번호로 가입된 아이디입니다. 아이디 확인 후 로그인을 진행해주세요.
          </p>
          <div className='flex flex-col gap-[4px] py-[100px]'>
            <span className='subtitle-2'>{foundEmail}</span>
            {/* <span className='subtitle-6 text-gray-5'>가입일 2024.02.02</span> */}
          </div>
          <div className='flex flex-col gap-[12px] justify-center'>
            <Link href='/login'>
              <Button className='rounded-full'>로그인하러 가기</Button>
            </Link>
            <span className='body-6 text-info-blue text-center'>비밀번호를 잊으셨나요?</span>
          </div>
        </div>
      ) : (
        <div className='flex flex-col pt-[32px]'>
          <p className='flex flex-col gap-[12px]'>
            <span className='subtitle-2'>비밀번호 재설정을 위한 링크가 전송됩니다</span>
            <span className='body-3 text-gray-5'>
              등록한 휴대폰 번호나 이메일을 통해 비밀번호 재설정 링크를 받아볼 수 있습니다.
            </span>
          </p>
          <div className='flex flex-col pt-[68px] justify-center items-center gap-[12px]'>
            <Button variant='outlined' className='rounded-full' onClick={onSendSmsLink}>
              휴대폰으로 받기
            </Button>
            <Button variant='outlined' className='rounded-full' onClick={onSendEmailLink}>
              이메일로 받기
            </Button>
            <Link href='/login'>
              <span className='text-center body-6 text-info-blue'>로그인하러 가기</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationResult;
