import { IconProps } from './type';

export default function CloseIcon({
  size = 60,
  color = '#111111',
  fill = 'none',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M45 15L15 45M15 15L45 45'
        fill={fill}
        stroke={color}
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
