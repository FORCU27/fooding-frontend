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
  expandedMenus?: Set<string>;
}

const DrawerMenuSection = memo(
  ({ className, menuList, onMenuClick, onSubMenuClick, activeMenu, expandedMenus }: Props) => {
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
              isExpanded={expandedMenus?.has(menu.id) || false}
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
    isExpanded,
  }: {
    menu: MenuItem;
    onMenuClick?: (menu: MenuItem) => void;
    onSubMenuClick?: (subMenu: MenuItem) => void;
    isActive: boolean;
    activeSubItem: MenuItem | null;
    isExpanded?: boolean;
  }) => {
    const router = useRouter();
    const pathname = usePathname();

    // expandedMenus prop이 전달되면 사용, 아니면 URL 기반으로 계산
    const shouldExpand = (() => {
      if (isExpanded !== undefined) {
        return isExpanded;
      }

      if (!menu.subItems) return false;

      // 현재 활성화된 서브메뉴가 있거나, 현재 경로가 이 메뉴의 서브메뉴 중 하나와 일치하면 확장
      return menu.subItems.some((subItem) => {
        // 쿠폰 메뉴의 경우 특별 처리
        if (subItem.path === '/reward/coupon') {
          return pathname === subItem.path || pathname.startsWith('/reward/coupon/');
        }
        return (
          pathname === subItem.path ||
          pathname.startsWith(subItem.path) ||
          activeSubItem?.id === subItem.id
        );
      });
    })();

    // useCallback으로 클릭 핸들러 메모이제이션
    const handleMenuClick = () => {
      // 서브메뉴가 있으면 onMenuClick 호출 (SideLayout에서 펼치기/접기 처리)
      // 서브메뉴가 없으면 페이지 이동
      onMenuClick?.(menu);
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
              className={`transition-transform duration-200 ${shouldExpand ? 'rotate-90' : ''}`}
            >
              <polyline points='9,18 15,12 9,6'></polyline>
            </svg>
          )}
        </div>

        {menu.subItems && (
          <ul
            className={` overflow-hidden transition-all duration-200 ${
              shouldExpand ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {menu.subItems.map((subMenu) => (
              <li
                key={subMenu.id}
                onClick={() => handleSubMenuClick(subMenu)}
                className={`body-2 cursor-pointer pt-[9px] pb-[12px] pl-[60px] hover:bg-primary-pink/5 rounded transition-colors
    ${(subMenu.path === '/reward/coupon' && pathname.startsWith('/reward/coupon')) || pathname === subMenu.path ? 'text-black font-medium' : 'text-gray-5'}`}
              >
                {subMenu.text}
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
