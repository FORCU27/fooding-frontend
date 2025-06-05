import { cn } from '../../utils';

type NavButtonProps = React.ComponentPropsWithRef<'button'>;

export const NavButton = ({ className, children, ...props }: NavButtonProps) => {
  return (
    <button
      className={cn(
        'size-[36px] flex justify-center items-center rounded-[8px] bg-[#44444430] text-white cursor-pointer',
        'active:bg-[#44444460]',
        'disabled:pointer-events-none disabled:text-gray-2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
