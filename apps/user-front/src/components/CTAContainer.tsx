import { cn } from '@/utils/cn';

type CTAContainerProps = React.ComponentPropsWithRef<'div'>;

export const CTAContainer = ({ className, children, ...props }: CTAContainerProps) => {
  return (
    <div
      className={cn('z-10 fixed bottom-0 left-0 right-0 p-grid-margin bg-white', className)}
      {...props}
    >
      {children}
    </div>
  );
};
