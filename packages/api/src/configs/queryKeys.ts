export const queryKeys = {
  admin: {},
  app: {
    service: {
      list: 'serviceList',
    },
    store: {
      waiting: 'waiting',
      storeInfo: 'storeStoreInfo',
      stores: 'storeStores',
      waitingOverview: 'waitingOverview',
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
