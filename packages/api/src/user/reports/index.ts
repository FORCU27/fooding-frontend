import { CreateReportBody, GetUserReportResponse } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/user/report';

export const reportApi = {
  createReviewReport: async (body: CreateReportBody) => {
    const response = await api.post(ENDPOINT, body);
    return GetUserReportResponse.parse(response);
  },
};
