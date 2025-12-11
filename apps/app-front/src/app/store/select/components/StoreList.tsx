import { Store } from '@repo/api/app';

interface StoreListProps {
  stores?: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store | null) => void;
  onSelectStoreId: (storeId: string) => void;
  onConfirm?: () => void;
}

export default function StoreList({
  stores,
  selectedStore,
  onSelectStore,
  onSelectStoreId,
  onConfirm,
}: StoreListProps) {
  return (
    <div className='w-1/2 h-screen text-center pt-[79px] px-[70px] relative overflow-hidden flex flex-col'>
      {/* 타이틀 고정 영역 */}
      <div className='shrink-0 pb-[47px]'>
        <h2 className='headline-4'>매장 선택</h2>
        <p className='text-gray-5'>관리할 매장을 선택해주세요</p>
      </div>

      {/* 스크롤 가능한 리스트 영역 */}
      <div className='flex-1 overflow-y-auto scrollbar-hide'>
        <ul className='space-y-4 pb-[89px]'>
          {stores?.map((store) => {
            const isSelected = selectedStore?.id === store.id;
            return (
              <li
                key={store.id}
                onClick={() => {
                  if (isSelected && onConfirm) {
                    onConfirm();
                  } else {
                    onSelectStore(store);
                    onSelectStoreId(store.id.toString());
                  }
                }}
              >
                {isSelected ? (
                  <div className='p-[5px] rounded-full bg-gradient-to-r from-[#E8D400] to-[#00D218]'>
                    <div className='py-[30px] text-center rounded-full bg-white headline-4 font-bold shadow-md cursor-pointer'>
                      <span className='align-middle'>{store.name}</span>
                    </div>
                  </div>
                ) : (
                  <div className='py-[30px] text-center rounded-full border-3 border-gray-300 text-gray-500 headline-4 cursor-pointer'>
                    <span className='align-middle'>{store.name}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 하단 그라디언트 오버레이 */}
      <div className='absolute bottom-0 left-0 right-0 h-[220px] bg-gradient-to-t from-white to-transparent pointer-events-none' />
    </div>
  );
}
