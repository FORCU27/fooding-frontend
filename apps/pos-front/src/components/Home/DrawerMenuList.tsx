'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MenuItem } from './Layout';

interface DrawerMenuListProps {
  menuList: MenuItem[];
}

const DrawerMenuList = ({ menuList }: DrawerMenuListProps) => {
  const router = useRouter();

  return (
    <div className='p-4'>
      <ul>
        {menuList.map((item) => (
          <React.Fragment key={item.text}>
            <li>
              <div
                className={`flex items-center justify-center py-2 px-4 rounded transition-colors ${
                  item.path ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'
                }`}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  if (!item.path) {
                    e.preventDefault();
                    return;
                  }
                  router.push(item.path);
                }}
              >
                <div className='mr-2'>{item.icon}</div>
                <span>{item.text}</span>
              </div>
            </li>
            {item.subMenus && (
              <ul className='ml-4'>
                {item.subMenus.map((subItem) => (
                  <li key={subItem.text}>
                    <Link
                      href={subItem.path}
                      className='block py-2 px-4 text-center hover:bg-gray-100 rounded text-inherit no-underline'
                    >
                      {subItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default DrawerMenuList;
