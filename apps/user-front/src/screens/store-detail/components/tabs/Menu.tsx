import Image from 'next/image';

import { StoreInfo, StoreMenu } from '@repo/api/user';
import { ChipTabs, EmptyState, Tag } from '@repo/design-system/components/b2c';
import { FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { useGetStoreMenuList } from '@/hooks/store/useGetStoreMenuList';
import { isNonEmptyArray } from '@/utils/array';

type StoreDetailMenuTabProps = {
  store: StoreInfo;
};

export const StoreDetailMenuTab = ({ store }: StoreDetailMenuTabProps) => {
  const { data: storeMenuCategories, isPending, isFetching } = useGetStoreMenuList(store.id);

  if (isPending || isFetching) return <LoadingScreen />;

  if (!isNonEmptyArray(storeMenuCategories)) {
    return <EmptyState className='my-16' title='등록된 메뉴가 없어요.' />;
  }

  return (
    <div className='flex flex-col px-grid-margin pt-grid-margin pb-8'>
      <ChipTabs defaultValue={storeMenuCategories[0].id.toString()}>
        <ChipTabs.List variant='secondary'>
          {storeMenuCategories.map((category) => (
            <ChipTabs.Trigger key={category.id} value={category.id.toString()}>
              {category.categoryName}
            </ChipTabs.Trigger>
          ))}
        </ChipTabs.List>
        {storeMenuCategories.map((category) => (
          <ChipTabs.Content key={category.id} value={category.id.toString()}>
            <span className='flex mt-8 subtitle-4'>{category.categoryName}</span>
            <ul className='flex flex-col divide-y divide-gray-2'>
              {category.menu.map((menu) => (
                <MenuItem key={menu.id} menu={menu} storeName={store.name} />
              ))}
            </ul>
          </ChipTabs.Content>
        ))}
      </ChipTabs>
    </div>
  );
};

type MenuItemProps = {
  menu: StoreMenu;
  storeName: string;
};

const MenuItem = ({ menu, storeName }: MenuItemProps) => {
  const { push } = useFlow();

  return (
    <li className='flex gap-4 py-5' onClick={() => push('MenuDetailScreen', { menu, storeName })}>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-1'>
          {menu.signature && <Tag variant='primary'>BEST</Tag>}
          {menu.recommend && <Tag variant='red'>추천</Tag>}
        </div>
        <span className='mt-2 subtitle-4 text-black'>{menu.name}</span>
        <p className='mt-2 body-8-2 text-gray-5'>{menu.description}</p>
        <p className='mt-2 subtitle-4 text-black'>{menu.price.toLocaleString()}원</p>
      </div>
      {menu.imageUrls[0] ? (
        <Image
          width={120}
          height={120}
          src={menu.imageUrls[0]}
          alt={menu.name}
          className='rounded-[12px] object-cover'
        />
      ) : (
        <div className='flex justify-center items-center bg-gray-1 size-[120px] rounded-[12px]'>
          <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
        </div>
      )}
    </li>
  );
};
