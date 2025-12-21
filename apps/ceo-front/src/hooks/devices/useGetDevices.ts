import { deviceApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetDevicesParams {
  storeId: number | null;
  pageNum: number;
  pageSize: number;
  searchString?: string;
  sortType?: 'RECENT' | 'OLD';
}

export const useGetDevices = ({ storeId, pageNum, pageSize, searchString, sortType }: UseGetDevicesParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.devices, storeId, pageNum, pageSize, searchString, sortType],
    queryFn: () => deviceApi.getCeoDeviceList(pageNum, pageSize, storeId!, searchString, sortType),
    enabled: !!storeId,
  });
};
