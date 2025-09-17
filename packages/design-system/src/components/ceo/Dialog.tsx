'use client';

import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitives } from 'radix-ui';

import { cn } from '../../utils/cn';

type DialogProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Root>;

const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogPrimitives.Root {...props}>{children}</DialogPrimitives.Root>;
};

type DialogContentProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Content> & {
  showCloseButton?: boolean;
};

const DialogContent = ({ children, className, showCloseButton = true }: DialogContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <DialogPrimitives.Overlay className='fixed inset-0 z-50 bg-black/50' />
      <DialogPrimitives.Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
          'max-h-[calc(100%-4rem)] max-w-[calc(100%-4rem)]',
          'flex flex-col gap-6 w-full border bg-white rounded-[20px] py-8',
          className,
        )}
      >
        <DialogPrimitives.Description className='sr-only' />
        {children}
        {showCloseButton && (
          <DialogPrimitives.Close
            aria-label='닫기'
            className='absolute right-6 top-8 flex justify-center items-center size-6 cursor-pointer'
          >
            <XIcon />
          </DialogPrimitives.Close>
        )}
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
};

type DialogHeaderProps = React.ComponentPropsWithRef<'div'>;

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => {
  return (
    <div className={cn('flex flex-col px-6', className)} {...props}>
      {children}
    </div>
  );
};

type DialogTitleProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Title>;

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitives.Title
      className={cn(
        'text-[20px] font-semibold text-center h-[24px] flex justify-center items-center',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitives.Title>
  );
};

type DialogBodyProps = React.ComponentPropsWithRef<'div'>;

const DialogBody = ({ className, children, ...props }: DialogBodyProps) => {
  return (
    <div className={cn('flex px-6 flex-col flex-1 overflow-y-auto', className)} {...props}>
      {children}
    </div>
  );
};

type DialogFooterProps = React.ComponentPropsWithRef<'div'>;

const DialogFooter = ({ className, children, ...props }: DialogFooterProps) => {
  return (
    <div className={cn('flex px-6 justify-center gap-3', className)} {...props}>
      {children}
    </div>
  );
};

Dialog.Content = DialogContent;
Dialog.Body = DialogBody;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Footer = DialogFooter;
Dialog.Trigger = DialogPrimitives.Trigger;
Dialog.Close = DialogPrimitives.Close;

export { Dialog };
