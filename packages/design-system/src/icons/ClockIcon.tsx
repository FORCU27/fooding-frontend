import { IconProps } from './type';

const ClockIcon = ({ size = 24, color = 'currentColor', fill = 'none', ...props }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill={fill}
      color={color}
      strokeWidth='2'
      {...props}
    >
      <path
        d='M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ClockIcon;
