import Image from 'next/image';

import { StoreMenu } from '@repo/api/user';
import { Tag } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';


export type MenuDetailScreenProps = {
  storeName: string;
  menu: StoreMenu;
};

export const MenuDetailScreen: ActivityComponentType<'MenuDetailScreen'> = ({ params }) => {
  const { menu, storeName } = params;

  return (
    <Screen className='bg-gray-1' header={<Header left={<Header.Back />} title={storeName} />}>
      {menu.imageUrl && (
        <div className='relative h-[240px]'>
          <Image objectFit='cover' fill src={menu.imageUrl} alt={menu.name} />
        </div>
      )}
      <div className='px-grid-margin pt-grid-margin bg-white pb-6'>
        <div className='flex gap-1'>
          {menu.signature && <Tag variant='primary'>BEST</Tag>}
          {menu.recommend && <Tag variant='red'>추천</Tag>}
        </div>
        <span className='inline-flex mt-4 headline-3'>{menu.name}</span>
        <p className='mt-4 body-3-2'>{menu.description}</p>
        <span className='headline-3 mt-10 inline-flex'>{menu.price.toLocaleString()}원</span>
      </div>
    </Screen>
  );
};
