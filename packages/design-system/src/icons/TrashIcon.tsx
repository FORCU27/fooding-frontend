import { IconProps } from './type';

const TrashIcon = ({ size = 24, color = 'currentColor', fill = 'none', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      color={color}
      fill={fill}
      {...props}
    >
      <path
        d='M9 3.5H15M3 6.5H21M19 6.5L18.2987 17.0193C18.1935 18.5975 18.1409 19.3867 17.8 19.985C17.4999 20.5118 17.0472 20.9353 16.5017 21.1997C15.882 21.5 15.0911 21.5 13.5093 21.5H10.4907C8.90891 21.5 8.11803 21.5 7.49834 21.1997C6.95276 20.9353 6.50009 20.5118 6.19998 19.985C5.85911 19.3867 5.8065 18.5975 5.70129 17.0193L5 6.5M10 11V16M14 11V16'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default TrashIcon;
