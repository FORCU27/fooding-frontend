import { notificationApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStoreNotificationsParams {
  storeId: number | null;
  pageNum: number;
  pageSize: number;
}

export const useGetStoreNotifications = ({
  storeId,
  pageNum,
  pageSize,
}: UseGetStoreNotificationsParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.notifications, storeId, pageNum, pageSize],
    queryFn: () =>
      notificationApi.getStoreNotifications({
        storeId: storeId!,
        pageNum,
        pageSize,
      }),
    enabled: !!storeId,
  });
};
