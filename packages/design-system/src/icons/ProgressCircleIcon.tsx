import { IconProps } from './type';

const ProgressCircleIcon = ({
  size = 32,
  className = '',
  ...props
}: IconProps & { className?: string }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 left-0 animate-spin origin-center'
        {...props}
      >
        <path
          d='M16 32C7.18 32 0 24.82 0 16C0 7.18 7.18 0 16 0C24.82 0 32 7.18 32 16C32 24.82 24.82 32 16 32ZM16 3.34C9.02 3.34 3.34 9.02 3.34 16C3.34 22.98 9.02 28.66 16 28.66C22.98 28.66 28.66 22.98 28.66 16C28.66 9.02 22.98 3.34 16 3.34Z'
          fill='#E2DFDF'
        />
        <path
          d='M16 32C7.18 32 0 24.82 0 16C0 7.18 7.18 0 16 0C16.92 0 17.6667 0.746667 17.6667 1.66667C17.6667 2.58667 16.92 3.33333 16 3.33333C9.02 3.34 3.34 9.02 3.34 16C3.34 22.98 9.02 28.66 16 28.66C22.98 28.66 28.66 22.98 28.66 16C28.66 15.08 29.4067 14.3333 30.3267 14.3333C31.2467 14.3333 31.9933 15.08 31.9933 16C31.9933 24.82 24.8133 32 15.9933 32H16Z'
          fill='currentColor'
        />
      </svg>
    </div>
  );
};

export default ProgressCircleIcon;
