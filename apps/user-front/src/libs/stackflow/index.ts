'use client';

import { Review, StoreInfo } from '@repo/api/user';
import { defineConfig, Register } from '@stackflow/config';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react/future';

import { SCREEN_TRANSITION_DURATION } from './configs';
import { wrapPlugin } from './wrap-plugin';
import { BookmarkListScreen } from '@/screens/bookmarks/Bookmarks';
import { ImmediateEntryStoreListScreen } from '@/screens/immediate-entry-stores/ImmediateEntryStores';
import { JoinFormScreen } from '@/screens/join/JoinFormScreen';
import { MenuDetailScreen, MenuDetailScreenParams } from '@/screens/menu-detail/MenuDetail';
import { MyCouponListScreen } from '@/screens/my-coupons/MyCoupons';
import { MyReviewsScreen } from '@/screens/my-reveiws/MyReveiws';
import { MyRewardDetailScreen } from '@/screens/my-reward-detail/MyRewardDetail';
import { MyRewardListScreen } from '@/screens/my-rewards/MyRewards';
import { NotificationListScreen } from '@/screens/notifications/Notifications';
import { PlanDetailScreen } from '@/screens/plan-detail/PlanDetail';
import { PopularViewedStoreListScreen } from '@/screens/popular-viewed-stores/PopularViewedStores';
import { ProfileModifyScreen } from '@/screens/profile/ProfileModify';
import { ProfileCompleteScreen } from '@/screens/profile-user-info/ProfileCompleteScreen';
import { ProfileUserInfoScreen } from '@/screens/profile-user-info/ProfileUserInfo';
import { RecentlyViewedStoreListScreen } from '@/screens/recently-viewed-stores/RecentlyViewedStores';
import { ReviewReportCreateScreen } from '@/screens/reports/ReivewReportCreate';
import { ReviewCreateScreen, ReviewCreateScreenParams } from '@/screens/reviews/ReviewCreate';
import { ReviewModifyScreen, ReviewModifyScreenParams } from '@/screens/reviews/ReviewModify';
import { SearchResultScreen, SearchResultScreenParams } from '@/screens/search-result/SearchResult';
import { NotificationSettingScreen } from '@/screens/settings/Notifications';
import { SettingScreen } from '@/screens/settings/Settings';
import { StoreDetailScreen, StoreDetailScreenParams } from '@/screens/store-detail/StoreDetail';
import {
  StorePostDetailScreen,
  StorePostDetailScreenParams,
} from '@/screens/store-post-detail/StorePostDetail';
import { WaitingDetailScreen } from '@/screens/waiting-detail/WaitingDetail';
import { HomeTab } from '@/tabs/home/Home';
import { MyPageTab } from '@/tabs/my-page/MyPage';
import { PlanTab } from '@/tabs/plan/Plan';
import { SearchTab } from '@/tabs/search/Search';

declare module '@stackflow/config' {
  interface Register {
    HomeTab: object;
    SearchTab: object;
    PlanTab: object;
    MyPageTab: object;
    NotificationListScreen: object;
    StoreDetailScreen: StoreDetailScreenParams;
    BookmarkListScreen: object;
    MyCouponListScreen: object;
    StorePostDetailScreen: StorePostDetailScreenParams;
    SettingScreen: object;
    NotificationSettingScreen: object;
    SearchResultScreen: SearchResultScreenParams;
    ReviewCreateScreen: ReviewCreateScreenParams;
    ReviewModifyScreen: ReviewModifyScreenParams;
    WaitingDetailScreen: { waitingId: string };
    PlanDetailScreen: { planId: string };
    ProfileModifyScreen: object;
    ProfileUserInfoScreen: {
      isUpdateMode: boolean;
      gender: string;
      nickname: string | null;
      description: string | null;
      phoneNumber: string | null;
      referralCode: string | null;
      imageFile: File | null;
    };
    ProfileCompleteScreen: { userName: string };
    JoinFormScreen: object;
    MenuDetailScreen: MenuDetailScreenParams;
    MyRewardListScreen: object;
    MyRewardDetailScreen: { storeId: number };
    ReviewReportCreateScreen: { review: Review; store: StoreInfo; type: 'REVIEW' | 'POST' };
    RecentlyViewedStoreListScreen: object;
    MyReviewsScreen: object;
    PopularViewedStoreListScreen: object;
    ImmediateEntryStoreListScreen: object;
  }
}

const config = defineConfig({
  activities: [
    { name: 'HomeTab' },
    { name: 'SearchTab' },
    { name: 'PlanTab' },
    { name: 'MyPageTab' },
    { name: 'NotificationListScreen' },
    { name: 'BookmarkListScreen' },
    { name: 'MyCouponListScreen' },
    { name: 'StorePostDetailScreen' },
    { name: 'StoreDetailScreen' },
    { name: 'SettingScreen' },
    { name: 'NotificationSettingScreen' },
    { name: 'SearchResultScreen' },
    { name: 'ReviewCreateScreen' },
    { name: 'ReviewModifyScreen' },
    { name: 'WaitingDetailScreen' },
    { name: 'PlanDetailScreen' },
    { name: 'ProfileModifyScreen' },
    { name: 'ProfileUserInfoScreen' },
    { name: 'ProfileCompleteScreen' },
    { name: 'JoinFormScreen' },
    { name: 'MenuDetailScreen' },
    { name: 'MyRewardListScreen' },
    { name: 'MyRewardDetailScreen' },
    { name: 'ReviewReportCreateScreen' },
    { name: 'RecentlyViewedStoreListScreen' },
    { name: 'MyReviewsScreen' },
    { name: 'PopularViewedStoreListScreen' },
    { name: 'ImmediateEntryStoreListScreen' },
  ],

  transitionDuration: SCREEN_TRANSITION_DURATION,
  initialActivity: () => 'HomeTab',
});

export const { Stack } = stackflow({
  config,
  components: {
    HomeTab,
    SearchTab,
    PlanTab,
    MyPageTab,
    NotificationListScreen,
    BookmarkListScreen,
    MyCouponListScreen,
    StorePostDetailScreen,
    StoreDetailScreen,
    SettingScreen,
    NotificationSettingScreen,
    SearchResultScreen,
    ReviewCreateScreen,
    ReviewModifyScreen,
    WaitingDetailScreen,
    PlanDetailScreen,
    ProfileModifyScreen,
    ProfileUserInfoScreen,
    ProfileCompleteScreen,
    JoinFormScreen,
    MenuDetailScreen,
    MyRewardListScreen,
    MyRewardDetailScreen,
    ReviewReportCreateScreen,
    RecentlyViewedStoreListScreen,
    MyReviewsScreen,
    PopularViewedStoreListScreen,
    ImmediateEntryStoreListScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    wrapPlugin(),
  ],
});

type BannerScreen = { [K in keyof Register]: { name: K; params: Register[K] } };

export const bannerScreen: Record<string, BannerScreen[keyof BannerScreen]> = {
  '1': { name: 'SearchResultScreen', params: { keyword: '', regions: [] } },
};
