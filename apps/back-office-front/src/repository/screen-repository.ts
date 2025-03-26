import { httpClient } from '@/libs/http';

export interface Screen {
  id: string;
  applicationId: string;
  applicationName: string;
  name: string;
  url: string;
  width: number;
  height: number;
  createdDate: string;
  updatedDate?: string | null;
}

export interface ScreenResponse {
  data: Screen[];
  total: number;
}

export interface ScreenQueryParams {
  search?: string;
  limit?: number;
  offset?: number;
}

class ScreenRepository {
  static async create(params: Screen) {
    return httpClient.post<Screen>('/admin/screens', {
      ...params,
      createdDate: new Date().toISOString(),
    });
  }

  static async getList(params?: ScreenQueryParams): Promise<ScreenResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.offset) queryParams.set('offset', params.offset.toString());

    const queryString = queryParams.toString();
    return (
      await httpClient.get<ScreenResponse>(
        `/admin/screens${queryString ? `?${queryString}` : ''}`,
      )
    ).data;
  }

  static async getById(id: string): Promise<Screen> {
    return (await httpClient.get<Screen>(`/admin/screens/${id}`)).data;
  }

  static async update(id: string, params: Screen) {
    return httpClient.put<Screen>(`/admin/screens/${id}`, {
      ...params,
      updatedDate: new Date().toISOString(),
    });
  }
}

export const screenRepository = ScreenRepository;
