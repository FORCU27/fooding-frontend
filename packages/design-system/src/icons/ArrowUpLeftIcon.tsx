import { IconProps } from '.';

const ArrowUpLeftIcon = ({
  size = 24,
  color = 'currentColor',
  fill = 'none',
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill={fill}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      {...props}
    >
      <path
        d='M17 17L7 7M7 7V17M7 7H17'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowUpLeftIcon;
