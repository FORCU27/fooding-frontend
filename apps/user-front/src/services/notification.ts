import { notificationApi } from '@repo/api/user/notifications';
import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';

const queryKey = {
  notifications: ['notifications'],
};

export const useInfiniteNotificationList = () => {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: queryKey.notifications,
    queryFn: ({ pageParam }) => {
      return notificationApi.getNotificationList({
        page: pageParam,
        size: 20,
        sortType: 'RECENT',
        sortDirection: 'DESCENDING',
      });
    },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage.data;

      if (pageInfo.pageNum < pageInfo.totalPages) {
        return pageInfo.pageNum + 1;
      }

      return undefined;
    },
    staleTime: 0,
  });

  const notifications = data.pages.flatMap((page) => page.data.list);

  return {
    notifications,
    fetchNextPage,
  };
};

export const useMarkNotificationsAsRead = () => {
  return useMutation({
    mutationFn: notificationApi.markAsRead,
  });
};
