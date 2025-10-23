import {
  GetStoreNotificationsParams,
  GetStoreNotificationsResponse,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/store-notifications';

export const notificationApi = {
  getStoreNotifications: async ({
    storeId,
    pageNum = 1,
    pageSize = 10,
  }: GetStoreNotificationsParams) => {
    const params = new URLSearchParams({
      storeId: storeId.toString(),
      pageNum: pageNum.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetStoreNotificationsResponse.parse(response);
  },
};
