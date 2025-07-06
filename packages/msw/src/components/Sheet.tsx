'use client';

import { cn, createContext } from '@repo/design-system/utils';
import { XIcon } from 'lucide-react';
import { Dialog as SheetPrimitives } from 'radix-ui';


type SheetProps = SheetPrimitives.DialogProps;

const Sheet = ({ children, ...props }: SheetProps) => {
  return <SheetPrimitives.Root {...props}>{children}</SheetPrimitives.Root>;
};

type SheetOverlay = SheetPrimitives.DialogOverlayProps;

const SheetOverlay = ({ className, children, ...props }: SheetOverlay) => {
  return (
    <SheetPrimitives.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'animate-in fade-in duration-150',
        className,
      )}
      {...props}
    >
      {children}
    </SheetPrimitives.Overlay>
  );
};

type Side = 'top' | 'bottom' | 'left' | 'right';

const styleBySide: Record<Side, string> = {
  top: cn('top-4 left-4 right-4'),
  bottom: cn('bottom-4 left-4 right-4'),
  left: cn('left-4 top-4 bottom-4'),
  right: cn('right-4 top-4 bottom-4'),
};

type SheetContentProps = React.ComponentPropsWithRef<typeof SheetPrimitives.Content> & {
  side?: Side;
};

const SheetContent = ({ className, children, side = 'right', ...props }: SheetContentProps) => {
  return (
    <SheetContentContext value={{ side }}>
      <SheetPrimitives.Portal>
        <SheetOverlay />
        <SheetPrimitives.Content
          className={cn(
            'fixed z-50',
            'max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)]',
            'bg-white flex w-full flex-col overflow-y-auto rounded-[1rem]',
            'animate-in fade-in duration-150',
            styleBySide[side],
            className,
          )}
          {...props}
        >
          {children}
          <SheetPrimitives.Close asChild>
            <button
              className='size-7 flex justify-center items-center absolute right-5 top-5 rounded-md hover:bg-gray-1 cursor-pointer'
              aria-label='닫기'
            >
              <XIcon className='size-4' />
            </button>
          </SheetPrimitives.Close>
        </SheetPrimitives.Content>
      </SheetPrimitives.Portal>
    </SheetContentContext>
  );
};

type SheetHeaderProps = React.ComponentPropsWithRef<'div'>;

const SheetHeader = ({ className, children, ...props }: SheetHeaderProps) => {
  return (
    <div className={cn('flex flex-col gap-1.5 p-5', className)} {...props}>
      {children}
    </div>
  );
};

type SheetBodyProps = React.ComponentPropsWithRef<'div'>;

const SheetBody = ({ className, children, ...props }: SheetBodyProps) => {
  return (
    <div className={cn('flex flex-1 flex-col overflow-y-auto px-5', className)} {...props}>
      {children}
    </div>
  );
};

type SheetFooterProps = React.ComponentPropsWithRef<'div'>;

const SheetFooter = ({ className, children, ...props }: SheetFooterProps) => {
  return (
    <div className={cn('flex justify-end gap-2 p-5', className)} {...props}>
      {children}
    </div>
  );
};

type SheetTitleProps = SheetPrimitives.DialogTitleProps;

const SheetTitle = ({ className, children, ...props }: SheetTitleProps) => {
  return (
    <SheetPrimitives.Title className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </SheetPrimitives.Title>
  );
};

type SheetDescriptionProps = SheetPrimitives.DialogDescriptionProps;

const SheetDescription = ({ className, children, ...props }: SheetDescriptionProps) => {
  return (
    <SheetPrimitives.Description className={cn('text-gray-4 text-sm', className)} {...props}>
      {children}
    </SheetPrimitives.Description>
  );
};

type SheetTriggerProps = SheetPrimitives.DialogTriggerProps;

const SheetTrigger = ({ children, ...props }: SheetTriggerProps) => {
  return <SheetPrimitives.Trigger {...props}>{children}</SheetPrimitives.Trigger>;
};

type SheetContentContextValue = {
  side: SheetContentProps['side'];
};

const [SheetContentContext] = createContext<SheetContentContextValue>('SheetContent');

Sheet.Trigger = SheetTrigger;
Sheet.Close = SheetPrimitives.Close;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Body = SheetBody;
Sheet.Footer = SheetFooter;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;

export { Sheet };
