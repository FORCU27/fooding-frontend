import { IconProps } from './type';

const StarIcon = ({ size = 18, color = 'currentColor', fill = 'none', ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 18 17'
    fill={fill}
    color={color}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M10.623 0.993082L12.4231 4.57749L16.4485 5.1528C17.9328 5.36527 18.5255 7.15807 17.4518 8.18696L14.5391 10.9764L15.2265 14.9165C15.4804 16.3691 13.9281 17.478 12.6005 16.7917L9.00027 14.932L5.40006 16.7917C4.07245 17.478 2.52013 16.3691 2.774 14.9165L3.46148 10.9764L0.548765 8.18576C-0.526197 7.15687 0.0677648 5.36407 1.55206 5.15161L5.5774 4.57629L7.3775 0.991888C8.04191 -0.330629 9.95984 -0.330629 10.6243 0.991888L10.623 0.993082Z'
      stroke='currentColor'
    />
  </svg>
);

export default StarIcon;
