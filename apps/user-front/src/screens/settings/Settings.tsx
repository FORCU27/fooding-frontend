'use client';

import { ChevronRightIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { cn } from '@/utils/cn';

export const SettingScreen: ActivityComponentType<'SettingScreen'> = () => {
  const { logout, user } = useAuth();
  const flow = useFlow();

  const handleLogoutClick = async () => {
    logout();
    location.reload();
  };

  return (
    <Screen
      header={<Header title='설정' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <div className='flex flex-col justify-baseline items-baseline body-3'>
        <MenuItemGroup label={<MenuItemGroupLabel>계정</MenuItemGroupLabel>}>
          <MenuItem onClick={() => flow.push('ProfileModifyScreen', {})}>
            <MenuItemText>프로필 수정</MenuItemText>
            <MenuItemChevronRight />
          </MenuItem>
          <MenuItem
            onClick={() =>
              flow.push('ProfileUserInfoScreen', {
                gender: user?.gender || 'NONE',
                nickname: user?.nickname || null,
                description: user?.description || null,
                phoneNumber: user?.phoneNumber || null,
                referralCode: user?.referralCode || null,
              })
            }
          >
            <MenuItemText>내 정보 수정</MenuItemText>
            <MenuItemChevronRight />
          </MenuItem>
        </MenuItemGroup>
        <hr className='w-full text-white bg-gray-1 h-[10px]' />
        <MenuItemGroup label={<MenuItemGroupLabel>서비스 이용</MenuItemGroupLabel>}>
          <MenuItem onClick={() => flow.push('NotificationSettingScreen', {})}>
            <MenuItemText>알림 설정</MenuItemText>
            <MenuItemChevronRight />
          </MenuItem>
          <MenuItem>
            <MenuItemText>1:1 문의</MenuItemText>
            <MenuItemChevronRight />
          </MenuItem>
        </MenuItemGroup>
        <hr className='w-full text-white bg-gray-1 h-[10px]' />
        <MenuItemGroup label={<MenuItemGroupLabel>기타</MenuItemGroupLabel>}>
          <MenuItem>
            <MenuItemText>공지사항 및 이용약관</MenuItemText>
            <MenuItemChevronRight />
          </MenuItem>
          <MenuItem>
            <MenuItemText>개선 제안</MenuItemText>
            <MenuItemChevronRight />
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>로그아웃</MenuItem>
          <MenuItem>회원탈퇴</MenuItem>
        </MenuItemGroup>
      </div>
    </Screen>
  );
};

type MenuItemGroupProps = React.ComponentPropsWithRef<'div'> & {
  label: React.ReactNode;
};

const MenuItemGroup = ({ className, children, label, ...props }: MenuItemGroupProps) => {
  return (
    <div className={cn('flex flex-col w-full pt-5 pb-3', className)} {...props}>
      {label}
      {children}
    </div>
  );
};

type MenuItemGroupLabelProps = React.ComponentPropsWithRef<'span'>;

const MenuItemGroupLabel = ({ className, children, ...props }: MenuItemGroupLabelProps) => {
  return (
    <span className={cn('body-6 text-gray-5 px-grid-margin pb-3', className)} {...props}>
      {children}
    </span>
  );
};

type MenuItemProps = React.ComponentPropsWithRef<'button'>;

const MenuItem = ({ className, children, ...props }: MenuItemProps) => {
  return (
    <button
      className={cn('flex justify-between py-[18px] px-grid-margin active:bg-gray-1', className)}
      {...props}
    >
      {children}
    </button>
  );
};

type MenuItemLabelProps = React.ComponentPropsWithRef<'span'>;

const MenuItemText = ({ className, children, ...props }: MenuItemLabelProps) => {
  return (
    <span className={cn('text-base', className)} {...props}>
      {children}
    </span>
  );
};

const MenuItemChevronRight = () => {
  return <ChevronRightIcon size={24} className='cursor-pointer text-gray-5' />;
};
