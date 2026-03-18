import { api } from '../shared';

export interface MenuBoardCreateRequest {
  title: string;
  imageId: string;
}

export interface MenuBoard {
  id: number;
  storeId: number;
  title: string;
  imageUrl: string;
}

export interface MenuBoardListParams {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface MenuBoardListResponse {
  list: MenuBoard[];
  pageInfo: PageInfo;
}

export const menuBoardApi = {
  /**
   * 메뉴판 생성
   */
  createMenuBoard: async (
    storeId: number,
    data: MenuBoardCreateRequest,
  ): Promise<MenuBoard> => {
    const response = await api.post<{ data: MenuBoard }>(`/ceo/stores/${storeId}/menu-boards`, data);
    return response.data;
  },

  /**
   * 메뉴판 목록 조회
   */
  getMenuBoards: async (
    storeId: number,
    params?: MenuBoardListParams
  ): Promise<MenuBoardListResponse> => {
    const response = await api.get<{ data: MenuBoardListResponse }>(
      `/ceo/stores/${storeId}/menu-boards`,
      { params }
    );
    return response.data;
  },

  /**
   * 메뉴판 삭제
   */
  deleteMenuBoard: async (storeId: number, menuBoardId: number): Promise<void> => {
    await api.delete(`/ceo/stores/${storeId}/menu-boards/${menuBoardId}`);
  },

  /**
   * 메뉴판 수정
   */
  updateMenuBoard: async (
    storeId: number,
    menuBoardId: number,
    data: MenuBoardCreateRequest,
  ): Promise<MenuBoard> => {
    const response = await api.put<{ data: MenuBoard }>(`/ceo/stores/${storeId}/menu-boards/${menuBoardId}`, data);
    return response.data;
  },
} as const;