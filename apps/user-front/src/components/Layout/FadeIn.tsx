import { cn } from '@/utils/cn';

type FadeInProps = React.ComponentPropsWithRef<'div'>;

export const FadeIn = ({ className, children, ...props }: FadeInProps) => {
  return (
    <div className={cn('flex flex-col fade-in animate-in duration-200', className)} {...props}>
      {children}
    </div>
  );
};
