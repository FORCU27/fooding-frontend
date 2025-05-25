import { IconProps } from './type';

interface CheckIconProps extends IconProps {
  sizeMode: 'medium' | 'large';
  variant: 'default' | 'pressed' | 'disabled';
}

export function CheckIcon({ sizeMode, variant, ...props }: CheckIconProps) {
  const getSvg = () => {
    if (sizeMode === 'medium') {
      const circleFill =
        variant === 'default' ? '#FF2B3D' : variant === 'pressed' ? '#C32230' : '#D9D9D9';

      return (
        <svg
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          <circle cx='12.5' cy='12.5' r='12.5' fill={circleFill} />
          <path
            d='M18.1693 9.25L10.3776 17.0417L6.83594 13.5'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    } else {
      const circleFill =
        variant === 'default' ? '#FF2B3D' : variant === 'pressed' ? '#C32230' : '#D9D9D9';

      return (
        <svg
          width='34'
          height='34'
          viewBox='0 0 34 34'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          <circle cx='17' cy='17' r='17' fill={circleFill} />
          <path
            d='M24.5642 12.2891L14.1753 22.678L9.45312 17.9557'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    }
  };

  return getSvg();
}
