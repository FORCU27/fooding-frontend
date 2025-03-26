import { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

function ChevronLeftIcon({ size = 16, color = '#000000', ...props }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M15 18L9 12L15 6' stroke={color} strokeWidth={2} fillRule='evenodd' />
    </svg>
  );
}

export default ChevronLeftIcon;
