import { IconProps } from '../type';

export default function B2BCounterMinusIcon({
  size = 30,
  fill = 'var(--color-gray-5)',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7.94531 15H22.0582'
        stroke='#767676'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='15' cy='15' r='14' stroke='#767676' strokeWidth='2' />
    </svg>
  );
}
