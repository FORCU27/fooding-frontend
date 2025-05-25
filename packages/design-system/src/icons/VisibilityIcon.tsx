import { IconProps } from './type';

export default function VisibilityIcon({
  size = 40,
  color = 'currentColor',
  fill = 'none',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 40 40'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      color={color}
      {...props}
    >
      <path
        d='M4.03354 21.1912C3.80656 20.8318 3.69307 20.6521 3.62954 20.375C3.58182 20.1668 3.58182 19.8384 3.62954 19.6302C3.69307 19.3531 3.80656 19.1734 4.03354 18.814C5.90922 15.844 11.4923 8.33594 20.0007 8.33594C28.509 8.33594 34.0921 15.844 35.9678 18.814C36.1948 19.1734 36.3083 19.3531 36.3718 19.6302C36.4195 19.8384 36.4195 20.1668 36.3718 20.375C36.3083 20.6521 36.1948 20.8318 35.9678 21.1912C34.0921 24.1612 28.509 31.6693 20.0007 31.6693C11.4923 31.6693 5.90922 24.1612 4.03354 21.1912Z'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.0007 25.0026C22.7621 25.0026 25.0007 22.764 25.0007 20.0026C25.0007 17.2412 22.7621 15.0026 20.0007 15.0026C17.2392 15.0026 15.0007 17.2412 15.0007 20.0026C15.0007 22.764 17.2392 25.0026 20.0007 25.0026Z'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
