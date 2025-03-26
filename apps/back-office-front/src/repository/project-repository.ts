import { httpClient } from '@/libs/http';

export interface Project {
  id: string;
  teamId: string;
  teamName: string;
  name: string;
  thumbnailImageUrl?: string;
  createdDate: string;
  updatedDate: string | null;
}

export interface ProjectResponse {
  data: [Project];
  total: number;
}

export interface ProjectQueryParams {
  search?: string;
  limit?: number;
  offset?: number;
}

class ProjectRepository {
  static async getList(params?: ProjectQueryParams): Promise<ProjectResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.offset) queryParams.set('offset', params.offset.toString());

    const queryString = queryParams.toString();
    return (
      await httpClient.get<ProjectResponse>(`/admin/projects${queryString ? `?${queryString}` : ''}`)
    ).data;
  }

  static async getById(id: string): Promise<Project> {
    return (await httpClient.get<Project>(`/admin/projects/${id}`)).data;
  }

  static async create(params: Project) {
    return httpClient.post<Project>('/admin/projects', {
      ...params,
      createdDate: new Date().toISOString(),
    });
  }

  static async update(id: string, params: Project) {
    return httpClient.put<Project>(`/admin/projects/${id}`, {
      ...params,
      updatedDate: new Date().toISOString(),
    });
  }

  static async delete(id: string): Promise<void> {
    await httpClient.delete(`/admin/projects/${id}`);
  }
}

export const projectRepository = ProjectRepository;
