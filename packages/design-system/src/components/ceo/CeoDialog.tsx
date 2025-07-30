'use client';

import { type ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';

type CeoDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
};

type CeoDialogTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

type CeoDialogContentProps = {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
};

type CeoDialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

type CeoDialogTitleProps = {
  children: ReactNode;
  className?: string;
};

type CeoDialogDescriptionProps = {
  children: ReactNode;
  className?: string;
};

type CeoDialogFooterProps = {
  children: ReactNode;
  className?: string;
};

const CeoDialog = ({ open, onOpenChange, children, className }: CeoDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <div className={className}>{children}</div>
    </Dialog.Root>
  );
};

const CeoDialogTrigger = ({ children, asChild = false }: CeoDialogTriggerProps) => {
  return <Dialog.Trigger asChild={asChild}>{children}</Dialog.Trigger>;
};

const CeoDialogContent = ({
  children,
  className,
  showCloseButton = true,
}: CeoDialogContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 z-50 bg-black/80' />
      <Dialog.Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] max-h-[85vh] border bg-white shadow-lg rounded-[20px] overflow-y-auto p-6',
          className,
        )}
      >
        {children}
        {showCloseButton && (
          <Dialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
            <X className='h-4 w-4' />
            <span className='sr-only'>닫기</span>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const CeoDialogHeader = ({ children, className }: CeoDialogHeaderProps) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}>
      {children}
    </div>
  );
};

const CeoDialogTitle = ({ children, className }: CeoDialogTitleProps) => {
  return (
    <Dialog.Title className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </Dialog.Title>
  );
};

const CeoDialogDescription = ({ children, className }: CeoDialogDescriptionProps) => {
  return (
    <Dialog.Description className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </Dialog.Description>
  );
};

const CeoDialogFooter = ({ children, className }: CeoDialogFooterProps) => {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}>
      {children}
    </div>
  );
};

export {
  CeoDialog,
  CeoDialogTrigger,
  CeoDialogContent,
  CeoDialogHeader,
  CeoDialogTitle,
  CeoDialogDescription,
  CeoDialogFooter,
};
