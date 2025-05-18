import { Store } from '@repo/api/app';

interface StoreListProps {
  stores?: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store | null) => void;
}

export default function StoreList({ stores, selectedStore, onSelectStore }: StoreListProps) {
  console.log('stores', stores);
  return (
    <div className='w-1/2 h-screen text-center pt-[79px] px-[70px] relative overflow-hidden flex flex-col'>
      {/* 타이틀 고정 영역 */}
      <div className='shrink-0 pb-[47px]'>
        <h2 className='headline-4'>매장 선택</h2>
        <p className='text-[var(--color-gray-5)]'>관리할 매장을 선택해주세요</p>
      </div>

      {/* 스크롤 가능한 리스트 영역 (남는 영역 자동 계산) */}
      <div className='flex-1 overflow-y-auto scrollbar-hide'>
        <ul className='space-y-4'>
          {stores?.map((store) => (
            <li
              key={store.id}
              className={`py-[30px] text-center rounded-full border-2 cursor-pointer headline-4 ${
                selectedStore === store
                  ? 'border-green-500 font-bold shadow-md'
                  : 'border-gray-300 text-[var(--color-gray-5)]'
              }`}
              onClick={() => onSelectStore(store)}
            >
              {store.name}
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 그라디언트 오버레이 */}
      <div className='absolute bottom-0 left-0 right-0 h-[220px] bg-gradient-to-t from-white to-transparent pointer-events-none' />
    </div>
  );
}
