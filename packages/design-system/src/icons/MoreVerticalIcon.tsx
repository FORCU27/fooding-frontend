import { IconProps } from './type';

const MoreVerticalIcon = ({
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
      color={color}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      strokeWidth={2}
      {...props}
    >
      <path d='M12.1562 13C12.7085 13 13.1562 12.5523 13.1562 12C13.1562 11.4477 12.7085 11 12.1562 11C11.604 11 11.1562 11.4477 11.1562 12C11.1562 12.5523 11.604 13 12.1562 13Z' />
      <path d='M12.1562 6C12.7085 6 13.1562 5.55228 13.1562 5C13.1562 4.44772 12.7085 4 12.1562 4C11.604 4 11.1562 4.44772 11.1562 5C11.1562 5.55228 11.604 6 12.1562 6Z' />
      <path d='M12.1562 20C12.7085 20 13.1562 19.5523 13.1562 19C13.1562 18.4477 12.7085 18 12.1562 18C11.604 18 11.1562 18.4477 11.1562 19C11.1562 19.5523 11.604 20 12.1562 20Z' />
      <path
        d='M12.1562 13C12.7085 13 13.1562 12.5523 13.1562 12C13.1562 11.4477 12.7085 11 12.1562 11C11.604 11 11.1562 11.4477 11.1562 12C11.1562 12.5523 11.604 13 12.1562 13Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.1562 6C12.7085 6 13.1562 5.55228 13.1562 5C13.1562 4.44772 12.7085 4 12.1562 4C11.604 4 11.1562 4.44772 11.1562 5C11.1562 5.55228 11.604 6 12.1562 6Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.1562 20C12.7085 20 13.1562 19.5523 13.1562 19C13.1562 18.4477 12.7085 18 12.1562 18C11.604 18 11.1562 18.4477 11.1562 19C11.1562 19.5523 11.604 20 12.1562 20Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MoreVerticalIcon;
