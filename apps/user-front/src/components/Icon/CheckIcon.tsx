import { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

function CheckIcon({ size = 100, color = '#000000', ...props }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 50 50'
      fill={color}
      {...props}
    >
      <path
        fill='none'
        strokeWidth='2'
        stroke={color}
        d='M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 12.317 37.683 2 25 2 Z'
      />
      <path
        className='check-path'
        fill='none'
        strokeWidth='2'
        stroke={color}
        d='M15 25 L22 32 L35 15'
      />
    </svg>
  );
}

export default CheckIcon;
