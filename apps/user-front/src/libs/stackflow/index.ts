'use client';

import { defineConfig } from '@stackflow/config';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react/future';

import { BookmarkListScreen } from '@/screens/bookmarks/Bookmarks';
import { MyCouponListScreen } from '@/screens/my-coupons/MyCoupons';
import { NotificationListScreen } from '@/screens/notifications/Notifications';
import { ProfileModifyScreen } from '@/screens/profile/ProfileModify';
import { ProfileCompleteScreen } from '@/screens/profile-user-info/ProfileCompleteScreen';
import { ProfileUserInfoScreen } from '@/screens/profile-user-info/ProfileUserInfo';
import { ReservationDetailScreen } from '@/screens/reservation-detail/ReservationDetail';
import { ReviewCreateScreen } from '@/screens/reviews/ReviewCreate';
import { NotificationSettingScreen } from '@/screens/settings/Notifications';
import { SettingScreen } from '@/screens/settings/Settings';
import { StoreDetailScreen } from '@/screens/store-detail/StoreDetail';
import { StorePostDetailScreen } from '@/screens/store-post-detail/StorePostDetail';
import { WaitingDetailScreen } from '@/screens/waiting-detail/WaitingDetail';
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
    MyCouponListScreen: object;
    StorePostDetailScreen: { storePostId: number; storeName: string };
    SettingScreen: object;
    NotificationSettingScreen: object;
    ReviewCreateScreen: { reservationId: number };
    WaitingDetailScreen: { waitingId: number };
    ReservationDetailScreen: { reservationId: number };
    ProfileModifyScreen: object;
    ProfileUserInfoScreen: {
      gender: string;
      nickname: string | null;
      description: string | null;
      phoneNumber: string | null;
      referralCode: string | null;
      imageId?: string | null;
    };
    ProfileCompleteScreen: object;
  }
}

const config = defineConfig({
  activities: [
    { name: 'HomeTab' },
    { name: 'SearchTab' },
    { name: 'ReservationTab' },
    { name: 'MyPageTab' },
    { name: 'NotificationListScreen' },
    { name: 'BookmarkListScreen' },
    { name: 'MyCouponListScreen' },
    { name: 'StorePostDetailScreen' },
    { name: 'StoreDetailScreen' },
    { name: 'SettingScreen' },
    { name: 'NotificationSettingScreen' },
    { name: 'ReviewCreateScreen' },
    { name: 'WaitingDetailScreen' },
    { name: 'ReservationDetailScreen' },
    { name: 'ProfileModifyScreen' },
    { name: 'ProfileUserInfoScreen' },
    { name: 'ProfileCompleteScreen' },
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
    BookmarkListScreen,
    MyCouponListScreen,
    StorePostDetailScreen,
    StoreDetailScreen,
    SettingScreen,
    NotificationSettingScreen,
    ReviewCreateScreen,
    WaitingDetailScreen,
    ReservationDetailScreen,
    ProfileModifyScreen,
    ProfileUserInfoScreen,
    ProfileCompleteScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
});
