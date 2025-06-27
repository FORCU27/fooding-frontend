import { useEffect, useRef } from 'react';

import { useMarkNotificationsAsRead } from '@/hooks/notification/useMarkNotificationAsRead';

export const MarkAsRead = () => {
  const { mutate: markAsRead } = useMarkNotificationsAsRead();

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) return;

    try {
      markAsRead();
    } catch {
      noop();
    } finally {
      isMountedRef.current = true;
    }
  }, [markAsRead]);

  return null;
};

const noop = () => {};
