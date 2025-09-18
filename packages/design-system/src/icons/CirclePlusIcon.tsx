import { IconProps } from './type';

const CirclePlusIcon = ({
  size = 24,
  color = 'currentColor',
  fill = 'none',
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill={fill}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.1875 8V16M8.1875 12H16.1875M22.1875 12C22.1875 17.5228 17.7103 22 12.1875 22C6.66465 22 2.1875 17.5228 2.1875 12C2.1875 6.47715 6.66465 2 12.1875 2C17.7103 2 22.1875 6.47715 22.1875 12Z'
        stroke='#111111'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CirclePlusIcon;
