import { Checkbox as CheckboxPrimitives } from 'radix-ui';

import { CheckIcon } from '../../icons';
import { cn } from '../../utils';

type CheckboxProps = Omit<CheckboxPrimitives.CheckboxProps, 'onChange' | 'onCheckedChange'> & {
  onChange?: (checked: boolean) => void;
};

const Checkbox = ({ className, onChange, ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitives.Root
      onCheckedChange={onChange}
      className={cn(
        'border border-gray-3 rounded-[4px] flex justify-center items-center cursor-pointer size-[20px]',
        'data-[state=checked]:bg-primary-pink data-[state=checked]:border-primary-pink',
        'disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitives.Indicator asChild>
        <CheckIcon className='text-white size-3.5' />
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  );
};

type CheckboxLabelProps = React.ComponentPropsWithoutRef<'label'>;

const CheckboxLabel = ({ className, children, ...props }: CheckboxLabelProps) => {
  return (
    <label className={cn('flex items-center gap-[15px]', className)} {...props}>
      {children}
    </label>
  );
};

type CheckboxLabelTextProps = React.ComponentPropsWithoutRef<'span'>;

export const CheckboxLabelText = ({ className, children, ...props }: CheckboxLabelTextProps) => {
  return (
    <span className={cn('text-sm text-gray-5', className)} {...props}>
      {children}
    </span>
  );
};

Checkbox.Label = CheckboxLabel;
Checkbox.LabelText = CheckboxLabelText;

export { Checkbox };
