import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { CeoBellIcon } from '@repo/design-system/icons';
import { CloseIcon, LogoutIcon } from '@repo/design-system/icons';
import { cn } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';
import { Dialog as DialogPrimitives } from 'radix-ui';

import { allMenus, Menu } from './Navigation';
import { FoodingLogo } from '@/components/FoodingLogo';
import { StoreSelector } from '@/components/StoreSelector';
import { useStore } from '@/context/StoreContext';
import { useGetSelf } from '@/hooks/auth/useGetSelf';
import { useLogout } from '@/hooks/auth/useLogout';

type DrawerProps = {
  trigger: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const Drawer = ({ trigger, isOpen, onOpenChange }: DrawerProps) => {
  const router = useRouter();
  const { clearStore } = useStore();

  const logout = useLogout();

  const handleLogoutClick = async () => {
    if (logout.isPending) return;

    logout.mutate(undefined, {
      onSuccess: () => {
        clearStore();
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
          <div className='pt-6 pb-[18px] px-8 bg-gray-7 border-b border-gray-8 flex flex-col'>
            <div className='flex justify-between mb-6 items-center'>
              <FoodingLogo className='w-[106px]' />
              <div className='flex items-center gap-[18px]'>
                <CeoBellIcon />
                <DialogPrimitives.Close>
                  <CloseIcon />
                </DialogPrimitives.Close>
              </div>
            </div>
            <Suspense>
              <UserProfile />
            </Suspense>
          </div>
          <Navigation />
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

  return (
    <div className='flex justify-between items-end'>
      <h3 className='whitespace-pre-wrap subtitle-2'>{`안녕하세요\n${me.name ? `${me.name} ` : ''}사장님`}</h3>
      <StoreSelector />
    </div>
  );
};

type MenuGroupProps = {
  menu: Extract<Menu, { type: 'group' }>;
};

const Navigation = () => {
  return (
    <nav className='py-1 w-full h-full bg-white overflow-y-auto scrollbar-hide flex flex-col'>
      <ul className='flex flex-col'>
        {allMenus.map((menu) => {
          switch (menu.type) {
            case 'group':
              return <MenuGroup key={menu.id} menu={menu} />;
            case 'link':
              return <MenuLink key={menu.id} menu={menu} />;
            default:
              menu satisfies never;
          }
        })}
      </ul>
    </nav>
  );
};

const MenuGroup = ({ menu }: MenuGroupProps) => {
  const pathname = usePathname();

  const hasActiveGroupItem: boolean = (() => {
    for (const menuItem of allMenus) {
      if (menuItem.type === 'group') {
        const hasActiveGroupItem = menu.items.some((subItem) => pathname.startsWith(subItem.path));

        if (hasActiveGroupItem) {
          return true;
        }
      }
    }

    return false;
  })();

  return (
    <div className='flex flex-col'>
      <div
        className={cn(
          'flex items-center flex-1 px-8 min-h-[56px] body-2',
          hasActiveGroupItem && 'bg-primary-pink/5 text-primary-pink',
        )}
      >
        {menu.icon}
        <span className='ml-2'>{menu.label}</span>
      </div>
      <ul className='flex flex-col'>
        {menu.items.map((item) => (
          <MenuGroupItem key={item.path} item={item} />
        ))}
      </ul>
    </div>
  );
};

type MenuGroupItemProps = {
  item: Extract<Menu, { type: 'group' }>['items'][number];
};

const MenuGroupItem = ({ item }: MenuGroupItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === item.path;

  return (
    <DialogPrimitives.Close asChild>
      <Link
        href={item.path}
        className={cn(
          'px-15 flex items-center cursor-pointer text-gray-5 body-2 h-[43px] active:bg-gray-7',
          isActive && 'text-black',
        )}
      >
        {item.label}
      </Link>
    </DialogPrimitives.Close>
  );
};

type MenuLinkProps = {
  menu: Extract<Menu, { type: 'link' }>;
};

const MenuLink = ({ menu }: MenuLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(menu.path);

  return (
    <DialogPrimitives.Close asChild>
      <Link
        href={menu.path}
        className={cn(
          'h-14 px-8 items-center flex cursor-pointer body-2',
          isActive && 'bg-primary-pink/5 text-primary-pink',
          !isActive && 'active:bg-gray-7',
        )}
      >
        {menu.icon}
        <span className='ml-2'>{menu.label}</span>
      </Link>
    </DialogPrimitives.Close>
  );
};
