import { IconProps } from './type';

const CheckIcon = ({ size = 24, color = 'currentColor', fill = 'none', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 17 17'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      strokeWidth='2'
      stroke={color}
      {...props}
    >
      <path
        d='M14.1693 4.25L6.3776 12.0417L2.83594 8.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CheckIcon;
