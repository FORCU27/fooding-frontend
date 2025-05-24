import { Notification } from '@repo/api/user/notifications';

import { IntersectionObserver } from '@/components/IntersectionObserver';
import { useInfiniteNotificationList } from '@/services/notification';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/date';

export const NotificationList = () => {
  const { notifications, fetchNextPage } = useInfiniteNotificationList();

  if (notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return (
    <ul>
      {notifications.map((notification) => (
        <NotificationListItem key={notification.id} notification={notification} />
      ))}
      <IntersectionObserver onIntersect={fetchNextPage} />
    </ul>
  );
};

type NotificationListItemProps = {
  notification: Notification;
};

const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  const iconByType: Record<Notification['type'], React.ReactNode> = {
    SERVICE: <BellIcon />,
    EVENT: <StarIcon />,
    NOTICE: <MessageAlertSquareIcon />,
  };

  const backgroundColorByType: Record<Notification['type'], string> = {
    SERVICE: 'bg-fooding-purple',
    EVENT: 'bg-fooding-yellow',
    NOTICE: 'bg-primary-pink',
  };

  return (
    <li className={cn('p-5 flex gap-4', notification.read === false && 'bg-primary-pink/10')}>
      <div
        className={cn(
          'size-12 flex justify-center items-center rounded-full shrink-0 text-white',
          backgroundColorByType[notification.type],
        )}
      >
        {iconByType[notification.type]}
      </div>
      <div className='flex flex-col gap-2'>
        <span className='font-semibold'>{notification.title}</span>
        <p>{notification.content}</p>
        <span className='text-gray-5 text-[14px]'>{formatDate(notification.sentAt)}</span>
      </div>
    </li>
  );
};

const NotificationEmptyState = () => {
  return (
    <div className='flex justify-center items-center h-[560px]'>
      <p className='text-gray-3'>알림이 아무것도 없어요.</p>
    </div>
  );
};

const StarIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'>
      <path
        d='M11.2787 3.74555C11.5092 3.27861 11.6245 3.04514 11.7809 2.97055C11.917 2.90565 12.0752 2.90565 12.2113 2.97055C12.3677 3.04514 12.483 3.27861 12.7135 3.74555L14.9002 8.17552C14.9682 8.31337 15.0022 8.3823 15.0519 8.43581C15.096 8.48319 15.1488 8.52159 15.2074 8.54886C15.2736 8.57966 15.3497 8.59078 15.5018 8.61301L20.3931 9.32794C20.9082 9.40323 21.1657 9.44087 21.2849 9.56667C21.3886 9.67613 21.4373 9.82653 21.4176 9.97601C21.3949 10.1478 21.2085 10.3294 20.8356 10.6926L17.2975 14.1387C17.1873 14.2461 17.1321 14.2998 17.0965 14.3637C17.065 14.4203 17.0448 14.4824 17.037 14.5467C17.0282 14.6194 17.0412 14.6952 17.0672 14.847L17.9021 19.7144C17.9901 20.2277 18.0341 20.4844 17.9514 20.6367C17.8794 20.7693 17.7514 20.8622 17.6032 20.8897C17.4327 20.9213 17.2022 20.8001 16.7412 20.5576L12.3685 18.2581C12.2322 18.1864 12.1641 18.1506 12.0923 18.1365C12.0288 18.1241 11.9634 18.1241 11.8999 18.1365C11.8281 18.1506 11.76 18.1864 11.6237 18.2581L7.25102 20.5576C6.79001 20.8001 6.55951 20.9213 6.38907 20.8897C6.24078 20.8622 6.11282 20.7693 6.04083 20.6367C5.95809 20.4844 6.00212 20.2277 6.09017 19.7144L6.92498 14.847C6.95101 14.6952 6.96402 14.6194 6.95521 14.5467C6.94742 14.4824 6.92721 14.4203 6.8957 14.3637C6.86012 14.2998 6.80497 14.2461 6.69468 14.1387L3.15665 10.6926C2.78376 10.3294 2.59731 10.1478 2.57462 9.97601C2.55488 9.82653 2.60365 9.67613 2.70734 9.56667C2.82653 9.44087 3.08407 9.40323 3.59914 9.32794L8.4904 8.61301C8.64252 8.59078 8.71857 8.57966 8.78481 8.54886C8.84346 8.52159 8.89626 8.48319 8.94028 8.43581C8.99 8.3823 9.02402 8.31337 9.09207 8.17552L11.2787 3.74555Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const MessageAlertSquareIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M12 10.5V7M12 14H12.01M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const BellIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M9.35102 21C10.0562 21.6224 10.9824 22 11.9968 22C13.0113 22 13.9375 21.6224 14.6427 21M17.9968 8C17.9968 6.4087 17.3647 4.88258 16.2395 3.75736C15.1143 2.63214 13.5881 2 11.9968 2C10.4055 2 8.87942 2.63214 7.7542 3.75736C6.62899 4.88258 5.99684 6.4087 5.99684 8C5.99684 11.0902 5.21731 13.206 4.34651 14.6054C3.61197 15.7859 3.2447 16.3761 3.25817 16.5408C3.27308 16.7231 3.3117 16.7926 3.45862 16.9016C3.5913 17 4.18944 17 5.3857 17H18.608C19.8043 17 20.4024 17 20.5351 16.9016C20.682 16.7926 20.7206 16.7231 20.7355 16.5408C20.749 16.3761 20.3817 15.7859 19.6472 14.6054C18.7764 13.206 17.9968 11.0902 17.9968 8Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
