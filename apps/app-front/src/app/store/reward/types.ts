export enum StoreServiceType {
  WAITING = 'WAITING',
  REWARD = 'REWARD',
  PAYMENT = 'PAYMENT',
}

export type StoreServicePath = {
  [key in StoreServiceType]: string;
};

export const STORE_SERVICE_PATHS: StoreServicePath = {
  [StoreServiceType.WAITING]: '/store/waiting',
  [StoreServiceType.REWARD]: '/store/reward',
  [StoreServiceType.PAYMENT]: '/store/payment',
};

export const REWARD_MAIN_TABS = ['coupon', 'history'] as const;
export type RewardMainTabType = (typeof REWARD_MAIN_TABS)[number];

export const REWARD_SUB_TABS = ['available', 'used'] as const;
export type RewardSubTabType = (typeof REWARD_SUB_TABS)[number];
