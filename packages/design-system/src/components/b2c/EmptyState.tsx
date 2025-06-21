import { cn } from '../../utils';

type EmptyStateProps = React.ComponentPropsWithRef<'div'> & {
  title: string;
};

export const EmptyState = ({ className, title, children, ...props }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col justify-center items-center', className)} {...props}>
      <p className='text-gray-3'>{title}</p>
      {children}
    </div>
  );
};
