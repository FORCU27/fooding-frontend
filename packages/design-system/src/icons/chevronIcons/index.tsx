import { IconProps } from '../type';

export const ChevronDownIcon = ({
  size = 20,
  color = 'currentColor',
  fill = 'none',
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill={fill}
    color={color}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M5 7.5L10 12.5L15 7.5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const ChevronRightIcon = ({
  size = 24,
  color = 'currentColor',
  fill = 'none',
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill={fill}
    color={color}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7.5 15L12.5 10L7.5 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
