'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import RegisterForm from './_components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main>
      <h1 className='headline-2'>회원가입</h1>
      <div className='h-[12px]' />
      <div className='flex flex-col gap-[4px]'>
        <Link href='/login' className='flex body-6 text-info-blue w-fit cursor-pointer'>
          이미 계정이 있으신가요?
        </Link>
      </div>
      <div className='h-[45px]' />
      <RegisterForm onSignupSuccess={() => router.replace('/login')} />
    </main>
  );
}
