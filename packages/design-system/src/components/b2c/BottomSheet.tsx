'use client';

import { Dialog as DialogPrimitives } from 'radix-ui';

import { cn } from '../../utils';

type BottomSheetProps = Omit<DialogPrimitives.DialogProps, 'open'> & {
  isOpen?: boolean;
};

const BottomSheet = ({ children, isOpen, ...props }: BottomSheetProps) => {
  return (
    <DialogPrimitives.Root open={isOpen} {...props}>
      {children}
    </DialogPrimitives.Root>
  );
};

type BottomSheetOverlayProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Overlay>;

const BottomSheetOverlay = ({ className, children, ...props }: BottomSheetOverlayProps) => {
  return (
    <DialogPrimitives.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:animate-in data-[state=open]:fade-in',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitives.Overlay>
  );
};

type DialogContentProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Content>;

const BottomSheetContent = ({ className, children, ...props }: DialogContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <BottomSheetOverlay />
      <DialogPrimitives.Content
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'flex w-full flex-col max-h-[calc(100%-20px)]',
          'bg-white outline-hidden rounded-t-[20px]',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom',
          'ease-out-quint duration-500',
          className,
        )}
        {...props}
      >
        <div className='flex justify-center my-3'>
          <span className='w-[40px] h-[4px] bg-[#D9D9D9] rounded-full' />
        </div>
        {children}
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
};

type BottomSheetHeaderProps = React.ComponentPropsWithRef<'div'>;

const BottomSheetHeader = ({ className, children, ...props }: BottomSheetHeaderProps) => {
  return (
    <div className={cn('flex flex-col p-5', className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetBodyProps = React.ComponentPropsWithRef<'div'>;

const BottomSheetBody = ({ className, children, ...props }: BottomSheetBodyProps) => {
  return (
    <div className={cn('flex flex-col p-5 overflow-y-auto', className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetFooterProps = React.ComponentPropsWithRef<'div'>;

const BottomSheetFooter = ({ className, children, ...props }: BottomSheetFooterProps) => {
  return (
    <div className={cn('flex p-5', className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetTriggerProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Trigger>;

const BottomSheetTrigger = ({ children, ...props }: BottomSheetTriggerProps) => {
  return (
    <DialogPrimitives.Trigger aria-controls={undefined} {...props}>
      {children}
    </DialogPrimitives.Trigger>
  );
};

BottomSheet.Trigger = BottomSheetTrigger;
BottomSheet.Close = DialogPrimitives.Close;
BottomSheet.Title = DialogPrimitives.Title;
BottomSheet.Description = DialogPrimitives.Description;
BottomSheet.Content = BottomSheetContent;
BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;

export { BottomSheet };
