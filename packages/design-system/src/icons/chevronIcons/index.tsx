import { IconProps } from '../type';

export const ChevronDownIcon = ({
  size = 24,
  color = '#111111',
  fill = 'none',
  ...props
}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={fill}
    {...props}
  >
    <path
      d='M5 7.5L10 12.5L15 7.5'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
