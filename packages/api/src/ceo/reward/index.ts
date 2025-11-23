import { GetCeoRewardHistoryListResponse, GetStoreRewardHistoryParams } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/reward';

export const rewardApi = {
  // 스토어별 리워드 히스토리 조회
  getStoreRewardHistory: async ({ storeId, sortType }: GetStoreRewardHistoryParams) => {
    const params = new URLSearchParams();

    if (sortType) {
      params.append('sortType', sortType);
    }

    const url = params.toString()
      ? `${ENDPOINT}/store/${storeId}?${params.toString()}`
      : `${ENDPOINT}/store/${storeId}`;

    const response = await api.get(url);
    return GetCeoRewardHistoryListResponse.parse(response);
  },
};
