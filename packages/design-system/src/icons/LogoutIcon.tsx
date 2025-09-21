import { IconProps } from './type';

const LogoutIcon = ({ size = 24, color = 'currentColor', fill = 'none', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={fill}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <path
        d='M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M10 14.1667C10 14.9416 10 15.3291 9.91482 15.647C9.68365 16.5098 9.00978 17.1836 8.14705 17.4148C7.82913 17.5 7.44164 17.5 6.66667 17.5H6.25C5.08515 17.5 4.50272 17.5 4.04329 17.3097C3.43072 17.056 2.94404 16.5693 2.6903 15.9567C2.5 15.4973 2.5 14.9149 2.5 13.75V6.25C2.5 5.08515 2.5 4.50272 2.6903 4.04329C2.94404 3.43072 3.43072 2.94404 4.04329 2.6903C4.50272 2.5 5.08515 2.5 6.25 2.5H6.66667C7.44164 2.5 7.82913 2.5 8.14705 2.58519C9.00978 2.81635 9.68365 3.49022 9.91482 4.35295C10 4.67087 10 5.05836 10 5.83333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LogoutIcon;
