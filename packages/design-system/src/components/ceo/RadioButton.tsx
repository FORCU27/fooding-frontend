import { useCallback, useId } from 'react';

type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
};

const RadioButton = ({
  label,
  value,
  checked,
  onChange,
  name,
  className = '',
}: RadioButtonProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const radioBtnId = useId();

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer body-2 ${className}`}
      htmlFor={radioBtnId}
      aria-checked={checked}
      role='radio'
    >
      <input
        type='radio'
        id={radioBtnId}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className='
          appearance-none
          border border-gray-3
          w-6 h-6
          rounded-full
          cursor-pointer
          relative
          focus:outline-none focus:ring-2 focus:ring-fooding-purple
          transition-colors
          checked:border-fooding-purple
          checked:bg-white
          before:content-[]
          before:absolute
          before:top-1/2
          before:left-1/2
          before:-translate-x-1/2
          before:-translate-y-1/2
          before:w-[60%]
          before:h-[60%]
          before:bg-fooding-purple
          before:rounded-full
          before:scale-0
          checked:before:scale-100
          before:transition-transform
        '
      />
      {label || <span className='sr-only'>라디오 버튼</span>}
    </label>
  );
};

export default RadioButton;
