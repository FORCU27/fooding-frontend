import { IconProps } from '../type';

export default function B2BCounterPlusIcon({
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
    >
      <path
        d='M15.0018 7.94531V22.0582M7.94531 15.0018H22.0582'
        stroke='#767676'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='15' cy='15' r='14' stroke='#767676' strokeWidth='2' />
    </svg>
  );
}
