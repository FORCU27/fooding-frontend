'use client';

import { defineConfig } from '@stackflow/config';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react/future';

import { BookmarkListScreen } from '@/screens/bookmarks/Bookmarks';
import { NotificationListScreen } from '@/screens/notifications/Notifications';
import { StoreDetailScreen } from '@/screens/store-detail/StoreDetail';
import { StorePostDetailScreen } from '@/screens/store-post-detail/StorePostDetail';
import { HomeTab } from '@/tabs/home/Home';
import { MyPageTab } from '@/tabs/my-page/MyPage';
import { ReservationTab } from '@/tabs/reservation/Reservation';
import { SearchTab } from '@/tabs/search/Search';

declare module '@stackflow/config' {
  interface Register {
    HomeTab: object;
    SearchTab: object;
    ReservationTab: object;
    MyPageTab: object;
    NotificationListScreen: object;
    StoreDetailScreen: { storeId: number };
    BookmarkListScreen: object;
    StorePostDetailScreen: object;
  }
}

const config = defineConfig({
  activities: [
    { name: 'HomeTab' },
    { name: 'SearchTab' },
    { name: 'ReservationTab' },
    { name: 'MyPageTab' },
    { name: 'NotificationListScreen' },
    { name: 'StoreDetailScreen' },
    { name: 'BookmarkListScreen' },
    { name: 'StorePostDetailScreen' },
  ],

  transitionDuration: 350,
  initialActivity: () => 'StorePostDetailScreen',
});

export const { Stack } = stackflow({
  config,
  components: {
    HomeTab,
    SearchTab,
    ReservationTab,
    MyPageTab,
    NotificationListScreen,
    StoreDetailScreen,
    BookmarkListScreen,
    StorePostDetailScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
});
