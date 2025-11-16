import { deviceApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetDevicesParams {
  storeId: number | null;
  pageNum: number;
  pageSize: number;
  searchString?: string;
}

export const useGetDevices = ({ storeId, pageNum, pageSize, searchString }: UseGetDevicesParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.devices, storeId, pageNum, pageSize, searchString],
    queryFn: () => deviceApi.getCeoDeviceList(pageNum, pageSize, storeId!, searchString),
    enabled: !!storeId,
  });
};
