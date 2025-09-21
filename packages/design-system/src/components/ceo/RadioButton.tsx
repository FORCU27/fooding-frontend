import { useId } from 'react';

type RadioColor = 'purple' | 'red';

type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
  color?: RadioColor;
};

const VARIANT = {
  purple: {
    ring: 'focus:ring-fooding-purple',
    borderChecked: 'checked:border-fooding-purple',
    dot: 'checked:before:bg-fooding-purple',
  },
  red: {
    ring: 'focus:ring-red-400',
    borderChecked: 'checked:border-red-500',
    dot: 'checked:before:bg-red-500',
  },
} satisfies Record<RadioColor, { ring: string; borderChecked: string; dot: string }>;

export function RadioButton({
  label,
  value,
  checked,
  onChange,
  name,
  className = '',
  color = 'purple',
}: RadioButtonProps) {
  const id = useId();
  const v = VARIANT[color];

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer body-2 ${className}`}
      htmlFor={id}
      aria-checked={checked}
      role='radio'
    >
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className={`
          appearance-none relative w-6 h-6 rounded-full cursor-pointer
          border border-gray-3 bg-white
          focus:outline-none focus:ring-2 ${v.ring}
          ${v.borderChecked}
          before:content-[""] before:absolute before:top-1/2 before:left-1/2
          before:-translate-x-1/2 before:-translate-y-1/2 before:w-[60%] before:h-[60%]
          before:rounded-full before:scale-0 before:cursor-pointer
          ${v.dot} checked:before:scale-100
        `}
      />
      {label || <span className='sr-only'>라디오 버튼</span>}
    </label>
  );
}
