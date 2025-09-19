import { cn } from '@repo/design-system/utils';
import { Dialog as DialogPrimitives } from 'radix-ui';

import { Navigation } from './Navigation';

type DrawerProps = {
  trigger: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const Drawer = ({ trigger, isOpen, onOpenChange }: DrawerProps) => {
  return (
    <DialogPrimitives.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitives.Trigger asChild>{trigger}</DialogPrimitives.Trigger>
      <DialogPrimitives.Overlay
        className={cn(
          'fixed top-header-height left-0 right-0 bottom-0 bg-black/50',
          'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        )}
      />
      <DialogPrimitives.Portal>
        <DialogPrimitives.Content
          className={cn(
            'z-50 fixed top-header-height left-0 bottom-0 bg-white w-sidebar-width',
            'data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left',
          )}
        >
          <DialogPrimitives.Title className='sr-only'>메뉴</DialogPrimitives.Title>
          <DialogPrimitives.Description className='sr-only'>메뉴</DialogPrimitives.Description>
          <Navigation onNavigation={() => onOpenChange(false)} />
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};
