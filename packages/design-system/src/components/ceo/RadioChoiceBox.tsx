import { RadioGroup as RadioGroupPrimitives } from 'radix-ui';
import { cn } from '../../utils';

type RadioChoiceBoxProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitives.Root>;

const RadioChoiceBox = ({ children, ...props }: RadioChoiceBoxProps) => {
  return <RadioGroupPrimitives.Root {...props}>{children}</RadioGroupPrimitives.Root>;
};

type RadioChoiceBoxItemProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitives.Item>;

const RadioChoiceBoxItem = ({ className, children, ...props }: RadioChoiceBoxItemProps) => {
  return (
    <RadioGroupPrimitives.Item
      className={cn(
        'w-full h-[76px] border rounded-[9px] border-gray-3 flex items-center px-5 py-[26px] cursor-pointer outline-hidden',
        'data-[state=checked]:border-primary-pink data-[state=checked]:bg-primary-pink/2',
        'focus-visible:ring-2 focus-visible:ring-primary-pink focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitives.Indicator
        className={cn(
          'group size-6 rounded-full border border-gray-3 mr-2 flex justify-center items-center',
          'data-[state=checked]:border-primary-pink',
        )}
        forceMount
      >
        <span className='size-[14px] rounded-full bg-primary-pink group-data-[state=unchecked]:hidden' />
      </RadioGroupPrimitives.Indicator>
      <span className='subtitle-2'>{children}</span>
    </RadioGroupPrimitives.Item>
  );
};

RadioChoiceBox.Item = RadioChoiceBoxItem;

export { RadioChoiceBox };
