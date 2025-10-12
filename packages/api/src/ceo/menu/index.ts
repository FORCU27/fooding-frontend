import {
  GetMenuListParams,
  GetMenuListResponse,
  GetMenuDetailResponse,
  CreateMenuBody,
  CreateMenuResponse,
  UpdateMenuBody,
  UpdateMenuResponse,
  MenuItem,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/ceo/menus';

export const menuApi = {
  // 메뉴 목록 조회
  getMenuList: async (params: GetMenuListParams): Promise<GetMenuListResponse['data']> => {
    const response = await api.get<GetMenuListResponse>(ENDPOINT, { params });
    return response.data;
  },

  // 메뉴 상세 조회
  getMenuDetail: async (id: number): Promise<MenuItem> => {
    const response = await api.get<GetMenuDetailResponse>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  // 메뉴 생성
  createMenu: async (body: CreateMenuBody): Promise<MenuItem> => {
    const response = await api.post<CreateMenuResponse>(ENDPOINT, body);
    return response.data;
  },

  // 메뉴 수정
  updateMenu: async (id: number, body: UpdateMenuBody): Promise<MenuItem> => {
    const response = await api.put<UpdateMenuResponse>(`${ENDPOINT}/${id}`, body);
    return response.data;
  },

  // 메뉴 삭제
  deleteMenu: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};

// Export types
export * from './type';