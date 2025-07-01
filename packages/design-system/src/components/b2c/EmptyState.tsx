import { FoodingIcon } from '../../icons';
import { cn } from '../../utils';

type EmptyStateProps = React.ComponentPropsWithRef<'div'> & {
  title: string;
};

export const EmptyState = ({ className, title, children, ...props }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col justify-center items-center', className)} {...props}>
      <FoodingIcon className='text-[#111111]/10 w-[82px] h-[102px]' />
      <p className='mt-5 text-gray-4 subtitle-3'>{title}</p>
      {children}
    </div>
  );
};
