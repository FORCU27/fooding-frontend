import { IconProps } from '../type';

const XIcon = ({ color = 'currentColor', fill = 'none', ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={18}
    viewBox='0 0 20 18'
    fill={fill}
    color={color}
    {...props}
  >
    <path
      d='M15.7511 0H18.8178L12.1179 7.62474L20 18H13.8282L8.99457 11.7073L3.46363 18H0.394883L7.56109 9.84464L0 0H6.32809L10.6975 5.75161L15.7511 0ZM14.6747 16.1722H16.3741L5.40481 1.73182H3.58137L14.6747 16.1722Z'
      fill='currentColor'
    />
  </svg>
);

export default XIcon;
