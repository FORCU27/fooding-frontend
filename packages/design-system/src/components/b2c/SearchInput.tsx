import { SearchIcon } from '../../icons';
import { cn } from '../../utils';

type SearchInputProps = React.ComponentPropsWithRef<'input'>;

type ContainerProps = React.ComponentPropsWithRef<'div'>;

const Container = ({ className, ...props }: ContainerProps) => {
  return <div className={cn('w-full relative h-fit', className)} {...props} />;
};

const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <input
      className={cn(
        'w-full h-[44px] bg-gray-1 rounded-[8px] px-[16px] pr-11 outline-none',
        'text-[14px] text-black font-medium placeholder:text-gray-5 plcaceholder:font-normal',
        className,
      )}
      {...props}
    />
  );
};

type ButtonProps = React.ComponentPropsWithRef<'button'>;

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 right-3 text-gray-5 cursor-pointer',
        className,
      )}
      {...props}
    >
      <SearchIcon size={24} />
    </button>
  );
};

SearchInput.Container = Container;
SearchInput.Button = Button;

export { SearchInput };
