import RadioButton from './RadioButton';

type RadioButtonGroupProps = {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
};

const RadioButtonGroup = ({
  name,
  options,
  selectedValue,
  onChange,
  className = '',
}: RadioButtonGroupProps) => {
  if (!options.length) {
    return <p>옵션이 없습니다.</p>;
  }
  return (
    <fieldset className={`flex gap-4 ${className}`} role='radiogroup' aria-label={name}>
      <legend className='sr-only'>{name}</legend>
      {options.map(({ label, value }) => (
        <RadioButton
          key={value}
          name={name}
          label={label}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
        />
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;
