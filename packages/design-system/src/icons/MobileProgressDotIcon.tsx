import { IconProps } from './type';

const MobileProgressDotIcon = ({ className = '' }: IconProps & { className?: string }) => {
  return (
    <svg
      className={className}
      width='39'
      height='8'
      viewBox='0 0 39 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='3.5' cy='4' r='3.5' fill='black'>
        <animate
          attributeName='fill-opacity'
          values='0.3;1;0.3'
          dur='1s'
          repeatCount='indefinite'
        />
      </circle>

      <circle cx='19' cy='4' r='4' fill='black'>
        <animate
          attributeName='fill-opacity'
          values='0.3;1;0.3'
          dur='1s'
          begin='0.2s'
          repeatCount='indefinite'
        />
      </circle>

      <circle cx='35' cy='4' r='4' fill='black'>
        <animate
          attributeName='fill-opacity'
          values='0.3;1;0.3'
          dur='1s'
          begin='0.4s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  );
};

export default MobileProgressDotIcon;
