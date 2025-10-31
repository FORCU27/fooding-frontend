import { deviceApi, GetDeviceLogsParams } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useDeviceLogs = ({ deviceId, pageNum = 1, pageSize = 10 }: GetDeviceLogsParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.device.logs, deviceId, pageNum, pageSize],
    queryFn: () => deviceApi.getDeviceLogs({ deviceId, pageNum, pageSize }),
    enabled: !!deviceId,
  });
};
