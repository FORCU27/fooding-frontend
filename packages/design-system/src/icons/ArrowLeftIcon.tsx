import { IconProps } from './type';

export default function ArrowLeftIcon({
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
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M47.5 30H12.5M12.5 30L30 47.5M12.5 30L30 12.5'
        fill={fill}
        stroke={color}
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
