'use client';

import { Dialog as DialogPrimitives } from 'radix-ui';

import { CloseIcon } from '../../icons';
import { cn } from '../../utils';

type FullscreenBottomSheetProps = DialogPrimitives.DialogProps & {
  title?: string;
  description?: string;
};

const DEFAULT_TITLE = '전체화면 바텀시트';
const DEFAULT_DESCRIPTION = '전체화면 바텀시트';

const FullscreenBottomSheet = ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  ...props
}: FullscreenBottomSheetProps) => {
  return (
    <DialogPrimitives.Root {...props}>
      <DialogPrimitives.Title className='sr-only'>{title}</DialogPrimitives.Title>
      <DialogPrimitives.Description className='sr-only'>{description}</DialogPrimitives.Description>
      {children}
    </DialogPrimitives.Root>
  );
};

type FullscreenBottomSheetContentProps = React.ComponentPropsWithRef<
  typeof DialogPrimitives.Content
> & {
  hideCloseButton?: boolean;
};

const FullscreenBottomSheetContent = ({
  className,
  children,
  hideCloseButton = false,
  ...props
}: FullscreenBottomSheetContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <DialogPrimitives.Content
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          'fixed bottom-0 left-0 right-0 top-[env(safe-area-inset-top)] z-50',
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
        {hideCloseButton === false && (
          <DialogPrimitives.Close className='absolute top-4 right-4 size-10 rounded-full flex justify-center items-center'>
            <CloseIcon size={28} />
          </DialogPrimitives.Close>
        )}
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
