import { Notification } from '@repo/api/user';
import { EmptyState } from '@repo/design-system/components/b2c';
import { BellIcon, MessageAlertSquareIcon, StarIcon } from '@repo/design-system/icons';

import { MarkAsRead } from './MarkAsRead';
import { IntersectionObserver } from '@/components/IntersectionObserver';
import { useInfiniteNotificationList } from '@/hooks/notification/useInfiniteNotificationList';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/date';

export const NotificationList = () => {
  const { notifications, fetchNextPage } = useInfiniteNotificationList();

  if (notifications.length === 0) {
    return <EmptyState className='flex-1' title='도착한 알림이 없어요!' />;
  }

  return (
    <ul>
      {notifications.map((notification) => (
        <NotificationListItem key={notification.id} notification={notification} />
      ))}
      <IntersectionObserver onIntersect={fetchNextPage} />
      <MarkAsRead />
    </ul>
  );
};

type NotificationListItemProps = {
  notification: Notification;
};

const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  const iconByNotificationCategory: Record<Notification['category'], React.ReactNode> = {
    SERVICE: <BellIcon />,
    EVENT: <StarIcon />,
    NOTICE: <MessageAlertSquareIcon />,
  };

  const backgroundColorByNotificationCategory: Record<Notification['category'], string> = {
    SERVICE: 'bg-fooding-purple',
    EVENT: 'bg-fooding-yellow',
    NOTICE: 'bg-primary-pink',
  };

  return (
    <li
      className={cn(
        'p-grid-margin flex gap-4',
        notification.read === false && 'bg-primary-pink/10',
      )}
    >
      <div
        className={cn(
          'size-12 flex justify-center items-center rounded-full shrink-0 text-white',
          backgroundColorByNotificationCategory[notification.category],
        )}
      >
        {iconByNotificationCategory[notification.category]}
      </div>
      <div className='flex flex-col gap-2'>
        <span className='font-semibold'>{notification.title}</span>
        <p>{notification.content}</p>
        <span className='text-gray-5 text-[14px]'>{formatDate(notification.sentAt)}</span>
      </div>
    </li>
  );
};
