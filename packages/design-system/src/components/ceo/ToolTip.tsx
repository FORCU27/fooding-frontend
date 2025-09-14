import React from 'react';

interface ToolTipProps {
  children: React.ReactNode;
  className?: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center gap-1 mb-2 text-[#0080F8] text-xs ${className}`}>
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_3143_13820)'>
          <path
            d='M7.0013 4.66406V6.9974M7.0013 9.33073H7.00714M12.8346 6.9974C12.8346 10.2191 10.223 12.8307 7.0013 12.8307C3.77964 12.8307 1.16797 10.2191 1.16797 6.9974C1.16797 3.77573 3.77964 1.16406 7.0013 1.16406C10.223 1.16406 12.8346 3.77573 12.8346 6.9974Z'
            stroke='#0080F8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_3143_13820'>
            <rect width='14' height='14' fill='white' />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  );
};