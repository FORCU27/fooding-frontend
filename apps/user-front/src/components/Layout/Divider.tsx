import { cn } from '@/utils/cn';

type DividerProps = React.ComponentPropsWithRef<'div'>;

export const Divider = ({ className, ...props }: DividerProps) => {
  return <div className={cn('flex shrink-0 h-[10px] bg-gray-1 w-full', className)} {...props} />;
};
