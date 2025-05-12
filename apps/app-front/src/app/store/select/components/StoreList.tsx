interface StoreListProps {
  stores: string[];
  selectedStore: string;
  onSelectStore: (store: string) => void;
}

export default function StoreList({ stores, selectedStore, onSelectStore }: StoreListProps) {
  return (
    <div className='bg-white w-1/2 h-screen p-16'>
      <h2 className='text-2xl font-bold mb-2'>매장 선택</h2>
      <p className='text-gray-500 mb-8'>관리할 매장을 선택해주세요</p>
      <ul className='space-y-4'>
        {stores.map((store) => (
          <li
            key={store}
            className={`py-4 text-center rounded-full border-2 cursor-pointer ${
              selectedStore === store
                ? 'border-green-500 text-green-500 font-bold shadow-md'
                : 'border-gray-300 text-black'
            }`}
            onClick={() => onSelectStore(store)}
          >
            {store}
          </li>
        ))}
      </ul>
    </div>
  );
}
