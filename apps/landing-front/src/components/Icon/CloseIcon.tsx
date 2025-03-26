import { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

function CloseIcon({ size = 16, color = '#000000', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}>
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        fillRule="evenodd"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CloseIcon;
