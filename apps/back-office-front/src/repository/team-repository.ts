import { httpClient } from '@/libs/http';

export interface Team {
  id: string;
  name: string;
  tags: string;
  createdDate: string;
  updatedDate?: string | null;
  isDelete: boolean;
}

export interface TeamMember {
  id: string;
  userId: string;
  userName: string;
  isOwner: boolean;
  createdDate: string;
}

export interface TeamResponse {
  data: Team[];
  total: number;
}

export interface TeamMemberResponse {
  data: TeamMember[];
  total: number;
}

export interface TeamQueryParams {
  search?: string;
}

class TeamRepository {
  static async create(params: Team) {
    return httpClient.post<Team>('/admin/teams', {
      ...params,
      createdDate: new Date().toISOString(),
    });
  }

  static async getList(params?: TeamQueryParams): Promise<TeamResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);

    const queryString = queryParams.toString();
    return (
      await httpClient.get<TeamResponse>(`/admin/teams${queryString ? `?${queryString}` : ''}`)
    ).data;
  }

  static async getById(id: string): Promise<Team> {
    return (await httpClient.get<Team>(`/admin/teams/${id}`)).data;
  }

  static async update(id: string, params: Team) {
    return httpClient.put<Team>(`/admin/teams/${id}`, {
      ...params,
      updatedDate: new Date().toISOString(),
    });
  }

  static async getMembersById(id: string): Promise<TeamMemberResponse> {
    return (await httpClient.get<TeamMemberResponse>(`/admin/teams/${id}/members`)).data;
  }
}

export const teamRepository = TeamRepository;
