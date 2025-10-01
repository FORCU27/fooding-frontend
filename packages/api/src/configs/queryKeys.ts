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
      operatingHour: 'ceoStoreOperatingHour',
    },
    menuCategory: {
      list: 'ceoMenuCategoryList',
    },
    menu: {
      list: 'ceoMenuList',
      detail: 'ceoMenuDetail',
      create: 'ceoMenuCreate',
      update: 'ceoMenuUpdate',
      delete: 'ceoMenuDelete',
    },
    storeInformation: {
      get: 'ceoStoreInformationGet',
    },
    coupon: {
      list: 'ceoCouponList',
      detail: 'ceoCouponDetail',
      create: 'ceoCouponCreate',
      update: 'ceoCouponUpdate',
      delete: 'ceoCouponDelete',
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
      imageList: 'userStoreImageList',
      infiniteImageList: 'userStoreInfiniteImageList',
      reward: 'userStoreReward',
      rewardList: 'userStoreRewardList',
      searchInfiniteStoreList: 'userSearchInfiniteStoreList',
      recentlyViewedStores: 'recently-viewed-stores',
    },
    storePost: {
      list: 'userStorePostList',
      detail: 'userStorePostDetail',
    },
    storeWaiting: {
      detail: 'userStoreWaitingDetail',
    },
    coupon: {
      infiniteList: 'userCouponInfiniteList',
    },
    bookmark: { list: 'userBookmarkList' },
    plan: { list: 'userPlanList', detail: 'userPlanDetail' },
    region: { list: 'userRegionList' },
    reward: { list: 'userRewardList', log: 'userRewardLog' },
    report: { detail: 'userReportDetail' },
  },
  me: {
    user: 'meUser',
    nicknameCheck: 'meUserNicknameCheck',
  },
  file: {
    upload: 'fileUpload',
  },
};
