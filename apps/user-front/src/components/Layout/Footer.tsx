import { cloneElement } from 'react';

import { Tabs } from '@repo/design-system/components/b2c';
import { HomeIcon, ListIcon, SearchIcon, UserIcon } from '@repo/design-system/icons';

const bottomTabs = [
  { value: 'home', icon: <HomeIcon size={24} />, label: '메인' },
  { value: 'search', icon: <SearchIcon size={24} />, label: '검색' },
  { value: 'reservation', icon: <ListIcon size={24} />, label: '예약/웨이팅' },
  { value: 'mypage', icon: <UserIcon size={24} />, label: '마이페이지' },
] as const;

function Footer() {
  return (
    <Tabs defaultValue='home' className='flex w-full h-16'>
      <Tabs.List className='flex justify-around items-center w-full'>
        {bottomTabs.map(({ value, icon, label }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className={`
          flex flex-col items-center gap-1
          text-gray-5
          data-[state=active]:text-primary-pink
          after:hidden
        `}
          >
            <div className='text-inherit'>{cloneElement(icon, { color: 'currentColor' })}</div>
            <p className='subtitle-7'>{label}</p>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

export default Footer;
