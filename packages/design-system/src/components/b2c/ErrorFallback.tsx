import { Button } from './Button';
import { cn } from '../../utils';

type ErrorFallbackProps = React.ComponentPropsWithRef<'div'>;

const ErrorFallback = ({ className, children, ...props }: ErrorFallbackProps) => {
  return (
    <div className={cn('flex flex-col justify-center items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
};

type ErrorFallbackTitleProps = React.ComponentPropsWithRef<'span'>;

const ErrorFallbackTitle = ({ className, children, ...props }: ErrorFallbackTitleProps) => {
  return (
    <span className={cn('text-black font-semibold text-lg text-center', className)} {...props}>
      {children}
    </span>
  );
};

type ErrorFallbackDescriptionProps = React.ComponentPropsWithRef<'span'>;

const ErrorFallbackDescription = ({
  className,
  children,
  ...props
}: ErrorFallbackDescriptionProps) => {
  return (
    <span className={cn('text-gray-4 text-center whitespace-pre-wrap', className)} {...props}>
      {children}
    </span>
  );
};

type ErrorFallbackActionsProps = React.ComponentPropsWithRef<'div'>;

const ErrorFallbackActions = ({ className, children, ...props }: ErrorFallbackActionsProps) => {
  return (
    <div className={cn('mt-2 flex gap-3 items-center', className)} {...props}>
      {children}
    </div>
  );
};

type ErrorFallbackActionProps = React.ComponentPropsWithRef<typeof Button>;

const ErrorFallbackAction = ({ className, children, ...props }: ErrorFallbackActionProps) => {
  return (
    <Button className={cn(className)} size='banner' {...props}>
      {children}
    </Button>
  );
};

ErrorFallback.Title = ErrorFallbackTitle;
ErrorFallback.Description = ErrorFallbackDescription;
ErrorFallback.Actions = ErrorFallbackActions;
ErrorFallback.Action = ErrorFallbackAction;

export { ErrorFallback };
