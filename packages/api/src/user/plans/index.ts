export * from './type';
import { GetPlanListParams, GetPlanListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/plans';

export const planApi = {
  getPlanList: async (params?: GetPlanListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetPlanListResponse.parse(response);
  },
};
