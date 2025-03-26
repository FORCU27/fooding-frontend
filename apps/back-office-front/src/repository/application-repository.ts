import { httpClient } from '@/libs/http';

enum PlatformEnum {
  ANDROID = 'Android',
  IOS = 'Ios',
  WEB = 'Web',
  DESKTOP = 'Desktop',
}

export interface Application {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  platform: PlatformEnum;
  createdDate: string;
  updatedDate?: string | null;
}

export interface ApplicationResponse {
  data: Application[];
  total: number;
}

export interface ApplicationQueryParams {
  search?: string;
  limit?: number;
  offset?: number;
}

class ApplicationRepository {
  static async create(params: Application) {
    return httpClient.post<Application>('/admin/applications', {
      ...params,
      createdDate: new Date().toISOString(),
    });
  }

  static async getList(params?: ApplicationQueryParams): Promise<ApplicationResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.offset) queryParams.set('offset', params.offset.toString());
    
    const queryString = queryParams.toString();
    return (
      await httpClient.get<ApplicationResponse>(
        `/admin/applications${queryString ? `?${queryString}` : ''}`,
      )
    ).data;
  }

  static async getById(id: string): Promise<Application> {
    return (await httpClient.get<Application>(`/admin/applications/${id}`)).data;
  }

  static async update(id: string, params: Application) {
    return httpClient.put<Application>(`/admin/applications/${id}`, {
      ...params,
      updatedDate: new Date().toISOString(),
    });
  }
}

export const applicationRepository = ApplicationRepository;
