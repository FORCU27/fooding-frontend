'use client';

import { useRouter } from 'next/navigation';

import { ScreenMode, MenuItem } from '../../types/layout';
interface Props {
  className?: string;
  menuList: MenuItem[];
  onMenuClick?: (menu: MenuItem) => void;
  onSubMenuClick?: (subMenu: MenuItem) => void;
  screenMode?: ScreenMode;
}

const DrawerMenuSection = ({
  className,
  menuList,
  onMenuClick,
  onSubMenuClick,
  // screenMode = 'desktop',
}: Props) => {
  return (
    <li className={`flex flex-col p-7 ${className || ''}`}>
      <ul className='space-y-4'>
        {menuList.map((menu) => (
          <MenuItemComponent
            key={menu.id}
            menu={menu}
            onMenuClick={onMenuClick}
            onSubMenuClick={onSubMenuClick}
          />
        ))}
      </ul>
    </li>
  );
};

const MenuItemComponent = ({
  menu,
  onMenuClick,
  onSubMenuClick,
}: {
  menu: MenuItem;
  onMenuClick?: (menu: MenuItem) => void;
  onSubMenuClick?: (subMenu: MenuItem) => void;
}) => {
  const router = useRouter();

  const handleMenuClick = () => {
    onMenuClick?.(menu);
    router.push(menu.path);
  };
  const handleSubMenuClick = (subMenu: MenuItem) => {
    onSubMenuClick?.(subMenu);
    router.push(subMenu.path);
  };
  return (
    <li className='py-1'>
      {menu.subItems ? (
        <span className='text-gray-800 font-medium cursor-default'>{menu.text}</span>
      ) : (
        <ul>
          <li
            className='text-gray-800 font-medium cursor-pointer hover:bg-gray-300'
            onClick={handleMenuClick}
          >
            {menu.text}
          </li>
        </ul>
      )}
      {menu.subItems && (
        <ul className='pl-4 mt-1 space-y-4'>
          {menu.subItems.map((subMenu) => (
            <li
              key={subMenu.id}
              onClick={() => handleSubMenuClick(subMenu)}
              className='cursor-pointer hover:bg-gray-300'
            >
              {subMenu.text}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DrawerMenuSection;
