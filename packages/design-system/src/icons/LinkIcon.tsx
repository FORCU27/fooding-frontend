import { IconProps } from './type';

const LinkIcon = ({ size = 24, color = 'currentColor', fill = 'none', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      color={color}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      {...props}
    >
      <path
        d='M12.7076 18.8644L11.2933 20.2786C9.34072 22.2313 6.1749 22.2313 4.22228 20.2786C2.26966 18.326 2.26966 15.1602 4.22228 13.2076L5.63649 11.7933M18.3644 13.2076L19.7786 11.7933C21.7312 9.84072 21.7312 6.6749 19.7786 4.72228C17.826 2.76966 14.6602 2.76966 12.7076 4.72228L11.2933 6.13649M8.50045 16.0004L15.5005 9.00043'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LinkIcon;
