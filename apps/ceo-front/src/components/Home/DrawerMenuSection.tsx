'use client';

import { useRouter, usePathname } from 'next/navigation';
import { memo } from 'react';

import { MenuItem } from '../../types/layout';

interface Props {
  className?: string;
  menuList: MenuItem[];
  onMenuClick?: (menu: MenuItem) => void;
  onSubMenuClick?: (subMenu: MenuItem) => void;
  activeMenu?: { menu: MenuItem; subItem: MenuItem | null } | null;
}

const DrawerMenuSection = memo(
  ({ className, menuList, onMenuClick, onSubMenuClick, activeMenu }: Props) => {
    return (
      <li className={`flex flex-col py-[32px] ${className || ''}`}>
        <ul className=''>
          {menuList.map((menu) => (
            <MenuItemComponent
              key={menu.id}
              menu={menu}
              onMenuClick={onMenuClick}
              onSubMenuClick={onSubMenuClick}
              isActive={activeMenu?.menu.id === menu.id}
              activeSubItem={activeMenu?.subItem || null}
            />
          ))}
        </ul>
      </li>
    );
  },
);

DrawerMenuSection.displayName = 'DrawerMenuSection';

const MenuItemComponent = memo(
  ({
    menu,
    onMenuClick,
    onSubMenuClick,
    isActive,
    activeSubItem,
  }: {
    menu: MenuItem;
    onMenuClick?: (menu: MenuItem) => void;
    onSubMenuClick?: (subMenu: MenuItem) => void;
    isActive: boolean;
    activeSubItem: MenuItem | null;
  }) => {
    const router = useRouter();
    const pathname = usePathname();

    // URL 기반으로 서브메뉴 확장 상태 계산
    const isExpanded = (() => {
      if (!menu.subItems) return false;

      // 현재 활성화된 서브메뉴가 있거나, 현재 경로가 이 메뉴의 서브메뉴 중 하나와 일치하면 확장
      return menu.subItems.some(
        (subItem) =>
          pathname === subItem.path ||
          pathname.startsWith(subItem.path) ||
          activeSubItem?.id === subItem.id,
      );
    })();

    // useCallback으로 클릭 핸들러 메모이제이션
    const handleMenuClick = () => {
      if (menu.subItems) {
        // 서브메뉴가 있으면 첫 번째 서브메뉴로 이동하거나 토글
        if (!isExpanded) {
          // 접혀있으면 첫 번째 서브메뉴로 이동
          router.push(menu.subItems[0]?.path || menu.path);
        } else {
          // 펼쳐져있으면 메인 메뉴로 이동
          router.push(menu.path);
        }
      } else {
        // 서브메뉴가 없으면 페이지 이동
        onMenuClick?.(menu);
      }
    };

    const handleSubMenuClick = (subMenu: MenuItem) => {
      onSubMenuClick?.(subMenu);
      router.push(subMenu.path);
    };

    return (
      <li className=''>
        <div
          className={`body-2 cursor-pointer py-[17px] px-[32px] hover:bg-primary-pink/5 rounded transition-colors flex items-center justify-between ${
            menu.subItems ? 'hover:bg-' : ''
          } ${isActive ? 'text-primary-pink bg-primary-pink/5' : ''}`}
          onClick={handleMenuClick}
        >
          <div className='flex items-center gap-2'>
            {menu.icon}
            <span>{menu.text}</span>
          </div>
          {menu.subItems && (
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            >
              <polyline points='9,18 15,12 9,6'></polyline>
            </svg>
          )}
        </div>

        {menu.subItems && (
          <ul
            className={` overflow-hidden transition-all duration-200 ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {menu.subItems.map((subMenu) => (
              <li
                key={subMenu.id}
                onClick={() => handleSubMenuClick(subMenu)}
                className={`body-2 cursor-pointer pt-[9px] pb-[12px] pl-[60px] hover:bg-primary-pink/5 rounded transition-colors 
    ${pathname === subMenu.path ? 'text-black font-medium' : 'text-gray-5'}`}
              >
                - {subMenu.text}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  },
);

MenuItemComponent.displayName = 'MenuItemComponent';

export default DrawerMenuSection;
