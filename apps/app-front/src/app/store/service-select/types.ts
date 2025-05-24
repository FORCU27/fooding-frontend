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
