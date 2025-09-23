import { cn } from '@repo/design-system/utils';

type InputProps = React.ComponentPropsWithRef<'input'>;

export const Input = ({ className, 'aria-invalid': ariaInvalid, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'w-full body-2 px-[20px] py-[18px] body-2 h-[58px] border border-gray-3 rounded-[12px] outline-none placeholder:text-gray-5',
        'focus-visible:border-gray-6',
        ariaInvalid && 'border-error-red focus-visible:border-error-red text-error-red',
        className,
      )}
      {...props}
    />
  );
};
