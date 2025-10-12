import {
  GetStoreImagesParams,
  GetStoreImagesResponse,
  CreateStoreImageParams,
  PustStoreImageParams,
  PutStoreMainImageParams,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/stores';

export const storeImageApi = {
  getImages: async (storeId: number, params: GetStoreImagesParams) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/images`, { params });
    return GetStoreImagesResponse.parse(response);
  },
  createImage: async (storeId: number, body: CreateStoreImageParams) => {
    await api.post(`${ENDPOINT}/${storeId}/images`, body);
  },
  deleteImage: async (storeId: number, photoId: number) => {
    await api.delete(`${ENDPOINT}/${storeId}/images/${photoId}`);
  },
  putImage: async (storeId: number, photoId: number, body: PustStoreImageParams) => {
    await api.put(`${ENDPOINT}/${storeId}/images/${photoId}`, body);
  },
  putMainImage: async (storeId: number, photoId: number, body: PutStoreMainImageParams) => {
    await api.put(`${ENDPOINT}/${storeId}/images/${photoId}/main`, body);
  },
};
