export const queryKeys = {
  admin: {},
  app: {
    service: {
      list: 'serviceList',
    },
    store: {
      waiting: 'waiting',
      waitingOverview: 'waitingOverview',
      storeInfo: 'storeStoreInfo',
      stores: 'storeStores',
    },
    reward: {
      log: 'getLog',
      coupons: 'getCoupons',
      rewardGet: 'rewardGet',
    },
  },
  ceo: {
    devices: 'ceoDevices',
    store: {
      getStore: 'ceoStoreGetStore',
    },
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
      review: 'userStoreReview',
      reviewList: 'userStoreReviewList',
      operatingHours: 'userStoreOperatingHours',
      additionalInfo: 'userStoreAdditionalInfo',
      immediateEntryList: 'userStoreImmediateEntryList',
    },
    storePost: {
      list: 'userStorePostList',
      detail: 'userStorePostDetail',
    },
    coupon: {
      infiniteList: 'userCouponInfiniteList',
    },
    bookmark: 'userBookmark',
    reservation: { list: 'userReservationList', detail: 'userReservationDetail' },
  },
  me: {
    user: 'meUser',
  },
};
