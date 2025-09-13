'use client';

import { Store } from '@repo/api/ceo';
import { RadioButton } from '@repo/design-system/components/ceo';

type StoreListProps = {
  stores: Store[];
  selectedStoreId: number | null;
  onSelect: (id: number) => void;
  onConfirm?: (id: number) => void;
};

export default function StoreList({
  stores,
  selectedStoreId,
  onSelect,
  onConfirm,
}: StoreListProps) {
  return (
    <div className='w-full flex flex-col gap-[16px]' role='radiogroup' aria-label='매장 선택'>
      {stores.map((store) => {
        const checked = selectedStoreId === store.id;
        return (
          <div
            key={store.id}
            onClick={() => onSelect(store.id)}
            onDoubleClick={() => onConfirm?.(store.id)}
            className={`w-full rounded-[16px] px-[20px] py-[22px] transition flex items-center
              ${checked ? 'border-2 border-red-400 bg-red-50' : 'border border-gray-200 bg-white'}`}
          >
            <RadioButton
              label={store.name}
              value={String(store.id)}
              checked={checked}
              onChange={() => onSelect(store.id)}
              name={store.name}
              color='red'
              className='subtitle-2'
            />
          </div>
        );
      })}
    </div>
  );
}
