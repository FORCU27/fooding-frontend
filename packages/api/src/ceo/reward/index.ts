import { GetCeoRewardHistoryListResponse } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/reward';

export const rewardApi = {
  // 스토어별 리워드 히스토리 조회
  getStoreRewardHistory: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/store/${storeId}`);
    return GetCeoRewardHistoryListResponse.parse(response);
  },
};
