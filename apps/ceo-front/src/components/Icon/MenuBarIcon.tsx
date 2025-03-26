import { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

function MenuBarIcon({ size = 16, color = '#000000', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 448 512"
      fill="currentColor"
      {...props}>
      <path
        d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
        stroke={color}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default MenuBarIcon;
