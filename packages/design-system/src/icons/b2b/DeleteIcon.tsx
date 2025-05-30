import { IconProps } from '../type';

export default function B2BDeleteIcon({
  size = 46,
  fill = 'var(--color-gray-5)',
  ...props
}: IconProps) {
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
        d='M38.3307 23H7.66406M7.66406 23L19.1641 34.5M7.66406 23L19.1641 11.5'
        stroke='black'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
