'use client';

import { type ReactNode } from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
};

type DialogTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

type DialogContentProps = {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
};

type DialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

type DialogTitleProps = {
  children: ReactNode;
  className?: string;
};

type DialogDescriptionProps = {
  children: ReactNode;
  className?: string;
};

type DialogFooterProps = {
  children: ReactNode;
  className?: string;
};

const Dialog = ({ open, onOpenChange, children, className }: DialogProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <div className={className}>{children}</div>
    </RadixDialog.Root>
  );
};

const DialogTrigger = ({ children, asChild = false }: DialogTriggerProps) => {
  return <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>;
};

const DialogContent = ({ children, className, showCloseButton = true }: DialogContentProps) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className='fixed inset-0 z-50 bg-black/80' />
      <RadixDialog.Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] max-h-[85vh] border bg-white shadow-lg rounded-[20px] overflow-y-auto p-6',
          className,
        )}
      >
        {children}
        {showCloseButton && (
          <RadixDialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
            <X className='h-4 w-4' />
            <span className='sr-only'>닫기</span>
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}>
      {children}
    </div>
  );
};

const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <RadixDialog.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    >
      {children}
    </RadixDialog.Title>
  );
};

const DialogDescription = ({ children, className }: DialogDescriptionProps) => {
  return (
    <RadixDialog.Description className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </RadixDialog.Description>
  );
};

const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}>
      {children}
    </div>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
