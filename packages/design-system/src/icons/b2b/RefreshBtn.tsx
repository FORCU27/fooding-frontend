import { IconProps } from '../type';

export default function B2BRefreshIcon({ size = 46, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 46 46'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M39 20.2778C39 20.2778 35.7287 15.8766 33.0711 13.2505C30.4135 10.6244 26.741 9 22.6842 9C14.5743 9 8 15.4919 8 23.5C8 31.5081 14.5743 38 22.6842 38C29.3787 38 35.0269 33.5763 36.7945 27.5278M39 20.2778V10.6111M39 20.2778H29.2105'
        stroke='black'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
