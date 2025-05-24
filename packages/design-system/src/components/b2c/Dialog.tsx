'use client';

import { Dialog as DialogPrimitives } from 'radix-ui';

import { cn } from '../../utils';

type DialogProps = Omit<DialogPrimitives.DialogProps, 'open'> & {
  isOpen?: boolean;
};

const Dialog = ({ children, isOpen, ...props }: DialogProps) => {
  return (
    <DialogPrimitives.Root open={isOpen} {...props}>
      {children}
    </DialogPrimitives.Root>
  );
};

type DialogOverlayProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Overlay>;

const DialogOverlay = ({ className, children, ...props }: DialogOverlayProps) => {
  return (
    <DialogPrimitives.Overlay
      className={cn('fixed inset-0 z-50 bg-black/70', className)}
      {...props}
    >
      {children}
    </DialogPrimitives.Overlay>
  );
};

type DialogContentProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Content>;

const DialogContent = ({ className, children, ...props }: DialogContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <DialogOverlay />
      <DialogPrimitives.Content
        aria-modal
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'bg-white outline-hidden flex max-h-[calc(100%-40px)] w-full max-w-[calc(100%-40px)] flex-col overflow-y-auto rounded-[12px]',
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
};

type DialogHeaderProps = React.ComponentPropsWithRef<'div'>;

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => {
  return (
    <div className={cn('flex flex-col gap-1.5 p-5', className)} {...props}>
      {children}
    </div>
  );
};

type DialogBodyProps = React.ComponentPropsWithRef<'div'>;

const DialogBody = ({ className, children, ...props }: DialogBodyProps) => {
  return (
    <div className={cn('flex flex-1 flex-col overflow-y-auto px-5', className)} {...props}>
      {children}
    </div>
  );
};

type DialogFooterProps = React.ComponentPropsWithRef<'div'>;

const DialogFooter = ({ className, children, ...props }: DialogFooterProps) => {
  return (
    <div className={cn('flex p-5', className)} {...props}>
      {children}
    </div>
  );
};

type DialogTitleProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Title>;

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitives.Title className={cn('text-[20px] font-bold', className)} {...props}>
      {children}
    </DialogPrimitives.Title>
  );
};

type DialogTriggerProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Trigger>;

const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
  return (
    <DialogPrimitives.Trigger aria-controls={undefined} {...props}>
      {children}
    </DialogPrimitives.Trigger>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogPrimitives.Close;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogPrimitives.Description;

export { Dialog };
