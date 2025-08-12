'use client';
import { Store } from '@repo/api/ceo';

type StoreListProps = {
  stores: Store[];
  selectedStoreId: number | null;
  onSelect: (id: number) => void;
  onConfirm?: (id: number) => void;
};

// TODO 디자인시스템 radiogroup 활용
function CheckedIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <rect x='0.5' y='0.5' width='23' height='23' rx='11.5' fill='white' />
      <rect x='0.5' y='0.5' width='23' height='23' rx='11.5' stroke='#FF2B3D' />
      <circle cx='12' cy='12' r='7' fill='#FF2B3D' />
    </svg>
  );
}

function UncheckedIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <rect x='0.5' y='0.5' width='23' height='23' rx='11.5' fill='white' />
      <rect x='0.5' y='0.5' width='23' height='23' rx='11.5' stroke='#E2DFDF' />
    </svg>
  );
}

export default function StoreList({
  stores,
  selectedStoreId,
  onSelect,
  onConfirm,
}: StoreListProps) {
  return (
    <div className='w-full flex flex-col gap-[16px]' role='radiogroup'>
      {stores.map((store) => {
        const checked = selectedStoreId === store.id;

        return (
          <button
            key={store.id}
            type='button'
            onClick={() => onSelect(store.id)}
            onDoubleClick={() => onConfirm?.(store.id)}
            className={`w-full text-left rounded-[16px] px-[20px] py-[22px] transition flex items-center gap-[12px]
              ${checked ? 'border-2 border-red-400 bg-red-50' : 'border border-gray-200 bg-white'}`}
            role='radio'
            aria-checked={checked}
          >
            {checked ? <CheckedIcon /> : <UncheckedIcon />}
            <span className='subtitle-2'>{store.name}</span>
          </button>
        );
      })}
    </div>
  );
}
