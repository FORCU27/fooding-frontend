'use client';

import ChangePasswordForm from './_components/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <main>
      <h1 className='headline-2'>비밀번호 재설정</h1>
      <div className='flex flex-col gap-[4px] mb-[45px] mt-3'>
        <p className='body-3 text-gray-5'>새로운 비밀번호를 입력해주세요</p>
      </div>
      <ChangePasswordForm />
    </main>
  );
};

export default ChangePasswordPage;
