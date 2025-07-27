import { cn } from '@/utils/cn';

type FadeInProps = React.ComponentPropsWithRef<'div'>;

export const FadeIn = ({ className, children, ...props }: FadeInProps) => {
  return (
    <div className={cn('fade-in animate-in duration-100', className)} {...props}>
      {children}
    </div>
  );
};
