import { IconProps } from '../type';

const WifiIcon = ({ size = 24, color = 'currentColor', fill = 'none', ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={fill}
    color={color}
    {...props}
  >
    <path
      d='M12.002 19.5H12.012M22.8084 8.70076C19.9615 6.09199 16.1676 4.5 12.0018 4.5C7.8361 4.5 4.04219 6.09199 1.19531 8.70076M4.73389 12.243C6.67201 10.5357 9.21602 9.5 12.0019 9.5C14.7878 9.5 17.3319 10.5357 19.27 12.243M15.7003 15.7751C14.6812 14.9763 13.3971 14.5 12.0018 14.5C10.5854 14.5 9.28368 14.9908 8.25732 15.8116'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default WifiIcon;
