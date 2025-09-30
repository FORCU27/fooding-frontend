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
    me: 'ceoMe',
    devices: 'ceoDevices',
    store: {
      selectedStore: 'ceoSelectedStore',
      storeList: 'ceoStoreList',
      getStore: 'ceoStoreGetStore',
      operatingHour: 'ceoStoreOperatingHour',
      images: 'ceoStoreImages',
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
    },
    storePost: {
      list: 'userStorePostList',
      detail: 'userStorePostDetail',
    },
    storeWaiting: {
      detail: 'userStoreWaitingDetail',
      available: 'userStoreWaitingAvailable',
    },
    coupon: {
      infiniteList: 'userCouponInfiniteList',
    },
    bookmark: { list: 'userBookmarkList' },
    plan: { list: 'userPlanList', detail: 'userPlanDetail' },
    region: { list: 'userRegionList' },
    reward: { list: 'userRewardList', log: 'userRewardLog' },
    report: { detail: 'userReportDetail' },
    review: { myList: 'userReviewMyList' },
  },
  me: {
    user: 'meUser',
    nicknameCheck: 'meUserNicknameCheck',
  },
  file: {
    upload: 'fileUpload',
  },
};
