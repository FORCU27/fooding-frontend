'use client';

import { useId } from 'react';

import { Drawer } from 'vaul';

import { cn, createContext } from '../../utils';

type BottomSheetProps = React.ComponentPropsWithRef<typeof Drawer.Root>;

const BottomSheet = ({ children, ...props }: BottomSheetProps) => {
  return <Drawer.Root {...props}>{children}</Drawer.Root>;
};

type BottomSheetOverlayProps = React.ComponentPropsWithRef<typeof Drawer.Overlay>;

const BottomSheetOverlay = ({ className, children, ...props }: BottomSheetOverlayProps) => {
  return (
    <Drawer.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:animate-in data-[state=open]:fade-in',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out',
        className,
      )}
      {...props}
    >
      {children}
    </Drawer.Overlay>
  );
};

type DialogContentProps = React.ComponentPropsWithRef<typeof Drawer.Content>;

const BottomSheetContent = ({ className, children, ...props }: DialogContentProps) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Drawer.Portal>
      <BottomSheetOverlay />
      <Drawer.Title aria-labelledby={titleId} className='sr-only'>
        제목
      </Drawer.Title>
      <Drawer.Description aria-describedby={descriptionId} className='sr-only'>
        설명
      </Drawer.Description>
      <Drawer.Content
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]',
          'flex w-full flex-col max-h-[calc(100%-20px)]',
          'bg-white outline-hidden rounded-t-[12px]',
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom',
          'ease-out-quint duration-500',
          className,
        )}
        {...props}
      >
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
};

type BottomSheetHeaderProps = React.ComponentPropsWithRef<'div'>;

const BottomSheetHeader = ({ className, children, ...props }: BottomSheetHeaderProps) => {
  return (
    <div className={cn('flex flex-col h-[64px] items-center justify-center', className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetTitleProps = React.ComponentPropsWithRef<'h3'>;

const BottomSheetTitle = ({ className, children, ...props }: BottomSheetTitleProps) => {
  return (
    <h3 className={cn('subtitle-3', className)} {...props}>
      {children}
    </h3>
  );
};

type BottomSheetBodyProps = React.ComponentPropsWithRef<'div'>;

const BottomSheetBody = ({ className, children, ...props }: BottomSheetBodyProps) => {
  return (
    <div className={cn('flex flex-col p-5 pt-0 overflow-y-auto', className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetFooterProps = React.ComponentPropsWithRef<'div'>;

const BottomSheetFooter = ({ className, children, ...props }: BottomSheetFooterProps) => {
  return (
    <div className={cn('flex px-5 pt-6 pb-8 gap-2 border-t border-gray-1', className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetTriggerProps = React.ComponentPropsWithRef<typeof Drawer.Trigger>;

const BottomSheetTrigger = ({ children, ...props }: BottomSheetTriggerProps) => {
  return (
    <Drawer.Trigger aria-controls={undefined} {...props}>
      {children}
    </Drawer.Trigger>
  );
};

type BottomSheetSelectContextValue = {
  value: string;
  onChange: (value: string) => void;
};

const [BottomSheetSelectContext, useBottomSheetSelectContext] =
  createContext<BottomSheetSelectContextValue>('BottomSheetSelect');

type BottomSheetSelectProps = Omit<React.ComponentPropsWithRef<'ul'>, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

const BottomSheetSelect = ({
  className,
  children,
  value,
  onChange,
  ...props
}: BottomSheetSelectProps) => {
  return (
    <BottomSheetSelectContext value={{ value, onChange }}>
      <ul className={cn('flex flex-col', className)} {...props}>
        {children}
      </ul>
    </BottomSheetSelectContext>
  );
};

type BottomSheetSelectItemProps = React.ComponentPropsWithRef<typeof Drawer.Close> & {
  value: string;
};

const BottomSheetSelectItem = ({
  className,
  children,
  value,
  ...props
}: BottomSheetSelectItemProps) => {
  const { value: selectedValue, onChange } = useBottomSheetSelectContext();

  const isSelected = selectedValue === value;

  return (
    <li className='flex'>
      <Drawer.Close
        className={cn(
          'h-[42px] -mx-5 flex flex-1 justify-center items-center text-black body-2 cursor-pointer',
          'hover:bg-gray-7 active:bg-gray-7 px-5',
          'outline-hidden focus-visible:bg-gray-7',
          isSelected && 'text-fooding-purple',
          className,
        )}
        onClick={() => onChange(value)}
        {...props}
      >
        {children}
      </Drawer.Close>
    </li>
  );
};

BottomSheet.Trigger = BottomSheetTrigger;
BottomSheet.Close = Drawer.Close;
BottomSheet.Title = BottomSheetTitle;
BottomSheet.Content = BottomSheetContent;
BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;
BottomSheet.Select = BottomSheetSelect;
BottomSheet.SelectItem = BottomSheetSelectItem;

export { BottomSheet };
