import {
  GetStoreInformationResponse,
  DeleteStoreInformationResponse,
  StoreInformationBody,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/stores';

export const storeInformationApi = {
  // 부가정보 조회
  getStoreInformation: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/information`);
    return GetStoreInformationResponse.parse(response);
  },

  // 부가정보 수정 (information ID 필요)
  updateStoreInformation: async (storeId: number, informationId: number, body: StoreInformationBody) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/information/${informationId}`, body);
    // API returns null in data field for successful update
    return response;
  },

  // 부가정보 삭제
  deleteStoreInformation: async (storeId: number, informationId: number) => {
    const response = await api.delete(`${ENDPOINT}/${storeId}/information/${informationId}`);
    return DeleteStoreInformationResponse.parse(response);
  },
};