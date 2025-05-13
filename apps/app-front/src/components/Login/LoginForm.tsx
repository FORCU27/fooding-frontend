import { PropsWithoutRef, useState } from 'react';

import { useForm } from 'react-hook-form';

export interface FormProps {
  handleSubmit: (data: { email: string; password: string }) => Promise<void>;
  errorMessage: string;
  isLoading: boolean;
}

const INPUT_STYLES =
  'w-[642px] h-[94px] p-5 bg-[#F1F3F5] rounded-[50px] text-[#767676] text-[28px]';

const ERROR_INPUT_STYLES =
  'w-[642px] h-[94px] p-5 border border-[#E11300] bg-[#F1F3F5] rounded-[50px] text-[#E11300] text-[28px]';

const LoginForm = (props: PropsWithoutRef<FormProps>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleSubmit, errorMessage, isLoading } = props;
  const {
    register,
    setValue,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: '',
      password: '',
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
      onSubmit={onSubmit(handleSubmit)}
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
            autoFocus
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

export function VisibilityOffIcon() {
  return (
    <svg width='36' height='34' viewBox='0 0 36 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.9049 5.4872C16.5823 5.38705 17.281 5.33333 18.0007 5.33333C26.509 5.33333 32.0922 12.8414 33.9678 15.8114C34.1949 16.1708 34.3084 16.3506 34.3719 16.6278C34.4196 16.836 34.4196 17.1644 34.3718 17.3726C34.3082 17.6498 34.1939 17.8308 33.9653 18.1926C33.4656 18.9836 32.7036 20.0952 31.6942 21.3008M9.2072 8.19173C5.60375 10.6362 3.15742 14.0323 2.03518 15.8088C1.80714 16.1698 1.69312 16.3503 1.62957 16.6275C1.58183 16.8357 1.58181 17.1641 1.62952 17.3723C1.69305 17.6495 1.80655 17.8292 2.03356 18.1886C3.90924 21.1586 9.49235 28.6667 18.0007 28.6667C21.4314 28.6667 24.3865 27.446 26.8147 25.7943M3.00069 2L33.0007 32M14.4652 13.4645C13.5603 14.3693 13.0007 15.6193 13.0007 17C13.0007 19.7614 15.2393 22 18.0007 22C19.3814 22 20.6314 21.4404 21.5362 20.5355'
        stroke='#767676'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function VisibilityIcon() {
  return (
    <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.03354 21.1912C3.80656 20.8318 3.69307 20.6521 3.62954 20.375C3.58182 20.1668 3.58182 19.8384 3.62954 19.6302C3.69307 19.3531 3.80656 19.1734 4.03354 18.814C5.90922 15.844 11.4923 8.33594 20.0007 8.33594C28.509 8.33594 34.0921 15.844 35.9678 18.814C36.1948 19.1734 36.3083 19.3531 36.3718 19.6302C36.4195 19.8384 36.4195 20.1668 36.3718 20.375C36.3083 20.6521 36.1948 20.8318 35.9678 21.1912C34.0921 24.1612 28.509 31.6693 20.0007 31.6693C11.4923 31.6693 5.90922 24.1612 4.03354 21.1912Z'
        stroke='#767676'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.0007 25.0026C22.7621 25.0026 25.0007 22.764 25.0007 20.0026C25.0007 17.2412 22.7621 15.0026 20.0007 15.0026C17.2392 15.0026 15.0007 17.2412 15.0007 20.0026C15.0007 22.764 17.2392 25.0026 20.0007 25.0026Z'
        stroke='#767676'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
