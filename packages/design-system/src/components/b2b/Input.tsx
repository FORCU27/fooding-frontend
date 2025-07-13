import React from 'react';

import clsx from 'clsx';

type InputStatus = 'off' | 'on' | 'error' | 'correct';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus;
}

const Input: React.FC<InputProps> = ({ status = 'off', className, ...props }) => {
  const baseStyle =
    'w-full h-[94px] px-[40px] py-[30px] rounded-full bg-gray-1 outline-none subtitle-4-1';
  const textStyle = {
    off: 'text-gray-5',
    on: 'text-black',
    error: 'text-error-red',
    correct: 'text-success-green',
  }[status];

  const borderStyle = {
    off: 'border-transparent',
    on: 'border-transparent',
    error: 'border border-error-red',
    correct: 'border border-success-green',
  }[status];

  return <input {...props} className={clsx(baseStyle, textStyle, borderStyle, className)} />;
};

export default Input;
