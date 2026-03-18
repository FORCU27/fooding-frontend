import { deviceApi, GetDeviceLogsParams } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useDeviceLogs = ({ deviceId, pageNum = 1, pageSize = 10, sortType }: GetDeviceLogsParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.device.logs, deviceId, pageNum, pageSize, sortType],
    queryFn: () => deviceApi.getDeviceLogs({ deviceId, pageNum, pageSize, sortType }),
    enabled: !!deviceId,
  });
};
