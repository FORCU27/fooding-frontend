import { Button } from '@repo/design-system/components/b2c';
import { Controller } from 'react-hook-form';

const ChangePasswordForm = () => {
  return (
    <form>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호</label>
          {/* <input /> */}
        </div>
        <div className='flex flex-col'>
          <label className='body-b mb-2'>비밀번호 확인</label>
          {/* <input /> */}
        </div>
      </div>
      <Button type='submit' className='py-[17px] rounded-full subtitle-1 mt-[68px]'>
        초기화
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
