import React from 'react';

interface CheckboxProps {
  size?: 'small' | 'large';
  checked?: boolean;
  pressed?: boolean;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  size = 'small',
  checked = false,
  pressed = false,
  disabled = false,
}) => {
  const isLarge = size === 'large';

  const dimension = isLarge ? 34 : 25;
  const fillColor = disabled || !checked ? '#E2DFDF' : pressed ? '#CC202F' : '#FF2B3D';

  const circleProps = {
    cx: dimension / 2,
    cy: dimension / 2,
    r: dimension / 2,
    fill: fillColor,
  };

  const pathD = isLarge
    ? 'M24.5642 12.2891L14.1753 22.678L9.45312 17.9557'
    : 'M18.1693 9.25L10.3776 17.0417L6.83594 13.5';

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox={`0 0 ${dimension} ${dimension}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
    >
      <circle {...circleProps} />
      <path d={pathD} stroke='white' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default Checkbox;
