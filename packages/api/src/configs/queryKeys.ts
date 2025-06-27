export const queryKeys = {
  admin: {},
  app: {
    store: {
      waiting: 'waiting',
      waitingOverview: 'waitingOverview',
      storeInfo: 'storeStoreInfo',
      stores: 'storeStores',
    },
    reward: {
      log: 'getLog',
      coupons: 'getCoupons',
    },
  },
  ceo: {
    devices: 'ceoDevices',
  },
  pos: {},
  user: {
    notification: {
      infiniteList: 'notificationInfiniteList',
    },
    me: 'me',
    store: {
      list: 'userStoreList',
      detail: 'userStoreDetail',
      menuList: 'userStoreMenuList',
      reviewList: 'userStoreReviewList',
      operatingHours: 'userStoreOperatingHours',
      additionalInfo: 'userStoreAdditionalInfo',
      immediateEntryList: 'userStoreImmediateEntryList',
    },
    storePost: {
      list: 'userStorePostList',
      detail: 'userStorePostDetail',
    },
  },
  me: {
    user: 'meUser',
  },
};
