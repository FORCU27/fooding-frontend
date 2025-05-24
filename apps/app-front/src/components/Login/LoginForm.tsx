import { PropsWithoutRef, useState } from 'react';

import { AuthLoginBody } from '@repo/api/auth';
import { VisibilityIcon, VisibilityOffIcon } from '@repo/design-system/icons';
import { useForm } from 'react-hook-form';

export interface FormProps {
  handleSubmit: (data: AuthLoginBody) => Promise<void>;
  errorMessage: string;
  isLoading: boolean;
}

const INPUT_STYLES =
  'w-[642px] h-[94px] p-5 bg-[#F1F3F5] rounded-[50px] text-[#767676] text-[28px]';

const ERROR_INPUT_STYLES =
  'w-[642px] h-[94px] p-5 border border-[#E11300] bg-[#F1F3F5] rounded-[50px] text-[#E11300] text-[28px]';

const LoginForm = (props: PropsWithoutRef<FormProps>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errorMessage, isLoading, handleSubmit: onSubmitFromProps } = props;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginBody>({
    defaultValues: {
      email: '',
      password: '',
      role: 'USER',
    },
    mode: 'onSubmit',
  });
  const handleClearEmailClick = () => {
    setValue('email', '');
  };

  const handleTogglePasswordVisibilityClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFromProps)}
      className='flex flex-col justify-center items-center'
      noValidate
    >
      <div className='flex flex-col gap-4'>
        <div className='relative'>
          <input
            required
            autoFocus
            type='email'
            placeholder='아이디를 입력해주세요.'
            className={errors.email ? ERROR_INPUT_STYLES : INPUT_STYLES}
            {...register('email')}
          />
          <button
            type='button'
            onClick={handleClearEmailClick}
            className='absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700'
            aria-label='이메일 지우기'
          >
            <ClearValueIcon />
          </button>
        </div>
        <div className='relative'>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호를 입력해주세요.'
            className={INPUT_STYLES}
            {...register('password')}
          />
          <button
            type='button'
            onClick={handleTogglePasswordVisibilityClick}
            className='absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700'
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        </div>
        <div className='h-[100px]'>
          {errors.email && (
            <p className='text-red-500 text-[24px] mt-1 ml-5'>{errors.email.message}</p>
          )}
          {errors.password && (
            <p className='text-red-500 text-[24px] mt-1 ml-5'>{errors.password.message}</p>
          )}
          {errorMessage}
        </div>
      </div>

      <button
        type='submit'
        className={`${INPUT_STYLES} text-[#767676] hover:bg-black hover:text-white cursor-pointer`}
      >
        {isLoading ? '로딩 중...' : '로그인'}
      </button>

      <ul className='flex text-[#767676] w-[430px] justify-center gap-10 mt-6 text-[20px]'>
        <li>회원가입</li>
        <hr className='flex border h-[24px]' />
        <li>아이디찾기</li>
        <hr className='flex border h-[24px]' />
        <li>비밀번호찾기</li>
      </ul>
    </form>
  );
};

export default LoginForm;

export function ClearValueIcon() {
  return (
    <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z'
        fill='#767676'
      />
      <path
        d='M15.1953 15.1953L25.3776 25.3776'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M25.375 15.1953L15.1927 25.3776'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}
