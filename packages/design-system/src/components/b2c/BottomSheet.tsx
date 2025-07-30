'use client';

import { Dialog as DialogPrimitives } from 'radix-ui';

import { CheckIcon } from '../../icons';
import { cn, createContext } from '../../utils';

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

type BottomSheetSelectContextValue = {
  value: string;
  onChange: (value: string) => void;
};

const [BottomSheetSelectContext, useBottomSheetSelectContext] =
  createContext<BottomSheetSelectContextValue>('BottomSheetSelect');

type BottomSheetSelectGroupProps = Omit<React.ComponentPropsWithRef<'ul'>, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

const BottomSheetSelectGroup = ({
  className,
  children,
  value,
  onChange,
  ...props
}: BottomSheetSelectGroupProps) => {
  return (
    <BottomSheetSelectContext value={{ value, onChange }}>
      <ul className={cn('flex flex-col', className)} {...props}>
        {children}
      </ul>
    </BottomSheetSelectContext>
  );
};

type BottomSheetSelectItemProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Close> & {
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
      <DialogPrimitives.Close
        className={cn(
          'text-gray-5 h-[60px] -mx-5 flex flex-1 items-center justify-between text-start text-base',
          'active:bg-gray-1 px-5',
          isSelected && 'text-black font-semibold',
          className,
        )}
        onClick={() => onChange(value)}
        {...props}
      >
        {children}
        {isSelected && <CheckIcon className='text-primary-pink size-6' />}
      </DialogPrimitives.Close>
    </li>
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
BottomSheet.SelectGroup = BottomSheetSelectGroup;
BottomSheet.SelectItem = BottomSheetSelectItem;

export { BottomSheet };
