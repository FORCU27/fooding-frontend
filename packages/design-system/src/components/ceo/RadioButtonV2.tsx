import React from 'react';

interface RadioButtonProps {
  id: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked = false,
  onChange,
  children,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        disabled={disabled}
        className='sr-only'
      />
      <label
        htmlFor={id}
        className={`flex items-center cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className='relative flex items-center justify-center'>
          {/* 라디오 버튼 외부 원 */}
          <div
            className={`w-5 h-5 rounded-full border-2 transition-colors ${
              checked ? 'border-gray-3 bg-white' : 'border-gray-3 bg-white'
            } ${disabled ? 'opacity-50' : ''}`}
          >
            {/* 라디오 버튼 내부 원 (선택 시 표시) */}
            {checked && (
              <div className='w-3 h-3 rounded-full bg-[#5865F2] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            )}
          </div>
        </div>
        <span className={`ml-2 text-sm ${disabled ? 'text-gray-400' : 'text-black'}`}>
          {children}
        </span>
      </label>
    </div>
  );
};

// 라디오 버튼 그룹 컴포넌트
interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
  className = '',
  direction = 'vertical',
}) => {
  return (
    <div
      className={`${
        direction === 'horizontal' ? 'flex flex-row gap-6' : 'flex flex-col gap-3'
      } ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === RadioButton) {
          const radioButtonChild = child as React.ReactElement<RadioButtonProps>;
          return React.cloneElement(radioButtonChild, {
            name,
            checked: radioButtonChild.props.value === value,
            onChange,
          });
        }
        return child;
      })}
    </div>
  );
};
