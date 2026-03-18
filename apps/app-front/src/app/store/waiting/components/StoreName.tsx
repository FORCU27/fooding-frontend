import { storeApi, Store } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

import { useStore } from '@/components/Provider/StoreClientProvider';

export const StoreName = () => {
  const { storeId } = useStore();

  const { data: stores } = useQuery({
    queryKey: [queryKeys.app.store.stores],
    queryFn: () => storeApi.getStores(),
  });

  const storeName =
    stores?.data.find((store: Store) => store.id === Number(storeId))?.name ?? '매장';

  return (
    <div className='space-y-2'>
      <div className='headline-3-1'>어서오세요</div>
      <div>
        <p className='headline-1'>
          {storeName}
          <span className='headline-2-1'> 입니다</span>
        </p>
      </div>
    </div>
  );
};
