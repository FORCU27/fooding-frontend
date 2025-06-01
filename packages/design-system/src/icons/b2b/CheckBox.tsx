import { IconProps } from '../type';

export default function B2BCheckBoxIcon({
  size = 25,
  fill = 'var(--color-gray-5)',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='12.5' cy='12.5' r='12.5' fill={fill} />
      <path
        d='M18.1693 9.25L10.3776 17.0417L6.83594 13.5'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
