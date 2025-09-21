import { useRouter } from 'next/navigation';

import { CloseIcon, LogoutIcon } from '@repo/design-system/icons';
import { cn } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';
import { Dialog as DialogPrimitives } from 'radix-ui';

import { Navigation } from './Navigation';
import { useGetSelf } from '@/hooks/auth/useGetSelf';
import { useLogout } from '@/hooks/auth/useLogout';

type DrawerProps = {
  trigger: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const Drawer = ({ trigger, isOpen, onOpenChange }: DrawerProps) => {
  const router = useRouter();

  const logout = useLogout();

  const handleLogoutClick = async () => {
    if (logout.isPending) return;

    logout.mutate(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
      onError: () => {
        // TODO: 에러 처리
      },
    });
  };

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
          <div className='px-8 py-[18px] flex justify-end border-t border-gray-8 bg-gray-7'>
            <button
              className='flex items-center gap-2 text-gray-5 body-2 cursor-pointer'
              onClick={handleLogoutClick}
            >
              <LogoutIcon className='size-5' strokeWidth={1.5} />
              로그아웃
            </button>
          </div>
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};

const UserProfile = () => {
  const { data: me } = useGetSelf();

  return <h3 className='whitespace-pre-wrap headline-2'>{`안녕하세요\n${me.name} 사장님`}</h3>;
};
