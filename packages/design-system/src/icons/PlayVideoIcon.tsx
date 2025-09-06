import { IconProps } from './type';

const PlayVideoIcon = ({ size = 50, fill = 'none', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 50 50'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='25' cy='25' r='25' fill='black' fillOpacity='0.5' />
      <path
        d='M20 17.9876C20 17.0164 20 16.5308 20.2025 16.2631C20.3789 16.03 20.6485 15.8857 20.9404 15.8682C21.2754 15.8482 21.6795 16.1176 22.4875 16.6563L33.0031 23.6667C33.6708 24.1118 34.0046 24.3343 34.1209 24.6149C34.2227 24.8601 34.2227 25.1357 34.1209 25.381C34.0046 25.6615 33.6708 25.8841 33.0031 26.3292L22.4875 33.3396C21.6795 33.8783 21.2754 34.1476 20.9404 34.1276C20.6485 34.1102 20.3789 33.9659 20.2025 33.7327C20 33.465 20 32.9795 20 32.0083V17.9876Z'
        fill='white'
      />
    </svg>
  );
};

export default PlayVideoIcon;
