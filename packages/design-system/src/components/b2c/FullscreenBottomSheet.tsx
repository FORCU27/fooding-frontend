'use client';

import { Dialog as DialogPrimitives } from 'radix-ui';

import { CloseIcon } from '../../icons';
import { cn } from '../../utils';

type FullscreenBottomSheetProps = Omit<DialogPrimitives.DialogProps, 'open'> & {
  title?: string;
  description?: string;
  isOpen?: boolean;
};

const DEFAULT_TITLE = '전체화면 바텀시트';
const DEFAULT_DESCRIPTION = '전체화면 바텀시트';

const FullscreenBottomSheet = ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  isOpen,
  ...props
}: FullscreenBottomSheetProps) => {
  return (
    <DialogPrimitives.Root open={isOpen} {...props}>
      <DialogPrimitives.Title className='sr-only'>{title}</DialogPrimitives.Title>
      <DialogPrimitives.Description className='sr-only'>{description}</DialogPrimitives.Description>
      {children}
    </DialogPrimitives.Root>
  );
};

type DialogContentProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Content>;

const FullscreenBottomSheetContent = ({ className, children, ...props }: DialogContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <DialogPrimitives.Content
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          'fixed bottom-0 left-0 right-0 top-0 z-50',
          'flex w-full flex-col',
          'bg-white outline-hidden',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom',
          'ease-out-quint duration-500',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitives.Close className='absolute top-4 right-4 size-10 rounded-full bg-gray-1 flex justify-center items-center active:bg-gray-2'>
          <CloseIcon size={24} />
        </DialogPrimitives.Close>
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
};

type FullscreenBottomSheetTriggerProps = React.ComponentPropsWithRef<
  typeof DialogPrimitives.Trigger
>;

const FullscreenBottomSheetTrigger = ({
  children,
  ...props
}: FullscreenBottomSheetTriggerProps) => {
  return (
    <DialogPrimitives.Trigger aria-controls={undefined} {...props}>
      {children}
    </DialogPrimitives.Trigger>
  );
};

FullscreenBottomSheet.Trigger = FullscreenBottomSheetTrigger;
FullscreenBottomSheet.Close = DialogPrimitives.Close;
FullscreenBottomSheet.Title = DialogPrimitives.Title;
FullscreenBottomSheet.Description = DialogPrimitives.Description;
FullscreenBottomSheet.Content = FullscreenBottomSheetContent;

export { FullscreenBottomSheet };
