import { deviceApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetDevice = (deviceId: number) => {
  return useQuery({
    queryKey: [queryKeys.ceo.devices, deviceId],
    queryFn: () => deviceApi.getDevice(deviceId),
    enabled: !!deviceId,
  });
};
