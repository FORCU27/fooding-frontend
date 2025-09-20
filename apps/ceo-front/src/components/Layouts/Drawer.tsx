import { CloseIcon } from '@repo/design-system/icons';
import { cn } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';
import { Dialog as DialogPrimitives } from 'radix-ui';

import { Navigation } from './Navigation';
import { useGetSelf } from '@/hooks/auth/useGetSelf';

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
          'fixed top-0 left-0 right-0 bottom-0 bg-black/50',
          'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        )}
      />
      <DialogPrimitives.Portal>
        <DialogPrimitives.Content
          className={cn(
            'flex flex-col z-50 fixed top-0 left-0 bottom-0 bg-white w-[640px] max-w-full',
            'data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left',
          )}
        >
          <DialogPrimitives.Title className='sr-only'>메뉴</DialogPrimitives.Title>
          <DialogPrimitives.Description className='sr-only'>메뉴</DialogPrimitives.Description>
          <div className='py-10 px-8 bg-gray-7 border-b border-gray-8 flex flex-col'>
            <div className='flex justify-end'>
              <DialogPrimitives.Close>
                <CloseIcon />
              </DialogPrimitives.Close>
            </div>
            <Suspense>
              <UserProfile />
            </Suspense>
          </div>
          <Navigation onNavigation={() => onOpenChange(false)} />
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};

const UserProfile = () => {
  const { data: me } = useGetSelf();

  return (
    <h3 className='whitespace-pre-wrap headline-2'>{`안녕하세요\n${me.name ? `${me.name} ` : ''}사장님`}</h3>
  );
};
