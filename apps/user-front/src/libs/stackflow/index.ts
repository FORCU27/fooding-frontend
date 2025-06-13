'use client';

import { defineConfig } from '@stackflow/config';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react/future';

import { NotificationListScreen } from '@/screens/notifications/Notifications';
import { HomeTab } from '@/tabs/home/Home';
import { MyPageTab } from '@/tabs/my-page/MyPage';
import { ReservationTab } from '@/tabs/reservation/Reservation';
import { SearchTab } from '@/tabs/search/Search';

const config = defineConfig({
  activities: [
    { name: 'HomeTab' },
    { name: 'SearchTab' },
    { name: 'ReservationTab' },
    { name: 'MyPageTab' },
    { name: 'NotificationListScreen' },
  ],

  transitionDuration: 350,
  initialActivity: () => 'HomeTab',
});

export const { Stack } = stackflow({
  config,
  components: {
    HomeTab,
    SearchTab,
    ReservationTab,
    MyPageTab,
    NotificationListScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
});

declare module '@stackflow/config' {
  interface Register {
    HomeTab: object;
    SearchTab: object;
    ReservationTab: object;
    MyPageTab: object;
    NotificationListScreen: object;
  }
}
