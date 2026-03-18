import { notificationApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStoreNotificationsParams {
  storeId: number | null;
  pageNum: number;
  pageSize: number;
  sortType?: 'RECENT' | 'OLD';
}

export const useGetStoreNotifications = ({
  storeId,
  pageNum,
  pageSize,
  sortType,
}: UseGetStoreNotificationsParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.notifications, storeId, pageNum, pageSize, sortType],
    queryFn: () =>
      notificationApi.getStoreNotifications({
        storeId: storeId!,
        pageNum,
        pageSize,
        sortType,
      }),
    enabled: !!storeId,
  });
};
