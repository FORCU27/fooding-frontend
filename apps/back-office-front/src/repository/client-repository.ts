import { httpClient } from '@/libs/http';

export interface Client {
  contactId: string;
  projectName: string;
  companyName: string;
  name: string;
  email: string;
  mobile: string;
  budget?: string;
  description?: string | null;
  createdDate: string;
  updatedDate?: string | null;
  isDelete: boolean;
}

export interface ClientResponse {
  data: Client[];
  total: number;
}
export interface ClientQueryParams {
  search?: string;
}

class ClientRepository {
  static async getList(params?: ClientQueryParams): Promise<ClientResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);

    const queryString = queryParams.toString();
    return (
      await httpClient.get<ClientResponse>(`/admin/clients${queryString ? `?${queryString}` : ''}`)
    ).data;
  }

  static async getById(contactId: string): Promise<Client> {
    return (await httpClient.get<Client>(`/admin/clients/${contactId}`)).data;
  }

  static async update(contactId: string, params: Client) {
    return httpClient.put<Client>(`/admin/clients/${contactId}`, {
      ...params,
      updatedDate: new Date().toISOString(),
    });
  }
}

export const clientRepository = ClientRepository;
