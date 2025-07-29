import { StoreInfo, StoreMenu } from '@repo/api/user';
import { ChipTabs, EmptyState, Tag } from '@repo/design-system/components/b2c';

import { useGetStoreMenuList } from '@/hooks/store/useGetStoreMenuList';
import { isNonEmptyArray } from '@/utils/array';

type StoreDetailMenuTabProps = {
  store: StoreInfo;
};

export const StoreDetailMenuTab = ({ store }: StoreDetailMenuTabProps) => {
  const { data: storeMenuCategories } = useGetStoreMenuList(store.id);

  if (!isNonEmptyArray(storeMenuCategories)) {
    return <EmptyState title='동록된 메뉴가 없어요.' />;
  }

  return (
    <div className='flex flex-col px-grid-margin pt-grid-margin'>
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
            <ul className='mt-5 flex flex-col gap-5'>
              {category.menu.map((menu) => (
                <MenuItem key={menu.id} menu={menu} />
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
};

const MenuItem = ({ menu }: MenuItemProps) => {
  return (
    <li className='flex gap-4'>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-1'>
          <Tag variant='primary'>BEST</Tag>
          <Tag variant='red'>추천</Tag>
          <Tag variant='green'>신규</Tag>
        </div>
        <span className='mt-2 subtitle-4 text-black'>{menu.name}</span>
        <p className='mt-2 body-8-2 text-gray-5'>{menu.description}</p>
        <p className='mt-2 subtitle-4 text-black'>{menu.price.toLocaleString()}원</p>
      </div>
      <div className='size-[120px] rounded-[12px] bg-gray-1' />
    </li>
  );
};
