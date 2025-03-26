import { httpClient } from '@/libs/http';

export interface Portfolio {
  slug: string;
  title: string;
  tags: string;
  roles: string;
  link: string;
  imgUrl: string;
  thumbnailImageUrl: string;
  summary: string;
  createdDate: string;
  updatedDate?: string | null;
  isDelete: boolean;
}

export interface PortfolioResponse {
  data: Portfolio[];
  total: number;
}

export interface PortfolioQueryParams {
  search?: string;
}

class PortfolioRepository {
  static async create(params: Portfolio) {
    return httpClient.post<Portfolio>('/admin/portfolios', {
      ...params,
      createdDate: new Date().toISOString(),
    });
  }

  static async getList(params?: PortfolioQueryParams): Promise<PortfolioResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);

    const queryString = queryParams.toString();
    return (
      await httpClient.get<PortfolioResponse>(`/portfolios${queryString ? `?${queryString}` : ''}`)
    ).data;
  }

  static async getById(slug: string): Promise<Portfolio> {
    return (await httpClient.get<Portfolio>(`/portfolios/${slug}`)).data;
  }

  static async update(slug: string, params: Portfolio) {
    return httpClient.put<Portfolio>(`/admin/portfolios/${slug}`, {
      ...params,
      updatedDate: new Date().toISOString(),
    });
  }
}

export const portfolioRepository = PortfolioRepository;
